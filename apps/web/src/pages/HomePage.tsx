import { Link } from "react-router-dom";
import {
  Phone, Database, Shield, Zap, Globe, BarChart3,
  CheckCircle, XCircle, ArrowRight, Star, GitBranch,
  Server, Lock
} from "lucide-react";
import SEOHead from "../components/SEOHead";

const FEATURES = [
  {
    icon: Phone,
    title: "Built-In Telephony",
    description: "Native Asterisk/FreeSWITCH integration with call logging, recordings, transcriptions, and Twilio fallback.",
  },
  {
    icon: Database,
    title: "Full CRM Suite",
    description: "Leads, accounts, contacts, opportunities — with custom fields, pipeline stages, and activity tracking.",
  },
  {
    icon: Zap,
    title: "Delivery Ops",
    description: "Service catalog and project/task management built into the same platform. No separate tools.",
  },
  {
    icon: BarChart3,
    title: "Billing & Invoicing",
    description: "Plans, invoices, and payment gateway webhooks. Integrated with your CRM data, not bolted on.",
  },
  {
    icon: Globe,
    title: "Integration Hub",
    description: "Event-driven webhooks with pub/sub. Connect any tool without vendor lock-in.",
  },
  {
    icon: Shield,
    title: "Governance & RBAC",
    description: "JWT authentication, role-based access control, and complete audit logging out of the box.",
  },
];

const COMPARISON = [
  {
    feature: "Self-hosted deployment",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: false,
  },
  {
    feature: "Built-in telephony (Asterisk/SIP)",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: false,
  },
  {
    feature: "Open source codebase",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: false,
  },
  {
    feature: "No per-user licensing fees",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: false,
  },
  {
    feature: "Full data ownership",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: false,
  },
  {
    feature: "CRM + Delivery Ops in one",
    voxmation: true,
    hubspot: false,
    salesforce: false,
    zoho: true,
  },
  {
    feature: "REST API included",
    voxmation: true,
    hubspot: true,
    salesforce: true,
    zoho: true,
  },
  {
    feature: "RBAC & audit logging",
    voxmation: true,
    hubspot: false,
    salesforce: true,
    zoho: false,
  },
];

const BENEFITS = [
  {
    icon: Lock,
    title: "Your data stays yours",
    description: "Every record, call log, and customer interaction lives on your servers. No vendor has access.",
  },
  {
    icon: Server,
    title: "Deploy on your infrastructure",
    description: "Docker, bare metal, VPS, or on-prem. If it runs Linux, it runs Voxmation OS.",
  },
  {
    icon: GitBranch,
    title: "Fork it, own it, extend it",
    description: "MIT licensed. Add custom modules, modify workflows, and contribute back — or don't.",
  },
];

const STATS = [
  { value: "MIT", label: "License" },
  { value: "100%", label: "Open Source" },
  { value: "0", label: "Per-user fees" },
  { value: "∞", label: "Users supported" },
];

function CheckIcon({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-700 mx-auto" />
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Voxmation OS",
    url: "https://voxmation.io",
    description:
      "Open-source, self-hosted CRM with built-in telephony. Free alternative to HubSpot and Salesforce.",
  };

  return (
    <>
      <SEOHead
        title="Voxmation OS — Self-Hosted CRM with Built-In Telephony"
        description="Free, open-source CRM with native telephony (Asterisk/Twilio), delivery ops, billing, and RBAC. The self-hosted alternative to HubSpot, Salesforce, and Zoho."
        canonical="/"
        jsonLd={jsonLd}
      />

      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-violet-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
            <Star className="w-3.5 h-3.5" />
            Open Source · MIT License · Self-Hosted
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            The self-hosted CRM{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              with built-in telephony
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Voxmation OS is a free, open-source business operating system. CRM, voice calling,
            delivery ops, billing, and integrations — all self-hosted on your infrastructure.
            No per-user fees. No vendor lock-in. Just your data, your stack.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="https://github.com/voxmation/voxmation-os"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40 hover:shadow-violet-900/60 hover:-translate-y-0.5"
            >
              Deploy for Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/features"
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Features
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-gray-500 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything your team needs in one place
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stop paying for six different tools. Voxmation OS bundles CRM, telephony, project management, and billing into a single deployable stack.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group p-6 bg-gray-900/50 border border-gray-800/60 rounded-2xl hover:border-violet-500/30 hover:bg-gray-900 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How does Voxmation OS compare?
            </h2>
            <p className="text-gray-400 text-lg">
              The features that matter, side by side.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-800/60">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-sm font-semibold text-violet-400">Voxmation OS</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">HubSpot</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">Salesforce</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">Zoho</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}
                  >
                    <td className="px-6 py-3.5 text-sm text-gray-300">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center">
                      <CheckIcon value={row.voxmation} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CheckIcon value={row.hubspot} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CheckIcon value={row.salesforce} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CheckIcon value={row.zoho} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/vs-hubspot" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Full HubSpot comparison →
            </Link>
            <Link to="/vs-salesforce" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Full Salesforce comparison →
            </Link>
            <Link to="/vs-zoho" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Full Zoho comparison →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why self-host your CRM?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cloud CRMs hold your customer data hostage. Self-hosting puts you back in control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{b.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/50 to-indigo-900/30 border border-violet-500/20 p-10 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),transparent)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to own your CRM stack?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Deploy Voxmation OS in minutes. No credit card required. No vendor lock-in.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://github.com/voxmation/voxmation-os"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40"
                >
                  Star on GitHub
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/pricing"
                  className="px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
