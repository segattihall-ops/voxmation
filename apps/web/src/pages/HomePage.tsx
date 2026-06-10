import { Link } from "react-router-dom";
import {
  Phone, MessageSquareText, PhoneForwarded, CalendarCheck,
  Zap, ShieldCheck, CheckCircle, XCircle, ArrowRight, Star, Clock,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import { CONTACT } from "../config/business";

const FEATURES = [
  {
    icon: Phone,
    title: "24/7 AI Receptionist",
    description: "A natural-sounding AI answers every call in under 2 seconds — day, night, weekends, and holidays. No voicemail, no hold music, no missed opportunities.",
  },
  {
    icon: MessageSquareText,
    title: "Missed Call Textback",
    description: "If a call slips through, Voxmation instantly sends an SMS to the caller so the lead stays warm and the conversation continues by text.",
  },
  {
    icon: CheckCircle,
    title: "Lead Qualification",
    description: "Voxmation asks the right questions — service needed, location, urgency, budget — and qualifies the lead before it ever reaches your team.",
  },
  {
    icon: PhoneForwarded,
    title: "Smart Call Routing",
    description: "Emergencies, after-hours jobs, and high-value callers are routed to the right person or location based on rules you control.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment Booking",
    description: "Qualified callers can book straight into your calendar, with automated SMS confirmations and reminders to cut no-shows.",
  },
  {
    icon: Zap,
    title: "CRM & Tool Sync",
    description: "Every call, lead, and booking syncs to your CRM (HubSpot, Zoho) and triggers follow-up automations — no manual data entry.",
  },
];

const COMPARISON = [
  { feature: "Answers in under 2 seconds", vox: true, smith: false, goodcall: true, nextphone: true },
  { feature: "Missed call SMS textback", vox: true, smith: false, goodcall: false, nextphone: false },
  { feature: "Predictable, volume-based pricing", vox: true, smith: false, goodcall: true, nextphone: true },
  { feature: "No per-minute overage surprises", vox: true, smith: false, goodcall: false, nextphone: true },
  { feature: "Lead qualification & routing", vox: true, smith: true, goodcall: true, nextphone: true },
  { feature: "Built for home-service trades", vox: true, smith: false, goodcall: true, nextphone: true },
  { feature: "CRM sync (HubSpot, Zoho)", vox: true, smith: true, goodcall: false, nextphone: false },
  { feature: "White-label for agencies", vox: true, smith: false, goodcall: false, nextphone: false },
];

const BENEFITS = [
  {
    icon: Clock,
    title: "Never miss revenue again",
    description: "The average service business misses 1 in 4 inbound calls. Each one is a job that goes to a competitor. Voxmation catches every one.",
  },
  {
    icon: MessageSquareText,
    title: "Speed beats everyone",
    description: "Callers hire the first business that responds. Sub-2-second answering and instant textback put you first, every time.",
  },
  {
    icon: ShieldCheck,
    title: "Predictable pricing",
    description: "No surprise per-minute bills in your busy season. Plans scale with call volume so you always know your cost.",
  },
];

const STATS = [
  { value: "<2s", label: "Answer time" },
  { value: "24/7", label: "Always on" },
  { value: "1 in 4", label: "Calls missed without it" },
  { value: "60%+", label: "Missed-call recovery" },
];

function Cell({ value }: { value: boolean }) {
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
    name: "Voxmation",
    url: "https://voxmation.com",
    description:
      "AI receptionist and missed-call recovery for home-service businesses. Answer, qualify, and route every call 24/7.",
  };

  return (
    <>
      <SEOHead
        title="Voxmation — AI Receptionist & Missed Call Recovery"
        description="A 24/7 AI receptionist that answers, qualifies, and routes every call — plus instant SMS textback for missed calls. Built for HVAC, plumbing, and electrical businesses. Never lose a lead again."
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
            AI Receptionist · Answers in under 2 seconds · 24/7
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            Never miss another{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              customer call
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Voxmation is the AI receptionist for service businesses. It answers, qualifies, and
            routes every call 24/7 — and texts back the ones you miss in seconds. Turn missed
            calls into booked jobs, without hiring a single extra person.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to="/missed-call-recovery"
              className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40 hover:shadow-violet-900/60 hover:-translate-y-0.5"
            >
              See how it recovers leads
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              Call {CONTACT.phone}
            </a>
          </div>

          <p className="text-sm text-gray-500 mb-16">
            Talk to sales: <a href={CONTACT.emailHref} className="text-violet-400 hover:text-violet-300">{CONTACT.email}</a>
          </p>

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
              Everything a great receptionist does — automated
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Voxmation handles the phone so your team can stay on the job. Answer, qualify, route,
              book, and follow up — all without a human picking up.
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
              How does Voxmation compare?
            </h2>
            <p className="text-gray-400 text-lg">
              The features that win jobs, side by side with other AI answering services.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-800/60">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feature</th>
                  <th className="px-6 py-4 text-sm font-semibold text-violet-400">Voxmation</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">Smith.ai</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">Goodcall</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-500">NextPhone</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}
                  >
                    <td className="px-6 py-3.5 text-sm text-gray-300">{row.feature}</td>
                    <td className="px-6 py-3.5 text-center"><Cell value={row.vox} /></td>
                    <td className="px-6 py-3.5 text-center"><Cell value={row.smith} /></td>
                    <td className="px-6 py-3.5 text-center"><Cell value={row.goodcall} /></td>
                    <td className="px-6 py-3.5 text-center"><Cell value={row.nextphone} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link to="/vs-smith-ai" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Voxmation vs Smith.ai →
            </Link>
            <Link to="/vs-goodcall" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Voxmation vs Goodcall →
            </Link>
            <Link to="/vs-nextphone" className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-4">
              Voxmation vs NextPhone →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why service businesses choose Voxmation
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Every missed call is a customer calling your competitor next. Voxmation makes sure
              you answer first.
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
                Ready to stop losing leads to missed calls?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                See Voxmation answer, qualify, and route a live call. Get set up in days, not weeks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-xl shadow-violet-900/40"
                >
                  <Phone className="w-4 h-4" />
                  Call {CONTACT.phone}
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
