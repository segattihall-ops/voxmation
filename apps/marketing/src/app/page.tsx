import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, Mic, Zap, BarChart3, Globe, Shield,
  ArrowRight, CheckCircle, Clock, Users, Activity,
  Calendar, MessageSquare, PhoneCall, PhoneIncoming
} from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Voxmation — Voice Prompt Automation Platform";
  const description =
    "Automate inbound and outbound voice interactions with intelligent call flows. IVR menus, appointment reminders, outbound campaigns, and after-hours handling — powered by Asterisk, FreeSWITCH, or Twilio.";
  return {
    title,
    description,
    alternates: { canonical: SITE_URL },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const FEATURES = [
  {
    icon: Mic,
    title: "Visual Prompt Builder",
    description: "Build call flows with a drag-and-drop editor. Record prompts or use text-to-speech. No dialplan expertise required.",
  },
  {
    icon: PhoneIncoming,
    title: "IVR Menu Designer",
    description: "Create multi-level IVR menus with DTMF and speech recognition. Route callers to the right destination instantly.",
  },
  {
    icon: PhoneCall,
    title: "Outbound Campaign Dialer",
    description: "Send appointment reminders, payment notices, and voice campaigns to thousands of contacts on a schedule.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track call completion rates, containment, drop-off points, and conversion — across every campaign and flow.",
  },
  {
    icon: Globe,
    title: "Multi-Platform Integration",
    description: "Works with Asterisk, FreeSWITCH, and Twilio. Switch backends without rebuilding your call flows.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "RBAC, audit logging, encrypted recordings, and HIPAA-ready compliance tooling built in.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Design your call flow",
    description: "Use the visual builder to map out your IVR menu, outbound script, or automated response flow. Add prompts, branches, and integrations.",
  },
  {
    step: "02",
    title: "Record or generate prompts",
    description: "Upload professional recordings or use our AI text-to-speech to generate natural-sounding prompts in seconds.",
  },
  {
    step: "03",
    title: "Connect your telephony",
    description: "Point your Asterisk/FreeSWITCH trunk or Twilio number to Voxmation. We handle the integration — you own the infrastructure.",
  },
  {
    step: "04",
    title: "Launch and optimize",
    description: "Go live in minutes. Monitor analytics in real time and refine your flows based on caller behavior data.",
  },
];

const USE_CASES = [
  {
    icon: Calendar,
    title: "Appointment Reminders",
    description: "Reduce no-shows by 40% with automated voice reminders sent 24–48 hours before appointments.",
  },
  {
    icon: PhoneIncoming,
    title: "Inbound IVR Menus",
    description: "Route 80% of inbound calls without a live agent — qualifying, informing, and directing callers instantly.",
  },
  {
    icon: PhoneCall,
    title: "Outbound Campaigns",
    description: "Reach your contact list with voice messages, lead qualifications, and survey prompts at scale.",
  },
  {
    icon: Clock,
    title: "After-Hours Handling",
    description: "Never miss a call. Capture after-hours inquiries with smart voicemail routing and callback scheduling.",
  },
];

const STATS = [
  { value: "80%", label: "Call containment rate" },
  { value: "40%", label: "Reduction in no-shows" },
  { value: "24/7", label: "Phone coverage" },
  { value: "< 2min", label: "Average setup time" },
];

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Voxmation",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  telephone: PHONE_NUMBER,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_NUMBER,
    contactType: "sales",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Voxmation",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Linux, Cloud",
  description:
    "Voice prompt automation platform for IVR menus, appointment reminders, outbound campaigns, and after-hours call handling.",
  url: SITE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Self-Hosted",
      price: "0",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Cloud-Managed",
      description: "Coming soon",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      description: "Contact sales",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([orgSchema, softwareSchema]) }}
      />

      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-violet-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(255,255,255,0))]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
            <Activity className="w-3.5 h-3.5" />
            Voice Automation · IVR · Outbound Campaigns
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            Automate every{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              voice interaction
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Voxmation turns your phone system into an intelligent automation engine. Build IVR menus, send appointment reminders, run outbound campaigns, and handle after-hours calls — without hiring more agents.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40 hover:shadow-violet-900/60 hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/features"
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Features
            </Link>
          </div>

          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call us: {PHONE_NUMBER}
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-16">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to automate voice
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From simple IVR menus to complex multi-step outbound campaigns — Voxmation handles it all on your infrastructure or ours.
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Live in minutes, not months
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No PBX expertise required. Connect your number, build your flow, and go live.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.step} className="relative">
                <div className="text-5xl font-black text-violet-500/20 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for every voice use case
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Whether you're automating inbound routing or running outbound campaigns, Voxmation has the tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="flex items-start gap-5 p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{uc.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{uc.description}</p>
                    <Link
                      href="/use-cases"
                      className="inline-flex items-center gap-1 mt-3 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
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
                Ready to automate your phone system?
              </h2>
              <p className="text-gray-400 text-lg mb-2 max-w-xl mx-auto">
                Talk to our team — or call us directly. We'll help you design the right call flow for your business.
              </p>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-200 font-semibold text-lg mb-8 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {PHONE_NUMBER}
              </a>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40"
                >
                  Schedule a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
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
