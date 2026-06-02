"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, TrendingUp, Crown, Building2 } from "lucide-react";

const PLANS = [
  {
    icon: Zap,
    name: "Starter",
    tagline: "Start capturing more leads",
    description: "For small businesses that want to capture and respond faster.",
    features: [
      "Missed Call SMS Recovery",
      "Basic Lead Capture",
      "Email Notification",
      "CRM Lead Creation",
      "Basic Monthly Report",
    ],
    cta: "Get Started",
    ctaHref: "/demo",
    highlight: false,
  },
  {
    icon: TrendingUp,
    name: "Growth",
    tagline: "Most popular",
    description: "The complete system for serious service businesses.",
    features: [
      "AI Receptionist 24/7",
      "Missed Call Recovery",
      "Lead Qualification",
      "SMS Follow Up",
      "CRM Automation",
      "Appointment Routing",
      "Monthly Performance Report",
    ],
    cta: "Book Growth Demo",
    ctaHref: "/demo",
    highlight: true,
  },
  {
    icon: Crown,
    name: "Pro",
    tagline: "High volume operations",
    description: "For businesses with higher call volume and multiple locations.",
    features: [
      "Everything in Growth",
      "Multi Location Routing",
      "Advanced Call Logic",
      "AI Customer Support",
      "Review Request Automation",
      "Lead Reactivation",
      "Weekly Reporting",
      "Priority Setup",
    ],
    cta: "Apply for Pro",
    ctaHref: "/demo",
    highlight: false,
  },
  {
    icon: Building2,
    name: "White Label",
    tagline: "For agencies",
    description: "Sell VOXmatiON under your own brand while we handle fulfillment.",
    features: [
      "Branded AI Receptionist",
      "Client Management Workflow",
      "Agency Dashboard",
      "Fulfillment Support",
      "Setup Templates",
      "Reseller Pricing",
    ],
    cta: "Partner With Us",
    ctaHref: "/contact",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-24 bg-[#060f1f]">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Plans That Pay<br />
            <span className="text-gradient-orange">For Themselves</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            One recovered call can cover the entire monthly cost. Book a demo to get your custom quote.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-7 border flex flex-col ${
                plan.highlight
                  ? "bg-blue-gradient border-[#006DFF] shadow-[0_0_60px_rgba(0,109,255,0.25)]"
                  : "glass-dark border-white/5 hover:border-white/10"
              } transition-all duration-300 hover:-translate-y-1`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-orange-gradient text-white text-xs font-bold shadow-[0_4px_15px_rgba(255,138,31,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${plan.highlight ? "bg-white/10" : "bg-[rgba(255,138,31,0.1)]"}`}>
                  <plan.icon className={`w-5 h-5 ${plan.highlight ? "text-white" : "text-[#FF8A1F]"}`} />
                </div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.highlight ? "text-white/60" : "text-[#FF8A1F]"}`}>
                  {plan.tagline}
                </p>
                <h3 className="text-2xl font-extrabold text-white">{plan.name}</h3>
                <p className={`text-sm mt-2 ${plan.highlight ? "text-white/70" : "text-gray-400"}`}>{plan.description}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-white" : "text-[#FF8A1F]"}`} />
                    <span className={plan.highlight ? "text-white/80" : "text-gray-300"}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-orange-gradient text-white glow-orange"
                    : "border border-[rgba(255,138,31,0.4)] text-[#FF8A1F] hover:bg-[rgba(255,138,31,0.1)]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
