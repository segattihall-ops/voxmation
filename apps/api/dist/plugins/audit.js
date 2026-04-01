"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = async (app) => {
    app.decorate("audit", async (params) => {
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
exports.auditPlugin = (0, fastify_plugin_1.default)(plugin);
