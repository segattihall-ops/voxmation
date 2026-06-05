import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, Clock, Shield, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";

const PAGE_URL = `${SITE_URL}/ai-receptionist`;


export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
  title: "AI Receptionist for Home-Service Pros — Answer Every Call 24/7",
  description: "VOXmatiON's AI receptionist answers HVAC, plumbing, electrical & roofing calls in under 2 seconds, 24/7, across Dallas–Fort Worth, Houston & Austin — qualifying leads and booking jobs automatically.",
};

const BENEFITS = [
  { icon: Clock, title: "24/7 Availability", description: "Never misses a call, not even at 3am or on holidays." },
  { icon: Zap, title: "Under 2-Second Answer", description: "Faster than any human receptionist — no hold music, no voicemail." },
  { icon: Shield, title: "Consistent & Professional", description: "Every caller gets the same high-quality experience every time." },
  { icon: TrendingUp, title: "More Booked Jobs", description: "Qualifies intent and books appointments directly to your calendar." },
  { icon: Users, title: "Lower Admin Workload", description: "Your team handles only pre-qualified, ready-to-buy leads." },
  { icon: Phone, title: "Works With Your Number", description: "Forward your existing number — zero disruption to your business." },
];

export default function AIReceptionistPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center py-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#FF8A1F] opacity-8 blur-[120px] rounded-full" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            AI Receptionist
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            An AI Receptionist<br />
            <span className="text-gradient-orange">That Works 24/7</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Give your business a professional voice assistant that answers calls, captures details, qualifies leads, and sends every opportunity to the right place — without a single human involved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105">
              Book AI Receptionist Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#060f1f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">Why Businesses Choose <span className="text-gradient-orange">VOXmatiON</span></h2>
            <p className="text-gray-400 text-lg">Everything you get with an AI Receptionist.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="glass-dark rounded-3xl p-7 border border-white/5 hover:border-[rgba(255,138,31,0.2)] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(255,138,31,0.12)] border border-[rgba(255,138,31,0.2)] flex items-center justify-center mb-4">
                  <b.icon className="w-6 h-6 text-[#FF8A1F]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />
      <FAQSection />
    </>
  );
}
