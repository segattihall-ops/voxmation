import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

const COMPARISON_ROWS = [
  { feature: "Self-hosted deployment", vox: true, other: false, note: "HubSpot is SaaS-only" },
  { feature: "Open source (MIT license)", vox: true, other: false, note: "" },
  { feature: "No per-user fees", vox: true, other: false, note: "HubSpot Pro: $90/user/month" },
  { feature: "Built-in Asterisk/SIP telephony", vox: true, other: false, note: "HubSpot requires third-party CTI" },
  { feature: "Native call recording", vox: true, other: false, note: "Limited in HubSpot calling" },
  { feature: "Full data ownership", vox: true, other: false, note: "HubSpot owns your data in their cloud" },
  { feature: "REST API included", vox: true, other: true, note: "" },
  { feature: "CRM pipeline management", vox: true, other: true, note: "" },
  { feature: "Custom fields", vox: true, other: true, note: "" },
  { feature: "RBAC and audit logging", vox: true, other: false, note: "RBAC requires Enterprise tier ($150+/user)" },
  { feature: "Project/task management", vox: true, other: false, note: "HubSpot requires Service Hub add-on" },
  { feature: "Webhook integration hub", vox: true, other: true, note: "" },
  { feature: "Marketing email sequences", vox: false, other: true, note: "HubSpot Marketing Hub" },
  { feature: "Landing page builder", vox: false, other: true, note: "" },
];

function Cell({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
  );
}

export default function VsHubspotPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.io" },
      { "@type": "ListItem", position: 2, name: "Voxmation OS vs HubSpot", item: "https://voxmation.io/vs-hubspot" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Voxmation OS vs HubSpot — Self-Hosted CRM Alternative with Telephony"
        description="Compare Voxmation OS and HubSpot. Voxmation OS is a free, open-source, self-hosted CRM with built-in Asterisk telephony. No per-user fees, no vendor lock-in, full data ownership."
        canonical="/vs-hubspot"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full mb-6">
            Voxmation OS vs HubSpot
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            The self-hosted HubSpot alternative with real telephony
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            HubSpot is excellent software — but it's SaaS-only, charges per user, and requires costly third-party dialers for real telephony. Voxmation OS is free to self-host, includes native Asterisk/SIP calling, and costs nothing per user. If you're searching for a HubSpot alternative with self-hosting and built-in calling, here's what you need to know.
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
                <th className="px-6 py-4 text-sm font-semibold text-gray-500">HubSpot</th>
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
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Self-hosted — your servers, your data, your control</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Native Asterisk/FreeSWITCH integration — no third-party dialer required</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Unlimited users — no per-seat licensing</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> MIT licensed — fork, extend, deploy on your timeline</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> RBAC + audit logging included, not gated behind Enterprise</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> Project/delivery ops built in — no Service Hub add-on needed</li>
            </ul>
          </div>
          <div className="bg-gray-900/30 border border-gray-800/60 rounded-2xl p-6">
            <h2 className="font-bold text-white text-lg mb-4">Where HubSpot wins</h2>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> No infrastructure to manage — fully managed SaaS</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Marketing Hub: email sequences, landing pages, forms</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> 1,000+ native integrations in the HubSpot App Marketplace</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Non-technical teams can use it without engineering support</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" /> Polished out-of-the-box UI and onboarding</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to try the open-source alternative?</h2>
          <p className="text-gray-400 mb-8">Deploy Voxmation OS in minutes. No credit card, no vendor, no lock-in.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/voxmation/voxmation-os" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
              Deploy for Free <ArrowRight className="w-4 h-4" />
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
