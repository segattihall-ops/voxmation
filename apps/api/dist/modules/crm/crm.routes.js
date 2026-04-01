"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crmRoutes = void 0;
const zod_1 = require("zod");
function normalizePhone(s) {
    return s.replace(/[^0-9+]/g, "");
}
const crmRoutes = async (app) => {
    // Accounts
    app.post("/accounts", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req) => {
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
    app.get("/accounts", { preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"]) }, async () => {
        return app.prisma.account.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    });
    // Contacts
    app.post("/contacts", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req) => {
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
    // Leads
    app.post("/leads", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req) => {
        const body = zod_1.z.object({
            accountId: zod_1.z.string().optional(),
            contactId: zod_1.z.string().optional(),
            source: zod_1.z.string().optional(),
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
    app.get("/leads", { preHandler: app.requireRole(["ADMIN", "SALES", "READONLY"]) }, async (req) => {
        const status = req.query.status;
        return app.prisma.lead.findMany({
            where: status ? { status: status } : {},
            orderBy: { createdAt: "desc" },
            take: 50
        });
    });
    // Opportunities (Deals)
    app.post("/opportunities", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req) => {
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
    app.put("/opportunities/:id/stage", { preHandler: app.requireRole(["ADMIN", "SALES"]) }, async (req, reply) => {
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
    app.post("/activities", { preHandler: app.requireRole(["ADMIN", "SALES", "DELIVERY", "SUPPORT"]) }, async (req) => {
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
