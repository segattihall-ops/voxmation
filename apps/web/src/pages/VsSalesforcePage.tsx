import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const COMPARISON_ROWS = [
  { feature: "Self-hosted deployment", vox: true, other: false, note: "Salesforce is cloud-only" },
  { feature: "Open source (MIT license)", vox: true, other: false, note: "" },
  { feature: "No per-user fees", vox: true, other: false, note: "Salesforce: $75–$300+/user/month" },
  { feature: "Built-in Asterisk/SIP telephony", vox: true, other: false, note: "Salesforce requires CTI adapter" },
  { feature: "Full data ownership", vox: true, other: false, note: "" },
  { feature: "Deploy on your own infrastructure", vox: true, other: false, note: "" },
  { feature: "REST API included", vox: true, other: true, note: "" },
  { feature: "CRM pipeline management", vox: true, other: true, note: "" },
  { feature: "Custom fields and objects", vox: true, other: true, note: "" },
  { feature: "RBAC and permissions", vox: true, other: true, note: "" },
  { feature: "Audit logging", vox: true, other: true, note: "Salesforce requires Field History Tracking" },
  { feature: "No long-term contracts", vox: true, other: false, note: "Salesforce typically requires annual contracts" },
  { feature: "AI/Einstein features", vox: false, other: true, note: "Salesforce Einstein" },
  { feature: "AppExchange ecosystem", vox: false, other: true, note: "" },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
  );
}

export default function VsSalesforcePage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.io" },
      { "@type": "ListItem", position: 2, name: "Voxmation OS vs Salesforce", item: "https://voxmation.io/vs-salesforce" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Voxmation OS vs Salesforce — Free Self-Hosted CRM Alternative"
        description="Compare Voxmation OS and Salesforce. A free, open-source, self-hosted CRM with built-in telephony vs Salesforce's enterprise SaaS pricing. No contracts, no per-user fees."
        canonical="/vs-salesforce"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full mb-6">
            Voxmation OS vs Salesforce
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            The open-source Salesforce alternative you actually own
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Salesforce is the dominant enterprise CRM — powerful, extensible, and expensive. At $75–$300+ per user per month, annual contracts, and a telephony story that requires third-party CTI adapters, it's out of reach for most teams. Voxmation OS is MIT-licensed, self-hosted, has no per-seat fees, and includes telephony natively.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-gray-800/60">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                <th className="px-6 py-4 text-sm font-semibold text-violet-400">Voxmation OS</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Salesforce</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
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
            <h2 className="font-bold text-white text-lg mb-4">Where Voxmation OS wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> $0 software cost — MIT licensed, self-hosted</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> No annual contracts — deploy on your own schedule</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Native telephony — no CTI adapter, no third-party dialer</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Your data stays on your infrastructure — no Salesforce data sharing</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Unlimited users — no per-seat cap</li>
            </ul>
          </div>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4">Where Salesforce wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Einstein AI: predictive scoring, opportunity insights</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> AppExchange: thousands of enterprise integrations</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Massive ecosystem of Salesforce-certified consultants</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Advanced reporting and analytics (Tableau CRM)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Field Service Lightning, CPQ, and vertical-specific clouds</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Own your CRM. Own your data.</h2>
          <p className="text-gray-400 mb-8">Self-host Voxmation OS in minutes. No contracts, no per-user fees.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/voxmation/voxmation-os" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
              Deploy for Free <ArrowRight className="w-4 h-4" />
            </a>
            <Link to="/pricing" className="px-6 py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
