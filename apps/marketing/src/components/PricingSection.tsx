"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Check, Zap, TrendingUp, Crown, Building2, ToggleLeft, ToggleRight } from "lucide-react";

const PLANS = [
  {
    icon: Zap,
    name: "Starter",
    tagline: "Capture more leads",
    description: "For small businesses that want to respond faster and miss fewer calls.",
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
    savingsPct: 17,
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
    savingsPct: 20,
  },
  {
    icon: Crown,
    name: "Pro",
    tagline: "High volume",
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
    savingsPct: 22,
  },
  {
    icon: Building2,
    name: "White Label",
    tagline: "For agencies",
    description: "Sell VOXmatiON under your own brand. We handle fulfillment.",
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
    savingsPct: 25,
  },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="relative py-28 bg-[#060A10] overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse,rgba(11,31,58,0.5)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#F7F5F0] mb-4 leading-tight">
            Plans That Pay<br />
            <span className="text-orange">For Themselves</span>
          </h2>
          <p className="text-lg text-[#8A99B3] max-w-2xl mx-auto font-body mb-8">
            One recovered call can cover the entire monthly cost. Book a demo to get your custom quote.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-5 py-3 border-subtle">
            <span className={`text-sm font-body font-semibold transition-colors ${!annual ? "text-[#F7F5F0]" : "text-[#8A99B3]"}`}>Monthly</span>
            <button
              onClick={() => setAnnual((a) => !a)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none"
              style={{ background: annual ? "#FF8A1F" : "rgba(255,255,255,0.1)" }}
              aria-label="Toggle billing period"
            >
              <motion.div
                className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                animate={{ x: annual ? 26 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-body font-semibold transition-colors ${annual ? "text-[#F7F5F0]" : "text-[#8A99B3]"}`}>Annual</span>
            <AnimatePresence>
              {annual && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-2.5 py-0.5 rounded-full bg-[rgba(255,138,31,0.2)] text-[#FF8A1F] text-xs font-bold font-body"
                >
                  Save up to 25%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-7 border flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "bg-[linear-gradient(135deg,#0B1F3A,#0D2040)] border-[rgba(255,138,31,0.4)] shadow-[0_0_60px_rgba(255,138,31,0.15)]"
                  : "glass border-subtle hover:border-[rgba(255,138,31,0.2)]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-[#FF8A1F] text-white text-xs font-bold shadow-[0_4px_15px_rgba(255,138,31,0.4)] font-body whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${plan.highlight ? "bg-[rgba(255,138,31,0.15)]" : "bg-[rgba(255,138,31,0.08)]"}`}>
                  <plan.icon className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[#FF8A1F] font-body">
                  {plan.tagline}
                </p>
                <h3 className="font-display text-2xl font-extrabold text-[#F7F5F0]">{plan.name}</h3>
                <p className="text-sm mt-2 text-[#8A99B3] font-body">{plan.description}</p>

                {/* Savings badge */}
                <AnimatePresence>
                  {annual && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden"
                    >
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[rgba(255,138,31,0.15)] text-[#FF8A1F] text-xs font-semibold font-body">
                        Save {plan.savingsPct}% annually
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#FF8A1F]" />
                    <span className="text-[#8A99B3] font-body">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`block text-center py-3.5 rounded-xl font-bold text-sm font-body transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-[#FF8A1F] text-white glow-orange-sm hover:bg-[#FFB347]"
                    : "border border-[rgba(255,138,31,0.35)] text-[#FF8A1F] hover:bg-[rgba(255,138,31,0.08)]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-[#8A99B3] font-body mt-8"
        >
          No contracts. No setup fees. Custom pricing based on your call volume.
        </motion.p>
      </div>
    </section>
  );
}
