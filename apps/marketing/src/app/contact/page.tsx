import type { Metadata } from "next";
import { Mail, Phone, MessageSquare, CreditCard, Scale } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact VOXmatiON",
  description: "Get in touch with VOXmatiON. Sales, support, billing, and partnership inquiries.",
};

const CONTACTS = [
  { icon: MessageSquare, label: "Sales", email: "sales@voxmation.com", desc: "Book a demo or ask about pricing" },
  { icon: Phone, label: "Support", email: "support@voxmation.com", desc: "Technical help and account support" },
  { icon: CreditCard, label: "Billing", email: "billing@voxmation.com", desc: "Invoices, payments, and upgrades" },
  { icon: Scale, label: "Legal", email: "legal@voxmation.com", desc: "Terms, privacy, and compliance" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-screen pt-24 bg-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
              Get In <span className="text-gradient-orange">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              We're here to help. Choose the right channel for your request.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {CONTACTS.map((c) => (
              <a key={c.label} href={`mailto:${c.email}`}
                className="glass-dark rounded-3xl p-6 border border-white/5 hover:border-[rgba(255,138,31,0.3)] transition-all hover:-translate-y-1 group">
                <div className="w-11 h-11 rounded-xl bg-[rgba(255,138,31,0.12)] border border-[rgba(255,138,31,0.2)] flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF8A1F] mb-1">{c.label}</p>
                <p className="text-sm font-medium text-white mb-2 group-hover:text-[#FF8A1F] transition-colors">{c.email}</p>
                <p className="text-xs text-gray-400">{c.desc}</p>
              </a>
            ))}
          </div>

          <div className="max-w-lg mx-auto glass-dark rounded-4xl p-8 border border-white/5 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Ready for a Demo?</h2>
            <p className="text-gray-400 mb-6">The fastest way to see if VOXmatiON is right for your business is a live demo.</p>
            <Link href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-gradient text-white font-bold glow-orange hover:opacity-90 transition-all hover:scale-105">
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
