import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { COMPETITORS } from "@/data/competitors";

const PAGE_URL = `${SITE_URL}/compare`;

export const metadata: Metadata = {
  title: "Compare VOXmatiON — AI Receptionist Alternatives",
  description:
    "See how VOXmatiON compares to Smith.ai, Goodcall, NextPhone, and AgentZap for AI call answering and missed-call recovery. Predictable pricing, sub-2-second answering, built for the trades.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: "Compare VOXmatiON — AI Receptionist Alternatives" },
};

export default function CompareIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: PAGE_URL },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: COMPETITORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `VOXmatiON vs ${c.name}`,
      url: `${SITE_URL}/compare/${c.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden mt-16">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
            Comparisons
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            VOXmatiON vs the alternatives
          </h1>
          <p className="text-xl text-[#8A99B3] font-body">
            Choosing an AI receptionist? See how VOXmatiON stacks up on speed, pricing, and
            missed-call recovery against the other options.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#060A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          {COMPETITORS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,138,31,0.25)] transition-all group"
            >
              <p className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest font-body mb-3">{c.category}</p>
              <h2 className="font-display text-2xl font-bold text-[#F7F5F0] mb-2 flex items-center gap-2">
                VOXmatiON vs {c.name}
                <ArrowRight className="w-5 h-5 text-[#FF8A1F] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{c.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 border border-[rgba(255,138,31,0.15)]">
            <PhoneCall className="w-10 h-10 text-[#FF8A1F] mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-3">Still deciding?</h2>
            <p className="text-[#8A99B3] font-body mb-8">Hear VOXmatiON answer a live call and judge for yourself.</p>
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]">
              Book Your Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
