"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, TrendingUp, ArrowRight } from "lucide-react";

export default function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(20);
  const [avgJobValue, setAvgJobValue] = useState(750);
  const [closeRate, setCloseRate] = useState(30);

  const revenueAtRisk = Math.round(missedCalls * avgJobValue * (closeRate / 100));
  const formattedRisk = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(revenueAtRisk);

  return (
    <section className="relative py-24 bg-[#0B1F3A] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1E4B8F] opacity-8 blur-[150px]" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            ROI Calculator
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            One Recovered Job Can<br />
            <span className="text-gradient-orange">Pay for the System</span>
          </h2>
          <p className="text-gray-400 text-lg">Calculate how much revenue you're losing to unanswered calls.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-dark rounded-4xl p-8 md:p-10 border border-white/5"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              { label: "Monthly Missed Calls", value: missedCalls, setter: setMissedCalls, min: 1, max: 200, step: 1, format: (v: number) => v.toString() },
              { label: "Average Job Value", value: avgJobValue, setter: setAvgJobValue, min: 100, max: 10000, step: 50, format: (v: number) => `$${v.toLocaleString()}` },
              { label: "Close Rate", value: closeRate, setter: setCloseRate, min: 5, max: 90, step: 5, format: (v: number) => `${v}%` },
            ].map(({ label, value, setter, min, max, step, format }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-300">{label}</label>
                  <span className="text-sm font-bold text-[#FF8A1F]">{format(value)}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => setter(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FF8A1F ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 bg-[rgba(255,138,31,0.08)] border border-[rgba(255,138,31,0.25)] rounded-3xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#FF8A1F]" />
                <p className="text-sm text-gray-400 font-medium">Estimated Revenue At Risk</p>
              </div>
              <motion.p
                key={revenueAtRisk}
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl font-extrabold text-gradient-orange"
              >
                {formattedRisk}
              </motion.p>
              <p className="text-xs text-gray-500 mt-1">per month</p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-gray-400 text-center max-w-xs">
                VOXmatiON typically recovers <strong className="text-white">30–60%</strong> of missed call revenue.
              </p>
              <Link href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-gradient text-white font-bold glow-orange hover:opacity-90 transition-all hover:scale-105">
                Recover This Revenue <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
