"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryRoutes = void 0;
const zod_1 = require("zod");
const deliveryRoutes = async (app) => {
    app.post("/service-catalog", { preHandler: app.requireRole(["ADMIN", "DELIVERY"]) }, async (req) => {
        const body = zod_1.z.object({
            name: zod_1.z.string().min(1),
            description: zod_1.z.string().optional(),
            template: zod_1.z.any()
        }).parse(req.body);
        const sc = await app.prisma.serviceCatalog.create({ data: body });
        await app.publishEvent("service_catalog.created", { id: sc.id });
        return sc;
    });
    app.post("/service-instances", { preHandler: app.requireRole(["ADMIN", "DELIVERY"]) }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string(),
            serviceCatalogId: zod_1.z.string(),
            projectName: zod_1.z.string().min(1)
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
        const tasks = (catalog?.template?.tasks ?? []);
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
exports.deliveryRoutes = deliveryRoutes;
