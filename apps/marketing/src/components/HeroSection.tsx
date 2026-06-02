"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, PhoneCall, CheckCircle2, TrendingUp, Zap } from "lucide-react";

function WaveBars() {
  const heights = [30, 55, 80, 60, 100, 70, 45, 90, 65, 40, 75, 50];
  return (
    <div className="flex items-center gap-[3px] h-12">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-orange-gradient"
          style={{ height: `${h}%` }}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.2 + (i % 4) * 0.15,
            repeat: Infinity,
            delay: i * 0.08,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FloatingCard({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, translateY: [0, -12, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        y: { delay, duration: 0.6 },
        translateY: { delay: delay + 0.6, duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
      className={`absolute glass-dark rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PhoneVisual() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* Pulse rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#FF8A1F]"
          style={{ width: 80 + i * 80, height: 80 + i * 80 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Phone body */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        className="relative z-10 w-36 h-56 rounded-[2.5rem] glass-dark border-2 border-[rgba(30,75,143,0.5)] shadow-[0_0_60px_rgba(0,109,255,0.3),0_0_120px_rgba(0,109,255,0.1)] flex flex-col items-center justify-between p-4"
      >
        {/* Screen top bar */}
        <div className="w-12 h-1.5 rounded-full bg-white/20" />

        {/* Call icon */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-14 h-14 rounded-full bg-orange-gradient flex items-center justify-center glow-orange shadow-[0_0_30px_rgba(255,138,31,0.6)]"
          >
            <PhoneCall className="w-7 h-7 text-white" />
          </motion.div>
          <WaveBars />
          <div className="text-center">
            <p className="text-white text-xs font-semibold">AI Answering</p>
            <p className="text-[#FF8A1F] text-[10px]">Qualifying lead...</p>
          </div>
        </div>

        {/* Home bar */}
        <div className="w-8 h-1 rounded-full bg-white/30" />
      </motion.div>

      {/* Floating cards */}
      <FloatingCard className="-top-4 -left-8 whitespace-nowrap" delay={0.8}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Call Answered</p>
            <p className="text-gray-400 text-[10px]">0.4s response time</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="-bottom-4 -right-6 whitespace-nowrap" delay={1.1}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#FF8A1F]/20 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-[#FF8A1F]" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Job Booked</p>
            <p className="text-gray-400 text-[10px]">$1,200 revenue</p>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="top-1/3 -right-12 whitespace-nowrap" delay={1.4}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1E4B8F]/50 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-[#6BA3FF]" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold">CRM Updated</p>
            <p className="text-gray-400 text-[10px]">Lead qualified</p>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0B1F3A]">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#1E4B8F] opacity-10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF8A1F] opacity-8 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(255,138,31,0.3)] mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A1F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8A1F]" />
              </span>
              <span className="text-sm text-[#FFB347] font-medium">AI-Powered Voice Automation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
            >
              Never Miss<br />
              <span className="text-gradient-orange">Another</span><br />
              Customer Call
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl"
            >
              VOXmatiON answers calls, qualifies leads, follows up instantly,
              and routes every opportunity to the right place — automatically, 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105 shadow-[0_8px_30px_rgba(255,138,31,0.4)]">
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
                See How It Works
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {["Answer every call", "Qualify leads instantly", "Book more jobs", "Update CRM automatically"].map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Phone visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="relative h-96 lg:h-[500px] flex items-center justify-center"
          >
            <PhoneVisual />
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "< 2s", label: "Response Time" },
            { value: "24/7", label: "Always Available" },
            { value: "3×", label: "More Leads Captured" },
            { value: "97%", label: "Call Answer Rate" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center border border-white/5">
              <p className="text-3xl font-extrabold text-gradient-orange mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
