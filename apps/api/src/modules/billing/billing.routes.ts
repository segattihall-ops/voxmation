import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

export const billingRoutes: FastifyPluginAsync = async (app) => {
  app.post("/plans", { preHandler: app.requireRole(["ADMIN","FINANCE"]) }, async (req: any) => {
    const body = z.object({
      name: z.string().min(1),
      priceCents: z.number().int().positive(),
      interval: z.enum(["monthly","annual"])
    }).parse(req.body);

    const plan = await app.prisma.plan.create({ data: body });
    await app.publishEvent("plan.created", { planId: plan.id });
    return plan;
  });

  app.post("/invoices", { preHandler: app.requireRole(["ADMIN","FINANCE"]) }, async (req: any) => {
    const body = z.object({
      accountId: z.string(),
      planId: z.string().optional(),
      amountCents: z.number().int().positive(),
      dueAt: z.string().datetime().optional()
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

  app.post("/webhooks/payments", async (req: any) => {
    const body = z.object({
      invoiceId: z.string(),
      status: z.enum(["PAID","FAILED"])
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
