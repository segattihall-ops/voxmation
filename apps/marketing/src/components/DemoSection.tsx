"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Calendar, ArrowRight, Play } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative py-24 bg-[#060f1f] overflow-hidden">
      <div className="absolute inset-0 bg-blue-gradient opacity-10" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#FF8A1F] opacity-5 blur-[150px] rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            Live Demo
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            See VOXmatiON Answer,<br />
            Qualify,{" "}
            <span className="text-gradient-orange">and Route</span>
            <br />a Lead in Real Time
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Watch the AI pick up a call, qualify the prospect, update the CRM, and book the appointment — completely automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105">
              <Calendar className="w-5 h-5" />
              Book a Demo
            </Link>
            <a href="tel:+18446877999"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all">
              <Phone className="w-5 h-5 text-[#FF8A1F]" />
              Call Demo Line
            </a>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Incoming Call", "AI Answers", "Lead Qualified", "CRM Updated", "Job Booked"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="glass-dark rounded-xl px-4 py-2.5 border border-white/5">
                  <p className="text-sm font-semibold text-white">{step}</p>
                </div>
                {i < 4 && <ArrowRight className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
