"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "How fast does VOXmatiON answer calls?",
    a: "The AI answers in under 2 seconds — faster than any human receptionist. No hold music, no voicemail, no missed opportunities.",
  },
  {
    q: "What happens when someone calls after hours?",
    a: "VOXmatiON answers 24/7, 365 days a year. It qualifies the lead, schedules a callback or appointment, and sends all the details to your CRM so your team is ready the next morning.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "We integrate natively with Zoho CRM, HubSpot, and can connect to most CRMs via Zapier. Custom integrations are available on the Pro and White Label plans.",
  },
  {
    q: "How does Missed Call Recovery work?",
    a: "When a call goes unanswered, VOXmatiON sends an immediate SMS to the caller, starts an automated follow-up sequence, and creates a lead in your CRM — usually within 30 seconds of the missed call.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. We can forward your existing business number to VOXmatiON, or provide you with a dedicated number. The setup is non-disruptive to your current operations.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live within 48–72 hours. Our team handles the configuration, script customization, CRM connection, and test calls. You don't need any technical knowledge.",
  },
  {
    q: "Can I customize what the AI says?",
    a: "Absolutely. Every script is customized to your business name, services, tone, and qualification questions. The AI will sound like it was trained specifically for your company.",
  },
  {
    q: "Is there a contract?",
    a: "Plans are month-to-month with no long-term contract required. Enterprise and White Label clients can request annual pricing for a discount.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 bg-[#0B1F3A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Common <span className="text-gradient-orange">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-dark rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-white">{faq.q}</span>
                <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: open === idx ? "#FF8A1F" : "rgba(255,255,255,0.08)" }}>
                  {open === idx ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-gray-400" />}
                </div>
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
