import { CheckCircle, XCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "./SEOHead";
import { CONTACT } from "../config/business";

export interface CompareRow {
  feature: string;
  vox: boolean;
  other: boolean;
  note?: string;
}

export interface ComparePageProps {
  competitor: string;
  canonical: string;
  title: string;
  description: string;
  intro: string;
  rows: CompareRow[];
  voxWins: string[];
  otherWins: string[];
}

function Cell({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
  );
}

export default function ComparePage({
  competitor,
  canonical,
  title,
  description,
  intro,
  rows,
  voxWins,
  otherWins,
}: ComparePageProps) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: `Voxmation vs ${competitor}`, item: `https://voxmation.com${canonical}` },
    ],
  };

  return (
    <>
      <SEOHead title={title} description={description} canonical={canonical} jsonLd={breadcrumb} />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full mb-6">
            Voxmation vs {competitor}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            The Voxmation alternative to {competitor}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{intro}</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-gray-800/60">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                <th className="px-6 py-4 text-sm font-semibold text-violet-400">Voxmation</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500">{competitor}</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}>
                  <td className="px-6 py-3.5 text-sm text-gray-300">{row.feature}</td>
                  <td className="px-6 py-3.5 text-center"><Cell value={row.vox} /></td>
                  <td className="px-6 py-3.5 text-center"><Cell value={row.other} /></td>
                  <td className="px-6 py-3.5 text-xs text-gray-600 hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4">Where Voxmation wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              {voxWins.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4">Where {competitor} wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              {otherWins.map((w) => (
                <li key={w} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">See Voxmation on a live call</h2>
          <p className="text-gray-400 mb-8">Predictable pricing, instant answering, and missed-call recovery built in.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
              <Phone className="w-4 h-4" /> Call {CONTACT.phone}
            </a>
            <Link to="/pricing" className="px-6 py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors">
              Compare Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
