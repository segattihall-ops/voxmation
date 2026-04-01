"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmRoutes = void 0;
const zod_1 = require("zod");
function normalizePhone(s) {
    return s.replace(/[^0-9+]/g, "");
}
function normalizeEmail(s) {
    return s.trim().toLowerCase();
}
const STAGE_WEIGHTS = {
    NEW: 10,
    QUALIFYING: 20,
    MEETING: 40,
    PROPOSAL: 60,
    NEGOTIATION: 80,
    WON: 100,
    LOST: 0
};
const crmRoutes = async (app) => {
    // Accounts
    app.post("/accounts", {
        schema: {
            tags: ["Accounts"],
            summary: "Create an account",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req) => {
        const body = zod_1.z.object({
            name: zod_1.z.string().min(1),
            domain: zod_1.z.string().optional(),
            industry: zod_1.z.string().optional(),
            size: zod_1.z.string().optional(),
            notes: zod_1.z.string().optional()
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
        preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"])
    }, async () => {
        return app.prisma.account.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    });
    /**
     * GET /v1/accounts/:id/360
     * Customer 360: unified timeline of ALL interactions for an account —
     * calls, activities, invoices, cases, leads, opportunities, contacts,
     * serviceInstances, and tasks (via projects) — sorted by date desc.
     */
    app.get("/accounts/:id/360", {
        schema: {
            tags: ["Accounts"],
            summary: "Customer 360 — unified timeline for an account (all entity types)",
            security: [{ bearerAuth: [] }],
            params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }
        },
        preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"])
    }, async (req, reply) => {
        const id = req.params.id;
        const account = await app.prisma.account.findUnique({ where: { id } });
        if (!account)
            return reply.code(404).send({ error: "Account not found" });
        const [leads, opportunities, contacts, calls, activities, invoices, cases, serviceInstances, projects] = await Promise.all([
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
            app.prisma.serviceInstance.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" } }),
            app.prisma.project.findMany({
                where: { accountId: id },
                include: { tasks: { orderBy: { createdAt: "desc" } } },
                orderBy: { createdAt: "desc" }
            })
        ]);
        const timeline = [];
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
        for (const proj of projects) {
            timeline.push({ type: "Project", date: proj.createdAt, summary: `Project: ${proj.name}`, entityId: proj.id });
            for (const t of proj.tasks) {
                timeline.push({ type: "Task", date: t.createdAt, summary: `Task: ${t.title} — ${t.status}`, entityId: t.id });
            }
        }
        timeline.sort((a, b) => b.date.getTime() - a.date.getTime());
        return { account, timeline };
    });
    /**
     * GET /v1/accounts/:id/timeline
     * Reverse-chronological unified feed across ALL entity types for that account.
     */
    app.get("/accounts/:id/timeline", {
        schema: {
            tags: ["Accounts"],
            summary: "Unified reverse-chronological timeline for an account (all entity types)",
            security: [{ bearerAuth: [] }],
            params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }
        },
        preHandler: app.requireRole(["ADMIN", "SALES", "READONLY", "SUPPORT"])
    }, async (req, reply) => {
        const id = req.params.id;
        const account = await app.prisma.account.findUnique({ where: { id } });
        if (!account)
            return reply.code(404).send({ error: "Account not found" });
        const [leads, opportunities, contacts, calls, activities, invoices, cases, serviceInstances, projects] = await Promise.all([
            app.prisma.lead.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
            app.prisma.opportunity.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
            app.prisma.contact.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
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
            app.prisma.serviceInstance.findMany({ where: { accountId: id }, orderBy: { createdAt: "desc" }, take: 50 }),
            app.prisma.project.findMany({
                where: { accountId: id },
                include: { tasks: { orderBy: { createdAt: "desc" }, take: 100 } },
                orderBy: { createdAt: "desc" },
                take: 20
            })
        ]);
        const feed = [];
        for (const l of leads) {
            feed.push({ type: "Lead", date: l.createdAt, summary: `Lead created — status: ${l.status}`, entityId: l.id });
        }
        for (const o of opportunities) {
            feed.push({ type: "Opportunity", date: o.createdAt, summary: `Opportunity: ${o.name} — stage: ${o.stage}`, entityId: o.id });
        }
        for (const c of contacts) {
            feed.push({ type: "Contact", date: c.createdAt, summary: `Contact: ${c.name}${c.email ? ` (${c.email})` : ""}`, entityId: c.id });
        }
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
        for (const si of serviceInstances) {
            feed.push({ type: "ServiceInstance", date: si.createdAt, summary: `Service instance — status: ${si.status}`, entityId: si.id });
        }
        for (const proj of projects) {
            feed.push({ type: "Project", date: proj.createdAt, summary: `Project: ${proj.name}`, entityId: proj.id });
            for (const t of proj.tasks) {
                feed.push({ type: "Task", date: t.createdAt, summary: `Task: ${t.title} — ${t.status}`, entityId: t.id });
            }
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
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string().optional(),
            name: zod_1.z.string().min(1),
            email: zod_1.z.string().email().optional(),
            phone: zod_1.z.string().optional(),
            whatsapp: zod_1.z.string().optional(),
            title: zod_1.z.string().optional()
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
    }, async (req) => {
        const body = zod_1.z.object({
            contactIds: zod_1.z.array(zod_1.z.string()).optional()
        }).optional().parse(req.body ?? {});
        const scopeIds = body?.contactIds;
        const allContacts = await app.prisma.contact.findMany({
            where: {
                archived: false,
                ...(scopeIds && scopeIds.length > 0 ? { id: { in: scopeIds } } : {})
            },
            orderBy: { createdAt: "asc" }
        });
        if (allContacts.length === 0) {
            return { message: "Deduplication complete", groupsProcessed: 0, duplicatesArchived: 0, merges: [] };
        }
        const idToIndex = new Map();
        allContacts.forEach((c, i) => idToIndex.set(c.id, i));
        const parent = allContacts.map((_, i) => i);
        function find(x) {
            if (parent[x] !== x)
                parent[x] = find(parent[x]);
            return parent[x];
        }
        function union(x, y) {
            const rx = find(x);
            const ry = find(y);
            if (rx !== ry)
                parent[rx] = ry;
        }
        const emailMap = new Map();
        const phoneMap = new Map();
        for (let i = 0; i < allContacts.length; i++) {
            const c = allContacts[i];
            if (c.email) {
                const key = normalizeEmail(c.email);
                if (emailMap.has(key)) {
                    union(i, emailMap.get(key));
                }
                else {
                    emailMap.set(key, i);
                }
            }
            if (c.phone) {
                const key = normalizePhone(c.phone);
                if (phoneMap.has(key)) {
                    union(i, phoneMap.get(key));
                }
                else {
                    phoneMap.set(key, i);
                }
            }
        }
        const clusters = new Map();
        for (let i = 0; i < allContacts.length; i++) {
            const root = find(i);
            const cluster = clusters.get(root) ?? [];
            cluster.push(allContacts[i]);
            clusters.set(root, cluster);
        }
        let mergedCount = 0;
        let groupsProcessed = 0;
        const mergeDetails = [];
        for (const cluster of clusters.values()) {
            if (cluster.length < 2)
                continue;
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
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string().optional(),
            contactId: zod_1.z.string().optional(),
            source: zod_1.z.enum(["MANUAL", "META_ADS", "WHATSAPP", "WEBSITE", "REFERRAL"]).optional(),
            channel: zod_1.z.string().optional(),
            tags: zod_1.z.array(zod_1.z.string()).optional(),
            nextAction: zod_1.z.string().datetime().optional()
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
        preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"])
    }, async (req) => {
        const status = req.query.status;
        return app.prisma.lead.findMany({
            where: status ? { status: status } : {},
            orderBy: { createdAt: "desc" },
            take: 50
        });
    });
    /**
     * GET /v1/leads/score
     * Rule-based lead scoring (0–100).
     * Weights: recency of last touch (max 30), activity count (max 20),
     * call count (max 10), stage weight (max 40).
     */
    app.get("/leads/score", {
        schema: {
            tags: ["Leads"],
            summary: "Rule-based lead scoring — returns all leads sorted by score descending (0–100)",
            security: [{ bearerAuth: [] }]
        },
        preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"])
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
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string(),
            name: zod_1.z.string().min(1),
            amountCents: zod_1.z.number().int().nonnegative().optional(),
            probability: zod_1.z.number().int().min(0).max(100).optional()
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
        preHandler: app.requireRole(["ADMIN", "SALES"])
    }, async (req, reply) => {
        const id = req.params.id;
        const body = zod_1.z.object({ stage: zod_1.z.enum(["NEW", "QUALIFYING", "MEETING", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]) }).parse(req.body);
        const before = await app.prisma.opportunity.findUnique({ where: { id } });
        if (!before)
            return reply.code(404).send({ error: "Not found" });
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
        preHandler: app.requireRole(["ADMIN", "SALES", "DELIVERY", "SUPPORT"])
    }, async (req) => {
        const body = zod_1.z.object({
            leadId: zod_1.z.string().optional(),
            opportunityId: zod_1.z.string().optional(),
            type: zod_1.z.enum(["CALL", "EMAIL", "WHATSAPP", "MEETING", "NOTE"]),
            summary: zod_1.z.string().min(1),
            dueAt: zod_1.z.string().datetime().optional()
        }).parse(req.body);
        const act = await app.prisma.activity.create({
            data: { ...body, dueAt: body.dueAt ? new Date(body.dueAt) : undefined }
        });
        await app.publishEvent("activity.created", { activityId: act.id });
        return act;
    });
};
exports.crmRoutes = crmRoutes;
