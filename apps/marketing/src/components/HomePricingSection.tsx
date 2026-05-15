"use client";

import { Check, Star, X } from "lucide-react";
import { openDiagnosticChat, openSpecialistChat } from "@/components/ZohoSalesIQWidget";

const plans = [
  {
    name: "Starter",
    price: "$347",
    period: "/month",
    badge: null,
    description:
      "For small service businesses that want 24/7 missed call recovery and lead capture without hiring extra staff.",
    featured: false,
    cta: "Get a diagnostic",
    action: openDiagnosticChat,
    features: [
      { text: "24/7 AI call answering", included: true },
      { text: "Missed call recovery", included: true },
      { text: "Automatic lead follow-up", included: true },
      { text: "Email and SMS notifications", included: true },
      { text: "CRM and calendar integration", included: false },
      { text: "No-show reduction workflows", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$497",
    period: "/month",
    badge: "Most recommended",
    description:
      "For growing service businesses that want full AI reception, automatic booking, lead qualification, and no-show reduction.",
    featured: true,
    cta: "Get a diagnostic",
    action: openDiagnosticChat,
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Full CRM integration", included: true },
      { text: "Calendar booking automation", included: true },
      { text: "No-show reduction workflows", included: true },
      { text: "Lead scoring and hot lead alerts", included: true },
      { text: "Priority onboarding and support", included: true },
    ],
  },
  {
    name: "Elite",
    price: "Custom",
    period: "",
    badge: null,
    description:
      "For clinics, law firms, and multi-location service teams that need custom workflows, dedicated support, and enterprise integrations.",
    featured: false,
    cta: "Chat with a specialist",
    action: openSpecialistChat,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Multi-location support", included: true },
      { text: "Custom AI call flows", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Priority 24/7 support", included: true },
      { text: "Custom reporting and analytics", included: true },
    ],
  },
];

export default function HomePricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30 border-y border-gray-800/60">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs tracking-[0.15em] uppercase text-violet-400 font-mono block mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One managed system, priced to pay for itself
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            VOXmatiON starts at <strong className="text-white">$347/month</strong>. If it recovers only 2 to 3 extra jobs per month, it can already pay for itself.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                plan.featured
                  ? "border-violet-500/40 bg-violet-950/20 shadow-2xl shadow-violet-950/30 md:-translate-y-3"
                  : "border-gray-800/70 bg-gray-900/60"
              }`}
            >
              {plan.badge && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                  <Star className="h-3 w-3" />
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-gray-400 leading-relaxed min-h-[5rem] mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-gray-500">{plan.period}</span>}
              </div>
              <div className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-gray-700 shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-gray-200" : "text-gray-600"}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={plan.action}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
                  plan.featured
                    ? "bg-orange-500 text-white hover:bg-orange-400 shadow-lg shadow-orange-950/20"
                    : "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center space-y-2">
          <p className="text-gray-400 text-sm">
            30-day results guarantee: 3 recovered leads or appointments, or we extend free or refund your first month.
          </p>
          <button type="button" onClick={openDiagnosticChat} className="text-sm text-orange-300 font-semibold hover:text-orange-200">
            Calculate my missed call recovery opportunity
          </button>
        </div>
      </div>
    </section>
  );
}
