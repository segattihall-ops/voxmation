import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

function normalizePhone(s: string) {
  return s.replace(/[^0-9+]/g, "");
}

function normalizeEmail(s: string) {
  return s.trim().toLowerCase();
}

const STAGE_WEIGHTS: Record<string, number> = {
  NEW: 10,
  QUALIFYING: 20,
  MEETING: 40,
  PROPOSAL: 60,
  NEGOTIATION: 80,
  WON: 100,
  LOST: 0
};

export const crmRoutes: FastifyPluginAsync = async (app) => {
  // Accounts

  app.post("/accounts", {
    schema: {
      tags: ["Accounts"],
      summary: "Create an account",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any) => {
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

  app.get("/accounts", {
    schema: {
      tags: ["Accounts"],
      summary: "List accounts",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES","READONLY"])
  }, async () => {
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

  /**
   * GET /v1/accounts/:id/360
   * Customer 360: unified timeline of all interactions for an account
   */
  app.get("/accounts/:id/360", {
    schema: {
      tags: ["Accounts"],
      summary: "Customer 360 — unified timeline for an account",
      security: [{ bearerAuth: [] }],
      params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }
    },
    preHandler: app.requireRole(["ADMIN","SALES","READONLY"])
  }, async (req: any, reply) => {
    const id = req.params.id as string;

    const account = await app.prisma.account.findUnique({ where: { id } });
    if (!account) return reply.code(404).send({ error: "Account not found" });

    const [leads, opportunities, contacts, calls, activities, invoices, cases, serviceInstances] = await Promise.all([
      app.prisma.lead.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.opportunity.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.contact.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.callLog.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.activity.findMany({
        where: {
          OR: [
            { lead: { accountId: id } },
            { opportunity: { accountId: id } }
          ]
        },
        orderBy: { createdAt: "desc" }
      }),
      app.prisma.invoice.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.case.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
      app.prisma.serviceInstance.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } })
    ]);

    const timeline: Array<{ type: string; date: Date; summary: string; entityId: string }> = [];

    for (const l of leads) {
      timeline.push({ type: "Lead", date: l.createdAt, summary: `Lead created — status: ${l.status}, source: ${l.source}`, entityId: l.id });
    }
    for (const o of opportunities) {
      timeline.push({ type: "Opportunity", date: o.createdAt, summary: `Opportunity: ${o.name} — stage: ${o.stage}`, entityId: o.id });
    }
    for (const c of contacts) {
      timeline.push({ type: "Contact", date: c.createdAt, summary: `Contact: ${c.name}${c.email ? ` (${c.email})` : ""}`, entityId: c.id });
    }
    for (const c of calls) {
      timeline.push({ type: "CallLog", date: c.createdAt, summary: `Call ${c.status} from ${c.fromNumber} to ${c.toNumber}`, entityId: c.id });
    }
    for (const a of activities) {
      timeline.push({ type: "Activity", date: a.createdAt, summary: `[${a.type}] ${a.summary}`, entityId: a.id });
    }
    for (const inv of invoices) {
      timeline.push({ type: "Invoice", date: inv.createdAt, summary: `Invoice ${inv.status} — $${(inv.amountCents / 100).toFixed(2)}`, entityId: inv.id });
    }
    for (const cs of cases) {
      timeline.push({ type: "Case", date: cs.createdAt, summary: `Case: ${cs.title} — ${cs.status} [${cs.priority}]`, entityId: cs.id });
    }
    for (const si of serviceInstances) {
      timeline.push({ type: "ServiceInstance", date: si.createdAt, summary: `Service instance — status: ${si.status}`, entityId: si.id });
    }

    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

    return { account, timeline };
  });

  /**
   * GET /v1/accounts/:id/timeline
   * Reverse-chronological unified feed across all entity types
   */
  app.get("/accounts/:id/timeline", {
    schema: {
      tags: ["Accounts"],
      summary: "Unified reverse-chronological timeline for an account",
      security: [{ bearerAuth: [] }],
      params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }
    },
    preHandler: app.requireRole(["ADMIN","SALES","READONLY","SUPPORT"])
  }, async (req: any, reply) => {
    const id = req.params.id as string;

    const account = await app.prisma.account.findUnique({ where: { id } });
    if (!account) return reply.code(404).send({ error: "Account not found" });

    const [calls, activities, invoices, cases, leads, opportunities] = await Promise.all([
      app.prisma.callLog.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 100 }),
      app.prisma.activity.findMany({
        where: {
          OR: [
            { lead: { accountId: id } },
            { opportunity: { accountId: id } }
          ]
        },
        orderBy: { createdAt: "desc" },
        take: 100
      }),
      app.prisma.invoice.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
      app.prisma.case.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
      app.prisma.lead.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
      app.prisma.opportunity.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 })
    ]);

    const feed: Array<{ type: string; date: Date; summary: string; entityId: string }> = [];

    for (const c of calls) {
      feed.push({ type: "CallLog", date: c.createdAt, summary: `Call ${c.status} from ${c.fromNumber} to ${c.toNumber}`, entityId: c.id });
    }
    for (const a of activities) {
      feed.push({ type: "Activity", date: a.createdAt, summary: `[${a.type}] ${a.summary}`, entityId: a.id });
    }
    for (const inv of invoices) {
      feed.push({ type: "Invoice", date: inv.createdAt, summary: `Invoice ${inv.status} — $${(inv.amountCents / 100).toFixed(2)}`, entityId: inv.id });
    }
    for (const cs of cases) {
      feed.push({ type: "Case", date: cs.createdAt, summary: `Case: ${cs.title} — ${cs.status} [${cs.priority}]`, entityId: cs.id });
    }
    for (const l of leads) {
      feed.push({ type: "Lead", date: l.createdAt, summary: `Lead created — status: ${l.status}`, entityId: l.id });
    }
    for (const o of opportunities) {
      feed.push({ type: "Opportunity", date: o.createdAt, summary: `Opportunity: ${o.name} — stage: ${o.stage}`, entityId: o.id });
    }

    feed.sort((a, b) => b.date.getTime() - a.date.getTime());

    return { accountId: id, feed };
  });

  // Contacts

  app.post("/contacts", {
    schema: {
      tags: ["Contacts"],
      summary: "Create a contact",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any) => {
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

  /**
   * POST /v1/contacts/dedup
   * ADMIN only. Accepts an optional list of contact IDs to scope deduplication.
   * If no IDs provided, scans all non-archived contacts.
   *
   * Uses a union-find (disjoint-set) algorithm to compute connected duplicate
   * components across email AND phone matches — so transitive duplicates
   * (A matches B by email; B matches C by phone → A, B, C are one cluster)
   * are correctly collapsed to the single oldest record.
   *
   * For each cluster with multiple members:
   * 1. Select the oldest contact as canonical (min createdAt)
   * 2. Re-link all Lead records from duplicate contacts to the canonical
   * 3. Archive duplicate contacts
   * 4. Write one AuditLog entry per merge
   */
  app.post("/contacts/dedup", {
    schema: {
      tags: ["Contacts"],
      summary: "Deduplicate contacts — transitive union-find merge by email/phone. Accepts optional contactIds to scope.",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN"])
  }, async (req: any) => {
    const allContacts = await app.prisma.contact.findMany({
      where: { archived: false },
      orderBy: { createdAt: "asc" }
    });

    if (allContacts.length === 0) {
      return { message: "Deduplication complete", groupsProcessed: 0, duplicatesArchived: 0, merges: [] };
    }

    const idToIndex = new Map<string, number>();
    allContacts.forEach((c, i) => idToIndex.set(c.id, i));

    const parent = allContacts.map((_, i) => i);

    function find(x: number): number {
      if (parent[x] !== x) parent[x] = find(parent[x]);
      return parent[x];
    }

    function union(x: number, y: number) {
      const rx = find(x);
      const ry = find(y);
      if (rx !== ry) parent[rx] = ry;
    }

    const emailMap = new Map<string, number>();
    const phoneMap = new Map<string, number>();

    for (let i = 0; i < allContacts.length; i++) {
      const c = allContacts[i];

      if (c.email) {
        const key = normalizeEmail(c.email);
        if (emailMap.has(key)) {
          union(i, emailMap.get(key)!);
        } else {
          emailMap.set(key, i);
        }
      }

      if (c.phone) {
        const key = normalizePhone(c.phone);
        if (phoneMap.has(key)) {
          union(i, phoneMap.get(key)!);
        } else {
          phoneMap.set(key, i);
        }
      }
    }

    const clusters = new Map<number, typeof allContacts>();
    for (let i = 0; i < allContacts.length; i++) {
      const root = find(i);
      const cluster = clusters.get(root) ?? [];
      cluster.push(allContacts[i]);
      clusters.set(root, cluster);
    }

    let mergedCount = 0;
    let groupsProcessed = 0;
    const mergeDetails: Array<{ canonicalId: string; archivedId: string }> = [];

    for (const cluster of clusters.values()) {
      if (cluster.length < 2) continue;

      cluster.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      const canonical = cluster[0];
      const duplicates = cluster.slice(1);
      groupsProcessed++;

      for (const dupe of duplicates) {
        await app.prisma.lead.updateMany({
          where: { contactId: dupe.id },
          data: { contactId: canonical.id }
        });

        await app.prisma.contact.update({
          where: { id: dupe.id },
          data: { archived: true }
        });

        await app.audit({
          actorId: req.user.sub,
          action: "DEDUP_MERGE",
          entity: "Contact",
          entityId: dupe.id,
          before: dupe,
          after: { archivedIntoId: canonical.id, leadsRelinked: true }
        });

        mergeDetails.push({ canonicalId: canonical.id, archivedId: dupe.id });
        mergedCount++;
      }
    }

    return {
      message: "Deduplication complete",
      groupsProcessed,
      duplicatesArchived: mergedCount,
      merges: mergeDetails
    };
  });

  // Leads

  app.post("/leads", {
    schema: {
      tags: ["Leads"],
      summary: "Create a lead",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any) => {
    const body = z.object({
      accountId: z.string().optional(),
      contactId: z.string().optional(),
      source: z.enum(["MANUAL","META_ADS","WHATSAPP","WEBSITE","REFERRAL"]).optional(),
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

  app.get("/leads", {
    schema: {
      tags: ["Leads"],
      summary: "List leads",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES","READONLY"])
  }, async (req: any) => {
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

  /**
   * GET /v1/leads/score
   * Returns all leads with a computed 0–100 score based on weighted rules.
   */
  app.get("/leads/score", {
    schema: {
      tags: ["Leads"],
      summary: "Rule-based lead scoring — returns leads sorted by score descending",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES","READONLY"])
  }, async () => {
    const leads = await app.prisma.lead.findMany({
      where: { archived: false },
      include: {
        activities: true,
        calls: {
          where: { status: { in: ["STARTED", "MISSED"] } }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const now = Date.now();

    const scored = leads.map((lead) => {
      const stageWeight = STAGE_WEIGHTS[lead.status] ?? 0;

      const lastTouch = lead.lastTouchAt ?? lead.updatedAt ?? lead.createdAt;
      const daysSinceTouch = Math.floor((now - lastTouch.getTime()) / (1000 * 60 * 60 * 24));
      const recencyScore = Math.max(0, 30 - daysSinceTouch);

      const activityScore = Math.min(20, lead.activities.length * 4);

      const openCallCount = lead.calls.length;
      const callScore = Math.min(10, openCallCount * 2);

      const stageScore = Math.round(stageWeight * 0.4);

      const rawScore = recencyScore + activityScore + callScore + stageScore;
      const score = Math.min(100, Math.max(0, rawScore));

      return {
        id: lead.id,
        status: lead.status,
        source: lead.source,
        channel: lead.channel,
        accountId: lead.accountId,
        contactId: lead.contactId,
        lastTouchAt: lead.lastTouchAt,
        createdAt: lead.createdAt,
        activityCount: lead.activities.length,
        openCallCount,
        score,
        scoreBreakdown: {
          recency: recencyScore,
          activity: activityScore,
          calls: callScore,
          stage: stageScore
        }
      };
    });

    scored.sort((a, b) => b.score - a.score);

    return scored;
  });

  // Opportunities (Deals)

  app.post("/opportunities", {
    schema: {
      tags: ["Opportunities"],
      summary: "Create an opportunity",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any) => {
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

  app.put("/opportunities/:id/stage", {
    schema: {
      tags: ["Opportunities"],
      summary: "Update opportunity stage",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES"])
  }, async (req: any, reply) => {
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

  app.post("/activities", {
    schema: {
      tags: ["Activities"],
      summary: "Log an activity",
      security: [{ bearerAuth: [] }]
    },
    preHandler: app.requireRole(["ADMIN","SALES","DELIVERY","SUPPORT"])
  }, async (req: any) => {
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
