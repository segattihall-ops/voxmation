import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ProblemStrip from "@/components/ProblemStrip";
import VideoReel from "@/components/VideoReel";
import ServicesSection from "@/components/ServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DemoCallWidget from "@/components/DemoCallWidget";
import ROICalculator from "@/components/ROICalculator";
import IndustriesSection from "@/components/IndustriesSection";
import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "VOXmatiON — AI Receptionist & Missed Call Recovery",
  description: "VOXmatiON answers calls, qualifies leads, follows up instantly, and routes every opportunity to the right place — automatically, 24/7.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "VOXmatiON — Never Miss Another Customer Call",
    description: "AI-powered voice automation that recovers missed calls, qualifies leads, and books jobs automatically.",
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemStrip />
      <VideoReel />
      <ServicesSection />
      <HowItWorksSection />
      <DemoCallWidget />
      <ROICalculator />
      <IndustriesSection />
      <SocialProof />
      <PricingSection />
      <DemoSection />
      <FAQSection />
    </>
  );
}
