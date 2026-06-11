import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { Phone, CheckCircle2, Clock } from "lucide-react";
import DemoBookingForm from "@/components/DemoBookingForm";
import TalkToAICard from "@/components/TalkToAICard";

const PAGE_URL = `${SITE_URL}/demo`;


export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
  title: "Book a Demo — See VOXmatiON Live",
  description: "See VOXmatiON answer a call, qualify a lead, and route it to your CRM in real time. Book your free 20-minute demo.",
};

const WHAT_TO_EXPECT = [
  "Watch AI answer a live call in real time",
  "See lead qualification in action",
  "CRM update demonstration",
  "Your ROI estimate",
  "Custom implementation plan",
  "Q&A with a VOXmatiON specialist",
];

export default function DemoPage() {
  return (
    <>
      <section className="relative min-h-screen pt-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1E4B8F] opacity-10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF8A1F] opacity-6 blur-[120px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
                Live Demo
              </span>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
                See VOXmatiON<br />
                <span className="text-gradient-orange">In Action</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Don&apos;t take our word for it — talk to the AI receptionist live right now,
                no form required. Then book a full walkthrough whenever you&apos;re ready.
              </p>

              {/* Instant, zero-friction proof — talk to the real AI before any signup */}
              <div className="mb-8">
                <TalkToAICard />
              </div>

              <p className="text-sm font-semibold text-[#FF8A1F] uppercase tracking-widest mb-4">
                What you&apos;ll see in a full demo
              </p>
              <div className="space-y-3 mb-10">
                {WHAT_TO_EXPECT.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+18446877999"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 text-[#FF8A1F]" />
                  Call Demo Line
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>20-minute session · No commitment required</span>
              </div>
            </div>

            {/* Right — Form */}
            <DemoBookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
