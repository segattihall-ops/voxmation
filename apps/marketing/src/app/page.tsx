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
  title: {
    absolute:
      "AI Receptionist for HVAC, Plumbing & Roofing in DFW | VOXmatiON",
  },
  description:
    "VOXmatiON is the 24/7 AI receptionist for HVAC, plumbing, electrical & roofing companies in Dallas–Fort Worth, Houston & Austin. Answer every call, recover missed calls, qualify leads, and book jobs automatically.",
  keywords: [
    "AI receptionist",
    "AI receptionist for HVAC",
    "missed call recovery",
    "answering service Dallas",
    "answering service Fort Worth",
    "answering service Houston",
    "answering service Austin",
    "HVAC answering service",
    "plumbing answering service",
    "roofing answering service",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Never Miss Another Customer Call — VOXmatiON AI Receptionist",
    description:
      "24/7 AI voice automation that answers calls, recovers missed calls, qualifies leads, and books jobs for home-service companies across Texas.",
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemStrip />
      <DemoCallWidget />
      <VideoReel />
      <ServicesSection />
      <HowItWorksSection />
      <ROICalculator />
      <IndustriesSection />
      <SocialProof />
      <PricingSection />
      <DemoSection />
      <FAQSection />
    </>
  );
}
