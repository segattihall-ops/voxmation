"use client";

import { ArrowRight, Clock, PhoneCall, ShieldCheck, Zap } from "lucide-react";
import { openDiagnosticChat, openSpecialistChat } from "@/components/ZohoSalesIQWidget";

const trustItems = [
  { icon: Clock, label: "72-hour setup" },
  { icon: ShieldCheck, label: "30-day results guarantee" },
  { icon: PhoneCall, label: "24/7 AI receptionist" },
  { icon: Zap, label: "Done for you" },
];

const stats = [
  { label: "Missed calls recovered this week", value: "14" },
  { label: "Leads auto-qualified", value: "9" },
  { label: "Appointments booked", value: "6" },
  { label: "Estimated revenue recovered", value: "$3,200" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-violet-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Managed AI receptionist and missed call recovery
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            Recover missed calls and turn more leads into{" "}
            <span className="bg-gradient-to-r from-orange-400 to-violet-400 bg-clip-text text-transparent">
              booked appointments automatically.
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
            VOXmatiON is a done-for-you AI communication system. We recover missed calls,
            qualify leads, follow up automatically, and book appointments directly into your calendar.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <button
              type="button"
              onClick={openDiagnosticChat}
              className="flex items-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-orange-900/30 hover:-translate-y-0.5"
            >
              Get a missed call recovery diagnostic
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={openSpecialistChat}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 hover:border-violet-500/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              Chat with a VOXmatiON specialist
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon className="h-4 w-4 text-orange-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-6">
            If VOXmatiON recovers only 2 to 3 missed jobs per month, it can already pay for itself.
          </p>
        </div>

        <div className="rounded-3xl bg-gray-900/70 border border-gray-800/70 p-6 shadow-2xl shadow-violet-950/20">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-violet-300">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Missed call recovery live snapshot
          </div>
          <div className="space-y-3 rounded-2xl bg-gray-950/70 border border-gray-800 p-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-400">{stat.label}</span>
                <span className="font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={openDiagnosticChat}
            className="mt-5 w-full rounded-xl border border-orange-500/30 bg-orange-500/10 py-3 text-sm font-semibold text-orange-300 hover:bg-orange-500/20 transition-colors"
          >
            Calculate my recovery opportunity
          </button>
        </div>
      </div>
    </section>
  );
}
