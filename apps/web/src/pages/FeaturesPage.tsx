import { useState } from "react";
import { ChevronDown, Phone, Database, Truck, CreditCard, Globe, Shield } from "lucide-react";
import SEOHead from "../components/SEOHead";
import clsx from "clsx";

const MODULES = [
  {
    icon: Database,
    title: "CRM Core",
    tagline: "Full-lifecycle customer relationship management",
    features: [
      "Leads management with qualification scoring and assignment rules",
      "Accounts (companies) with hierarchical relationships and custom fields",
      "Contacts linked to accounts and opportunities with activity history",
      "Opportunities with customizable pipeline stages and weighted forecasting",
      "Activity tracking: calls, emails, notes, tasks, and meetings",
      "Custom field types: text, number, date, select, multi-select, file",
      "Bulk import/export via CSV with field mapping",
      "Role-based visibility: team-level, owner-level, or global record access",
    ],
    keywords: "open source CRM, self-hosted CRM, free CRM software, HubSpot alternative",
  },
  {
    icon: Phone,
    title: "Voice & Telephony",
    tagline: "Native SIP/Asterisk calling — no third-party dialer required",
    features: [
      "Native Asterisk and FreeSWITCH integration via SIP trunk configuration",
      "Twilio fallback: use Twilio as a PSTN gateway when no on-prem PBX is available",
      "Automatic call logging: direction, duration, outcome, and disposition codes",
      "Call recording storage with per-tenant retention policies",
      "Transcription via Whisper or Deepgram — stored alongside call records",
      "Webhook events: call.started, call.ended, call.recorded, call.transcribed",
      "Click-to-call from any contact or lead record in the CRM",
      "Inbound call routing with CRM screen-pop on match",
    ],
    keywords: "CRM with telephony, self-hosted calling, Asterisk CRM, SIP CRM, open source telephony CRM",
  },
  {
    icon: Truck,
    title: "Delivery Ops",
    tagline: "Service delivery and project management, inside your CRM",
    features: [
      "Service catalog: define deliverable types with SLA targets and pricing",
      "Projects linked to accounts/opportunities for end-to-end deal-to-delivery",
      "Task management with assignees, due dates, dependencies, and status tracking",
      "Milestone tracking with automated status rollup to project level",
      "Time logging per task with billable/non-billable classification",
      "Delivery dashboards showing WIP, overdue tasks, and completion rates",
      "Webhook events fire on project creation, task completion, and SLA breach",
    ],
    keywords: "CRM project management, service delivery CRM, self-hosted PSA",
  },
  {
    icon: CreditCard,
    title: "Billing & Invoicing",
    tagline: "Revenue tracking without a separate billing tool",
    features: [
      "Subscription plans with seat-based or flat-rate pricing",
      "Invoice generation linked to opportunities and projects",
      "Payment gateway webhooks: Stripe, PayPal, and custom payment providers",
      "Invoice line items auto-populated from time logs and service catalog",
      "PDF invoice export with customizable templates",
      "Revenue reporting: MRR, ARR, outstanding receivables by account",
      "Tax configuration per plan or per invoice line item",
    ],
    keywords: "CRM billing, invoicing CRM, self-hosted billing software",
  },
  {
    icon: Globe,
    title: "Integration Hub",
    tagline: "Event-driven connectivity without vendor lock-in",
    features: [
      "Pub/sub event bus: subscribe any endpoint to any internal CRM event",
      "Webhook delivery with retry logic (exponential backoff, dead-letter queue)",
      "HMAC signature verification on all outbound webhook payloads",
      "Pre-built event types across CRM, Voice, Delivery, and Billing modules",
      "Event log with delivery status, response codes, and retry history",
      "REST API for all entities — OpenAPI 3.0 spec included",
      "SDK-ready: typed client generation from the OpenAPI spec",
    ],
    keywords: "CRM integration hub, open source webhook CRM, self-hosted integration platform",
  },
  {
    icon: Shield,
    title: "Audit & RBAC",
    tagline: "Enterprise-grade governance on your own terms",
    features: [
      "JWT-based authentication with configurable token expiry",
      "Role-based access control: define roles and map them to resource-level permissions",
      "Fine-grained permissions: read, write, delete, admin per module",
      "Immutable audit log: every create, update, and delete is recorded with user and timestamp",
      "Audit log export for compliance and legal discovery",
      "Session management with device tracking and force-logout capability",
      "Rate limiting and brute-force protection on auth endpoints",
    ],
    keywords: "CRM RBAC, audit log CRM, secure self-hosted CRM",
  },
];

function Module({ mod, defaultOpen = false }: { mod: typeof MODULES[0]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = mod.icon;

  return (
    <div className="border border-gray-800/60 rounded-2xl overflow-hidden bg-gray-900/30 hover:border-gray-700/60 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{mod.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{mod.tagline}</p>
          </div>
        </div>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-gray-800/60">
          <ul className="mt-5 space-y-2.5">
            {mod.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-1.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function FeaturesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "Features", item: "https://voxmation.com/features" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Features — Open-Source CRM with Telephony, Delivery Ops & Billing"
        description="Explore every module in Voxmation OS: CRM, built-in Asterisk/SIP telephony, project delivery ops, billing, integration hub, and enterprise RBAC. All self-hosted, all open source."
        canonical="/features"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            All Modules
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Every feature your business needs, self-hosted
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Voxmation OS is modular. Deploy what you need, leave what you don't.
            Every module is open source and runs on your infrastructure.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {MODULES.map((mod, i) => (
            <Module key={mod.title} mod={mod} defaultOpen={i === 0} />
          ))}
        </div>
      </section>
    </>
  );
}
