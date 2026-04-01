import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const COMPARISON_ROWS = [
  { feature: "Self-hosted deployment", vox: true, other: false, note: "Zoho CRM is SaaS-only" },
  { feature: "Open source (MIT license)", vox: true, other: false, note: "" },
  { feature: "No per-user fees", vox: true, other: false, note: "Zoho: $14–$52/user/month" },
  { feature: "Built-in Asterisk/SIP telephony", vox: true, other: false, note: "Zoho requires Zoho PhoneBridge" },
  { feature: "Full data ownership", vox: true, other: false, note: "" },
  { feature: "REST API included", vox: true, other: true, note: "" },
  { feature: "CRM pipeline management", vox: true, other: true, note: "" },
  { feature: "Custom fields", vox: true, other: true, note: "" },
  { feature: "RBAC and permissions", vox: true, other: true, note: "" },
  { feature: "Project/task management", vox: true, other: true, note: "Zoho has Zoho Projects (separate product)" },
  { feature: "Billing/invoicing module", vox: true, other: false, note: "Zoho Books is a separate paid product" },
  { feature: "Webhook integration hub", vox: true, other: true, note: "" },
  { feature: "Email marketing", vox: false, other: false, note: "Both require separate tools" },
  { feature: "Zoho One suite integration", vox: false, other: true, note: "Zoho ecosystem advantage" },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
  );
}

export default function VsZohoPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "Voxmation OS vs Zoho", item: "https://voxmation.com/vs-zoho" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Voxmation OS vs Zoho CRM — Self-Hosted Open-Source Alternative"
        description="Compare Voxmation OS and Zoho CRM. A free, open-source, self-hosted CRM alternative to Zoho with built-in telephony, billing, and project management — no per-user fees."
        canonical="/vs-zoho"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full mb-6">
            Voxmation OS vs Zoho CRM
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            The self-hosted Zoho alternative with native telephony
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Zoho CRM is a cost-effective SaaS option — but it's still per-seat, cloud-only, and requires the PhoneBridge add-on for telephony. Voxmation OS is MIT-licensed, self-hosted with unlimited users, and includes native Asterisk/SIP telephony out of the box. It's the Zoho alternative for teams that want to own their stack.
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
                <th className="px-6 py-4 text-sm font-semibold text-gray-500">Zoho CRM</th>
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
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Self-hosted — data never leaves your infrastructure</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Native Asterisk/SIP telephony — no PhoneBridge add-on needed</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Billing/invoicing built in — no Zoho Books subscription</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> MIT licensed — fully open source and extensible</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Unlimited users with no per-seat cost</li>
            </ul>
          </div>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4">Where Zoho CRM wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Zoho One: 40+ business apps under one subscription</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> No infrastructure to manage — managed SaaS</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Email campaigns, social CRM, and marketing automation</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Zia AI: predictive analytics and anomaly detection</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Territory management and org-wide analytics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Self-host your CRM. Pay nothing per user.</h2>
          <p className="text-gray-400 mb-8">Voxmation OS is free, open source, and runs on your infrastructure.</p>
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
