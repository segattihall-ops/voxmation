import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, PhoneCall, MapPin } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";
import { LOCATIONS, getLocation } from "@/data/locations";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const loc = getLocation(params.slug);
  if (!loc) return { title: "Location" };
  const url = `${SITE_URL}/locations/${loc.slug}`;
  return {
    title: `AI Receptionist in ${loc.city}, ${loc.state} — VOXmatiON`,
    description: `${loc.intro} Serving ${loc.metro}.`,
    alternates: { canonical: url },
    openGraph: { url, title: `AI Receptionist in ${loc.city}, ${loc.state}` },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const loc = getLocation(params.slug);
  if (!loc) notFound();

  const url = `${SITE_URL}/locations/${loc.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Receptionist in ${loc.city}`,
    serviceType: "AI receptionist and call answering service",
    description: loc.intro,
    url,
    provider: { "@type": "Organization", name: "VOXmatiON", url: SITE_URL },
    areaServed: { "@type": "City", name: `${loc.city}, ${loc.state}` },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: loc.city, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: loc.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden mt-16">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
            <MapPin className="w-3.5 h-3.5" /> {loc.metro}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            AI Receptionist in {loc.city}, {loc.state}
          </h1>
          <p className="text-xl text-[#8A99B3] font-body mb-8">{loc.intro}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-[#F7F5F0] font-semibold font-body hover:bg-white/5 transition-all">
              <PhoneCall className="w-4 h-4 text-[#FF8A1F]" /> Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </section>

      {/* Local context + stat */}
      <section className="py-20 bg-[#060A10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-4">Why {loc.city} businesses choose VOXmatiON</h2>
            <p className="text-[#8A99B3] text-lg leading-relaxed font-body">{loc.localContext}</p>
          </div>
          <div className="glass rounded-3xl p-8 border border-[rgba(255,138,31,0.2)] text-center">
            <p className="font-display text-6xl font-bold text-[#FF8A1F]">{loc.stat.value}</p>
            <p className="text-[#8A99B3] font-body mt-2">{loc.stat.label}</p>
          </div>
        </div>
      </section>

      {/* Industries + areas */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
            <h2 className="font-display text-xl font-bold text-[#F7F5F0] mb-5">Industries we serve in {loc.city}</h2>
            <ul className="grid grid-cols-2 gap-3">
              {loc.topIndustries.map((ind) => (
                <li key={ind} className="flex items-center gap-2 text-sm text-[#8A99B3] font-body">
                  <CheckCircle2 className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" /> {ind}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
            <h2 className="font-display text-xl font-bold text-[#F7F5F0] mb-5">Areas we cover near {loc.city}</h2>
            <ul className="grid grid-cols-2 gap-3">
              {loc.areas.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-[#8A99B3] font-body">
                  <MapPin className="w-4 h-4 text-[#FF8A1F] flex-shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-8 text-center">
            AI receptionist in {loc.city}: common questions
          </h2>
          <div className="space-y-4">
            {loc.faq.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
                <h3 className="font-display text-lg font-semibold text-[#F7F5F0] mb-2">{f.q}</h3>
                <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
