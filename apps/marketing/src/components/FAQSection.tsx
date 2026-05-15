"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { openDiagnosticChat, openSpecialistChat } from "@/components/ZohoSalesIQWidget";

const faqs = [
  {
    q: "Is this just another chatbot?",
    a: "No. VOXmatiON is a managed AI communication system that answers inbound calls, recovers missed calls, qualifies leads, follows up automatically, and books appointments directly into your calendar. It works by voice, not just text chat.",
  },
  {
    q: "How much does VOXmatiON cost?",
    a: "VOXmatiON starts at $347 per month for a fully managed AI receptionist and missed call recovery system. If it recovers only 2 to 3 extra jobs per month, it can already pay for itself.",
  },
  {
    q: "How long does setup take?",
    a: "Most setups are completed within 72 hours after we receive your business details, call flow, phone setup requirements, and calendar access. We handle everything for you.",
  },
  {
    q: "What if it does not work for my business?",
    a: "VOXmatiON includes a 30-day results guarantee. If you do not get at least 3 recovered leads or booked appointments in the first 30 days, we will either extend your service free or refund your first month.",
  },
  {
    q: "What types of businesses is this for?",
    a: "HVAC, plumbing, roofing, cleaning, electrical, clinics, law firms, and any service team that misses calls or loses leads to slow follow-up.",
  },
  {
    q: "Does it integrate with my CRM and calendar?",
    a: "Yes. VOXmatiON integrates with Zoho CRM, GoHighLevel, Jobber, ServiceTitan, Google Calendar, and most other tools used by service businesses.",
  },
  {
    q: "What happens to the leads it captures?",
    a: "Leads are automatically created in your CRM with lead source, business type, estimated missed calls, average job value, and chat transcript. Your team is notified instantly and a follow-up task is created.",
  },
  {
    q: "Can I still talk to a real person?",
    a: "Yes. When a visitor or caller requests a human, we notify your team immediately and flag it as a priority follow-up.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.15em] uppercase text-violet-400 font-mono block mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Common questions</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">Everything you need to know before getting started.</p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div key={faq.q} className="rounded-2xl border border-gray-800/70 bg-gray-950/60 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-gray-100 hover:bg-gray-900/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-violet-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6 text-center">
          <p className="text-sm text-gray-400 mb-4">
            Still have questions? Chat with a VOXmatiON specialist and calculate your missed call recovery opportunity in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={openDiagnosticChat}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-400 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Get a free diagnostic
            </button>
            <button
              type="button"
              onClick={openSpecialistChat}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 px-5 py-2.5 text-sm font-semibold text-violet-300 hover:bg-violet-500/10 transition-all"
            >
              Chat with a specialist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
