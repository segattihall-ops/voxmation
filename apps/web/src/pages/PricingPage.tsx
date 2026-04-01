import { useState } from "react";
import { CheckCircle, ArrowRight, ChevronDown } from "lucide-react";
import SEOHead from "../components/SEOHead";
import clsx from "clsx";

const SELF_HOSTED_FEATURES = [
  "Full CRM: Leads, Accounts, Contacts, Opportunities",
  "Built-in telephony (Asterisk/FreeSWITCH/Twilio)",
  "Delivery Ops: Projects, Tasks, Service Catalog",
  "Billing & Invoicing module",
  "Integration Hub with webhook pub/sub",
  "JWT Auth + RBAC + Audit Logging",
  "Unlimited users — no per-seat fees",
  "Unlimited records",
  "Full REST API with OpenAPI spec",
  "MIT License — modify anything",
  "Community support (GitHub Discussions)",
];

const CLOUD_FEATURES = [
  "Everything in Self-Hosted",
  "Managed PostgreSQL — no DB ops",
  "Automated backups & point-in-time recovery",
  "One-click upgrades",
  "SLA-backed uptime (99.9%)",
  "Priority support (email + Slack)",
  "Custom domain + SSL provisioning",
  "Usage dashboard & cost alerts",
  "Compliance exports (SOC 2 ready)",
];

const PRICING_FAQ = [
  {
    q: "Is the self-hosted version really free forever?",
    a: "Yes. Voxmation OS is MIT licensed. You can deploy it, modify it, and use it commercially — no fee, no expiry, no feature gates. The only cost is your own infrastructure.",
  },
  {
    q: "What does 'unlimited users' mean?",
    a: "No per-seat licensing. You can add as many users as your server can handle. We don't count seats or charge per user on the self-hosted tier.",
  },
  {
    q: "Is the cloud-managed tier available now?",
    a: "We're building out cloud-managed hosting. Join the waitlist to be notified when it launches and to lock in early pricing.",
  },
  {
    q: "What support is available for self-hosted users?",
    a: "Community support via GitHub Discussions and Issues. The codebase is documented with setup guides, environment variable references, and API docs.",
  },
  {
    q: "Can I migrate from self-hosted to cloud-managed later?",
    a: "Yes. The data model is identical between both tiers. We'll provide migration tooling to move your PostgreSQL data to the managed platform.",
  },
  {
    q: "What telephony infrastructure do I need for self-hosted?",
    a: "You need an Asterisk or FreeSWITCH server, or a Twilio account as a fallback. Voxmation OS connects to your existing PBX via SIP. No telephony infrastructure is required for cloud-managed.",
  },
];

function PricingFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-200 text-sm">{q}</span>
        <ChevronDown className={clsx("w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Voxmation OS — Self-Hosted CRM",
    description:
      "Open-source, self-hosted CRM with built-in telephony. Free to deploy, no per-user fees.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://voxmation.com/pricing" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <SEOHead
        title="Pricing — Free Self-Hosted CRM with No Per-User Fees"
        description="Voxmation OS is free to self-host under the MIT license. Unlimited users, no per-seat pricing. Cloud-managed hosting coming soon."
        canonical="/pricing"
        jsonLd={[productSchema, breadcrumb, faqSchema]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-gray-400">
            Self-host for free — forever. No seats, no feature gates, no surprise invoices.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="border border-gray-800/60 rounded-3xl p-8 bg-gray-900/30">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded-full mb-4">Self-Hosted</span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-white">$0</span>
                <span className="text-gray-500 text-sm">/ forever</span>
              </div>
              <p className="text-gray-500 text-sm">MIT License. Deploy on your own infrastructure.</p>
            </div>
            <a
              href="https://github.com/voxmation/voxmation-os"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors mb-8"
            >
              Deploy for Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <ul className="space-y-3">
              {SELF_HOSTED_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-violet-500/40 rounded-3xl p-8 bg-violet-950/20 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">Coming Soon</span>
            </div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 rounded-full mb-4">Cloud-Managed</span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-white">TBA</span>
              </div>
              <p className="text-gray-500 text-sm">Managed hosting with zero infrastructure overhead.</p>
            </div>
            <a
              href="https://github.com/voxmation/voxmation-os/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors mb-8"
            >
              Join the Waitlist
            </a>
            <ul className="space-y-3">
              {CLOUD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Pricing FAQ</h2>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl px-6">
            {PRICING_FAQ.map((item) => (
              <PricingFaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
