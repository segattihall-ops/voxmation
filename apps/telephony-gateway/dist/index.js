"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Telephony Gateway (ARI Skeleton)
 * هدف: conectar Asterisk ARI -> Voxmation OS via webhooks
 *
 * Este é um esqueleto pronto para você completar com:
 * - conexão ARI (WebSocket/HTTP)
 * - originate de chamadas via ARI
 * - postagem de eventos no Voxmation OS
 *
 * Por padrão, ele expõe:
 *  - POST /originate  { providerCallId, from, to }
 * E você pode, dentro desse handler, chamar o ARI originate.
 */
const fastify_1 = __importDefault(require("fastify"));
const zod_1 = require("zod");
const app = (0, fastify_1.default)({ logger: true });
const VOXMATION_OS_EVENTS_URL = process.env.VOXMATION_OS_EVENTS_URL || "https://YOUR-REPL.repl.co/v1/webhooks/telephony/call-status";
app.get("/health", async () => ({ ok: true }));
app.post("/originate", async (req, reply) => {
    const body = zod_1.z.object({
        providerCallId: zod_1.z.string(),
        fromNumber: zod_1.z.string(),
        toNumber: zod_1.z.string()
    }).parse(req.body);
    // TODO: ARI originate aqui.
    // Depois que originar, você pode notificar STARTED no OS:
    await fetch(VOXMATION_OS_EVENTS_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            providerCallId: body.providerCallId,
            status: "STARTED",
            fromNumber: body.fromNumber,
            toNumber: body.toNumber
        })
    });
    return reply.code(202).send({ accepted: true });
});
app.listen({ port: Number(process.env.PORT || 4100), host: "0.0.0.0" }).catch((err) => {
    app.log.error(err);
    process.exit(1);
});
