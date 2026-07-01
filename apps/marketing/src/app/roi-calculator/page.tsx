import type { Metadata } from "next";
import DemoSection from "@/components/DemoSection";
import JsonLd from "@/components/JsonLd";
import ROICalculator from "@/components/ROICalculator";
import { SITE_URL } from "@/lib/constants";

const PAGE_URL = `${SITE_URL}/roi-calculator`;

export const metadata: Metadata = {
  title: "Missed Call Revenue Calculator — What Missed Calls Cost You",
  description:
    "Free calculator: estimate how much revenue your business loses to missed and unanswered calls each month and year — and how much VOXmatiON's AI receptionist can recover.",
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: "Missed Call Revenue Calculator" },
};

const FAQ = [
  {
    q: "How much revenue do missed calls actually cost?",
    a: "It depends on your call volume, average job value, and close rate. A home-service business taking 100 calls a week, missing 25%, with an $800 average job and a 40% close rate loses roughly $34,000 a month in opportunity. Use the calculator above to estimate your own number.",
  },
  {
    q: "How is the lost revenue calculated?",
    a: "Missed calls per month = weekly calls × 4.33 weeks × your missed-call percentage. Lost revenue = missed calls × your close rate × your average job value. Annual figures multiply the monthly result by 12.",
  },
  {
    q: "Can an AI receptionist really recover these calls?",
    a: "Yes. VOXmatiON answers every call in under two seconds, qualifies the caller, books the appointment, and sends a missed-call text when needed — so the calls you used to lose to voicemail become booked jobs.",
  },
  {
    q: "What's a typical missed-call rate for small businesses?",
    a: "Studies of home-service and local businesses commonly find 20–30% of inbound calls go unanswered, and a large share of callers who hit voicemail simply call a competitor instead of leaving a message.",
  },
];

export default function RoiCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Missed Call Revenue Calculator", item: PAGE_URL },
    ],
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Missed Call Revenue Calculator",
    url: PAGE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "VOXmatiON", url: SITE_URL },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={appSchema} />
      <JsonLd data={faqSchema} />

      <section className="relative pt-32 pb-16 bg-[#060A10] text-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
            Free Calculator
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold mb-6 leading-tight text-[#F7F5F0]">
            How much are missed calls costing you?
          </h1>
          <p className="text-xl text-[#8A99B3] font-body">
            Drag the sliders to estimate the revenue slipping away to voicemail every month — and how much
            VOXmatiON can win back.
          </p>
        </div>
      </section>

      <ROICalculator />

      <section className="pb-20 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-8 text-center">
            Missed call cost: common questions
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
                <h3 className="font-display text-lg font-semibold text-[#F7F5F0] mb-2">{f.q}</h3>
                <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
