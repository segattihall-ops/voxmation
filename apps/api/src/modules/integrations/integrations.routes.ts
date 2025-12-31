import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

export const integrationsRoutes: FastifyPluginAsync = async (app) => {
  app.post("/webhooks/register", { preHandler: app.requireRole(["ADMIN"]) }, async (req: any) => {
    const body = z.object({
      name: z.string(),
      url: z.string().url(),
      secret: z.string().min(16),
      eventName: z.string()
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
