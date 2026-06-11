"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneOff, Zap, CalendarCheck } from "lucide-react";

// NOTE: This section previously displayed fabricated testimonials, invented
// metrics, and real national-brand logos as if they were customers — removed as
// false/misleading. It now states only the industry reality and true product
// capabilities. When real, verifiable customer stories exist, add them back here
// with proper Review/AggregateRating structured data.

const POINTS = [
  {
    icon: PhoneOff,
    title: "Up to 1 in 3 calls goes unanswered",
    body: "Industry studies of home-service businesses consistently find a large share of inbound calls hit voicemail — and most of those callers simply call the next company instead of leaving a message.",
  },
  {
    icon: Zap,
    title: "VOXmatiON answers all of them",
    body: "Every call is answered in under two seconds, 24/7 — nights, weekends, and holidays — with unlimited calls handled at the same time, so a busy spell never sends a customer to voicemail.",
  },
  {
    icon: CalendarCheck,
    title: "And turns them into booked jobs",
    body: "It qualifies the job, captures the details, books the appointment, and texts back anyone it couldn't reach — automatically, on every call.",
  },
];

const STATS = [
  { value: "< 2s", label: "Answer time" },
  { value: "24/7", label: "Always on" },
  { value: "∞", label: "Simultaneous calls" },
  { value: "0", label: "Sent to voicemail" },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-[#060A10]">
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
            Why It Works
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#F7F5F0] mb-4 leading-tight">
            The math on missed calls
          </h2>
          <p className="text-lg text-[#8A99B3] max-w-xl mx-auto font-body">
            Every unanswered call is a job your competitor books instead. Here&apos;s
            how VOXmatiON closes that gap.
          </p>
        </motion.div>

        {/* Three factual points */}
        <div className="grid md:grid-cols-3 gap-6">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55 }}
              className="relative glass rounded-3xl p-8 border-subtle hover:border-[rgba(255,138,31,0.25)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center mb-5 group-hover:bg-[rgba(255,138,31,0.15)] transition-colors">
                <p.icon className="w-6 h-6 text-[#FF8A1F]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[#F7F5F0] mb-3">{p.title}</h3>
              <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* True capability stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {STATS.map((stat) => (
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
