import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar, PhoneIncoming, PhoneCall, Clock, MessageSquare,
  CheckCircle, ArrowRight, Phone
} from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Use Cases — Voice Automation for Every Business";
  const description =
    "See how Voxmation powers appointment reminders, inbound IVR menus, outbound voice campaigns, after-hours call handling, and survey collection — with real results.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/use-cases` },
    openGraph: {
      title: "Use Cases — Voxmation Voice Automation",
      description:
        "Real-world voice automation use cases: appointment reminders, IVR menus, outbound campaigns, after-hours handling, and customer surveys.",
      url: `${SITE_URL}/use-cases`,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation Use Cases" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const USE_CASES = [
  {
    id: "appointment-reminders",
    icon: Calendar,
    tag: "Healthcare · Professional Services · Fitness",
    title: "Automated Appointment Reminders",
    description:
      "No-shows cost businesses billions every year. Voxmation sends automated voice reminders 24–48 hours before appointments — collecting confirmations, cancellations, or reschedule requests without a single staff member dialing a phone.",
    benefits: [
      "Reduce no-show rates by 30–50% with proactive voice reminders",
      "Collect confirmation (press 1), cancellation (press 2), or callback (press 3) in a single call",
      "Automatically update your CRM or scheduling system with responses",
      "Send follow-up SMS for callers who don't answer",
      "Configurable send windows: call no earlier than 8am, no later than 8pm in caller's timezone",
      "HIPAA-eligible deployment for healthcare practices",
    ],
    cta: "Set up appointment reminders",
  },
  {
    id: "ivr-menus",
    icon: PhoneIncoming,
    tag: "Customer Service · Sales · Support",
    title: "Inbound IVR Menus",
    description:
      "Route every inbound call to the right place instantly — without putting callers on hold or requiring a live receptionist. Voxmation's IVR handles qualification, routing, and information delivery 24/7.",
    benefits: [
      "Handle 80%+ of inbound calls without a live agent (industry benchmark: 60–70%)",
      "Speech recognition: callers say what they need instead of pressing keys",
      "Schedule-aware routing: different flows for business hours, evenings, and weekends",
      "CRM screen-pop: surface the caller's account before your agent picks up",
      "Multi-level menus with up to 10 options per level and 2-level depth",
      "Overflow routing: automatic failover to voicemail or another queue on high volume",
    ],
    cta: "Build your IVR menu",
  },
  {
    id: "outbound-campaigns",
    icon: PhoneCall,
    tag: "Collections · Sales · Marketing",
    title: "Outbound Voice Campaigns",
    description:
      "Reach your entire contact list with a personalized voice message in minutes. Whether you're sending payment reminders, lead qualifications, or promotional announcements, Voxmation dials at scale while staying compliant.",
    benefits: [
      "Upload a CSV list or pull contacts directly from your CRM via API",
      "Configure dialing rate and concurrent channels to match your trunk capacity",
      "Answering machine detection (AMD): separate messages for live answers vs. voicemail",
      "DTMF capture: collect responses, opt-outs, and callback requests in real time",
      "Built-in DNC scrubbing: automatically skip numbers on your Do Not Call list",
      "Real-time dashboard: monitor campaign progress, dispositions, and conversions live",
    ],
    cta: "Launch an outbound campaign",
  },
  {
    id: "after-hours",
    icon: Clock,
    tag: "Professional Services · Retail · Healthcare",
    title: "After-Hours Call Handling",
    description:
      "Every call that hits voicemail during off-hours is a potential lost customer. Voxmation's after-hours flow captures the caller's intent, offers callback scheduling, and routes emergencies to on-call staff — automatically.",
    benefits: [
      "Greet callers with a professional after-hours message 365 days a year",
      "Offer callback scheduling: collect name, number, and best callback time",
      "Emergency routing: callers who press 0 or say 'urgent' reach an on-call number",
      "Voicemail-to-CRM: transcribe and attach every voicemail to the caller's record",
      "Automatic callback reminders sent to your team the next business day",
      "Configurable hours by day: different flows for weekdays, weekends, and holidays",
    ],
    cta: "Set up after-hours handling",
  },
  {
    id: "surveys",
    icon: MessageSquare,
    tag: "Customer Success · Research · Quality Assurance",
    title: "Voice Survey & Feedback Collection",
    description:
      "Collect customer feedback at scale with automated post-interaction voice surveys. Higher response rates than email, richer data than NPS alone, and zero survey fatigue from text-heavy forms.",
    benefits: [
      "Trigger surveys automatically after call, visit, or transaction completion",
      "Collect NPS, CSAT, or custom scored responses via DTMF keypress",
      "Open-ended voice feedback: record caller's response and transcribe with AI",
      "Real-time results dashboard with score breakdowns by date, location, and agent",
      "Alert routing: low NPS scores trigger an immediate callback task in your CRM",
      "Export survey data as CSV or pipe to your data warehouse via webhook",
    ],
    cta: "Start collecting voice feedback",
  },
];

export default function UseCasesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Use Cases", item: `${SITE_URL}/use-cases` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Real-World Applications
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Voice automation for every business interaction
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From appointment reminders to large-scale outbound campaigns — see how Voxmation automates the phone calls that take up your team's day.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-20">
          {USE_CASES.map((uc, idx) => {
            const Icon = uc.icon;
            const isEven = idx % 2 === 0;
            return (
              <div key={uc.id} id={uc.id} className="scroll-mt-20">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <span className="inline-block text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-4">
                      {uc.tag}
                    </span>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white">{uc.title}</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">{uc.description}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      {uc.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`bg-gray-900/40 border border-gray-800/60 rounded-2xl p-6 ${!isEven ? "lg:order-1" : ""}`}>
                    <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Key Benefits</h3>
                    <ul className="space-y-3">
                      {uc.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/50 to-indigo-900/30 border border-violet-500/20 p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Not sure which use case fits your business?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Call us and we'll help you map the right voice automation flow to your specific situation — no obligation.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 font-bold text-xl mb-6 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {PHONE_NUMBER}
            </a>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200"
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/features"
                className="px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors"
              >
                View All Features
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
