import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginAsync = async (app) => {
  app.decorate("audit", async (params: {
    actorId?: string;
    action: string;
    entity: string;
    entityId?: string;
    before?: any;
    after?: any;
  }) => {
    await app.prisma.auditLog.create({
      data: {
        actorId: params.actorId,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        before: params.before,
        after: params.after
      }
    });
  });
};

export const auditPlugin = fp(plugin);

declare module "fastify" {
  interface FastifyInstance {
    audit: (p: { actorId?: string; action: string; entity: string; entityId?: string; before?: any; after?: any }) => Promise<void>;
  }
}
