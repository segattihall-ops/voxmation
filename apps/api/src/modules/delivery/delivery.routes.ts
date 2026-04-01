import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

export const deliveryRoutes: FastifyPluginAsync = async (app) => {
  app.post("/service-catalog", { preHandler: app.requireRole(["ADMIN","DELIVERY"]) }, async (req: any) => {
    const body = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      template: z.any().default({})
    }).parse(req.body);

    const sc = await app.prisma.serviceCatalog.create({ data: { ...body, template: body.template ?? {} } });
    await app.publishEvent("service_catalog.created", { id: sc.id });
    return sc;
  });

  app.post("/service-instances", { preHandler: app.requireRole(["ADMIN","DELIVERY"]) }, async (req: any) => {
    const body = z.object({
      accountId: z.string(),
      serviceCatalogId: z.string(),
      projectName: z.string().min(1)
    }).parse(req.body);

    const instance = await app.prisma.serviceInstance.create({
      data: {
        accountId: body.accountId,
        serviceCatalogId: body.serviceCatalogId,
        project: { create: { accountId: body.accountId, name: body.projectName } }
      },
      include: { project: true }
    });

    const catalog = await app.prisma.serviceCatalog.findUnique({ where: { id: body.serviceCatalogId } });
    const tasks = ((catalog?.template as unknown as { tasks?: Array<{ title: string; dueDays?: number }> })?.tasks ?? []) as Array<{ title: string; dueDays?: number }>;

    if (instance.project) {
      for (const t of tasks) {
        await app.prisma.task.create({
          data: {
            projectId: instance.project.id,
            title: t.title,
            dueAt: t.dueDays ? new Date(Date.now() + t.dueDays * 86400000) : undefined
          }
        });
      }
    }

    await app.publishEvent("delivery.started", { serviceInstanceId: instance.id, projectId: instance.project?.id });
    return instance;
  });
};
