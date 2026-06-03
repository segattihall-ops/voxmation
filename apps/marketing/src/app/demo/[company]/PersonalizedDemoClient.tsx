"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, TrendingUp, Clock, DollarSign, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

interface Props {
  companyName: string;
}

const PAIN_POINTS = [
  { icon: Phone, text: "Calls going to voicemail after hours", stat: "62% of calls" },
  { icon: Clock, text: "Leads waiting hours for a callback", stat: "85% don't call back" },
  { icon: DollarSign, text: "Revenue leaking from missed opportunities", stat: "$4,800/week avg" },
];

const HOW_IT_HELPS = [
  "AI answers every call within 2 seconds — day or night",
  "Qualifies the lead, captures job details, and routes hot prospects to you",
  "Sends instant SMS follow-ups to missed callers",
  "Creates CRM leads and books appointments automatically",
  "You wake up to a full pipeline — without lifting a finger",
];

export default function PersonalizedDemoClient({ companyName }: Props) {
  return (
    <main className="min-h-screen bg-[#060A10] text-[#F7F5F0]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-subtle mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-[#FF8A1F]" />
            <span className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest font-body">
              Personalized for {companyName}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          >
            Here's Exactly How<br />
            <span className="text-orange">{companyName}</span><br />
            Stops Losing Calls
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#8A99B3] font-body max-w-2xl mb-10 leading-relaxed"
          >
            We built this page specifically for {companyName}. Below you'll see the exact pain points
            costing you revenue — and how VOXmatiON solves each one automatically.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF8A1F] text-white font-bold font-body text-sm hover:bg-[#FFB347] transition-colors glow-orange-sm"
            >
              <Phone className="w-4 h-4" />
              Call {PHONE_NUMBER}
            </a>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass border-subtle text-[#F7F5F0] font-semibold font-body text-sm hover:border-[rgba(255,138,31,0.3)] transition-colors"
            >
              Book Online Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-16 bg-[#060f1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-extrabold mb-2 text-center"
          >
            Where {companyName} Is Losing Revenue Right Now
          </motion.h2>
          <p className="text-center text-[#8A99B3] font-body mb-12">These aren't hypotheticals. This is industry data for service businesses like yours.</p>

          <div className="grid sm:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border-subtle text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center mx-auto mb-4">
                  <p.icon className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <p className="font-display text-2xl font-extrabold text-[#FF8A1F] mb-2">{p.stat}</p>
                <p className="text-sm text-[#8A99B3] font-body">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it helps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-extrabold mb-6 leading-tight">
                How VOXmatiON Fixes This<br />
                <span className="text-orange">For {companyName}</span>
              </h2>
              <ul className="space-y-4">
                {HOW_IT_HELPS.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0 mt-0.5" />
                    <span className="text-[#8A99B3] font-body">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ROI mini-calc */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 border-subtle"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-[#F7F5F0]">Revenue at Risk</p>
                  <p className="text-xs text-[#8A99B3] font-body">for {companyName}</p>
                </div>
              </div>

              {[
                { label: "Missed calls per week", value: "~18 calls" },
                { label: "% that never call back", value: "85%" },
                { label: "Avg job value", value: "$350" },
                { label: "Weekly revenue lost", value: "$5,355" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2.5 border-b border-[rgba(255,255,255,0.06)] last:border-0">
                  <span className="text-sm text-[#8A99B3] font-body">{row.label}</span>
                  <span className="text-sm font-semibold text-[#F7F5F0] font-body">{row.value}</span>
                </div>
              ))}

              <div className="mt-4 p-4 rounded-xl bg-[rgba(255,138,31,0.08)] border border-[rgba(255,138,31,0.2)]">
                <p className="text-xs text-[#8A99B3] font-body mb-1">Annual revenue at risk</p>
                <p className="font-display text-3xl font-extrabold text-[#FF8A1F]">$278,460</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[linear-gradient(135deg,#0B1F3A_0%,#0D2040_40%,rgba(255,138,31,0.15)_100%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-extrabold mb-4">
              Ready to Stop Losing Calls,<br />
              <span className="text-orange">{companyName}?</span>
            </h2>
            <p className="text-lg text-[#8A99B3] font-body mb-8">
              Book your free 15-minute demo. We'll show you exactly what VOXmatiON would do for your business.
            </p>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-[#FF8A1F] text-white font-bold font-body text-base hover:bg-[#FFB347] transition-colors glow-orange shadow-[0_0_60px_rgba(255,138,31,0.3)]"
            >
              <Phone className="w-5 h-5" />
              Call {PHONE_NUMBER} Now
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
