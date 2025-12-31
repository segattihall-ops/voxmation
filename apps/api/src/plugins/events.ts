import type { FastifyPluginAsync } from "fastify";
import crypto from "crypto";

export const eventsPlugin: FastifyPluginAsync = async (app) => {
  app.decorate("publishEvent", async (name: string, payload: any) => {
    await app.prisma.event.create({ data: { name, payload } });

    const subs = await app.prisma.webhookSubscription.findMany({
      where: { eventName: name, isEnabled: true }
    });

    for (const s of subs) {
      const body = JSON.stringify({ name, payload, ts: Date.now() });
      const sig = crypto.createHmac("sha256", s.secret).update(body).digest("hex");
      const requestId = crypto.randomUUID();

      try {
        const res = await fetch(s.url, {
          method: "POST",
          headers: { "content-type": "application/json", "x-vox-signature": sig },
          body
        });

        await app.prisma.executionLog.create({
          data: { target: s.url, status: String(res.status), requestId, payload: { name, payload } }
        });
      } catch (e: any) {
        await app.prisma.executionLog.create({
          data: { target: s.url, status: "ERROR", requestId, payload: { name, payload, error: e?.message ?? "unknown" } }
        });
      }
    }
  });
};

declare module "fastify" {
  interface FastifyInstance {
    publishEvent: (name: string, payload: any) => Promise<void>;
  }
}
