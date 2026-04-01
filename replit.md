# Voxmation OS

## Overview
An open-source Business Operating System starter kit built with Node.js/TypeScript, featuring:
- **CRM Core**: Leads, Accounts, Contacts, Opportunities
- **Telephony**: Call logs, webhooks, recordings/transcriptions (Asterisk/FreeSWITCH + Twilio)
- **Delivery Ops**: Service catalog and project/task management
- **Billing**: Plans, invoices, payment gateway webhooks
- **Integration Hub**: Event-driven webhooks with pub/sub
- **Governance**: JWT auth, RBAC, audit logging

## Architecture
- **Monorepo** using npm workspaces
- **Backend**: Fastify 5 (Node.js/TypeScript) — `apps/api/`
- **Telephony Gateway**: `apps/telephony-gateway/` (separate service)
- **Database**: PostgreSQL via Prisma ORM — `packages/db/`
- **Port**: 5000

## Key Files
- `apps/api/src/index.ts` — App entry point
- `apps/api/src/config.ts` — Configuration (port, JWT, Twilio)
- `apps/api/src/plugins/` — auth, rbac, audit, events plugins (wrapped with fastify-plugin for global scope)
- `apps/api/src/modules/` — crm, voice, delivery, billing, integrations routes
- `packages/db/prisma/schema.prisma` — Database schema

## Setup Notes
- Fixed Prisma schema: added missing back-relations (`Contact.leads`, `Opportunity.activities`, `Plan.invoices`)
- All Fastify plugins wrapped with `fastify-plugin` to expose decorators globally
- Database pushed with `prisma db push`
- API runs on port 5000

## Scripts
- `npm run dev` — Start development server (tsx watch)
- `npm run build` — TypeScript compile
- `npm run db:generate` — Generate Prisma client
- `npm run db:migrate` — Run migrations

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `JWT_SECRET` — JWT signing secret (defaults to "dev-secret")
- `WEBHOOK_SECRET` — Webhook signing secret
- `TWILIO_ACCOUNT_SID` — Twilio Account SID (optional)
- `TWILIO_AUTH_TOKEN` — Twilio Auth Token (optional)
