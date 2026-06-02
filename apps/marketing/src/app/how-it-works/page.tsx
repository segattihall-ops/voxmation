import type { Metadata } from "next";
import HowItWorksSection from "@/components/HowItWorksSection";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "How It Works — Call → Qualify → Route",
  description: "See exactly how VOXmatiON answers calls, qualifies leads, and routes them to the right place automatically.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            The Process
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            How VOXmatiON Works
          </h1>
          <p className="text-xl text-gray-300">
            Three automated steps that turn every call into revenue.
          </p>
        </div>
      </section>
      <HowItWorksSection />
      <DemoSection />
      <FAQSection />
    </>
  );
}
