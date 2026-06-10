import { useState } from "react";
import { ChevronDown, Phone, MessageSquareText, CheckCircle, PhoneForwarded, CalendarCheck, Zap } from "lucide-react";
import SEOHead from "../components/SEOHead";
import clsx from "clsx";

const MODULES = [
  {
    icon: Phone,
    title: "24/7 AI Receptionist",
    tagline: "Answers every call in under 2 seconds — day, night, and weekends",
    features: [
      "Natural-sounding AI voice that greets callers with your business name",
      "Sub-2-second pickup so callers never hit voicemail or hold music",
      "Handles overflow when your team is on a job or after hours",
      "Captures caller name, number, service needed, and urgency",
      "Spam and robocall screening so you only hear real leads",
      "Bilingual handling for English and Spanish callers",
    ],
    keywords: "AI receptionist, virtual receptionist for HVAC, 24/7 call answering service",
  },
  {
    icon: MessageSquareText,
    title: "Missed Call Textback",
    tagline: "Recover lost leads with an instant SMS when a call goes unanswered",
    features: [
      "Automatic SMS to any missed or abandoned caller within seconds",
      "Two-way texting so the conversation continues without a callback",
      "Customizable message templates per business and per time of day",
      "Keeps the lead warm until your team can follow up",
      "Works alongside your existing business phone number",
    ],
    keywords: "missed call textback, missed call text back, missed call recovery SMS",
  },
  {
    icon: CheckCircle,
    title: "Lead Qualification",
    tagline: "Screens and scores every caller before it reaches your team",
    features: [
      "Asks the right intake questions: service, location, timeline, budget",
      "Identifies emergencies vs. routine requests automatically",
      "Filters out tire-kickers, vendors, and spam",
      "Tags and prioritizes high-value jobs",
      "Passes a clean, qualified summary to your team",
    ],
    keywords: "lead qualification, call screening, AI lead intake",
  },
  {
    icon: PhoneForwarded,
    title: "Smart Call Routing",
    tagline: "Sends each caller to the right person or location, by your rules",
    features: [
      "Route by service type, location, time of day, or urgency",
      "Emergency calls escalate to on-call staff immediately",
      "After-hours and overflow routing rules you control",
      "Warm transfer to a live person when needed",
      "Multi-location routing for franchises and regional teams",
    ],
    keywords: "call routing, emergency call routing, multi-location call routing",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    tagline: "Turns qualified calls into booked jobs on your calendar",
    features: [
      "Books directly into your calendar during the call",
      "Automated SMS confirmations and reminders to cut no-shows",
      "Collects job details and address up front",
      "Reschedule and cancellation handling by text",
      "Syncs bookings to your CRM and dispatch tools",
    ],
    keywords: "appointment booking, AI scheduling, online booking for service businesses",
  },
  {
    icon: Zap,
    title: "CRM & Automation Sync",
    tagline: "Every call, lead, and booking flows into your tools automatically",
    features: [
      "Two-way sync with HubSpot and Zoho CRM",
      "Call logs, transcripts, and outcomes attached to each contact",
      "Trigger follow-up sequences and review requests automatically",
      "Lead reactivation campaigns for old or cold contacts",
      "Webhooks and Zapier-style automations for everything else",
    ],
    keywords: "AI receptionist CRM integration, HubSpot call sync, Zoho integration",
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
        title="Features — AI Receptionist, Missed Call Textback & Lead Routing"
        description="Explore everything Voxmation does: a 24/7 AI receptionist, missed-call SMS textback, lead qualification, smart call routing, appointment booking, and CRM sync — built for service businesses."
        canonical="/features"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            What Voxmation does
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            A complete front desk for your phone line
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Voxmation answers, qualifies, routes, books, and follows up on every call —
            so your team never has to choose between the job in front of them and the phone.
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
