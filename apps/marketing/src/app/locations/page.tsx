import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { LOCATIONS } from "@/data/locations";

const PAGE_URL = `${SITE_URL}/locations`;

export const metadata: Metadata = {
  title: "AI Receptionist by City — VOXmatiON Across Texas",
  description:
    "VOXmatiON's 24/7 AI receptionist serves home-service and local businesses across Texas — Dallas, Fort Worth, Houston, Austin, and San Antonio. Answer every call, recover missed calls, and book jobs automatically.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: "AI Receptionist by City — VOXmatiON Across Texas" },
};

export default function LocationsIndexPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: PAGE_URL },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: LOCATIONS.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `AI Receptionist in ${l.city}`,
      url: `${SITE_URL}/locations/${l.slug}`,
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
            Service Areas
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            AI receptionist across Texas
          </h1>
          <p className="text-xl text-[#8A99B3] font-body">
            VOXmatiON answers every call for home-service and local businesses in Texas&apos;s biggest metros —
            24/7, in under two seconds.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#060A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          {LOCATIONS.map((l) => (
            <Link
              key={l.slug}
              href={`/locations/${l.slug}`}
              className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,138,31,0.25)] transition-all group"
            >
              <p className="flex items-center gap-1.5 text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest font-body mb-3">
                <MapPin className="w-3.5 h-3.5" /> {l.metro}
              </p>
              <h2 className="font-display text-2xl font-bold text-[#F7F5F0] mb-2 flex items-center gap-2">
                {l.city}, {l.state}
                <ArrowRight className="w-5 h-5 text-[#FF8A1F] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </h2>
              <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{l.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <DemoSection />
    </>
  );
}
