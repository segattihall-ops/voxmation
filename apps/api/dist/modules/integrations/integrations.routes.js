"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integrationsRoutes = void 0;
const zod_1 = require("zod");
const integrationsRoutes = async (app) => {
    app.post("/webhooks/register", { preHandler: app.requireRole(["ADMIN"]) }, async (req) => {
        const body = zod_1.z.object({
            name: zod_1.z.string(),
            url: zod_1.z.string().url(),
            secret: zod_1.z.string().min(16),
            eventName: zod_1.z.string()
        }).parse(req.body);
        return app.prisma.webhookSubscription.create({ data: body });
    });
    app.get("/execution-logs", { preHandler: app.requireRole(["ADMIN"]) }, async () => {
        return app.prisma.executionLog.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    });
    app.get("/events", { preHandler: app.requireRole(["ADMIN"]) }, async () => {
        return app.prisma.event.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    });
};
exports.integrationsRoutes = integrationsRoutes;
