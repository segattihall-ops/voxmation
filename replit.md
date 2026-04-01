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

## Dashboard App (added in Task #3)
React + Vite dashboard frontend for managing all Voxmation OS data.

### Auth
- `/login` — Login page (calls POST /auth/login, stores JWT in localStorage as "vox_token")
- `/register` — Register page (calls POST /auth/register)
- Protected routes at `/app/*` redirect to /login if no token

### Dashboard Pages (`/app/*`)
- `/app/dashboard` — Overview with stat cards (counts of accounts, leads, opportunities, invoices, calls)
- `/app/crm/accounts` — List + create accounts
- `/app/crm/contacts` — List + create contacts
- `/app/crm/leads` — List + create leads with status filter
- `/app/crm/opportunities` — List + create opportunities + stage update
- `/app/billing/plans` — List subscription plans
- `/app/billing/invoices` — List invoices with status badges
- `/app/delivery/catalogs` — List service catalogs
- `/app/delivery/instances` — List + create service instances (shows auto-generated project + tasks)
- `/app/voice/calls` — List call logs with status badges

### Dashboard Architecture
- `apps/web/src/dashboard/api.ts` — Central API client (fetch with JWT, auth helpers)
- `apps/web/src/dashboard/components/` — Shared: DashboardLayout, PageHeader, Table, Badge, Modal, FormField, ProtectedRoute, LoadingSpinner
- `apps/web/src/dashboard/pages/` — Page components organized by module

### Backend Changes (for dashboard)
- Added GET /v1/accounts, /v1/contacts, /v1/opportunities, /v1/leads to CRM routes
- Added GET /v1/plans, /v1/invoices to billing routes
- Added GET /v1/service-catalog, /v1/service-instances to delivery routes
- Added GET /v1/calls to voice routes
- Added @fastify/static to serve apps/web/dist as static files (production mode)
- SPA catch-all route in Fastify for client-side routing

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

## Next.js Marketing Site (`apps/marketing/`) — Task #8

A production-ready Next.js 14 (App Router) marketing site for Voxmation as a voice prompt automation business. Runs independently on port 3002 in development.

### Pages
- `/` — Homepage: hero (with phone number), features grid, how-it-works steps, use-case cards, CTA banner. JSON-LD Organization + SoftwareApplication.
- `/features` — Full platform breakdown: prompt builder, IVR designer, outbound dialer, analytics, telephony integrations, AI transcription, RBAC.
- `/pricing` — Three tiers: Self-Hosted (free), Cloud-Managed (waitlist), Enterprise (call sales). Feature comparison table, FAQ accordion.
- `/use-cases` — 5 use cases: appointment reminders, inbound IVR, outbound campaigns, after-hours handling, survey collection.
- `/blog` — Blog listing with 3 articles on voice automation.
- `/blog/[slug]` — Individual blog posts with Article JSON-LD and custom markdown renderer.
- `/contact` — Contact form (mailto), phone 1-844-687-7999 prominently displayed, contact methods, map placeholder.

### SEO
- Every page has `generateMetadata` with title, description, canonical URL, Open Graph, Twitter Card.
- JSON-LD structured data on all pages (Organization, SoftwareApplication, BreadcrumbList, FAQPage, Article).
- `next-sitemap` generates `/sitemap.xml` and `/robots.txt` at build time using `voxmation.com` domain.
- Inter font via `next/font/google`.

### Blog Posts (voice automation focus)
1. "What Is Voice Prompt Automation?" (slug: `what-is-voice-prompt-automation`)
2. "Asterisk vs Twilio for Outbound Campaigns" (slug: `asterisk-vs-twilio-outbound-campaigns`)
3. "How to Build an IVR Menu in 2025" (slug: `how-to-build-an-ivr-menu`)

### Key Files
- `apps/marketing/src/app/layout.tsx` — Root layout with Navbar, Footer, Inter font, dark bg
- `apps/marketing/src/components/Navbar.tsx` — Sticky nav with phone number tel: link + CTA
- `apps/marketing/src/components/Footer.tsx` — Full footer with phone, links, copyright
- `apps/marketing/src/data/posts.ts` — Blog post static data
- `apps/marketing/src/lib/constants.ts` — SITE_URL, PHONE_NUMBER, PHONE_HREF, etc.
- `apps/marketing/next.config.mjs` — Next.js config (standalone output, voxmation.com domain)
- `apps/marketing/next-sitemap.config.js` — Sitemap config

### Scripts
- `npm run dev:marketing` — Start marketing site (port 3002)
- `npm run build:marketing` — Build marketing site
- `cd apps/marketing && npm run build` — Also runs `next-sitemap` postbuild

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
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit DB)
- `JWT_SECRET` — JWT signing secret (set as Replit secret)
- `WEBHOOK_SECRET` — Webhook signing secret (set as Replit secret)
- `TWILIO_ACCOUNT_SID` — Twilio Account SID (optional)
- `TWILIO_AUTH_TOKEN` — Twilio Auth Token (optional)

## Backend Status (Task 2 Complete)
- PostgreSQL database provisioned via Replit built-in DB
- All Prisma schema tables created with `prisma db push`
- JWT_SECRET and WEBHOOK_SECRET configured as Replit secrets
- Root `GET /` returns JSON info response (no more 404)
- Swagger UI accessible at `/docs`
- Smoke tested: register, login, create account, list accounts, create lead, list leads — all pass
