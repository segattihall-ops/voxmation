# Voxmation OS

## Overview
An open-source Business Operating System starter kit built with Node.js/TypeScript, featuring:
- **CRM Core**: Leads, Accounts, Contacts, Opportunities
- **Telephony**: Call logs, webhooks, recordings/transcriptions (Asterisk/FreeSWITCH + Twilio)
- **Delivery Ops**: Service catalog and project/task management
- **Billing**: Plans, invoices, payment gateway webhooks
- **Integration Hub**: Event-driven webhooks with pub/sub
- **Governance**: JWT auth, RBAC, audit logging
- **Marketing Website**: SEO-optimized public site at port 5000

## Architecture
- **Monorepo** using npm workspaces
- **Marketing Website**: React + Vite + TypeScript + Tailwind CSS — `apps/web/` (port 5000)
- **Backend API**: Fastify 5 (Node.js/TypeScript) — `apps/api/` (port 3001)
- **Telephony Gateway**: `apps/telephony-gateway/` (separate service)
- **Database**: PostgreSQL via Prisma ORM — `packages/db/`

## Marketing Website (`apps/web/`)
SEO-optimized public marketing site targeting "self-hosted CRM telephony" and related keywords.

### Pages
- `/` — Homepage: hero, feature grid, comparison table, benefits, CTA
- `/features` — Module breakdown with accordion (CRM, Voice, Delivery, Billing, Integrations, RBAC)
- `/pricing` — Self-hosted (free) vs Cloud-managed tiers with pricing FAQ
- `/faq` — 12+ long-tail FAQ questions with FAQPage JSON-LD
- `/blog` — Blog listing with 3 SEO articles
- `/blog/:slug` — Individual blog posts with Article JSON-LD
- `/vs-hubspot` — HubSpot comparison page
- `/vs-salesforce` — Salesforce comparison page
- `/vs-zoho` — Zoho comparison page

### SEO Implementation
- `react-helmet-async` for per-page `<title>`, `<meta description>`, canonical, OG/Twitter tags
- `SEOHead` component with Organization + SoftwareApplication JSON-LD on every page
- Page-specific schemas: FAQPage, Product+Offer, Article, BreadcrumbList
- `/public/sitemap.xml` — all pages listed
- `/public/robots.txt` — allows all crawlers

### Blog Posts
1. "What Is a Self-Hosted CRM?" (slug: `what-is-a-self-hosted-crm`)
2. "HubSpot vs Open-Source CRM: The True Cost Comparison" (slug: `hubspot-vs-open-source-crm-true-cost`)
3. "How to Integrate Telephony with Your CRM" (slug: `integrate-telephony-with-crm`)

Blog content lives in `apps/web/src/blog/posts.ts` as static TypeScript data.

## Key Files
- `apps/web/src/App.tsx` — React Router routes
- `apps/web/src/components/Layout.tsx` — Shared header/footer
- `apps/web/src/components/SEOHead.tsx` — SEO head management
- `apps/web/src/pages/` — All page components
- `apps/web/src/blog/posts.ts` — Blog post content
- `apps/web/public/sitemap.xml` — Sitemap
- `apps/web/public/robots.txt` — Robots file
- `apps/api/src/index.ts` — API entry point
- `apps/api/src/config.ts` — Configuration (port: 3001, JWT, Twilio)
- `packages/db/prisma/schema.prisma` — Database schema

## Setup Notes
- API port changed from 5000 to 3001 (web app now runs on 5000)
- Workflow runs `npm run dev` which starts the web app on port 5000
- Start API separately with `npm run dev:api`
- `@tailwindcss/typography` installed for blog post markdown rendering

## Scripts
- `npm run dev` — Start web app (port 5000)
- `npm run dev:api` — Start API server (port 3001)
- `npm run build` — Build both web and API
- `npm run db:generate` — Generate Prisma client
- `npm run db:migrate` — Run migrations

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `JWT_SECRET` — JWT signing secret (defaults to "dev-secret")
- `WEBHOOK_SECRET` — Webhook signing secret
- `TWILIO_ACCOUNT_SID` — Twilio Account SID (optional)
- `TWILIO_AUTH_TOKEN` — Twilio Auth Token (optional)
