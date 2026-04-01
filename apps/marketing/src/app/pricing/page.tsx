import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";
import PricingFaqAccordion from "@/components/PricingFaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Pricing — Voice Prompt Automation Plans";
  const description =
    "Voxmation offers self-hosted (free/open-source), cloud-managed, and enterprise pricing for voice prompt automation. No per-minute markup. Choose the plan that fits your scale.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/pricing` },
    openGraph: {
      title: "Pricing — Voxmation Voice Automation",
      description:
        "Self-hosted free tier, cloud-managed coming soon, and enterprise plans for large-scale voice automation deployments.",
      url: `${SITE_URL}/pricing`,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation Pricing" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const SELF_HOSTED_FEATURES = [
  "Visual call flow builder (unlimited flows)",
  "IVR menu designer with speech recognition",
  "Outbound campaign dialer",
  "Asterisk / FreeSWITCH / Twilio support",
  "Real-time analytics and call monitoring",
  "AI transcription via Whisper (on-prem)",
  "Unlimited users — no per-seat fees",
  "Full REST API with OpenAPI spec",
  "RBAC and audit logging",
  "Call recording with configurable retention",
  "MIT License — modify and extend freely",
  "Community support (GitHub Discussions)",
];

const CLOUD_FEATURES = [
  "Everything in Self-Hosted",
  "Managed infrastructure — zero server ops",
  "Automated backups and point-in-time recovery",
  "One-click upgrades to new versions",
  "99.9% SLA-backed uptime",
  "Priority support via email and Slack",
  "Custom domain and SSL provisioning",
  "Usage dashboard and cost alerts",
  "Managed Twilio/SIP trunk setup",
  "HIPAA-eligible deployment configuration",
];

const ENTERPRISE_FEATURES = [
  "Everything in Cloud-Managed",
  "Dedicated infrastructure (single-tenant)",
  "Custom SLA with guaranteed response times",
  "SSO via SAML 2.0 / OAuth 2.0",
  "White-label and custom branding",
  "Dedicated customer success manager",
  "Custom integrations and professional services",
  "On-site deployment and training available",
  "Advanced compliance: SOC 2, HIPAA, PCI",
  "Volume discounts on telephony minutes",
];

const COMPARISON_TABLE = [
  { feature: "Call flow builder", selfHosted: true, cloud: true, enterprise: true },
  { feature: "Outbound campaign dialer", selfHosted: true, cloud: true, enterprise: true },
  { feature: "IVR with speech recognition", selfHosted: true, cloud: true, enterprise: true },
  { feature: "Asterisk / FreeSWITCH support", selfHosted: true, cloud: true, enterprise: true },
  { feature: "Real-time analytics", selfHosted: true, cloud: true, enterprise: true },
  { feature: "AI transcription (on-prem)", selfHosted: true, cloud: true, enterprise: true },
  { feature: "Managed hosting", selfHosted: false, cloud: true, enterprise: true },
  { feature: "Automated backups", selfHosted: false, cloud: true, enterprise: true },
  { feature: "Priority support", selfHosted: false, cloud: true, enterprise: true },
  { feature: "SSO / SAML", selfHosted: false, cloud: false, enterprise: true },
  { feature: "Custom SLA", selfHosted: false, cloud: false, enterprise: true },
  { feature: "Dedicated infrastructure", selfHosted: false, cloud: false, enterprise: true },
];

const PRICING_FAQ = [
  {
    q: "Is the self-hosted version really free forever?",
    a: "Yes. Voxmation is MIT licensed. Deploy it, modify it, and use it commercially — no fee, no expiry, no feature gates. Your only cost is the infrastructure you run it on.",
  },
  {
    q: "Do I need Asterisk or FreeSWITCH to use Voxmation?",
    a: "No. Voxmation works with Twilio out of the box — no PBX required. If you have Asterisk or FreeSWITCH, we integrate directly via AMI/AGI and ESL for lower per-minute costs.",
  },
  {
    q: "When will cloud-managed hosting be available?",
    a: "We're building out cloud-managed infrastructure now. Join the waitlist to be notified at launch and lock in early pricing.",
  },
  {
    q: "What's included in the enterprise plan?",
    a: "Dedicated infrastructure, custom SLA, SSO, white-label options, a dedicated customer success manager, and professional services. Contact our sales team for a custom quote.",
  },
  {
    q: "Does Voxmation mark up telephony minutes?",
    a: "On self-hosted deployments, you pay your SIP trunk or Twilio directly — no Voxmation markup. Cloud-managed and enterprise plans include telephony at cost or with volume discounts.",
  },
  {
    q: "Is Voxmation HIPAA compliant?",
    a: "Self-hosted deployments can be configured for HIPAA compliance when paired with the right infrastructure choices (encrypted storage, network controls). Cloud-managed and enterprise plans include HIPAA-eligible configuration as part of the setup.",
  },
];

export default function PricingPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Voxmation — Voice Prompt Automation",
    description: "Voice prompt automation platform with IVR, outbound campaigns, and AI transcription.",
    offers: [
      {
        "@type": "Offer",
        name: "Self-Hosted",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, faqSchema]) }}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-gray-400">
            Self-host for free. Scale to cloud when you're ready. Talk to us for enterprise.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
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
              href="https://github.com/voxmation/voxmation"
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
              <p className="text-gray-500 text-sm">Managed hosting — zero infrastructure overhead.</p>
            </div>
            <form
              action="mailto:info@voxmation.com"
              method="get"
              encType="text/plain"
              className="mb-8"
            >
              <div className="flex gap-2">
                <input
                  type="email"
                  name="body"
                  placeholder="you@company.com"
                  className="flex-1 px-3 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
            <ul className="space-y-3">
              {CLOUD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-gray-700/60 rounded-3xl p-8 bg-gray-900/20">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded-full mb-4">Enterprise</span>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-white">Custom</span>
              </div>
              <p className="text-gray-500 text-sm">Dedicated infrastructure. Custom SLA. White-glove support.</p>
            </div>
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold rounded-xl transition-colors border border-gray-700 mb-3"
            >
              <Phone className="w-4 h-4" />
              {PHONE_NUMBER}
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-400 text-sm font-medium rounded-xl transition-colors mb-8"
            >
              Contact Sales →
            </Link>
            <ul className="space-y-3">
              {ENTERPRISE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-800/60">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400">Self-Hosted</th>
                  <th className="px-6 py-4 text-sm font-semibold text-violet-400">Cloud</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}>
                    <td className="px-6 py-3.5 text-sm text-gray-300">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center text-sm">
                      {row.selfHosted ? <span className="text-emerald-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="px-6 py-3.5 text-center text-sm">
                      {row.cloud ? <span className="text-emerald-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                    <td className="px-6 py-3.5 text-center text-sm">
                      {row.enterprise ? <span className="text-emerald-400">✓</span> : <span className="text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Pricing FAQ</h2>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl px-6">
            <PricingFaqAccordion items={PRICING_FAQ} />
          </div>
        </div>
      </section>
    </>
  );
}
