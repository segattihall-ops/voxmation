import type { Metadata } from "next";
import ServicesSection from "@/components/ServicesSection";
import DemoSection from "@/components/DemoSection";

export const metadata: Metadata = {
  title: "Services — AI Voice Automation for Service Businesses",
  description: "Explore all VOXmatiON services: AI Receptionist, Missed Call Recovery, Lead Qualification, CRM Automation, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            Our Services
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Complete AI Automation<br /><span className="text-gradient-orange">For Every Call</span>
          </h1>
          <p className="text-xl text-gray-300">
            Every tool you need to capture, qualify, and convert leads automatically.
          </p>
        </div>
      </section>
      <ServicesSection />
      <DemoSection />
    </>
  );
}
