"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationsRoutes = void 0;
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
/**
 * Validate Meta X-Hub-Signature-256 header.
 * Meta computes: sha256=<HMAC-SHA256(appSecret, rawBody)>
 */
function validateMetaSignature(appSecret, signature, rawBody) {
    if (!signature.startsWith("sha256="))
        return false;
    const expected = "sha256=" + crypto_1.default
        .createHmac("sha256", appSecret)
        .update(rawBody, "utf8")
        .digest("hex");
    try {
        return crypto_1.default.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
    }
    catch {
        return false;
    }
}
const integrationsRoutes = async (app) => {
    app.post("/webhooks/register", {
        schema: {
            tags: ["Integrations"],
            summary: "Register a webhook subscription",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN"])
    }, async (req) => {
        const body = zod_1.z.object({
            name: zod_1.z.string(),
            url: zod_1.z.string().url(),
            secret: zod_1.z.string().min(16),
            eventName: zod_1.z.string()
        }).parse(req.body);
        return app.prisma.webhookSubscription.create({ data: body });
    });
    app.get("/execution-logs", {
        schema: {
            tags: ["Integrations"],
            summary: "List execution logs",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN"])
    }, async () => {
        return app.prisma.executionLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    });
    app.get("/events", {
        schema: {
            tags: ["Integrations"],
            summary: "List platform events",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN"])
    }, async () => {
        return app.prisma.event.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    });
    /**
     * GET /v1/webhooks/meta-leads
     * Meta sends a GET request to verify the webhook endpoint (hub.challenge).
     */
    app.get("/webhooks/meta-leads", {
        schema: {
            tags: ["Webhooks"],
            summary: "Meta Lead Ads webhook verification (GET hub.challenge)"
        }
    }, async (req, reply) => {
        const query = req.query;
        const mode = query["hub.mode"];
        const token = query["hub.verify_token"];
        const challenge = query["hub.challenge"];
        const verifyToken = process.env.META_VERIFY_TOKEN ?? "voxmation-meta-verify";
        if (mode === "subscribe" && token === verifyToken) {
            return reply.code(200).send(challenge);
        }
        return reply.code(403).send({ error: "Forbidden" });
    });
    /**
     * POST /v1/webhooks/meta-leads
     * Accepts Meta Lead Ads webhook payloads and auto-creates a Contact + Lead.
     * Validates X-Hub-Signature-256 when META_APP_SECRET is configured.
     */
    app.post("/webhooks/meta-leads", {
        schema: {
            tags: ["Webhooks"],
            summary: "Meta Lead Ads inbound webhook — auto-creates Contact and Lead (signature-validated)"
        }
    }, async (req, reply) => {
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
        const bodySchema = zod_1.z.object({
            object: zod_1.z.string().optional(),
            entry: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string().optional(),
                changes: zod_1.z.array(zod_1.z.object({
                    value: zod_1.z.object({
                        form_id: zod_1.z.string().optional(),
                        ad_id: zod_1.z.string().optional(),
                        ad_name: zod_1.z.string().optional(),
                        campaign_id: zod_1.z.string().optional(),
                        campaign_name: zod_1.z.string().optional(),
                        page_id: zod_1.z.string().optional(),
                        leadgen_id: zod_1.z.string().optional(),
                        field_data: zod_1.z.array(zod_1.z.object({
                            name: zod_1.z.string(),
                            values: zod_1.z.array(zod_1.z.string())
                        })).optional()
                    }),
                    field: zod_1.z.string().optional()
                }))
            }))
        }).safeParse(req.body);
        if (!bodySchema.success) {
            return reply.code(400).send({ error: "Invalid Meta webhook payload" });
        }
        const data = bodySchema.data;
        const results = [];
        for (const entry of data.entry) {
            for (const change of entry.changes) {
                const value = change.value;
                const fieldData = value.field_data ?? [];
                const fieldMap = {};
                for (const field of fieldData) {
                    fieldMap[field.name] = field.values[0] ?? "";
                }
                const email = fieldMap["email"] ?? fieldMap["EMAIL"] ?? undefined;
                const phone = fieldMap["phone_number"] ?? fieldMap["phone"] ?? fieldMap["PHONE"] ?? undefined;
                const fullName = fieldMap["full_name"] ?? fieldMap["name"] ?? fieldMap["NAME"] ?? "Meta Lead";
                const campaignName = value.campaign_name ?? value.ad_name ?? "META_ADS";
                let contact = null;
                if (email) {
                    contact = await app.prisma.contact.findFirst({
                        where: { email: email.toLowerCase().trim() }
                    });
                }
                if (!contact && phone) {
                    const normalizedPhone = phone.replace(/[^0-9+]/g, "");
                    contact = await app.prisma.contact.findFirst({
                        where: { OR: [{ phone: normalizedPhone }, { whatsapp: normalizedPhone }] }
                    });
                }
                if (!contact) {
                    contact = await app.prisma.contact.create({
                        data: {
                            name: fullName,
                            email: email ? email.toLowerCase().trim() : undefined,
                            phone: phone ? phone.replace(/[^0-9+]/g, "") : undefined
                        }
                    });
                }
                const lead = await app.prisma.lead.create({
                    data: {
                        contactId: contact.id,
                        source: "META_ADS",
                        channel: campaignName,
                        tags: ["meta_ads", ...(value.campaign_id ? [`campaign_${value.campaign_id}`] : [])],
                        lastTouchAt: new Date()
                    }
                });
                await app.publishEvent("lead.created", {
                    leadId: lead.id,
                    source: "META_ADS",
                    channel: campaignName,
                    contactId: contact.id
                });
                results.push({ contactId: contact.id, leadId: lead.id });
            }
        }
        return reply.code(200).send({ ok: true, created: results });
    });
};
exports.integrationsRoutes = integrationsRoutes;
