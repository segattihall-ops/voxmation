import Fastify from "fastify";
import jwt from "@fastify/jwt";
import formbody from "@fastify/formbody";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import fastifyStatic from "@fastify/static";
import { PrismaClient } from "@prisma/client";
import { config } from "./config";
import path from "path";

import { authPlugin } from "./plugins/auth";
import { rbacPlugin } from "./plugins/rbac";
import { auditPlugin } from "./plugins/audit";
import { eventsPlugin } from "./plugins/events";

import { crmRoutes } from "./modules/crm/crm.routes";
import { voiceRoutes } from "./modules/voice/voice.routes";
import { deliveryRoutes } from "./modules/delivery/delivery.routes";
import { billingRoutes } from "./modules/billing/billing.routes";
import { integrationsRoutes } from "./modules/integrations/integrations.routes";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.addContentTypeParser("application/json", { parseAs: "string" }, (req, body, done) => {
  (req as FastifyRequestWithRawBody).rawBody = body as string;
  try {
    done(null, JSON.parse(body as string));
  } catch (err: any) {
    err.statusCode = 400;
    done(err, undefined);
  }
});

app.register(formbody);

app.decorate("prisma", prisma);

app.register(jwt, { secret: config.jwtSecret });

app.register(swagger, {
  openapi: { info: { title: "Voxmation OS API", version: "v1" } }
});
app.register(swaggerUI, { routePrefix: "/docs" });

app.register(authPlugin);
app.register(rbacPlugin);
app.register(auditPlugin);
app.register(eventsPlugin);

app.get("/health", async () => ({ ok: true }));

app.register(crmRoutes, { prefix: "/v1" });
app.register(voiceRoutes, { prefix: "/v1" });
app.register(deliveryRoutes, { prefix: "/v1" });
app.register(billingRoutes, { prefix: "/v1" });
app.register(integrationsRoutes, { prefix: "/v1" });

const staticRoot = path.resolve(__dirname, "../../web/dist");
app.register(fastifyStatic, {
  root: staticRoot,
  prefix: "/"
});

app.setNotFoundHandler(async (req, reply) => {
  const url = req.raw.url || "";
  const isApiPath = url.startsWith("/v1") || url.startsWith("/auth") || url.startsWith("/docs") || url.startsWith("/health");
  if (isApiPath) {
    return reply.code(404).send({ error: "Not found" });
  }
  return reply.sendFile("index.html");
});

app.listen({ port: config.port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
  interface FastifyRequest {
    rawBody?: string;
  }
}

interface FastifyRequestWithRawBody {
  rawBody: string;
}
