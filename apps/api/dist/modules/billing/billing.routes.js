"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingRoutes = void 0;
const zod_1 = require("zod");
const billingRoutes = async (app) => {
    app.post("/plans", { preHandler: app.requireRole(["ADMIN", "FINANCE"]) }, async (req) => {
        const body = zod_1.z.object({
            name: zod_1.z.string().min(1),
            priceCents: zod_1.z.number().int().positive(),
            interval: zod_1.z.enum(["monthly", "annual"])
        }).parse(req.body);
        const plan = await app.prisma.plan.create({ data: body });
        await app.publishEvent("plan.created", { planId: plan.id });
        return plan;
    });
    app.post("/invoices", { preHandler: app.requireRole(["ADMIN", "FINANCE"]) }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string(),
            planId: zod_1.z.string().optional(),
            amountCents: zod_1.z.number().int().positive(),
            dueAt: zod_1.z.string().datetime().optional()
        }).parse(req.body);
        const invoice = await app.prisma.invoice.create({
            data: {
                accountId: body.accountId,
                planId: body.planId,
                amountCents: body.amountCents,
                dueAt: body.dueAt ? new Date(body.dueAt) : undefined,
                status: "PENDING"
            }
        });
        await app.publishEvent("invoice.created", { invoiceId: invoice.id, accountId: invoice.accountId });
        return invoice;
    });
    app.get("/plans", { preHandler: app.requireRole(["ADMIN", "FINANCE", "SALES", "READONLY"]) }, async () => {
        return app.prisma.plan.findMany({ orderBy: { createdAt: "desc" } });
    });
    app.get("/invoices", { preHandler: app.requireRole(["ADMIN", "FINANCE", "READONLY"]) }, async () => {
        return app.prisma.invoice.findMany({
            orderBy: { createdAt: "desc" },
            take: 100,
            include: { account: { select: { name: true } }, plan: { select: { name: true } } }
        });
    });
    app.post("/webhooks/payments", async (req) => {
        const body = zod_1.z.object({
            invoiceId: zod_1.z.string(),
            status: zod_1.z.enum(["PAID", "FAILED"])
        }).parse(req.body);
        const invoice = await app.prisma.invoice.update({
            where: { id: body.invoiceId },
            data: {
                status: body.status === "PAID" ? "PAID" : "OVERDUE",
                paidAt: body.status === "PAID" ? new Date() : null
            }
        });
        await app.publishEvent(body.status === "PAID" ? "invoice.paid" : "invoice.payment_failed", {
            invoiceId: invoice.id,
            accountId: invoice.accountId
        });
        return { ok: true };
    });
};
exports.billingRoutes = billingRoutes;
