import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, MessageSquare, Bot, CheckCircle, Calendar, Database, ArrowRight } from "lucide-react";
import DemoSection from "@/components/DemoSection";

const PAGE_URL = `${SITE_URL}/missed-call-recovery`;


export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
  title: "Missed Call Recovery for Service Businesses — Never Lose a Lead",
  description: "When your HVAC, plumbing, or roofing team misses a call, VOXmatiON texts back in seconds, captures and qualifies the lead, and helps book the job — serving DFW, Houston & Austin.",
};

const STEPS = [
  { icon: AlertCircle, title: "Missed Call Detected", desc: "System detects the unanswered call within seconds.", color: "#FF8A1F" },
  { icon: MessageSquare, title: "Instant SMS Sent", desc: "Automated text goes to the caller immediately — before they call a competitor.", color: "#006DFF" },
  { icon: Bot, title: "AI Follows Up", desc: "Conversational AI engages via SMS to understand what they need.", color: "#FF8A1F" },
  { icon: CheckCircle, title: "Lead Qualified", desc: "Service type, location, urgency, and budget are captured automatically.", color: "#006DFF" },
  { icon: Calendar, title: "Job Is Booked", desc: "AI schedules a callback or appointment directly in your calendar.", color: "#FF8A1F" },
  { icon: Database, title: "CRM Updated", desc: "Lead is created in your CRM with full context and deal stage.", color: "#006DFF" },
];

export default function MissedCallRecoveryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center py-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#FF8A1F] opacity-8 blur-[120px] rounded-full" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            Missed Call Recovery
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Every Missed Call<br />
            <span className="text-gradient-orange">Is Lost Revenue</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            VOXmatiON responds instantly when your team misses a call — captures the lead, qualifies the request, and helps book the job before your competitor even picks up.
          </p>
          <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105">
            Recover Missed Calls <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Flow */}
      <section className="py-24 bg-[#060f1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold mb-4">What Happens When a Call Is <span className="text-gradient-orange">Missed</span></h2>
            <p className="text-gray-400 text-lg">Six automated steps. Zero revenue lost.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="glass-dark rounded-3xl p-6 border border-white/5 hover:border-[rgba(255,138,31,0.2)] transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Step {i + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
