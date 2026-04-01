"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceRoutes = void 0;
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
function normalizePhone(s) {
    return s.replace(/[^0-9+]/g, "");
}
function validateTwilioSignature(authToken, signature, url, params) {
    const sortedKeys = Object.keys(params).sort();
    const paramString = sortedKeys.reduce((acc, key) => acc + key + params[key], "");
    const expected = crypto_1.default.createHmac("sha1", authToken).update(url + paramString).digest("base64");
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    }
    catch {
        return false;
    }
}
function validateMetaSignature(appSecret, signature, rawBody) {
    if (!signature.startsWith("sha256="))
        return false;
    const expected = "sha256=" + crypto_1.default.createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    }
    catch {
        return false;
    }
}
const voiceRoutes = async (app) => {
    app.post("/calls/outbound", {
        schema: {
            tags: ["Voice"],
            summary: "Request an outbound call",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req) => {
        const body = zod_1.z.object({
            fromNumber: zod_1.z.string(),
            toNumber: zod_1.z.string(),
            leadId: zod_1.z.string().optional(),
            opportunityId: zod_1.z.string().optional(),
            accountId: zod_1.z.string().optional()
        }).parse(req.body);
        const providerCallId = crypto_1.default.randomUUID();
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
    }, async (req, reply) => {
        const body = zod_1.z.object({
            providerCallId: zod_1.z.string(),
            status: zod_1.z.enum(["STARTED", "COMPLETED", "MISSED", "FAILED"]),
            durationSec: zod_1.z.number().int().optional(),
            fromNumber: zod_1.z.string().optional(),
            toNumber: zod_1.z.string().optional()
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
            }
            else {
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
    }, async (req) => {
        const body = zod_1.z.object({
            providerCallId: zod_1.z.string(),
            recordingUrl: zod_1.z.string().url()
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
    }, async (req) => {
        const body = zod_1.z.object({
            providerCallId: zod_1.z.string(),
            transcript: zod_1.z.string(),
            summary: zod_1.z.string().optional()
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
     * Signature validation:
     * - Twilio: HMAC-SHA1 via X-Twilio-Signature. Required in production or when TWILIO_AUTH_TOKEN is set.
     * - Meta:   HMAC-SHA256 via X-Hub-Signature-256. Required in production or when META_APP_SECRET is set.
     *
     * Finds or creates a Contact by phone number, creates an Activity of type WHATSAPP,
     * updates lead.lastTouchAt, and emits a whatsapp.received event.
     */
    app.post("/webhooks/whatsapp", {
        schema: {
            tags: ["Webhooks"],
            summary: "Inbound WhatsApp webhook — Twilio (form-urlencoded) or Meta Cloud API (JSON)"
        }
    }, async (req, reply) => {
        const contentType = req.headers["content-type"] ?? "";
        const isTwilioFormat = contentType.includes("application/x-www-form-urlencoded")
            || (typeof req.body?.["From"] === "string" && typeof req.body?.["Body"] === "string");
        let fromNumber;
        let messageBody;
        let profileName;
        if (isTwilioFormat) {
            if (!config_1.config.twilio.authToken) {
                return reply.code(503).send({ error: "TWILIO_AUTH_TOKEN not configured — webhook disabled" });
            }
            const twilioSig = req.headers["x-twilio-signature"];
            if (!twilioSig) {
                return reply.code(401).send({ error: "Missing X-Twilio-Signature" });
            }
            const reqUrl = `https://${req.hostname}${req.url}`;
            const isValid = validateTwilioSignature(config_1.config.twilio.authToken, twilioSig, reqUrl, req.body);
            if (!isValid) {
                return reply.code(403).send({ error: "Invalid Twilio signature" });
            }
            const parsed = zod_1.z.object({
                From: zod_1.z.string(),
                Body: zod_1.z.string(),
                ProfileName: zod_1.z.string().optional()
            }).parse(req.body);
            fromNumber = normalizePhone(parsed.From.replace(/^whatsapp:/, ""));
            messageBody = parsed.Body;
            profileName = parsed.ProfileName;
        }
        else {
            const metaAppSecret = process.env.META_APP_SECRET;
            if (!metaAppSecret) {
                return reply.code(503).send({ error: "META_APP_SECRET not configured — webhook disabled" });
            }
            const metaSig = req.headers["x-hub-signature-256"];
            if (!metaSig) {
                return reply.code(401).send({ error: "Missing X-Hub-Signature-256" });
            }
            const rawBodyStr = req.rawBody ?? JSON.stringify(req.body);
            const isValid = validateMetaSignature(metaAppSecret, metaSig, rawBodyStr);
            if (!isValid) {
                return reply.code(403).send({ error: "Invalid Meta signature" });
            }
            const parsed = zod_1.z.object({
                entry: zod_1.z.array(zod_1.z.object({
                    changes: zod_1.z.array(zod_1.z.object({
                        value: zod_1.z.object({
                            messages: zod_1.z.array(zod_1.z.object({
                                from: zod_1.z.string(),
                                text: zod_1.z.object({ body: zod_1.z.string() }).optional(),
                                type: zod_1.z.string()
                            })).optional(),
                            contacts: zod_1.z.array(zod_1.z.object({
                                profile: zod_1.z.object({ name: zod_1.z.string() }).optional()
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
exports.voiceRoutes = voiceRoutes;
