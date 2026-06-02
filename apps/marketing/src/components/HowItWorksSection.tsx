"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PhoneCall, ClipboardList, Send, ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: PhoneCall,
    title: "Answer",
    headline: "AI Picks Up Instantly",
    description: "The moment a call comes in, VOXmatiON answers — professionally, consistently, and in under 2 seconds. No missed calls, no hold music, no voicemail.",
    items: ["24/7 availability", "Professional greeting", "Natural conversation", "Zero wait time"],
    color: "#FF8A1F",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Qualify",
    headline: "Captures What Matters",
    description: "The AI collects the critical information your team needs before they ever talk to a prospect.",
    items: ["Name & contact info", "Service needed", "Location & urgency", "Budget & intent"],
    color: "#006DFF",
  },
  {
    num: "03",
    icon: Send,
    title: "Route",
    headline: "Delivered to the Right Place",
    description: "Every qualified lead is automatically sent where it needs to go — your CRM, calendar, team, or follow-up sequence.",
    items: ["CRM lead created", "Calendar booking", "Team notification", "Follow-up triggered"],
    color: "#FF8A1F",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-[#060f1f]">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            The Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            How VOXmatiON Turns Calls<br />
            <span className="text-gradient-orange">Into Booked Jobs</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Three automated steps. Zero missed revenue.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="relative"
            >
              {/* Connector */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%+1rem)] w-8 h-0.5 bg-gradient-to-r from-white/20 to-white/5 z-10" />
              )}

              <div className="glass-dark rounded-3xl p-8 border border-white/5 h-full hover:border-[rgba(255,138,31,0.2)] transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}35` }}>
                    <step.icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: step.color }}>
                      Step {step.num}
                    </p>
                    <h3 className="text-2xl font-extrabold text-white">{step.title}</h3>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-3">{step.headline}</h4>
                <p className="text-gray-400 leading-relaxed mb-6">{step.description}</p>

                <ul className="space-y-2.5">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: step.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105">
            See It Live <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
