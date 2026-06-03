"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Flame, Droplets, Home, Zap, Car, Leaf, SprayCanIcon, Sparkles, Scale, Building } from "lucide-react";

const INDUSTRIES = [
  { icon: Flame, label: "HVAC", href: "/industries/hvac-ai-receptionist", color: "#FF8A1F" },
  { icon: Droplets, label: "Plumbing", href: "/industries/plumbing-ai-receptionist", color: "#006DFF" },
  { icon: Home, label: "Roofing", href: "/industries/roofing-ai-receptionist", color: "#FF8A1F" },
  { icon: Zap, label: "Electrical", href: "/industries/electrical-ai-receptionist", color: "#FFB347" },
  { icon: Car, label: "Garage Door", href: "/industries/garage-door-ai-receptionist", color: "#006DFF" },
  { icon: Leaf, label: "Landscaping", href: "/industries/landscaping-ai-receptionist", color: "#22c55e" },
  { icon: SprayCanIcon, label: "Cleaning", href: "/industries/cleaning-ai-receptionist", color: "#FF8A1F" },
  { icon: Sparkles, label: "Med Spa", href: "/industries/medical-spa-ai-receptionist", color: "#a855f7" },
  { icon: Scale, label: "Legal Intake", href: "/industries/legal-intake-ai-receptionist", color: "#006DFF" },
  { icon: Building, label: "Real Estate", href: "/industries/real-estate-ai-receptionist", color: "#FF8A1F" },
];

export default function IndustriesSection() {
  return (
    <section className="relative py-24 bg-[#0B1F3A]">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4">
            Industries
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Built For<br />
            <span className="text-gradient-orange">Service Businesses</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            VOXmatiON is specialized for industries where every call is a potential job.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind, idx) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link href={ind.href}
                className="group flex flex-col items-center gap-3 p-5 glass-dark rounded-2xl border border-white/5 hover:border-[rgba(255,138,31,0.3)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                  <ind.icon className="w-6 h-6 group-hover:scale-110 transition-transform" style={{ color: ind.color }} />
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors text-center">
                  {ind.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
