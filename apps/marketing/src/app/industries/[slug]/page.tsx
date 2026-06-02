import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import DemoSection from "@/components/DemoSection";

const INDUSTRIES: Record<string, {
  name: string; headline: string; subheadline: string;
  pain: string; callValue: string; features: string[];
}> = {
  "hvac-ai-receptionist": {
    name: "HVAC", headline: "AI Receptionist for HVAC Companies",
    subheadline: "Stop losing emergency calls to your competition.",
    pain: "HVAC calls spike during heatwaves and cold snaps — exactly when your team is busiest. Every missed call is a job worth $300–$2,000 going to a competitor.",
    callValue: "$800",
    features: ["Emergency call prioritization", "Service area routing", "Seasonal surge handling", "Technician dispatch automation"],
  },
  "plumbing-ai-receptionist": {
    name: "Plumbing", headline: "AI Receptionist for Plumbers",
    subheadline: "Capture every emergency call automatically.",
    pain: "Plumbing emergencies can't wait. When customers call and get voicemail, they hang up and call someone else. VOXmatiON answers immediately and dispatches the right tech.",
    callValue: "$650",
    features: ["24/7 emergency response", "Job type qualification", "Dispatch automation", "Estimate booking"],
  },
  "roofing-ai-receptionist": {
    name: "Roofing", headline: "AI Receptionist for Roofing Companies",
    subheadline: "Qualify leads and book estimates automatically.",
    pain: "Storm season floods your phone. Most roofing companies miss 30–50% of inbound calls during peak periods. VOXmatiON handles the overflow and qualifies every lead.",
    callValue: "$4,500",
    features: ["Storm damage lead qualification", "Insurance job routing", "Estimate scheduling", "Follow-up automation"],
  },
  "electrical-ai-receptionist": {
    name: "Electrical", headline: "AI Receptionist for Electricians",
    subheadline: "Answer every service call while your team works.",
    pain: "Electricians can't answer their phone while on a job site. VOXmatiON handles inbound calls, captures job details, and routes the lead to the right technician.",
    callValue: "$500",
    features: ["Job site availability routing", "Emergency vs. standard triage", "Permit job qualification", "Callback scheduling"],
  },
  "garage-door-ai-receptionist": {
    name: "Garage Door", headline: "AI Receptionist for Garage Door Companies",
    subheadline: "Same-day service starts with answering the phone.",
    pain: "Garage door calls are high-urgency. Customers want same-day service and will call 3–4 companies. VOXmatiON answers first and captures the job.",
    callValue: "$350",
    features: ["Same-day booking automation", "Emergency triage", "Service area qualification", "CRM job creation"],
  },
  "cleaning-ai-receptionist": {
    name: "Cleaning", headline: "AI Receptionist for Cleaning Companies",
    subheadline: "Book more recurring clients automatically.",
    pain: "Cleaning companies live on recurring contracts. Missing one new client inquiry can cost thousands over a year. VOXmatiON captures every inquiry and books the estimate.",
    callValue: "$2,400",
    features: ["Recurring service qualification", "Property size capture", "Quote scheduling", "Follow-up sequences"],
  },
  "medical-spa-ai-receptionist": {
    name: "Med Spa", headline: "AI Receptionist for Medical Spas",
    subheadline: "Fill your appointment calendar automatically.",
    pain: "Med spa clients expect a premium experience from the first call. VOXmatiON delivers professional, HIPAA-aware conversations that qualify and book consultations.",
    callValue: "$1,200",
    features: ["Consultation booking", "Treatment interest qualification", "VIP client routing", "Confirmation automation"],
  },
  "legal-intake-ai-receptionist": {
    name: "Legal", headline: "AI Receptionist for Law Firms",
    subheadline: "Capture every potential client call.",
    pain: "Legal leads are high value. A missed call from a new client can be worth $5,000–$50,000 in fees. VOXmatiON qualifies the case type and routes to the right attorney.",
    callValue: "$8,000",
    features: ["Case type triage", "Conflict check routing", "Consultation scheduling", "Intake form automation"],
  },
  "real-estate-ai-receptionist": {
    name: "Real Estate", headline: "AI Receptionist for Real Estate",
    subheadline: "Qualify every buyer and seller inquiry instantly.",
    pain: "Real estate leads go cold in hours. VOXmatiON answers immediately, qualifies buyer/seller intent, timeline, and budget, then routes to the right agent.",
    callValue: "$12,000",
    features: ["Buyer/seller qualification", "Timeline & budget capture", "Agent routing", "Showing scheduler"],
  },
  "landscaping-ai-receptionist": {
    name: "Landscaping", headline: "AI Receptionist for Landscaping Companies",
    subheadline: "Book more estimates during peak season.",
    pain: "Landscaping leads peak in spring and fall. When your crew is in the field, calls go to voicemail. VOXmatiON captures every inquiry and books the estimate.",
    callValue: "$1,500",
    features: ["Seasonal surge handling", "Property size qualification", "Service type routing", "Estimate scheduling"],
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = INDUSTRIES[params.slug];
  if (!industry) return { title: "Industry" };
  return {
    title: `${industry.headline} | VOXmatiON`,
    description: `${industry.pain} See how VOXmatiON's AI Receptionist works for ${industry.name} businesses.`,
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params.slug];
  if (!industry) notFound();

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center py-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            {industry.name}
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
            {industry.headline.replace(industry.name, "")}
            <span className="text-gradient-orange">{industry.name}</span>
            {industry.headline.includes("for") ? "" : ""}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">{industry.subheadline}</p>
          <Link href="/demo"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold text-lg glow-orange hover:opacity-90 transition-all hover:scale-105">
            Book {industry.name} Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-24 bg-[#060f1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-4">The Problem</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{industry.pain}</p>
              <div className="glass rounded-2xl p-5 border border-[rgba(255,138,31,0.2)]">
                <p className="text-sm text-gray-400 mb-1">Average value of one missed {industry.name} call</p>
                <p className="text-4xl font-extrabold text-gradient-orange">{industry.callValue}</p>
                <p className="text-xs text-gray-500 mt-1">per job opportunity</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-6">What VOXmatiON Does for {industry.name}</h2>
              <ul className="space-y-4">
                {industry.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 glass-dark rounded-xl px-5 py-4 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0" />
                    <span className="text-white font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
