import { useState } from "react";
import { CheckCircle, ArrowRight, ChevronDown, Phone } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { CONTACT } from "../config/business";
import clsx from "clsx";

interface Plan {
  name: string;
  tagline: string;
  audience: string;
  highlight?: boolean;
  features: string[];
  reporting: string;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For local microbusinesses that just can't miss a call.",
    audience: "Solo operators & new businesses",
    features: [
      "Instant missed-call SMS textback",
      "Basic contact capture",
      "Business-hours auto-responses",
      "Email notifications for every lead",
    ],
    reporting: "Email notifications",
  },
  {
    name: "Growth",
    tagline: "For established service businesses ready to scale.",
    audience: "Small & mid-sized service teams",
    highlight: true,
    features: [
      "24/7 AI receptionist",
      "Lead qualification & screening",
      "Appointment booking",
      "Automated SMS follow-up",
      "Missed-call textback",
    ],
    reporting: "CRM sync (HubSpot, Zoho) + monthly performance report",
  },
  {
    name: "Pro",
    tagline: "For multi-location, high-volume operations.",
    audience: "Multi-location & high call volume",
    features: [
      "Everything in Growth",
      "Advanced call logic & rules",
      "Location-based routing",
      "AI-answered FAQs",
      "Review & reactivation automation",
    ],
    reporting: "Detailed weekly reports + review automation",
  },
  {
    name: "White Label",
    tagline: "For agencies and technology resellers.",
    audience: "Agencies & resellers",
    features: [
      "Branded AI receptionist",
      "Rapid setup templates",
      "Partner pricing tiers",
      "Multi-client management",
    ],
    reporting: "Dedicated dashboard + integrated support flows",
  },
];

const PRICING_FAQ = [
  {
    q: "How much does an AI receptionist cost?",
    a: "Voxmation pricing is based on your call volume, not a confusing per-minute meter. Plans start with a lightweight Starter tier for missed-call textback and scale up to Growth and Pro for full 24/7 answering, qualification, and routing. Contact sales for a quote matched to your volume.",
  },
  {
    q: "Are there per-minute overage charges?",
    a: "No surprise per-minute billing. Many AI answering services charge $0.50–$0.85 per extra minute, which spikes your bill in busy season. Voxmation plans are sized to your call volume so your cost stays predictable.",
  },
  {
    q: "Which plan is right for my business?",
    a: "If you're a solo operator who just needs to stop losing missed calls, start with Starter. If you want a true 24/7 receptionist that qualifies and books leads, choose Growth. Multi-location or high-volume businesses should look at Pro. Agencies reselling to clients should ask about White Label.",
  },
  {
    q: "Does Voxmation integrate with my CRM?",
    a: "Yes. Growth and above sync calls, leads, and bookings to CRMs like HubSpot and Zoho automatically, and can trigger your follow-up automations. No manual data entry.",
  },
  {
    q: "How fast can I get set up?",
    a: "Most businesses are live within a few days. We configure your greeting, qualification questions, routing rules, and integrations, then test against live calls before going live.",
  },
  {
    q: "Can I white-label Voxmation for my agency's clients?",
    a: "Yes. The White Label plan gives agencies a branded AI receptionist, rapid setup templates, partner pricing, and a dedicated dashboard to manage multiple clients.",
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
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Voxmation AI Receptionist",
    description:
      "AI receptionist and missed-call recovery with volume-based pricing. Plans: Starter, Growth, Pro, and White Label.",
    provider: { "@type": "Organization", name: "Voxmation", url: "https://voxmation.com" },
    offers: PLANS.map((p) => ({
      "@type": "Offer",
      name: p.name,
      category: p.audience,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    })),
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
        title="Pricing — AI Receptionist Plans for Service Businesses"
        description="Voxmation AI receptionist pricing scales with your call volume — no surprise per-minute fees. Compare Starter, Growth, Pro, and White Label plans for HVAC, plumbing, and electrical businesses."
        canonical="/pricing"
        jsonLd={[offerSchema, breadcrumb, faqSchema]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Pricing that scales with your calls
          </h1>
          <p className="text-xl text-gray-400">
            Volume-based plans, no per-minute surprises. Pick the tier that matches how you answer.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={clsx(
                "rounded-3xl p-7 relative flex flex-col h-full",
                plan.highlight
                  ? "border border-violet-500/40 bg-violet-950/20"
                  : "border border-gray-800/60 bg-gray-900/30"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full">Most popular</span>
                </div>
              )}
              <div className="mb-5">
                <span className={clsx(
                  "inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4",
                  plan.highlight ? "text-violet-400 bg-violet-500/10 border border-violet-500/20" : "text-gray-400 bg-gray-800"
                )}>
                  {plan.name}
                </span>
                <p className="text-sm text-gray-400 leading-relaxed min-h-[3rem]">{plan.tagline}</p>
                <p className="text-xs text-gray-600 mt-2">{plan.audience}</p>
              </div>

              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-500 border-t border-gray-800/60 pt-4 mb-5">
                <span className="font-semibold text-gray-400">Reporting:</span> {plan.reporting}
              </p>

              <a
                href={CONTACT.phoneHref}
                className={clsx(
                  "flex items-center justify-center gap-2 w-full py-2.5 font-semibold rounded-xl transition-colors text-sm",
                  plan.highlight
                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                    : "bg-gray-800/60 hover:bg-gray-800 text-gray-200 border border-gray-700/60"
                )}
              >
                Get a quote
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-gray-400">
            Not sure which plan fits? Call{" "}
            <a href={CONTACT.phoneHref} className="text-violet-400 hover:text-violet-300 font-semibold">
              {CONTACT.phone}
            </a>{" "}
            or email{" "}
            <a href={CONTACT.emailHref} className="text-violet-400 hover:text-violet-300 font-semibold">
              {CONTACT.email}
            </a>
            .
          </p>
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

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
          >
            <Phone className="w-4 h-4" />
            Talk to sales — {CONTACT.phone}
          </a>
        </div>
      </section>
    </>
  );
}
