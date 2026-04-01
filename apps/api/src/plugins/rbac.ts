import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginAsync = async (app) => {
  app.decorate("requireRole", (roles: string[]) => {
    return async (req: any, reply: any) => {
      await app.requireAuth(req, reply);
      const role = req.user?.role;
      if (!role || !roles.includes(role)) {
        return reply.code(403).send({ error: "Forbidden" });
      }
    };
  });
};

export const rbacPlugin = fp(plugin);

declare module "fastify" {
  interface FastifyInstance {
    requireRole: (roles: string[]) => (req: any, reply: any) => Promise<any>;
  }
}
