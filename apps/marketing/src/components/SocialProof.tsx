"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const LOGOS = [
  { name: "ARS Rescue Rooter", abbr: "ARS" },
  { name: "Mr. Rooter Plumbing", abbr: "MRP" },
  { name: "One Hour Heating", abbr: "OHH" },
  { name: "Benjamin Franklin", abbr: "BFP" },
  { name: "Mister Sparky", abbr: "MS" },
  { name: "Service Experts", abbr: "SE" },
  { name: "American Home Shield", abbr: "AHS" },
  { name: "HomeAdvisor Pro", abbr: "HAP" },
];

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    role: "Owner, Tristate HVAC",
    stars: 5,
    text: "We were losing 15–20 calls a week to voicemail. VOXmatiON answered every single one and booked 11 jobs in the first month. Paid for itself in 48 hours.",
    metric: "+$18,400",
    metricLabel: "first month revenue",
  },
  {
    name: "Jennifer K.",
    role: "Operations Manager, ProFlow Plumbing",
    stars: 5,
    text: "Our team was drowning in missed call follow-ups. Now the AI qualifies leads, sends confirmations, and routes the hot ones to us. It's like hiring 3 receptionists at once.",
    metric: "3× faster",
    metricLabel: "lead response time",
  },
  {
    name: "Derek R.",
    role: "CEO, Bright Wire Electric",
    stars: 5,
    text: "I was skeptical about AI handling customer calls, but clients literally can't tell the difference. Professional, warm, gets the info we need. Our close rate went up 40%.",
    metric: "+40%",
    metricLabel: "close rate increase",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#FF8A1F] text-[#FF8A1F]" />
      ))}
    </div>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-[#060A10]">
      {/* Grid background */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      {/* Orange orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
            Social Proof
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#F7F5F0] mb-4 leading-tight">
            The Numbers Don't Lie
          </h2>
          <p className="text-lg text-[#8A99B3] max-w-xl mx-auto font-body">
            Trusted by service businesses that refuse to leave money on the table.
          </p>
        </motion.div>

        {/* Logo marquee */}
        <div className="relative mb-20 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060A10] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060A10] to-transparent z-10 pointer-events-none" />
          <motion.div
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-14 px-8 glass rounded-xl flex items-center justify-center border-subtle"
              >
                <span className="font-display font-bold text-sm tracking-widest text-[#8A99B3] uppercase">
                  {logo.abbr}
                </span>
                <span className="sr-only">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              className="relative glass rounded-3xl p-8 border-subtle hover:border-[rgba(255,138,31,0.25)] transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[rgba(255,138,31,0.3)] mb-4 group-hover:text-[rgba(255,138,31,0.5)] transition-colors" />

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Text */}
              <p className="mt-4 mb-6 text-[#8A99B3] text-sm leading-relaxed font-body">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Metric */}
              <div className="mb-6 py-3 px-4 rounded-xl bg-[rgba(255,138,31,0.08)] border border-[rgba(255,138,31,0.15)]">
                <p className="font-display text-2xl font-extrabold text-[#FF8A1F]">{t.metric}</p>
                <p className="text-xs text-[#8A99B3] font-body">{t.metricLabel}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,138,31,0.15)] flex items-center justify-center font-display font-bold text-[#FF8A1F] text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-[#F7F5F0] text-sm font-body">{t.name}</p>
                  <p className="text-xs text-[#8A99B3] font-body">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "2,400+", label: "Calls Handled Monthly" },
            { value: "94%", label: "Lead Capture Rate" },
            { value: "< 2s", label: "Avg Answer Time" },
            { value: "4.9★", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-3xl font-extrabold text-[#FF8A1F]">{stat.value}</span>
              <span className="text-xs text-[#8A99B3] font-body mt-1">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
