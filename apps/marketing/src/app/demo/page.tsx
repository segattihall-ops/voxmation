import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Phone, ArrowRight, CheckCircle2, Clock } from "lucide-react";

const PAGE_URL = `${SITE_URL}/demo`;


export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
  title: "Book a Demo — See VOXmatiON Live",
  description: "See VOXmatiON answer a call, qualify a lead, and route it to your CRM in real time. Book your free 20-minute demo.",
};

const WHAT_TO_EXPECT = [
  "Watch AI answer a live call in real time",
  "See lead qualification in action",
  "CRM update demonstration",
  "Your ROI estimate",
  "Custom implementation plan",
  "Q&A with a VOXmatiON specialist",
];

export default function DemoPage() {
  return (
    <>
      <section className="relative min-h-screen pt-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1E4B8F] opacity-10 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FF8A1F] opacity-6 blur-[120px] rounded-full" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-6">
                Live Demo
              </span>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
                See VOXmatiON<br />
                <span className="text-gradient-orange">In Action</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Join a free 20-minute demo and watch the AI answer a real call, qualify a lead, update the CRM, and book an appointment — completely automatically.
              </p>

              <div className="space-y-3 mb-10">
                {WHAT_TO_EXPECT.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+18446877999"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 text-[#FF8A1F]" />
                  Call Demo Line
                </a>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4" />
                <span>20-minute session · No commitment required</span>
              </div>
            </div>

            {/* Right — Form */}
            <div className="glass-dark rounded-4xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">Book Your Free Demo</h2>
              <form
                action="https://forms.zohopublic.com/voxmation/form/DemoRequest/formperma/demo"
                method="POST"
                target="_blank"
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                    <input name="FirstName" type="text" required placeholder="John"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                    <input name="LastName" type="text" required placeholder="Smith"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Business Email</label>
                  <input name="Email" type="email" required placeholder="john@yourcompany.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input name="Phone" type="tel" required placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Business Name</label>
                  <input name="Company" type="text" required placeholder="Your Company LLC"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Industry</label>
                  <select name="Industry"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1F3A] border border-white/10 text-gray-300 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm appearance-none">
                    <option value="">Select your industry</option>
                    <option>HVAC</option><option>Plumbing</option><option>Roofing</option>
                    <option>Electrical</option><option>Garage Door</option><option>Landscaping</option>
                    <option>Cleaning</option><option>Med Spa</option><option>Legal</option>
                    <option>Real Estate</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Monthly Missed Calls (approx.)</label>
                  <select name="MissedCalls"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1F3A] border border-white/10 text-gray-300 focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm appearance-none">
                    <option value="">Select range</option>
                    <option>1–10</option><option>10–30</option><option>30–60</option><option>60+</option>
                  </select>
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-xl bg-orange-gradient text-white font-bold text-base glow-orange hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 mt-2">
                  <Calendar className="w-5 h-5" />
                  Book My Free Demo
                </button>
                <p className="text-xs text-gray-300 text-center">No commitment. 20-minute session. 100% free.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
