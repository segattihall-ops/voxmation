import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Zap, Shield, Calendar, Users, TrendingUp, Star, Home, Leaf, Wrench } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/industries`;

export const metadata: Metadata = {
  title: "Industries We Serve | VOXmatiON AI Receptionist",
  description: "VOXmatiON AI Receptionist built for HVAC, plumbing, roofing, electrical, landscaping, cleaning, med spa, legal, real estate, and garage door companies.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

const INDUSTRIES = [
  {
    href: "/industries/hvac-ai-receptionist",
    name: "HVAC",
    tagline: "Answer every emergency call, 24/7.",
    callValue: "$800",
    icon: <Zap className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/plumbing-ai-receptionist",
    name: "Plumbing",
    tagline: "Capture every emergency call automatically.",
    callValue: "$650",
    icon: <Wrench className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/roofing-ai-receptionist",
    name: "Roofing",
    tagline: "Qualify leads and book estimates during storm season.",
    callValue: "$4,500",
    icon: <Home className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/electrical-ai-receptionist",
    name: "Electrical",
    tagline: "Answer every service call while your team works.",
    callValue: "$500",
    icon: <Zap className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/landscaping-ai-receptionist",
    name: "Landscaping",
    tagline: "Never miss a season. Book every estimate automatically.",
    callValue: "$1,500",
    icon: <Leaf className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/cleaning-ai-receptionist",
    name: "Cleaning",
    tagline: "Book more recurring clients automatically.",
    callValue: "$2,400",
    icon: <Star className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/garage-door-ai-receptionist",
    name: "Garage Door",
    tagline: "Same-day service starts with answering the phone first.",
    callValue: "$350",
    icon: <Home className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/medical-spa-ai-receptionist",
    name: "Med Spa",
    tagline: "Fill your appointment calendar automatically.",
    callValue: "$1,200",
    icon: <Shield className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/legal-intake-ai-receptionist",
    name: "Legal",
    tagline: "Capture every potential client call — 24/7.",
    callValue: "$8,000",
    icon: <Shield className="w-6 h-6 text-[#FF8A1F]" />,
  },
  {
    href: "/industries/real-estate-ai-receptionist",
    name: "Real Estate",
    tagline: "Qualify every buyer and seller inquiry instantly.",
    callValue: "$12,000",
    icon: <TrendingUp className="w-6 h-6 text-[#FF8A1F]" />,
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 bg-[#060A10] overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-5 font-body">
            Industries
          </span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#F7F5F0] leading-tight mb-5">
            Built for Your Business
          </h1>
          <p className="text-xl text-[#8A99B3] max-w-2xl mx-auto font-body">
            VOXmatiON is purpose-built for service businesses. Select your industry to see exactly how it works for you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#060A10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group glass rounded-3xl p-7 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,138,31,0.25)] transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center group-hover:bg-[rgba(255,138,31,0.15)] transition-colors">
                  {ind.icon}
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#F7F5F0] mb-1">{ind.name}</h2>
                  <p className="text-[#8A99B3] text-sm font-body leading-relaxed">{ind.tagline}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <div>
                    <p className="text-xs text-[#8A99B3] font-body">Avg missed call value</p>
                    <p className="font-display text-lg font-bold text-[#FF8A1F]">{ind.callValue}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[rgba(255,138,31,0.1)] flex items-center justify-center group-hover:bg-[#FF8A1F] transition-colors">
                    <ArrowRight className="w-4 h-4 text-[#FF8A1F] group-hover:text-[#0D0D0D] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#060A10] border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-4">Don&apos;t see your industry?</h2>
          <p className="text-[#8A99B3] font-body mb-8">VOXmatiON works for any inbound-call service business. Talk to us and we&apos;ll build it out for your use case.</p>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
          >
            Book a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
