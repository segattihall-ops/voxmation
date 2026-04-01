import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import crypto from "crypto";
import { config } from "../../config";

function normalizePhone(s: string) {
  return s.replace(/[^0-9+]/g, "");
}

function validateTwilioSignature(authToken: string, signature: string, url: string, params: Record<string, string>): boolean {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.reduce((acc, key) => acc + key + params[key], "");
  const expected = crypto.createHmac("sha1", authToken).update(url + paramString).digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

function validateMetaSignature(appSecret: string, signature: string, rawBody: string): boolean {
  if (!signature.startsWith("sha256=")) return false;
  const expected = "sha256=" + crypto.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

export const voiceRoutes: FastifyPluginAsync = async (app) => {
  app.get("/calls", {
    preHandler: app.requireRole(["ADMIN","SALES","READONLY"])
  }, async () => {
    return app.prisma.callLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  });

  app.post("/calls/outbound", {
    schema: {
      tags: ["Voice"],
      summary: "Request an outbound call",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any) => {
    const body = z.object({
      fromNumber: z.string(),
      toNumber: z.string(),
      leadId: z.string().optional(),
      opportunityId: z.string().optional(),
      accountId: z.string().optional()
    }).parse(req.body);

    const providerCallId = crypto.randomUUID();

    const call = await app.prisma.callLog.create({
      data: {
        leadId: body.leadId,
        opportunityId: body.opportunityId,
        accountId: body.accountId,
        fromNumber: normalizePhone(body.fromNumber),
        toNumber: normalizePhone(body.toNumber),
        status: "STARTED",
        providerCallId
      }
    });

    await app.publishEvent("call.outbound_requested", {
      callId: call.id,
      providerCallId,
      fromNumber: call.fromNumber,
      toNumber: call.toNumber
    });

    return { call, providerCallId };
  });

  app.post("/webhooks/telephony/call-status", {
    schema: {
      tags: ["Webhooks"],
      summary: "Telephony call-status webhook (Asterisk/FreeSWITCH)"
    }
  }, async (req: any, reply) => {
    const body = z.object({
      providerCallId: z.string(),
      status: z.enum(["STARTED","COMPLETED","MISSED","FAILED"]),
      durationSec: z.number().int().optional(),
      fromNumber: z.string().optional(),
      toNumber: z.string().optional()
    }).parse(req.body);

    const call = await app.prisma.callLog.update({
      where: { providerCallId: body.providerCallId },
      data: {
        status: body.status,
        durationSec: body.durationSec ?? 0,
        fromNumber: body.fromNumber ? normalizePhone(body.fromNumber) : undefined,
        toNumber: body.toNumber ? normalizePhone(body.toNumber) : undefined
      }
    });

    if (!call.accountId && call.fromNumber) {
      const contact = await app.prisma.contact.findFirst({
        where: { OR: [{ phone: call.fromNumber }, { whatsapp: call.fromNumber }] },
        include: { account: true }
      });

      if (contact?.accountId) {
        await app.prisma.callLog.update({ where: { id: call.id }, data: { accountId: contact.accountId } });
      } else {
        const lead = await app.prisma.lead.create({
          data: {
            source: "MANUAL",
            channel: "phone",
            tags: ["unknown_caller"],
            ownerId: null,
            lastTouchAt: new Date()
          }
        });
        await app.prisma.callLog.update({ where: { id: call.id }, data: { leadId: lead.id } });
      }
    }

    await app.publishEvent(`call.${body.status.toLowerCase()}`, { callId: call.id });

    if (body.status === "MISSED") {
      await app.prisma.activity.create({
        data: {
          leadId: call.leadId ?? undefined,
          opportunityId: call.opportunityId ?? undefined,
          type: "CALL",
          summary: "Missed call — return ASAP",
          dueAt: new Date(Date.now() + 15 * 60 * 1000)
        }
      });
    }

    return reply.code(200).send({ ok: true });
  });

  app.post("/webhooks/telephony/recording", {
    schema: {
      tags: ["Webhooks"],
      summary: "Telephony recording-ready webhook"
    }
  }, async (req: any) => {
    const body = z.object({
      providerCallId: z.string(),
      recordingUrl: z.string().url()
    }).parse(req.body);

    await app.prisma.callLog.update({
      where: { providerCallId: body.providerCallId },
      data: { recordingUrl: body.recordingUrl }
    });

    await app.publishEvent("call.recording_ready", { providerCallId: body.providerCallId });
    return { ok: true };
  });

  app.post("/webhooks/telephony/transcription", {
    schema: {
      tags: ["Webhooks"],
      summary: "Telephony transcription-ready webhook"
    }
  }, async (req: any) => {
    const body = z.object({
      providerCallId: z.string(),
      transcript: z.string(),
      summary: z.string().optional()
    }).parse(req.body);

    await app.prisma.callLog.update({
      where: { providerCallId: body.providerCallId },
      data: { transcript: body.transcript }
    });

    await app.publishEvent("call.transcribed", { providerCallId: body.providerCallId });
    return { ok: true };
  });

  /**
   * POST /v1/webhooks/whatsapp
   *
   * Accepts Twilio (application/x-www-form-urlencoded, fields: From, Body, ProfileName)
   * or Meta Cloud API JSON (entry[].changes[].value.messages).
   *
   * Signature validation — fail-closed:
   * - Twilio: HMAC-SHA1 via X-Twilio-Signature. Returns 503 if TWILIO_AUTH_TOKEN not configured.
   * - Meta:   HMAC-SHA256 via X-Hub-Signature-256. Returns 503 if META_APP_SECRET not configured.
   *
   * Finds or creates a Contact by phone number, creates an Activity of type WHATSAPP,
   * updates lead.lastTouchAt, and emits a whatsapp.received event.
   */
  app.post("/webhooks/whatsapp", {
    schema: {
      tags: ["Webhooks"],
      summary: "Inbound WhatsApp webhook — Twilio (form-urlencoded) or Meta Cloud API (JSON)"
    }
  }, async (req: any, reply) => {
    const contentType = req.headers["content-type"] ?? "";
    const isTwilioFormat = contentType.includes("application/x-www-form-urlencoded")
      || (typeof req.body?.["From"] === "string" && typeof req.body?.["Body"] === "string");

    let fromNumber: string;
    let messageBody: string;
    let profileName: string | undefined;

    if (isTwilioFormat) {
      if (!config.twilio.authToken) {
        return reply.code(503).send({ error: "TWILIO_AUTH_TOKEN not configured — webhook disabled" });
      }
      const twilioSig = req.headers["x-twilio-signature"] as string | undefined;
      if (!twilioSig) {
        return reply.code(401).send({ error: "Missing X-Twilio-Signature" });
      }
      const reqUrl = `https://${req.hostname}${req.url}`;
      const isValid = validateTwilioSignature(
        config.twilio.authToken,
        twilioSig,
        reqUrl,
        req.body as Record<string, string>
      );
      if (!isValid) {
        return reply.code(403).send({ error: "Invalid Twilio signature" });
      }

      const parsed = z.object({
        From: z.string(),
        Body: z.string(),
        ProfileName: z.string().optional()
      }).parse(req.body);

      fromNumber = normalizePhone(parsed.From.replace(/^whatsapp:/, ""));
      messageBody = parsed.Body;
      profileName = parsed.ProfileName;

    } else {
      const metaAppSecret = process.env.META_APP_SECRET;
      if (!metaAppSecret) {
        return reply.code(503).send({ error: "META_APP_SECRET not configured — webhook disabled" });
      }
      const metaSig = req.headers["x-hub-signature-256"] as string | undefined;
      if (!metaSig) {
        return reply.code(401).send({ error: "Missing X-Hub-Signature-256" });
      }
      const rawBodyStr = req.rawBody ?? JSON.stringify(req.body);
      const isValid = validateMetaSignature(metaAppSecret, metaSig, rawBodyStr);
      if (!isValid) {
        return reply.code(403).send({ error: "Invalid Meta signature" });
      }

      const parsed = z.object({
        entry: z.array(z.object({
          changes: z.array(z.object({
            value: z.object({
              messages: z.array(z.object({
                from: z.string(),
                text: z.object({ body: z.string() }).optional(),
                type: z.string()
              })).optional(),
              contacts: z.array(z.object({
                profile: z.object({ name: z.string() }).optional()
              })).optional()
            })
          }))
        }))
      }).safeParse(req.body);

      if (!parsed.success) {
        return reply.code(400).send({ error: "Unrecognized WhatsApp payload format" });
      }

      const firstMessage = parsed.data.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      if (!firstMessage) {
        return reply.code(200).send({ ok: true, note: "No messages in payload" });
      }

      fromNumber = normalizePhone(firstMessage.from);
      messageBody = firstMessage.text?.body ?? `[${firstMessage.type} message]`;
      profileName = parsed.data.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name;
    }

    let contact = await app.prisma.contact.findFirst({
      where: { OR: [{ phone: fromNumber }, { whatsapp: fromNumber }] }
    });

    if (!contact) {
      contact = await app.prisma.contact.create({
        data: {
          name: profileName ?? fromNumber,
          whatsapp: fromNumber,
          phone: fromNumber
        }
      });
    }

    const existingLead = await app.prisma.lead.findFirst({
      where: { contactId: contact.id, archived: false }
    });

    const activity = await app.prisma.activity.create({
      data: {
        leadId: existingLead?.id ?? undefined,
        type: "WHATSAPP",
        summary: messageBody
      }
    });

    if (existingLead) {
      await app.prisma.lead.update({
        where: { id: existingLead.id },
        data: { lastTouchAt: new Date() }
      });
    }

    await app.publishEvent("whatsapp.received", {
      activityId: activity.id,
      contactId: contact.id,
      fromNumber,
      message: messageBody
    });

    return reply.code(200).send({ ok: true, activityId: activity.id, contactId: contact.id });
  });
};
