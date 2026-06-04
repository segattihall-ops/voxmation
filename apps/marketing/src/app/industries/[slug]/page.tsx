import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2, ArrowRight, Phone, Star, TrendingUp,
  Clock, Users, Zap, Calendar, Shield, PhoneCall,
} from "lucide-react";
import DemoSection from "@/components/DemoSection";

const INDUSTRIES: Record<string, {
  name: string; headline: string; subheadline: string;
  pain: string; callValue: string; features: string[];
  desktopHero?: string; mobileHero?: string;
  stats?: { value: string; label: string }[];
  benefits?: { icon: string; title: string; body: string }[];
}> = {
  "hvac-ai-receptionist": {
    name: "HVAC",
    headline: "AI Receptionist for HVAC Companies",
    subheadline: "Stop losing emergency calls to your competition. Answer every call, 24/7.",
    pain: "HVAC calls spike during heatwaves and cold snaps — exactly when your team is busiest. Every missed call is a job worth $300–$2,000 going to a competitor.",
    callValue: "$800",
    desktopHero: "https://2ywrmvccumupilj7.public.blob.vercel-storage.com/hvac-hero.png",
    mobileHero: "https://2ywrmvccumupilj7.public.blob.vercel-storage.com/hvac-mobile-hero.png",
    features: ["Emergency call prioritization", "Service area routing", "Seasonal surge handling", "Technician dispatch automation"],
    stats: [
      { value: "94%", label: "Calls Answered" },
      { value: "< 2s", label: "Response Time" },
      { value: "3×", label: "More Bookings" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "zap", title: "Emergency Triage", body: "Automatically identify urgent breakdowns and route them to your on-call tech instantly." },
      { icon: "calendar", title: "Instant Booking", body: "Customers book maintenance and tune-up appointments without ever waiting on hold." },
      { icon: "shield", title: "Surge Protection", body: "Handle 10× call volume during heat waves without dropping a single lead." },
    ],
  },
  "plumbing-ai-receptionist": {
    name: "Plumbing",
    headline: "AI Receptionist for Plumbers",
    subheadline: "Capture every emergency call automatically.",
    pain: "Plumbing emergencies can't wait. When customers call and get voicemail, they hang up and call someone else. VOXmatiON answers immediately and dispatches the right tech.",
    callValue: "$650",
    features: ["24/7 emergency response", "Job type qualification", "Dispatch automation", "Estimate booking"],
    stats: [
      { value: "97%", label: "Calls Answered" },
      { value: "< 2s", label: "Response Time" },
      { value: "2×", label: "More Bookings" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "zap", title: "Emergency First", body: "Burst pipe? Flooding? VOXmatiON flags it as P1 and gets a plumber dispatched in under 3 minutes." },
      { icon: "calendar", title: "Auto-Schedule", body: "Routine repairs and inspections booked directly into your calendar with zero back-and-forth." },
      { icon: "users", title: "Lead Qualification", body: "Captures job type, address, and scope before handing off — so your team arrives prepared." },
    ],
  },
  "roofing-ai-receptionist": {
    name: "Roofing",
    headline: "AI Receptionist for Roofing Companies",
    subheadline: "Qualify leads and book estimates automatically.",
    pain: "Storm season floods your phone. Most roofing companies miss 30–50% of inbound calls during peak periods. VOXmatiON handles the overflow and qualifies every lead.",
    callValue: "$4,500",
    features: ["Storm damage lead qualification", "Insurance job routing", "Estimate scheduling", "Follow-up automation"],
    stats: [
      { value: "90%", label: "Leads Captured" },
      { value: "48h", label: "Faster Follow-up" },
      { value: "40%", label: "More Estimates" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "shield", title: "Storm Surge Handling", body: "Capture every call during peak storm season, no matter how many come in simultaneously." },
      { icon: "trending-up", title: "Insurance Lead Routing", body: "Identify insurance claims vs. cash jobs upfront so your estimators prioritize correctly." },
      { icon: "calendar", title: "Estimate Scheduling", body: "VOXmatiON books the estimate on the spot — no callbacks, no leakage." },
    ],
  },
  "electrical-ai-receptionist": {
    name: "Electrical",
    headline: "AI Receptionist for Electricians",
    subheadline: "Answer every service call while your team works.",
    pain: "Electricians can't answer their phone while on a job site. VOXmatiON handles inbound calls, captures job details, and routes the lead to the right technician.",
    callValue: "$500",
    features: ["Job site availability routing", "Emergency vs. standard triage", "Permit job qualification", "Callback scheduling"],
    stats: [
      { value: "95%", label: "Calls Answered" },
      { value: "< 2s", label: "Response Time" },
      { value: "30%", label: "More Revenue" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "zap", title: "On-Site Coverage", body: "Your techs stay focused on the job while VOXmatiON handles every incoming call." },
      { icon: "shield", title: "Safety Triage", body: "Identify electrical emergencies immediately and dispatch the nearest available electrician." },
      { icon: "calendar", title: "Permit Job Routing", body: "Qualify commercial vs residential and permit complexity before routing to the right team." },
    ],
  },
  "cleaning-ai-receptionist": {
    name: "Cleaning",
    headline: "AI Receptionist for Cleaning Companies",
    subheadline: "Book more recurring clients automatically.",
    pain: "Cleaning companies live on recurring contracts. Missing one new client inquiry can cost thousands over a year. VOXmatiON captures every inquiry and books the estimate.",
    callValue: "$2,400",
    features: ["Recurring service qualification", "Property size capture", "Quote scheduling", "Follow-up sequences"],
    stats: [
      { value: "92%", label: "Inquiries Captured" },
      { value: "3×", label: "Faster Booking" },
      { value: "$2,400", label: "Avg Client Value" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "users", title: "Client Qualification", body: "Capture property type, size, frequency preference, and contact details before scheduling." },
      { icon: "calendar", title: "Estimate Booking", body: "Walk-through estimates booked directly into your team's calendar without phone tag." },
      { icon: "trending-up", title: "Recurring Revenue", body: "Follow-up automation re-engages one-time clients and converts them to recurring contracts." },
    ],
  },
  "medical-spa-ai-receptionist": {
    name: "Med Spa",
    headline: "AI Receptionist for Medical Spas",
    subheadline: "Fill your appointment calendar automatically.",
    pain: "Med spa clients expect a premium experience from the first call. VOXmatiON delivers professional, HIPAA-aware conversations that qualify and book consultations.",
    callValue: "$1,200",
    features: ["Consultation booking", "Treatment interest qualification", "VIP client routing", "Confirmation automation"],
    stats: [
      { value: "96%", label: "Calls Answered" },
      { value: "40%", label: "More Bookings" },
      { value: "$1,200", label: "Avg Visit Value" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "star", title: "Premium Experience", body: "A warm, professional AI voice that matches your spa's brand — clients can't tell the difference." },
      { icon: "calendar", title: "Consultation Booking", body: "Book consultations for fillers, lasers, and aesthetic treatments directly from the call." },
      { icon: "shield", title: "HIPAA-Aware", body: "Designed to avoid collecting PHI over voice — keeps your practice compliant and protected." },
    ],
  },
  "legal-intake-ai-receptionist": {
    name: "Legal",
    headline: "AI Receptionist for Law Firms",
    subheadline: "Capture every potential client call.",
    pain: "Legal leads are high value. A missed call from a new client can be worth $5,000–$50,000 in fees. VOXmatiON qualifies the case type and routes to the right attorney.",
    callValue: "$8,000",
    features: ["Case type triage", "Conflict check routing", "Consultation scheduling", "Intake form automation"],
    stats: [
      { value: "99%", label: "Calls Answered" },
      { value: "2×", label: "More Intakes" },
      { value: "$8,000", label: "Avg Case Value" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "shield", title: "Case Type Triage", body: "Identify practice area, urgency, and basic facts before routing to the right attorney." },
      { icon: "users", title: "Conflict Screening", body: "Capture opposing party names upfront to flag potential conflicts before intake." },
      { icon: "calendar", title: "Consultation Booking", body: "Book paid or free consultations directly into attorney calendars with zero staff effort." },
    ],
  },
  "landscaping-ai-receptionist": {
    name: "Landscaping",
    headline: "AI Receptionist for Landscaping Companies",
    subheadline: "Never miss a season. Book every estimate, automatically.",
    pain: "Landscaping leads peak in spring and fall. When your crew is in the field, calls go to voicemail. VOXmatiON captures every inquiry and books the estimate before your competitor answers.",
    callValue: "$1,500",
    desktopHero: "https://2ywrmvccumupilj7.public.blob.vercel-storage.com/landscaping-hero.png",
    mobileHero: "https://2ywrmvccumupilj7.public.blob.vercel-storage.com/landscaping-mobile-hero.png",
    features: ["Seasonal surge handling", "Property size qualification", "Service type routing", "Estimate scheduling"],
    stats: [
      { value: "93%", label: "Calls Captured" },
      { value: "< 2s", label: "Response Time" },
      { value: "2.5×", label: "More Estimates" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "trending-up", title: "Peak Season Ready", body: "Spring and fall call surges handled without a single dropped lead — even when your whole crew is in the field." },
      { icon: "calendar", title: "Instant Estimate Booking", body: "Customers describe their project, VOXmatiON qualifies scope and property size, then books the estimate on the spot." },
      { icon: "zap", title: "Service Routing", body: "Mowing, hardscape, irrigation, cleanups — automatically routed to the right team or estimator." },
    ],
  },
  "real-estate-ai-receptionist": {
    name: "Real Estate",
    headline: "AI Receptionist for Real Estate",
    subheadline: "Qualify every buyer and seller inquiry instantly.",
    pain: "Real estate leads go cold in hours. VOXmatiON answers immediately, qualifies buyer/seller intent, timeline, and budget, then routes to the right agent.",
    callValue: "$12,000",
    features: ["Buyer/seller qualification", "Timeline & budget capture", "Agent routing", "Showing scheduler"],
    stats: [
      { value: "98%", label: "Leads Captured" },
      { value: "< 5min", label: "Response Time" },
      { value: "60%", label: "More Showings" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "users", title: "Lead Qualification", body: "Capture buyer timeline, budget, pre-approval status, and property preferences in real time." },
      { icon: "trending-up", title: "Agent Routing", body: "Hot leads routed to the right agent instantly based on territory, specialization, or availability." },
      { icon: "calendar", title: "Showing Scheduler", body: "Book property tours directly from the call — no callbacks, no lost momentum." },
    ],
  },
  "garage-door-ai-receptionist": {
    name: "Garage Door",
    headline: "AI Receptionist for Garage Door Companies",
    subheadline: "Same-day service starts with answering the phone.",
    pain: "Garage door calls are high-urgency. Customers want same-day service and will call 3–4 companies. VOXmatiON answers first and captures the job.",
    callValue: "$350",
    features: ["Same-day booking automation", "Emergency triage", "Service area qualification", "CRM job creation"],
    stats: [
      { value: "96%", label: "Calls Answered" },
      { value: "< 2s", label: "Response Time" },
      { value: "50%", label: "More Same-Day Jobs" },
      { value: "24/7", label: "Always On" },
    ],
    benefits: [
      { icon: "zap", title: "Answer First, Win First", body: "In garage door, the first company to answer gets the job. VOXmatiON ensures you're always first." },
      { icon: "calendar", title: "Same-Day Booking", body: "Slot available techs into same-day windows automatically while you're on another job." },
      { icon: "shield", title: "Service Area Filter", body: "Qualify the caller's address against your service zones before dispatching — zero wasted trips." },
    ],
  },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  zap: <Zap className="w-5 h-5 text-[#FF8A1F]" />,
  calendar: <Calendar className="w-5 h-5 text-[#FF8A1F]" />,
  shield: <Shield className="w-5 h-5 text-[#FF8A1F]" />,
  users: <Users className="w-5 h-5 text-[#FF8A1F]" />,
  star: <Star className="w-5 h-5 text-[#FF8A1F]" />,
  "trending-up": <TrendingUp className="w-5 h-5 text-[#FF8A1F]" />,
  phone: <Phone className="w-5 h-5 text-[#FF8A1F]" />,
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const industry = INDUSTRIES[params.slug];
  if (!industry) return { title: "Industry" };
  return {
    title: `${industry.headline} | VOXmatiON`,
    description: `${industry.pain} See how VOXmatiON's AI Receptionist works for ${industry.name} businesses.`,
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = INDUSTRIES[params.slug];
  if (!industry) notFound();

  const hasHero = !!(industry.desktopHero || industry.mobileHero);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden" style={{ height: hasHero ? "82vh" : "auto", minHeight: hasHero ? "520px" : "0" }}>
        {hasHero ? (
          <>
            {industry.desktopHero && (
              <Image
                src={industry.desktopHero}
                alt={`${industry.name} AI Receptionist`}
                fill
                className={`object-cover object-center ${industry.mobileHero ? "hidden sm:block" : ""}`}
                priority
                unoptimized
              />
            )}
            {industry.mobileHero && (
              <Image
                src={industry.mobileHero}
                alt={`${industry.name} AI Receptionist`}
                fill
                className="block sm:hidden object-cover object-top"
                priority
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-[#060A10]/20 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#060A10] to-transparent pointer-events-none" />

            {/* Hero CTA overlay */}
            <div className="absolute bottom-20 left-6 sm:left-16 z-10">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.15)] border border-[rgba(255,138,31,0.3)] uppercase tracking-widest mb-4 font-body">
                {industry.name} · AI Receptionist
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl drop-shadow-lg">
                {industry.subheadline}
              </h1>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-sm hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.5)]"
              >
                Book {industry.name} Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          /* Fallback text hero for pages without images */
          <div className="relative min-h-[60vh] flex items-center py-28 bg-[#060A10] overflow-hidden">
            <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] rounded-full bg-[#0B1F3A] opacity-50 blur-[120px] pointer-events-none" />
            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6 font-body">
                {industry.name} · AI Receptionist
              </span>
              <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight mb-6 text-[#F7F5F0]">
                {industry.headline}
              </h1>
              <p className="text-xl text-[#8A99B3] max-w-2xl mx-auto mb-10 font-body">{industry.subheadline}</p>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-lg hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
              >
                Book {industry.name} Demo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ─── Stats bar ─── */}
      {industry.stats && (
        <section className="py-10 bg-[#060A10] border-y border-[rgba(255,255,255,0.05)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {industry.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl font-bold text-[#FF8A1F]">{s.value}</p>
                  <p className="text-sm text-[#8A99B3] font-body mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Problem + Features ─── */}
      <section className="py-24 bg-[#060A10]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
                The Problem
              </span>
              <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-4">Why {industry.name} Businesses Lose Revenue Every Day</h2>
              <p className="text-[#8A99B3] text-lg leading-relaxed mb-8 font-body">{industry.pain}</p>
              <div className="glass rounded-2xl p-6 border border-[rgba(255,138,31,0.2)]">
                <p className="text-sm text-[#8A99B3] font-body mb-1">Average value of one missed {industry.name} call</p>
                <p className="font-display text-4xl font-bold text-[#FF8A1F]">{industry.callValue}</p>
                <p className="text-xs text-[#8A99B3] font-body mt-1">per job opportunity</p>
              </div>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
                The Solution
              </span>
              <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-6">What VOXmatiON Does for {industry.name}</h2>
              <ul className="space-y-3">
                {industry.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 glass rounded-xl px-5 py-4 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,138,31,0.2)] transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0" />
                    <span className="text-[#F7F5F0] font-medium font-body">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      {industry.benefits && (
        <section className="py-20 bg-[#060A10]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
                How It Works
              </span>
              <h2 className="font-display text-4xl font-bold text-[#F7F5F0]">Built for {industry.name} Businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {industry.benefits.map((b) => (
                <div key={b.title} className="glass rounded-3xl p-8 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,138,31,0.2)] transition-all group">
                  <div className="w-11 h-11 rounded-2xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center mb-5 group-hover:bg-[rgba(255,138,31,0.15)] transition-colors">
                    {ICON_MAP[b.icon] ?? <Zap className="w-5 h-5 text-[#FF8A1F]" />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#F7F5F0] mb-3">{b.title}</h3>
                  <p className="text-[#8A99B3] text-sm leading-relaxed font-body">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA strip ─── */}
      <section className="py-16 bg-[#060A10]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="glass rounded-3xl p-10 border border-[rgba(255,138,31,0.15)]">
            <PhoneCall className="w-10 h-10 text-[#FF8A1F] mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold text-[#F7F5F0] mb-3">
              Ready to Stop Missing {industry.name} Calls?
            </h2>
            <p className="text-[#8A99B3] font-body mb-8">
              See VOXmatiON live. We'll show you exactly how it handles {industry.name.toLowerCase()} calls for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#FF8A1F] text-white font-bold font-body hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
              >
                Book Your Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-[#F7F5F0] font-semibold font-body hover:bg-white/5 transition-all"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <DemoSection />
    </>
  );
}
