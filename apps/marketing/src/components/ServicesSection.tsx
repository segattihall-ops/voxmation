"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageSquare, Target, Route, Calendar, BarChart3, RefreshCw, Star, Headphones, Globe } from "lucide-react";

const SERVICES = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Answers calls 24/7, collects caller information, and keeps your business available even after hours.",
    href: "/ai-receptionist",
    color: "#FF8A1F",
  },
  {
    icon: RefreshCw,
    title: "Missed Call Recovery",
    description: "Instantly texts back missed calls, starts AI follow-up, and recovers the lead before your competitor does.",
    href: "/missed-call-recovery",
    color: "#006DFF",
  },
  {
    icon: Target,
    title: "Lead Qualification",
    description: "AI asks service type, location, urgency, and budget — so you only talk to ready-to-buy prospects.",
    href: "/services#lead-qualification",
    color: "#FF8A1F",
  },
  {
    icon: Route,
    title: "Smart Lead Routing",
    description: "Routes leads to the right team, branch, or technician based on city, service type, or deal value.",
    href: "/services#smart-routing",
    color: "#006DFF",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description: "Books calls, visits, and estimates directly onto your calendar — no human involvement required.",
    href: "/services#appointment-booking",
    color: "#FF8A1F",
  },
  {
    icon: BarChart3,
    title: "CRM Automation",
    description: "Creates and updates leads in Zoho, HubSpot, or your CRM with status, score, notes, and history.",
    href: "/services#crm-automation",
    color: "#006DFF",
  },
  {
    icon: MessageSquare,
    title: "AI Follow Up",
    description: "Automated SMS, email, and voice follow-ups for leads that didn't respond, book, or close.",
    href: "/services#ai-follow-up",
    color: "#FF8A1F",
  },
  {
    icon: Star,
    title: "Review Requests",
    description: "After service completion, automatically sends review requests to Google Business Profile.",
    href: "/services#review-requests",
    color: "#006DFF",
  },
  {
    icon: Headphones,
    title: "AI Customer Support",
    description: "Answers FAQs about services, hours, coverage areas, pricing, and next steps automatically.",
    href: "/services#ai-support",
    color: "#FF8A1F",
  },
  {
    icon: Globe,
    title: "White Label Program",
    description: "Agencies can sell VOXmatiON under their own brand while our system handles the fulfillment.",
    href: "/services#white-label",
    color: "#006DFF",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-[#0B1F3A]">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Everything You Need to<br />
            <span className="text-gradient-orange">Convert Calls Into Revenue</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A complete AI voice automation system built specifically for service businesses.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link href={service.href} className="group block h-full">
                <div className="relative h-full glass-dark rounded-3xl p-6 border border-white/5 hover:border-[rgba(255,138,31,0.3)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:-translate-y-1">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}
                  >
                    <service.icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FF8A1F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
