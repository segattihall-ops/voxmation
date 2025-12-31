import type { FastifyPluginAsync } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const authPlugin: FastifyPluginAsync = async (app) => {
  app.post("/auth/register", async (req, reply) => {
    const body = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().optional(),
      role: z.enum(["ADMIN","SALES","DELIVERY","SUPPORT","FINANCE","READONLY"]).optional()
    }).parse(req.body);

    const hash = await bcrypt.hash(body.password, 10);
    const user = await app.prisma.user.create({
      data: { email: body.email, password: hash, name: body.name, role: (body.role ?? "READONLY") as any }
    });

    return reply.code(201).send({ id: user.id, email: user.email, role: user.role });
  });

  app.post("/auth/login", async (req, reply) => {
    const body = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);

    const user = await app.prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return reply.code(401).send({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(body.password, user.password);
    if (!ok) return reply.code(401).send({ error: "Invalid credentials" });

    const token = await reply.jwtSign({ sub: user.id, role: user.role, email: user.email });
    return { token };
  });

  app.decorate("requireAuth", async (req: any, reply: any) => {
    try {
      await req.jwtVerify();
    } catch {
      return reply.code(401).send({ error: "Unauthorized" });
    }
  });
};

declare module "fastify" {
  interface FastifyInstance {
    requireAuth: (req: any, reply: any) => Promise<any>;
  }
}
