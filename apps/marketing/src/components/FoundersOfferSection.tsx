"use client";

import { ArrowRight, Lock, Star } from "lucide-react";
import { openDiagnosticChat } from "@/components/ZohoSalesIQWidget";

const perks = [
  "24/7 AI receptionist and missed call recovery",
  "Full CRM and calendar integration",
  "No-show reduction workflows",
  "Lead scoring and hot lead alerts",
  "Done-for-you setup within 72 hours",
  "30-day results guarantee",
  "Lifetime price lock at $347/month",
];

export default function FoundersOfferSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-gray-900 to-orange-950/20 p-8 md:p-12 text-center shadow-2xl shadow-orange-950/20">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-300 mb-6">
            <Star className="h-3 w-3" />
            Founders offer, first 10 clients only
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get the Pro plan at $347/month with lifetime price lock
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The first 10 businesses to join VOXmatiON get Pro-level AI reception, missed call recovery,
            appointment booking, and CRM integration at the Starter price, locked in forever.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8 text-left max-w-2xl mx-auto">
            {perks.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-orange-300 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
            <Lock className="h-3 w-3" />
            In exchange for feedback, performance data, and a testimonial after 60 days.
          </div>
          <button
            type="button"
            onClick={openDiagnosticChat}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-950/20 hover:bg-orange-400 transition-all hover:-translate-y-0.5"
          >
            Claim my founders spot
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="mt-4 text-xs text-gray-600">No contracts. Cancel any time after 30 days.</p>
        </div>
      </div>
    </section>
  );
}
