/**
 * Telephony Gateway (ARI Skeleton)
 * هدف: conectar Asterisk ARI -> Voxmation OS via webhooks
 *
 * Este é um esqueleto pronto para você completar com:
 * - conexão ARI (WebSocket/HTTP)
 * - originate de chamadas via ARI
 * - postagem de eventos no Voxmation OS
 *
 * Por padrão, ele expõe:
 *  - POST /originate  { providerCallId, from, to }
 * E você pode, dentro desse handler, chamar o ARI originate.
 */
import Fastify from "fastify";
import { z } from "zod";

const app = Fastify({ logger: true });

const VOXMATION_OS_EVENTS_URL = process.env.VOXMATION_OS_EVENTS_URL || "https://YOUR-REPL.repl.co/v1/webhooks/telephony/call-status";

app.get("/health", async () => ({ ok: true }));

app.post("/originate", async (req, reply) => {
  const body = z.object({
    providerCallId: z.string(),
    fromNumber: z.string(),
    toNumber: z.string()
  }).parse(req.body);

  // TODO: ARI originate aqui.
  // Depois que originar, você pode notificar STARTED no OS:
  await fetch(VOXMATION_OS_EVENTS_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      providerCallId: body.providerCallId,
      status: "STARTED",
      fromNumber: body.fromNumber,
      toNumber: body.toNumber
    })
  });

  return reply.code(202).send({ accepted: true });
});

app.listen({ port: Number(process.env.PORT || 4100), host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
