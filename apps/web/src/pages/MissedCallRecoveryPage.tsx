import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MessageSquareText, Phone, TrendingUp } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { CONTACT } from "../config/business";

function currency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function RoiCalculator() {
  const [missedCalls, setMissedCalls] = useState(20);
  const [jobValue, setJobValue] = useState(450);
  const [closeRate, setCloseRate] = useState(35);
  const [recoveryRate, setRecoveryRate] = useState(60);

  const { lostRevenue, recovered } = useMemo(() => {
    const lost = missedCalls * jobValue * (closeRate / 100);
    return { lostRevenue: lost, recovered: lost * (recoveryRate / 100) };
  }, [missedCalls, jobValue, closeRate, recoveryRate]);

  const inputs = [
    { label: "Missed calls per month", value: missedCalls, set: setMissedCalls, min: 0, max: 200, step: 1, suffix: "" },
    { label: "Average job value", value: jobValue, set: setJobValue, min: 50, max: 5000, step: 50, suffix: "$" },
    { label: "Close rate", value: closeRate, set: setCloseRate, min: 1, max: 100, step: 1, suffix: "%" },
    { label: "Recovery rate with Voxmation", value: recoveryRate, set: setRecoveryRate, min: 1, max: 100, step: 1, suffix: "%" },
  ];

  return (
    <div className="bg-gray-900/30 border border-gray-800/60 rounded-3xl p-7 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {inputs.map((inp) => (
            <div key={inp.label}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">{inp.label}</label>
                <span className="text-sm font-bold text-violet-400">
                  {inp.suffix === "$" ? currency(inp.value) : `${inp.value}${inp.suffix}`}
                </span>
              </div>
              <input
                type="range"
                min={inp.min}
                max={inp.max}
                step={inp.step}
                value={inp.value}
                onChange={(e) => inp.set(Number(e.target.value))}
                className="w-full accent-violet-500"
                aria-label={inp.label}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="rounded-2xl border border-gray-800/60 bg-gray-950/50 p-6">
            <p className="text-sm text-gray-500 mb-1">Revenue lost to missed calls / month</p>
            <p className="text-4xl font-black text-red-400">{currency(lostRevenue)}</p>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6">
            <p className="text-sm text-gray-400 mb-1">Revenue Voxmation could recover / month</p>
            <p className="text-4xl font-black text-emerald-400">{currency(recovered)}</p>
            <p className="text-xs text-gray-500 mt-2">
              = missed calls × job value × close rate × recovery rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MissedCallRecoveryPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "Missed Call Recovery", item: "https://voxmation.com/missed-call-recovery" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is missed call recovery?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Missed call recovery is the process of automatically re-engaging callers whose calls went unanswered — typically by sending an instant SMS (missed call textback) so the lead can reply, ask questions, or book without calling a competitor.",
        },
      },
      {
        "@type": "Question",
        name: "How much revenue do missed calls cost a service business?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on call volume, average job value, and close rate. A business that misses 20 calls a month at a $450 average job value and a 35% close rate is losing roughly $3,150 in monthly revenue to missed calls alone.",
        },
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Missed Call Recovery — Never Lose a Lead Again"
        description="Every missed call is lost revenue. Voxmation answers instantly and texts back the calls you miss, turning lost leads into booked jobs. Use the calculator to see how much missed calls cost your business."
        canonical="/missed-call-recovery"
        jsonLd={[breadcrumb, faqSchema]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <MessageSquareText className="w-3.5 h-3.5" />
            Missed call textback
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Every missed call is lost revenue
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            When you're on a job, the phone still rings — and most callers never leave a voicemail.
            Voxmation answers instantly and texts back the calls you miss, so a missed call becomes a
            booked job instead of a win for your competitor.
          </p>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Missed call revenue calculator</h2>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl">
            Drag the sliders to estimate how much revenue your business loses to missed calls each
            month — and how much Voxmation could recover.
          </p>
          <RoiCalculator />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">How Voxmation recovers missed calls</h2>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              The AI receptionist answers in under two seconds, so most calls are never missed in the first place.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              If a call is still missed — busy lines, after hours — Voxmation sends an instant SMS textback to the caller.
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-300 text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              The caller replies by text to ask questions or book, and the lead syncs to your CRM with a follow-up triggered automatically.
            </li>
          </ul>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stop losing leads today</h2>
          <p className="text-gray-400 mb-8">Talk to sales about turning missed calls into booked jobs.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
              <Phone className="w-4 h-4" /> Call {CONTACT.phone}
            </a>
            <Link to="/how-it-works" className="px-6 py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors">
              See how it works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
