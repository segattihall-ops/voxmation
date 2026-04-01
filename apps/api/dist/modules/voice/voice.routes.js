"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voiceRoutes = void 0;
const zod_1 = require("zod");
const crypto_1 = __importDefault(require("crypto"));
function normalizePhone(s) {
    return s.replace(/[^0-9+]/g, "");
}
const voiceRoutes = async (app) => {
    // Outbound: OS pede para a camada de telefonia (Asterisk Gateway) originar uma chamada.
    // MVP: apenas cria CallLog e emite evento "call.outbound_requested".
    app.post("/calls/outbound", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req) => {
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
    // Webhook: status updates vindos do Asterisk/FreeSWITCH.
    app.post("/webhooks/telephony/call-status", async (req, reply) => {
        const body = zod_1.z.object({
            providerCallId: zod_1.z.string(),
            status: zod_1.z.enum(["STARTED", "COMPLETED", "MISSED", "FAILED"]),
            durationSec: zod_1.z.number().int().optional(),
            fromNumber: zod_1.z.string().optional(),
            toNumber: zod_1.z.string().optional()
        }).parse(req.body);
        // Atualiza o CallLog
        const call = await app.prisma.callLog.update({
            where: { providerCallId: body.providerCallId },
            data: {
                status: body.status,
                durationSec: body.durationSec ?? 0,
                fromNumber: body.fromNumber ? normalizePhone(body.fromNumber) : undefined,
                toNumber: body.toNumber ? normalizePhone(body.toNumber) : undefined
            }
        });
        // Auto-link por número: tenta identificar o Account/Contact/Lead se não estiver vinculado.
        if (!call.accountId && call.fromNumber) {
            const contact = await app.prisma.contact.findFirst({
                where: { OR: [{ phone: call.fromNumber }, { whatsapp: call.fromNumber }] },
                include: { account: true }
            });
            if (contact?.accountId) {
                await app.prisma.callLog.update({ where: { id: call.id }, data: { accountId: contact.accountId } });
            }
            else {
                // cria Lead "Unknown Caller" (mínimo)
                const lead = await app.prisma.lead.create({
                    data: {
                        source: "inbound_call",
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
        // Missed call -> cria Activity de retorno
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
    // Webhook: recording ready
    app.post("/webhooks/telephony/recording", async (req) => {
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
    // Webhook: transcription ready
    app.post("/webhooks/telephony/transcription", async (req) => {
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
};
exports.voiceRoutes = voiceRoutes;
