"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const plugin = async (app) => {
    app.post("/auth/register", async (req, reply) => {
        const body = zod_1.z.object({
            email: zod_1.z.string().email(),
            password: zod_1.z.string().min(8),
            name: zod_1.z.string().optional(),
            role: zod_1.z.enum(["ADMIN", "SALES", "DELIVERY", "SUPPORT", "FINANCE", "READONLY"]).optional()
        }).parse(req.body);
        const hash = await bcryptjs_1.default.hash(body.password, 10);
        const user = await app.prisma.user.create({
            data: { email: body.email, password: hash, name: body.name, role: (body.role ?? "READONLY") }
        });
        return reply.code(201).send({ id: user.id, email: user.email, role: user.role });
    });
    app.post("/auth/login", async (req, reply) => {
        const body = zod_1.z.object({ email: zod_1.z.string().email(), password: zod_1.z.string() }).parse(req.body);
        const user = await app.prisma.user.findUnique({ where: { email: body.email } });
        if (!user)
            return reply.code(401).send({ error: "Invalid credentials" });
        const ok = await bcryptjs_1.default.compare(body.password, user.password);
        if (!ok)
            return reply.code(401).send({ error: "Invalid credentials" });
        const token = await reply.jwtSign({ sub: user.id, role: user.role, email: user.email });
        return { token };
    });
    app.decorate("requireAuth", async (req, reply) => {
        try {
            await req.jwtVerify();
        }
        catch {
            return reply.code(401).send({ error: "Unauthorized" });
        }
    });
};
exports.authPlugin = (0, fastify_plugin_1.default)(plugin);
