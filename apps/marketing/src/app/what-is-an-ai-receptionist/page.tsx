import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/what-is-an-ai-receptionist`;

export const metadata: Metadata = {
  title: "What Is an AI Receptionist? How It Works, Cost & Benefits",
  description:
    "An AI receptionist is software that answers phone calls with a natural voice, qualifies callers, books appointments, and routes or texts back leads 24/7. Learn how it works, what it costs, and how it compares to a human answering service.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: "What Is an AI Receptionist?" },
};

const FAQ = [
  {
    q: "What is an AI receptionist?",
    a: "An AI receptionist is software that answers inbound phone calls with a natural-sounding voice, understands what the caller needs, answers questions, qualifies the lead, books appointments, and routes the call or sends a follow-up text — automatically, 24 hours a day, without a human operator.",
  },
  {
    q: "How does an AI receptionist work?",
    a: "When a call comes in, the AI answers in under two seconds, listens to the caller using speech recognition, responds with a conversational AI voice, and follows your business's script. It captures the caller's name, reason for calling, and details, then books the appointment in your calendar, updates your CRM, or transfers to your team when needed.",
  },
  {
    q: "How much does an AI receptionist cost?",
    a: "AI receptionists typically cost far less than a full-time human receptionist or a per-minute answering service. Pricing is usually a predictable monthly subscription based on call volume rather than per-minute fees, which means costs stay stable even during a busy season.",
  },
  {
    q: "Is an AI receptionist better than a human answering service?",
    a: "An AI receptionist answers every call instantly with no hold queue, works 24/7 at one predictable price, and never has a sick day or a busy signal. Human answering services offer a live person for complex conversations but bill per minute and add answer delay. Many businesses use AI for speed and consistency and escalate to a human only when truly needed.",
  },
  {
    q: "Can an AI receptionist book appointments?",
    a: "Yes. A modern AI receptionist like VOXmatiON qualifies the caller, checks availability, and books the appointment directly into your calendar during the call — then confirms by text or email.",
  },
  {
    q: "What businesses use AI receptionists?",
    a: "Home-service businesses (HVAC, plumbing, electrical, roofing, garage door, landscaping, cleaning), medical spas, law firms, and real estate teams use AI receptionists to make sure every call is answered and every lead is captured, even after hours and during call surges.",
  },
];

const STEPS = [
  { n: "1", title: "Answers instantly", body: "The AI picks up every call in under two seconds — no ringing out to voicemail, no hold music." },
  { n: "2", title: "Understands the caller", body: "Speech recognition and conversational AI let it understand natural speech and respond like a trained receptionist." },
  { n: "3", title: "Qualifies the lead", body: "It captures the caller's name, service needed, urgency, and contact details following your script." },
  { n: "4", title: "Books & routes", body: "It books the appointment, updates your CRM, sends a follow-up text, or warm-transfers to your team." },
];

export default function WhatIsAnAIReceptionistPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "What Is an AI Receptionist?", item: PAGE_URL },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is an AI Receptionist? How It Works, Cost & Benefits",
    description:
      "A complete guide to AI receptionists: what they are, how they work, what they cost, and how they compare to a human answering service.",
    mainEntityOfPage: PAGE_URL,
    author: { "@type": "Organization", name: "VOXmatiON", url: SITE_URL },
    publisher: { "@type": "Organization", name: "VOXmatiON", url: SITE_URL },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden mt-16">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
            Guide
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            What is an AI receptionist?
          </h1>
          <p className="text-xl text-[#8A99B3] font-body">
            An AI receptionist is software that answers your phone calls with a natural voice, qualifies callers,
            books appointments, and routes or texts back leads — automatically, 24/7, without a human operator.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-[#8A99B3] font-body leading-relaxed">
          <p>
            Every missed call is a missed customer. Studies of local and home-service businesses consistently find
            that 20–30% of inbound calls go unanswered, and most callers who reach voicemail simply hang up and
            call a competitor. An <strong className="text-[#F7F5F0]">AI receptionist</strong> solves that by making
            sure every single call is answered, qualified, and acted on — instantly.
          </p>
          <p>
            Unlike a traditional voicemail or a per-minute answering service, an AI receptionist holds a real
            conversation. It greets the caller, understands what they need, answers common questions, captures their
            details, and books the job or routes the call — all in seconds, day or night.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-10 text-center">How an AI receptionist works</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,138,31,0.12)] flex items-center justify-center mb-4 font-display font-bold text-[#FF8A1F]">
                  {s.n}
                </div>
                <h3 className="font-display text-lg font-bold text-[#F7F5F0] mb-2">{s.title}</h3>
                <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-6 text-center">Benefits of an AI receptionist</h2>
          <ul className="space-y-3">
            {[
              "Answers every call in under two seconds — 24/7, including nights, weekends, and holidays",
              "Handles unlimited calls at once, so call surges never go to voicemail",
              "Qualifies leads and books appointments automatically",
              "Recovers missed calls with an automatic follow-up text",
              "Costs a fraction of a full-time receptionist, with predictable pricing",
              "Delivers the same professional, on-brand greeting on every call",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 glass rounded-xl px-5 py-4 border border-[rgba(255,255,255,0.05)]">
                <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0 mt-0.5" />
                <span className="text-[#F7F5F0] font-body text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-8 text-center">
            AI receptionist FAQ
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
                <h3 className="font-display text-lg font-semibold text-[#F7F5F0] mb-2">{f.q}</h3>
                <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 border border-[rgba(255,138,31,0.15)]">
            <PhoneCall className="w-10 h-10 text-[#FF8A1F] mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-3">Hear an AI receptionist for yourself</h2>
            <p className="text-[#8A99B3] font-body mb-8">VOXmatiON answers, qualifies, and books — live on a call.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-[#F7F5F0] font-semibold font-body hover:bg-white/5 transition-all">
                Compare options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
