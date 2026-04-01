"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const crypto_1 = __importDefault(require("crypto"));
const plugin = async (app) => {
    app.decorate("publishEvent", async (name, payload) => {
        await app.prisma.event.create({ data: { name, payload } });
        const subs = await app.prisma.webhookSubscription.findMany({
            where: { eventName: name, isEnabled: true }
        });
        for (const s of subs) {
            const body = JSON.stringify({ name, payload, ts: Date.now() });
            const sig = crypto_1.default.createHmac("sha256", s.secret).update(body).digest("hex");
            const requestId = crypto_1.default.randomUUID();
            try {
                const res = await fetch(s.url, {
                    method: "POST",
                    headers: { "content-type": "application/json", "x-vox-signature": sig },
                    body
                });
                await app.prisma.executionLog.create({
                    data: { target: s.url, status: String(res.status), requestId, payload: { name, payload } }
                });
            }
            catch (e) {
                await app.prisma.executionLog.create({
                    data: { target: s.url, status: "ERROR", requestId, payload: { name, payload, error: e?.message ?? "unknown" } }
                });
            }
        }
    });
};
exports.eventsPlugin = (0, fastify_plugin_1.default)(plugin);
