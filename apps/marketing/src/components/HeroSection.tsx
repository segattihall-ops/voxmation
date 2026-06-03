"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, Zap, PhoneCall } from "lucide-react";

function FloatingCard({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ opacity: { delay, duration: 0.6 }, y: { delay, duration: 0.6 } }}
      className={`absolute glass rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border-subtle ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ delay: delay + 0.6, duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060A10]">
      {/* Background */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#0B1F3A] opacity-60 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FF8A1F] opacity-5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(255,138,31,0.3)] mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A1F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8A1F]" />
              </span>
              <span className="text-sm text-[#FFB347] font-body font-medium">AI-Powered Voice Automation</span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
              {[
                { text: "Never", orange: false },
                { text: "Miss", orange: false },
                { text: "Another", orange: true },
                { text: "Customer", orange: false },
                { text: "Call", orange: false },
              ].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-[0.25em] ${word.orange ? "text-orange" : "text-[#F7F5F0]"}`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg sm:text-xl text-[#8A99B3] font-body leading-relaxed mb-10 max-w-xl"
            >
              VOXmatiON answers calls, qualifies leads, follows up instantly,
              and routes every opportunity to the right place — automatically, 24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-lg glow-orange hover:bg-[#FFB347] transition-all hover:scale-105 shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border-subtle text-[#F7F5F0] font-semibold font-body text-lg hover:bg-white/5 transition-all"
              >
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
                <div key={feat} className="flex items-center gap-2 text-sm text-[#8A99B3] font-body">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" />
                  {feat}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Banner image */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 120 }}
            className="relative flex items-center justify-center"
          >
            {/* Glow behind image */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse,rgba(255,138,31,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative w-full max-w-lg">
              <Image
                src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/Header.PNG"
                alt="VOXmatiON AI Receptionist"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-[0_0_60px_rgba(255,138,31,0.25)]"
                priority
                unoptimized
              />

              {/* Floating cards overlaid on image */}
              <FloatingCard className="-top-4 -left-6 whitespace-nowrap" delay={0.9}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[#F7F5F0] text-xs font-semibold font-body">Call Answered</p>
                    <p className="text-[#8A99B3] text-[10px] font-body">1.8s response time</p>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard className="-bottom-2 -right-4 whitespace-nowrap" delay={1.2}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF8A1F]/20 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF8A1F]" />
                  </div>
                  <div>
                    <p className="text-[#F7F5F0] text-xs font-semibold font-body">Job Booked</p>
                    <p className="text-[#8A99B3] text-[10px] font-body">$1,200 revenue</p>
                  </div>
                </div>
              </FloatingCard>

              <FloatingCard className="top-1/3 -right-8 whitespace-nowrap" delay={1.5}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1E4B8F]/50 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-[#6BA3FF]" />
                  </div>
                  <div>
                    <p className="text-[#F7F5F0] text-xs font-semibold font-body">CRM Updated</p>
                    <p className="text-[#8A99B3] text-[10px] font-body">Lead qualified</p>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "< 2s", label: "Response Time" },
            { value: "24/7", label: "Always Available" },
            { value: "3×", label: "More Leads Captured" },
            { value: "97%", label: "Call Answer Rate" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 text-center border-subtle">
              <p className="font-display text-3xl font-extrabold text-orange mb-1">{stat.value}</p>
              <p className="text-sm text-[#8A99B3] font-body">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
