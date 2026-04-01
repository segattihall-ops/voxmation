"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rbacPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = async (app) => {
    app.decorate("requireRole", (roles) => {
        return async (req, reply) => {
            await app.requireAuth(req, reply);
            const role = req.user?.role;
            if (!role || !roles.includes(role)) {
                return reply.code(403).send({ error: "Forbidden" });
            }
        };
    });
};
exports.rbacPlugin = (0, fastify_plugin_1.default)(plugin);
