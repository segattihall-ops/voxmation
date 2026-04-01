import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SEOHead from "../components/SEOHead";
import clsx from "clsx";

const FAQS = [
  {
    q: "Is there a free self-hosted CRM with telephony?",
    a: "Yes — Voxmation OS is a completely free, open-source CRM with built-in telephony. It integrates natively with Asterisk and FreeSWITCH over SIP, and supports Twilio as a PSTN fallback. You self-host it on any Linux server at no cost. The MIT license means no hidden fees, no expiry, and no feature gates.",
  },
  {
    q: "Can I use my own Asterisk server with a CRM?",
    a: "Yes. Voxmation OS is designed specifically for this use case. It connects to your existing Asterisk or FreeSWITCH PBX via SIP trunk configuration. Incoming and outgoing calls are automatically logged to the CRM, recordings are stored per your retention policy, and transcriptions can be generated via Whisper or Deepgram.",
  },
  {
    q: "What is the best open-source CRM for small businesses?",
    a: "Voxmation OS is a strong choice for small businesses that want to own their data. Unlike SaaS CRMs that charge per user, Voxmation OS has no per-seat fees. You get CRM, telephony, project management, billing, and integrations in a single deployable stack — all open source under the MIT license.",
  },
  {
    q: "How does Voxmation OS compare to HubSpot?",
    a: "The core difference is self-hosting and cost. HubSpot is a SaaS platform with per-user pricing that can reach thousands of dollars per month for larger teams. Voxmation OS is free to self-host with unlimited users. HubSpot does not support native Asterisk/SIP telephony — you need third-party dialers. Voxmation OS includes telephony natively.",
  },
  {
    q: "Does Voxmation OS support Twilio?",
    a: "Yes. Twilio is supported as a PSTN gateway for teams that don't have an on-premises PBX. You can configure a Twilio account SID and auth token in the environment variables, and Voxmation OS will route outbound calls through Twilio and capture inbound Twilio webhooks for call logging.",
  },
  {
    q: "What database does Voxmation OS use?",
    a: "Voxmation OS uses PostgreSQL as its primary database, accessed via the Prisma ORM. You can connect it to any PostgreSQL-compatible database — self-hosted PostgreSQL, Amazon RDS, DigitalOcean Managed Databases, Supabase, or Neon.",
  },
  {
    q: "Is Voxmation OS suitable for enterprise use?",
    a: "Yes. It includes JWT-based authentication, role-based access control (RBAC), immutable audit logging, and webhook signature verification — features typically reserved for enterprise SaaS products. Because you self-host it, you control the security posture end-to-end.",
  },
  {
    q: "How do I deploy Voxmation OS?",
    a: "You can deploy Voxmation OS on any Linux server. The recommended approach is Docker Compose for single-server deployments, or Kubernetes for multi-node production setups. The GitHub repository includes deployment guides, environment variable documentation, and a docker-compose.yml to get started in minutes.",
  },
  {
    q: "Can I integrate Voxmation OS with other tools?",
    a: "Yes. Voxmation OS includes an Integration Hub with an event-driven webhook system. You can subscribe any external endpoint to any internal event (e.g., lead.created, call.ended, invoice.paid). The full REST API follows the OpenAPI 3.0 spec, and you can generate typed client SDKs from it.",
  },
  {
    q: "Is there a cloud-hosted version of Voxmation OS?",
    a: "A cloud-managed tier is in development for teams that want all the benefits of Voxmation OS without managing infrastructure. It will include managed PostgreSQL, automatic backups, one-click upgrades, and priority support. You can join the waitlist on GitHub Discussions.",
  },
  {
    q: "What programming language is Voxmation OS built with?",
    a: "The backend is built with Node.js and TypeScript using the Fastify 5 framework. The frontend is React + Vite with TypeScript and Tailwind CSS. The database layer uses Prisma ORM. The entire stack is TypeScript end-to-end, making it straightforward to extend if you know JavaScript.",
  },
  {
    q: "Can I customize the CRM to fit my workflow?",
    a: "Yes. Custom fields are supported on all core entities. For deeper customization, the codebase is MIT licensed — you can fork it, add new modules, modify the schema, and deploy your own version. There's no vendor to ask permission from.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-800/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-200">{q}</span>
        <ChevronDown className={clsx("w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <p className="pb-5 text-gray-500 leading-relaxed text-sm">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://voxmation.com/faq" },
    ],
  };

  return (
    <>
      <SEOHead
        title="FAQ — Self-Hosted CRM with Telephony Questions Answered"
        description="Common questions about Voxmation OS: self-hosted CRM, Asterisk integration, Twilio, pricing, deployment, and how it compares to HubSpot, Salesforce, and Zoho."
        canonical="/faq"
        jsonLd={[faqSchema, breadcrumb]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Frequently asked questions
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to know about Voxmation OS — self-hosted CRM, telephony, pricing, and deployment.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto bg-gray-900/30 border border-gray-800/60 rounded-2xl px-6">
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>
    </>
  );
}
