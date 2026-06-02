import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import DemoSection from "@/components/DemoSection";

export const metadata: Metadata = {
  title: "Pricing — Plans That Pay for Themselves",
  description: "VOXmatiON pricing plans for service businesses. Starter, Growth, Pro, and White Label. One recovered job covers the monthly cost.",
};

export default function PricingPage() {
  return (
    <>
      <section className="relative pt-28 pb-8 bg-[#060f1f] text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
            Pricing
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Plans That Pay<br /><span className="text-gradient-orange">For Themselves</span>
          </h1>
          <p className="text-xl text-gray-300">
            One recovered job can cover the entire monthly cost. Book a demo and get your custom quote.
          </p>
        </div>
      </section>
      <PricingSection />
      <FAQSection />
      <DemoSection />
    </>
  );
}
