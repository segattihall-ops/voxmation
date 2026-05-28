import type { Metadata } from "next";
import {
  Mic, PhoneCall, PhoneIncoming, BarChart3, Globe, Shield,
  Cpu, FileText, Headphones, Clock, Zap, Lock
} from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Features — Voice Prompt Automation Platform";
  const description =
    "Explore every capability of the Voxmation voice automation platform: prompt builder, call flow designer, IVR, outbound campaigns, real-time analytics, Asterisk/FreeSWITCH/Twilio integrations, AI transcription, and RBAC.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/features` },
    openGraph: {
      title: "Features — Voxmation Voice Automation",
      description:
        "Visual call flow designer, outbound dialer, real-time analytics, multi-platform telephony support, and enterprise security — all in one voice automation platform.",
      url: `${SITE_URL}/features`,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation Features" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

const FEATURE_GROUPS = [
  {
    heading: "Call Flow Builder",
    icon: Mic,
    tagline: "Design any call flow visually — no coding required",
    features: [
      "Drag-and-drop call flow editor with unlimited nodes and branches",
      "DTMF keypress and speech recognition input on any node",
      "Text-to-speech (TTS) prompt generation with natural-sounding voices",
      "Upload custom WAV/MP3 recordings for professional-grade prompts",
      "Conditional branching based on caller input, CRM data, or schedule",
      "Loop detection and infinite retry prevention built in",
      "Version control: save, compare, and rollback flow versions",
      "Export and import flows as JSON for backup or team collaboration",
    ],
  },
  {
    heading: "IVR Menu Designer",
    icon: PhoneIncoming,
    tagline: "Route every inbound call to the right destination in seconds",
    features: [
      "Multi-level IVR menus with up to 10 levels and 9 options per level",
      "Speech recognition: callers say their intent instead of pressing keys",
      "Schedule-aware routing: different flows for business hours, weekends, and holidays",
      "CRM screen-pop: surface caller's account before the agent picks up",
      "Overflow routing: automatic failover to alternative queues or voicemail",
      "Graceful timeout handling: re-prompt, escalate, or transfer after no input",
      "DNIS-based routing: map different phone numbers to different call flows",
      "Caller ID spoofing protection and blocklist management",
    ],
  },
  {
    heading: "Outbound Campaign Dialer",
    icon: PhoneCall,
    tagline: "Reach your contact list with automated voice at scale",
    features: [
      "Upload contact lists via CSV or pull from CRM via API",
      "Schedule campaigns to launch at a specific date and time or timezone",
      "Configurable dialing rate (calls per minute) and concurrent channel limits",
      "DTMF capture: collect opt-in/opt-out, survey responses, and callback requests",
      "Answering machine detection (AMD) with separate flows for live vs. voicemail",
      "Real-time campaign pause, resume, and cancellation",
      "DNC (Do Not Call) list management and automatic scrubbing",
      "Disposition tracking per call: answered, voicemail, busy, no answer",
    ],
  },
  {
    heading: "Real-Time Analytics",
    icon: BarChart3,
    tagline: "Understand every call — live and historically",
    features: [
      "Live call monitoring dashboard: active calls, queue depth, agent status",
      "Call completion funnel: track drop-off at every node in the flow",
      "Containment rate: percentage of calls resolved without a live agent",
      "Campaign performance: answer rate, disposition breakdown, conversion rate",
      "A/B test prompts: split traffic between two flows and compare outcomes",
      "Custom date range reporting with CSV and JSON export",
      "Webhook-based event streaming for real-time data pipelines",
      "Scheduled reports delivered by email daily, weekly, or monthly",
    ],
  },
  {
    heading: "Telephony Integrations",
    icon: Globe,
    tagline: "Works with your existing PBX or cloud provider",
    features: [
      "Asterisk integration via AMI (Asterisk Manager Interface) and AGI scripts",
      "FreeSWITCH integration via ESL (Event Socket Library)",
      "Twilio integration via REST API and TwiML webhooks",
      "SIP trunk support for any compatible provider (Telnyx, Vonage, Bandwidth)",
      "Multi-backend support: route campaigns through Asterisk with Twilio failover",
      "Click-to-call from any CRM record or contact page",
      "Call recording with configurable retention policies and S3-compatible storage",
      "Real-time transcription via Whisper (on-premises) or Deepgram (API)",
    ],
  },
  {
    heading: "AI Transcription & Intelligence",
    icon: Cpu,
    tagline: "Turn every call into searchable, actionable data",
    features: [
      "Automatic transcription of all inbound and outbound calls",
      "On-premises transcription via OpenAI Whisper — recordings never leave your servers",
      "Cloud transcription via Deepgram for sub-second turnaround",
      "Keyword spotting and sentiment analysis on transcripts",
      "Full-text search across all transcriptions to find any call",
      "Transcript-linked call records: click any line to jump to that moment in the recording",
      "Compliance automation: flag calls containing required disclosures",
      "Summary generation: AI-generated one-paragraph call summaries",
    ],
  },
  {
    heading: "Enterprise Security & RBAC",
    icon: Shield,
    tagline: "Governance without the enterprise price tag",
    features: [
      "JWT-based authentication with configurable token expiry and refresh",
      "Role-based access control: define roles and map to per-resource permissions",
      "Fine-grained permissions: read, write, delete, admin per module",
      "Immutable audit log: every action recorded with user, timestamp, and diff",
      "Audit log export for compliance audits and legal discovery",
      "HIPAA-ready: encryption at rest and in transit, BAA-eligible deployment",
      "SSO support via SAML 2.0 and OAuth 2.0 (Enterprise tier)",
      "IP allowlist and rate limiting on all API endpoints",
    ],
  },
];

const COMPARISON = [
  { label: "Visual call flow builder", us: true },
  { label: "Outbound campaign dialer", us: true },
  { label: "IVR with speech recognition", us: true },
  { label: "Asterisk / FreeSWITCH support", us: true },
  { label: "On-premises deployment", us: true },
  { label: "Real-time analytics", us: true },
  { label: "AI transcription (on-prem)", us: true },
  { label: "No per-minute markup", us: true },
  { label: "Full data ownership", us: true },
  { label: "Enterprise RBAC", us: true },
];

export default function FeaturesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Features", item: `${SITE_URL}/features` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Full Platform
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Every feature to automate voice, end to end
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Voxmation is modular. Use the call flow builder, IVR designer, outbound dialer, and analytics together — or connect individual pieces to your existing stack.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {FEATURE_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.heading}
                className="border border-gray-800/60 rounded-2xl overflow-hidden bg-gray-900/30"
              >
                <div className="flex items-center gap-4 p-6 border-b border-gray-800/60">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg">{group.heading}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{group.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-1.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What sets Voxmation apart
          </h2>
          <div className="border border-gray-800/60 rounded-2xl overflow-hidden">
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-6 py-3.5 text-sm ${i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}`}
              >
                <span className="text-gray-300">{row.label}</span>
                <span className="text-emerald-400 font-semibold">✓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Have questions? Talk to our team.
          </h2>
          <p className="text-gray-400 mb-6">
            We'll walk you through the platform and help design the right call flow for your use case.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold text-lg transition-colors"
          >
            <PhoneCall className="w-5 h-5" />
            {PHONE_NUMBER}
          </a>
        </div>
      </section>
    </>
  );
}
