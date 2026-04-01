import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

function normalizePhone(s: string) {
  return s.replace(/[^0-9+]/g, "");
}

export const crmRoutes: FastifyPluginAsync = async (app) => {
  // Accounts
  app.post("/accounts", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any) => {
    const body = z.object({
      name: z.string().min(1),
      domain: z.string().optional(),
      industry: z.string().optional(),
      size: z.string().optional(),
      notes: z.string().optional()
    }).parse(req.body);

    const acc = await app.prisma.account.create({ data: body });
    await app.audit({ actorId: req.user.sub, action: "CREATE", entity: "Account", entityId: acc.id, after: acc });
    return acc;
  });

  app.get("/accounts", { preHandler: app.requireRole(["ADMIN","SALES","READONLY"]) }, async () => {
    return app.prisma.account.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  });

  app.get("/contacts", { preHandler: app.requireRole(["ADMIN","SALES","READONLY"]) }, async () => {
    return app.prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { account: { select: { name: true } } }
    });
  });

  app.get("/opportunities", { preHandler: app.requireRole(["ADMIN","SALES","READONLY"]) }, async () => {
    return app.prisma.opportunity.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { account: { select: { name: true } } }
    });
  });

  // Contacts
  app.post("/contacts", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any) => {
    const body = z.object({
      accountId: z.string().optional(),
      name: z.string().min(1),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
      title: z.string().optional()
    }).parse(req.body);

    const c = await app.prisma.contact.create({
      data: {
        ...body,
        phone: body.phone ? normalizePhone(body.phone) : undefined,
        whatsapp: body.whatsapp ? normalizePhone(body.whatsapp) : undefined
      }
    });

    await app.audit({ actorId: req.user.sub, action: "CREATE", entity: "Contact", entityId: c.id, after: c });
    return c;
  });

  // Leads
  app.post("/leads", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any) => {
    const body = z.object({
      accountId: z.string().optional(),
      contactId: z.string().optional(),
      source: z.string().optional(),
      channel: z.string().optional(),
      tags: z.array(z.string()).optional(),
      nextAction: z.string().datetime().optional()
    }).parse(req.body);

    const lead = await app.prisma.lead.create({
      data: {
        ...body,
        tags: body.tags ?? [],
        ownerId: req.user.sub,
        nextAction: body.nextAction ? new Date(body.nextAction) : undefined
      }
    });

    await app.audit({ actorId: req.user.sub, action: "CREATE", entity: "Lead", entityId: lead.id, after: lead });
    await app.publishEvent("lead.created", { leadId: lead.id });

    return lead;
  });

  app.get("/leads", { preHandler: app.requireRole(["ADMIN","SALES","READONLY"]) }, async (req: any) => {
    const status = req.query.status as string | undefined;
    return app.prisma.lead.findMany({
      where: status ? { status: status as any } : {},
      orderBy: { createdAt: "desc" },
      take: 50
    });
  });

  app.put("/leads/:id/status", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any, reply) => {
    const id = req.params.id as string;
    const body = z.object({ status: z.enum(["NEW","QUALIFYING","MEETING","PROPOSAL","NEGOTIATION","WON","LOST"]) }).parse(req.body);

    const before = await app.prisma.lead.findUnique({ where: { id } });
    if (!before) return reply.code(404).send({ error: "Not found" });

    const after = await app.prisma.lead.update({ where: { id }, data: { status: body.status } });

    await app.audit({ actorId: req.user.sub, action: "UPDATE_STATUS", entity: "Lead", entityId: id, before, after });
    await app.publishEvent("lead.status_changed", { leadId: id, from: before.status, to: after.status });

    return after;
  });

  // Opportunities (Deals)
  app.post("/opportunities", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any) => {
    const body = z.object({
      accountId: z.string(),
      name: z.string().min(1),
      amountCents: z.number().int().nonnegative().optional(),
      probability: z.number().int().min(0).max(100).optional()
    }).parse(req.body);

    const opp = await app.prisma.opportunity.create({
      data: {
        ...body,
        amountCents: body.amountCents ?? 0,
        probability: body.probability ?? 0,
        ownerId: req.user.sub
      }
    });

    await app.audit({ actorId: req.user.sub, action: "CREATE", entity: "Opportunity", entityId: opp.id, after: opp });
    await app.publishEvent("opportunity.created", { opportunityId: opp.id });

    return opp;
  });

  app.put("/opportunities/:id/stage", { preHandler: app.requireRole(["ADMIN","SALES"]) }, async (req: any, reply) => {
    const id = req.params.id as string;
    const body = z.object({ stage: z.enum(["NEW","QUALIFYING","MEETING","PROPOSAL","NEGOTIATION","WON","LOST"]) }).parse(req.body);

    const before = await app.prisma.opportunity.findUnique({ where: { id } });
    if (!before) return reply.code(404).send({ error: "Not found" });

    const after = await app.prisma.opportunity.update({ where: { id }, data: { stage: body.stage } });

    await app.audit({ actorId: req.user.sub, action: "UPDATE_STAGE", entity: "Opportunity", entityId: id, before, after });
    await app.publishEvent("opportunity.stage_changed", { opportunityId: id, from: before.stage, to: after.stage });

    return after;
  });

  // Activity
  app.post("/activities", { preHandler: app.requireRole(["ADMIN","SALES","DELIVERY","SUPPORT"]) }, async (req: any) => {
    const body = z.object({
      leadId: z.string().optional(),
      opportunityId: z.string().optional(),
      type: z.enum(["CALL","EMAIL","WHATSAPP","MEETING","NOTE"]),
      summary: z.string().min(1),
      dueAt: z.string().datetime().optional()
    }).parse(req.body);

    const act = await app.prisma.activity.create({
      data: { ...body, dueAt: body.dueAt ? new Date(body.dueAt) : undefined }
    });

    await app.publishEvent("activity.created", { activityId: act.id });
    return act;
  });
};
