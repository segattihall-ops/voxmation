import { Link } from "react-router-dom";
import { PhoneCall, ListChecks, PhoneForwarded, ArrowRight, Phone } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { CONTACT } from "../config/business";

const STEPS = [
  {
    icon: PhoneCall,
    step: "1",
    title: "Voxmation answers the call",
    body: "Every inbound call is answered in under two seconds by a natural-sounding AI receptionist that greets the caller with your business name — 24/7, including nights, weekends, and holidays. No voicemail, no hold music.",
  },
  {
    icon: ListChecks,
    step: "2",
    title: "It qualifies the lead",
    body: "The AI asks the right intake questions: what service is needed, the location, how urgent it is, and the timeline. It identifies emergencies, filters out spam and vendors, and builds a clean, qualified summary of the caller.",
  },
  {
    icon: PhoneForwarded,
    step: "3",
    title: "It routes — or books — in real time",
    body: "Based on your rules, Voxmation routes the caller to the right person or location, escalates emergencies to on-call staff, books the appointment straight into your calendar, or warm-transfers to a human. Missed calls get an instant SMS textback so no lead is lost.",
  },
];

export default function HowItWorksPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How Voxmation's AI receptionist handles a call",
    description:
      "Voxmation answers, qualifies, and routes every inbound call in real time, and texts back missed calls.",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "How It Works", item: "https://voxmation.com/how-it-works" },
    ],
  };

  return (
    <>
      <SEOHead
        title="How It Works — Answer, Qualify & Route Every Call"
        description="See how Voxmation works: the AI receptionist answers in under 2 seconds, qualifies the lead, and routes or books it in real time — and texts back any missed call. A clear call-to-qualify-to-route flow for service businesses."
        canonical="/how-it-works"
        jsonLd={[howToSchema, breadcrumb]}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 text-xs font-semibold bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full mb-6">
            Call → Qualify → Route
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            How Voxmation works
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            From the moment the phone rings to a booked job on your calendar — here's exactly what
            Voxmation does on every call.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="flex flex-col sm:flex-row gap-6 items-start bg-gray-900/30 border border-gray-800/60 rounded-2xl p-7">
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-4xl font-black text-violet-500/30">{s.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{s.title}</h2>
                  <p className="text-gray-400 leading-relaxed">{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Want to hear it answer a live call?</h2>
          <p className="text-gray-400 mb-8">Call us and experience the AI receptionist for yourself.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
              <Phone className="w-4 h-4" /> Call {CONTACT.phone}
            </a>
            <Link to="/missed-call-recovery" className="flex items-center gap-2 px-6 py-3 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors">
              Missed call recovery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
