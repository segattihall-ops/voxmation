import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { COMPETITORS, getCompetitor } from "@/data/competitors";

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = getCompetitor(params.slug);
  if (!c) return { title: "Compare" };
  const url = `${SITE_URL}/compare/${c.slug}`;
  return {
    title: `VOXmatiON vs ${c.name} — AI Receptionist Comparison`,
    description: `Compare VOXmatiON and ${c.name} for AI call answering and missed-call recovery. ${c.summary}`,
    alternates: { canonical: url },
    openGraph: { url, title: `VOXmatiON vs ${c.name}` },
  };
}

export default function ComparePage({ params }: { params: { slug: string } }) {
  const c = getCompetitor(params.slug);
  if (!c) notFound();

  const url = `${SITE_URL}/compare/${c.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${SITE_URL}/compare` },
      { "@type": "ListItem", position: 3, name: `VOXmatiON vs ${c.name}`, item: url },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ─── Hero ─── */}
      <section className="relative py-24 bg-[#0B1F3A] text-center overflow-hidden mt-16">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
            VOXmatiON vs {c.name}
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            The VOXmatiON alternative to {c.name}
          </h1>
          <p className="text-xl text-[#8A99B3] font-body">{c.summary}</p>
        </div>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="py-20 bg-[#060A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.06)]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.08)]">
                  <th className="px-5 sm:px-6 py-4 text-sm font-semibold text-[#8A99B3] font-body">Feature</th>
                  <th className="px-3 sm:px-6 py-4 text-sm font-bold text-[#FF8A1F] font-body text-center">VOXmatiON</th>
                  <th className="px-3 sm:px-6 py-4 text-sm font-semibold text-[#8A99B3] font-body text-center">{c.shortName}</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#5C6B82] font-body hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white/[0.015]" : ""}>
                    <td className="px-5 sm:px-6 py-3.5 text-sm text-[#F7F5F0] font-body">{row.feature}</td>
                    <td className="px-3 sm:px-6 py-3.5 text-center">
                      {row.vox ? <Check className="w-5 h-5 text-[#FF8A1F] mx-auto" /> : <X className="w-5 h-5 text-[#3A4658] mx-auto" />}
                    </td>
                    <td className="px-3 sm:px-6 py-3.5 text-center">
                      {row.them ? <Check className="w-5 h-5 text-[#8A99B3] mx-auto" /> : <X className="w-5 h-5 text-[#3A4658] mx-auto" />}
                    </td>
                    <td className="px-6 py-3.5 text-xs text-[#5C6B82] font-body hidden md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#5C6B82] font-body mt-4 text-center">
            {c.pricingModel} Competitor pricing is as publicly advertised and may change.
          </p>
        </div>
      </section>

      {/* ─── Pros columns ─── */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-8 border border-[rgba(255,138,31,0.2)]">
            <h2 className="font-display text-xl font-bold text-[#F7F5F0] mb-5">Where VOXmatiON wins</h2>
            <ul className="space-y-3">
              {c.voxWins.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-[#8A99B3] font-body">
                  <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0 mt-0.5" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.06)]">
            <h2 className="font-display text-xl font-bold text-[#F7F5F0] mb-5">Where {c.shortName} wins</h2>
            <ul className="space-y-3">
              {c.theirStrengths.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm text-[#8A99B3] font-body">
                  <CheckCircle2 className="w-5 h-5 text-[#5C6B82] flex-shrink-0 mt-0.5" /> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-8 text-center">
            VOXmatiON vs {c.name}: common questions
          </h2>
          <div className="space-y-4">
            {c.faq.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
                <h3 className="font-display text-lg font-semibold text-[#F7F5F0] mb-2">{f.q}</h3>
                <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-16 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 border border-[rgba(255,138,31,0.15)]">
            <PhoneCall className="w-10 h-10 text-[#FF8A1F] mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-3">See VOXmatiON on a live call</h2>
            <p className="text-[#8A99B3] font-body mb-8">
              Predictable pricing, sub-2-second answering, and missed-call recovery built in.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]">
                Book Your Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compare" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-[#F7F5F0] font-semibold font-body hover:bg-white/5 transition-all">
                See all comparisons
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
