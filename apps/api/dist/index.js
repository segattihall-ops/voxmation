"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const client_1 = require("@prisma/client");
const config_1 = require("./config");
const auth_1 = require("./plugins/auth");
const rbac_1 = require("./plugins/rbac");
const audit_1 = require("./plugins/audit");
const events_1 = require("./plugins/events");
const crm_routes_1 = require("./modules/crm/crm.routes");
const voice_routes_1 = require("./modules/voice/voice.routes");
const delivery_routes_1 = require("./modules/delivery/delivery.routes");
const billing_routes_1 = require("./modules/billing/billing.routes");
const integrations_routes_1 = require("./modules/integrations/integrations.routes");
const app = (0, fastify_1.default)({ logger: true });
const prisma = new client_1.PrismaClient();
app.decorate("prisma", prisma);
app.register(jwt_1.default, { secret: config_1.config.jwtSecret });
app.register(swagger_1.default, {
    openapi: { info: { title: "Voxmation OS API", version: "v1" } }
});
app.register(swagger_ui_1.default, { routePrefix: "/docs" });
app.register(auth_1.authPlugin);
app.register(rbac_1.rbacPlugin);
app.register(audit_1.auditPlugin);
app.register(events_1.eventsPlugin);
app.get("/health", async () => ({ ok: true }));
app.register(crm_routes_1.crmRoutes, { prefix: "/v1" });
app.register(voice_routes_1.voiceRoutes, { prefix: "/v1" });
app.register(delivery_routes_1.deliveryRoutes, { prefix: "/v1" });
app.register(billing_routes_1.billingRoutes, { prefix: "/v1" });
app.register(integrations_routes_1.integrationsRoutes, { prefix: "/v1" });
app.listen({ port: config_1.config.port, host: "0.0.0.0" }).catch((err) => {
    app.log.error(err);
    process.exit(1);
});
