"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { TrendingDown, PhoneMissed, DollarSign, Clock } from "lucide-react";

function Counter({ target, prefix = "", suffix = "", decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return controls.stop;
  }, [inView, target, decimals, count]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const STATS = [
  {
    icon: PhoneMissed,
    stat: { target: 62, suffix: "%" },
    label: "of trade calls go to voicemail",
    sublabel: "during peak hours",
    color: "#FF8A1F",
  },
  {
    icon: TrendingDown,
    stat: { target: 85, suffix: "%" },
    label: "of missed callers never call back",
    sublabel: "they call your competitor instead",
    color: "#FF8A1F",
  },
  {
    icon: DollarSign,
    stat: { prefix: "$", target: 4800, suffix: "", decimals: 0 },
    label: "average revenue lost per week",
    sublabel: "for a 10-truck HVAC operation",
    color: "#FF8A1F",
  },
  {
    icon: Clock,
    stat: { target: 2, suffix: "s" },
    label: "VOXmatiON answers in",
    sublabel: "before they can hang up",
    color: "#22c55e",
  },
];

export default function ProblemStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 bg-[#080D16] overflow-hidden">
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FF8A1F]/30 to-transparent"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] border border-orange-subtle bg-[rgba(255,138,31,0.06)] uppercase tracking-widest font-body">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A1F] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8A1F]" />
            </span>
            The problem is costing you right now
          </span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative glass rounded-2xl p-6 border-subtle overflow-hidden group hover:border-orange-subtle transition-all duration-400"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,138,31,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${s.color}12`, border: `1px solid ${s.color}25` }}>
                <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} strokeWidth={1.75} />
              </div>
              <div className="font-display text-4xl font-extrabold mb-1 tracking-tight" style={{ color: s.color }}>
                <Counter {...s.stat} decimals={s.stat.decimals ?? 0} />
              </div>
              <p className="text-sm text-[#F7F5F0] font-medium font-body leading-snug">{s.label}</p>
              <p className="text-xs text-[#8A99B3] mt-1 font-body">{s.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
