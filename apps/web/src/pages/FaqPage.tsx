import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "../components/SEOHead";
import clsx from "clsx";

const FAQS = [
  {
    q: "What is an AI receptionist?",
    a: "An AI receptionist is software that answers your business phone, talks to callers in a natural voice, and handles the same tasks a human receptionist would — greeting callers, qualifying leads, answering common questions, booking appointments, and routing or escalating calls. Voxmation does this 24/7 and answers in under two seconds, so you never miss a customer.",
  },
  {
    q: "How does missed call textback work?",
    a: "When a call comes in that isn't answered — because you're on a job, it's after hours, or all lines are busy — Voxmation automatically sends the caller a text message within seconds. The caller can reply by text to ask questions or book, keeping the lead warm instead of calling your competitor. This is one of the fastest ways for a service business to recover lost revenue.",
  },
  {
    q: "Which businesses is Voxmation built for?",
    a: "Voxmation is built for home-service and field-service businesses — HVAC, plumbing, electrical, roofing, garage door, pest control, landscaping, and similar trades. These businesses live and die by inbound calls, often miss them while on a job, and lose real money every time a call goes to voicemail.",
  },
  {
    q: "How fast does Voxmation answer a call?",
    a: "Voxmation answers in under two seconds. Speed matters: studies consistently show that callers hire the first business that responds, and most won't leave a voicemail. Answering instantly — and texting back anything you miss — puts you ahead of slower competitors.",
  },
  {
    q: "Can the AI qualify leads and route calls?",
    a: "Yes. Voxmation asks intake questions to understand the service needed, location, urgency, and timeline, then routes the caller based on your rules — escalating emergencies to on-call staff, sending callers to the right location, or warm-transferring to a person when needed.",
  },
  {
    q: "Does Voxmation integrate with my CRM?",
    a: "Yes. Voxmation syncs calls, leads, and bookings to CRMs like HubSpot and Zoho, attaches transcripts and outcomes to each contact, and can trigger your follow-up automations, review requests, and lead-reactivation campaigns.",
  },
  {
    q: "How is Voxmation priced?",
    a: "Pricing is based on call volume rather than an unpredictable per-minute meter. Plans range from Starter (missed-call textback and basic capture) to Growth and Pro (full 24/7 receptionist, qualification, routing, and booking), plus a White Label tier for agencies. Contact sales for a quote matched to your volume.",
  },
  {
    q: "Will there be surprise per-minute charges?",
    a: "No. Many AI answering services bill $0.50–$0.85 per extra minute, which spikes your bill in busy season. Voxmation plans are sized to your call volume so your cost stays predictable month to month.",
  },
  {
    q: "How is Voxmation different from a human answering service?",
    a: "Human answering services like Smith.ai charge per call or per minute, which gets expensive and unpredictable at high volume, and they can't always answer instantly. Voxmation answers every call in under two seconds, qualifies and routes automatically, recovers missed calls by SMS, and keeps pricing predictable.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live within a few days. We configure your greeting, qualification questions, routing rules, and CRM integrations, then test against live calls before going live.",
  },
  {
    q: "Can agencies resell Voxmation?",
    a: "Yes. The White Label plan gives marketing agencies and technology resellers a branded AI receptionist, rapid setup templates, partner pricing, and a dedicated dashboard to manage multiple clients.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-200">{q}</span>
        <ChevronDown className={clsx("w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <p className="pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://voxmation.com/faq" },
    ],
  };

  return (
    <>
      <SEOHead
        title="FAQ — AI Receptionist & Missed Call Recovery Questions"
        description="Common questions about Voxmation: how the AI receptionist works, missed-call textback, lead qualification, call routing, CRM integration, pricing, and setup for service businesses."
        canonical="/faq"
        jsonLd={[faqSchema, breadcrumb]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Frequently asked questions
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about Voxmation — the AI receptionist and missed-call recovery service for service businesses.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto bg-gray-900/30 border border-gray-800/60 rounded-2xl px-6">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>
    </>
  );
}
