import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mic, Phone, PhoneCall, PhoneIncoming } from "lucide-react";
import FAQSection from "@/components/FAQSection";
import FoundersOfferSection from "@/components/FoundersOfferSection";
import HeroSection from "@/components/HeroSection";
import HomePricingSection from "@/components/HomePricingSection";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Voxmation — AI Receptionist & Missed Call Recovery";
  const description =
    "VOXmatiON recovers missed calls, qualifies leads, follows up automatically, and books appointments with a managed AI receptionist system.";

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
    icon: PhoneIncoming,
    title: "Missed Call Recovery",
    description:
      "Instantly follows up with missed callers, captures intent, and alerts your team before the lead goes cold.",
  },
  {
    icon: PhoneCall,
    title: "24/7 AI Receptionist",
    description:
      "Answers routine calls, collects lead details, routes urgent requests, and keeps your business responsive after hours.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description:
      "Qualifies prospects and moves them toward booked appointments using your preferred calendar and CRM workflow.",
  },
  {
    icon: Mic,
    title: "Custom Voice Flows",
    description:
      "Built around your service categories, questions, locations, and follow-up rules so every call feels business-specific.",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Map your missed call flow",
    description:
      "We document your services, lead questions, routing logic, calendar rules, and follow-up expectations.",
  },
  {
    step: "02",
    title: "Connect phone, CRM, and calendar",
    description:
      "VOXmatiON connects your call handling, lead capture, notifications, CRM, and booking workflow.",
  },
  {
    step: "03",
    title: "Launch within 72 hours",
    description:
      "Your AI receptionist goes live, starts recovering missed calls, and sends qualified leads to your team.",
  },
  {
    step: "04",
    title: "Optimize from real conversations",
    description:
      "We refine questions, scripts, lead scoring, and alerts based on actual caller behavior and conversion data.",
  },
];

const USE_CASES = [
  {
    icon: Clock,
    title: "After-hours lead capture",
    description: "Catch leads that arrive when your team is offline and respond before competitors do.",
  },
  {
    icon: PhoneIncoming,
    title: "High-intent missed calls",
    description: "Recover customers who called with immediate need, pricing questions, or booking intent.",
  },
  {
    icon: PhoneCall,
    title: "Service business qualification",
    description: "Capture service type, urgency, location, job value, and preferred appointment time automatically.",
  },
  {
    icon: Calendar,
    title: "No-show reduction",
    description: "Send reminders and follow-up flows that reduce empty appointment slots and lost revenue.",
  },
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
  operatingSystem: "Cloud, Web",
  description:
    "Managed AI receptionist and missed call recovery platform for service businesses.",
  url: SITE_URL,
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      price: "347",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "497",
      priceCurrency: "USD",
    },
    {
      "@type": "Offer",
      name: "Elite",
      description: "Custom pricing",
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

      <HeroSection />

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built to recover revenue from calls you already receive
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              VOXmatiON turns missed calls, after-hours inquiries, and slow follow-up into qualified leads and booked appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group p-6 bg-gray-900/50 border border-gray-800/60 rounded-2xl hover:border-violet-500/30 hover:bg-gray-900 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
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
              Live in days, not months
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A managed setup process built for speed, low friction, and measurable lead recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.step} className="relative">
                <div className="text-5xl font-black text-violet-500/20 mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Designed for high-intent service leads
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Use VOXmatiON anywhere slow response time, missed calls, or no-shows create revenue leaks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((useCase) => {
              const Icon = useCase.icon;

              return (
                <div
                  key={useCase.title}
                  className="flex items-start gap-5 p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{useCase.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{useCase.description}</p>
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

      <HomePricingSection />
      <FoundersOfferSection />
      <FAQSection />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900/50 to-indigo-900/30 border border-violet-500/20 p-10 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),transparent)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to stop losing revenue to missed calls?
              </h2>
              <p className="text-gray-400 text-lg mb-2 max-w-xl mx-auto">
                Talk to our team or call us directly. We will help you calculate the missed call recovery opportunity for your business.
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
                  Schedule a demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-6 py-3.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 font-semibold rounded-xl border border-gray-700/60 transition-colors"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
