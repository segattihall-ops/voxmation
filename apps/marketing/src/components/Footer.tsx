import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const SERVICES = [
  { href: "/ai-receptionist", label: "AI Receptionist" },
  { href: "/missed-call-recovery", label: "Missed Call Recovery" },
  { href: "/services#lead-qualification", label: "Lead Qualification" },
  { href: "/services#appointment-booking", label: "Appointment Booking" },
  { href: "/services#crm-automation", label: "CRM Automation" },
  { href: "/services#ai-follow-up", label: "AI Follow Up" },
  { href: "/services#white-label", label: "White Label" },
];

const INDUSTRIES = [
  { href: "/industries/hvac-ai-receptionist", label: "HVAC" },
  { href: "/industries/plumbing-ai-receptionist", label: "Plumbing" },
  { href: "/industries/roofing-ai-receptionist", label: "Roofing" },
  { href: "/industries/electrical-ai-receptionist", label: "Electrical" },
  { href: "/industries/cleaning-ai-receptionist", label: "Cleaning" },
  { href: "/industries/medical-spa-ai-receptionist", label: "Med Spa" },
  { href: "/industries/legal-intake-ai-receptionist", label: "Legal" },
];

const COMPANY = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Book a Demo" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060f1f] border-t border-white/5">
      {/* CTA Banner */}
      <div className="bg-orange-gradient py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Stop Losing Calls. Start Booking Jobs.
          </h2>
          <p className="text-white/80 text-lg mb-8">
            See how VOXmatiON works for your business in a live 20-minute demo.
          </p>
          <Link href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-navy text-white font-bold text-lg hover:bg-[#0d2347] transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            Book a Free Demo
          </Link>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-gradient flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M4 17 L7 7 L12 14 L16 5 L20 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">VOXmati</span>
                <span className="text-[#FF8A1F]">ON</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              AI-powered voice automation that answers calls, qualifies leads, and books jobs automatically.
            </p>
            <div className="space-y-2">
              <a href="tel:+18446877999" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-[#FF8A1F]" />1-844-687-7999
              </a>
              <a href="mailto:sales@voxmation.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-[#FF8A1F]" />sales@voxmation.com
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest mb-4">Industries</p>
            <ul className="space-y-2.5">
              {INDUSTRIES.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} VOXmatiON. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="text-sm text-gray-300 hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/contact" className="text-sm text-gray-300 hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
