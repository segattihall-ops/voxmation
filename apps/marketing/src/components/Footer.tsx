import Link from "next/link";
import { Phone, Mic, Twitter, Linkedin, Github } from "lucide-react";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

const PRODUCT_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const USE_CASE_LINKS = [
  { href: "/use-cases#appointment-reminders", label: "Appointment Reminders" },
  { href: "/use-cases#ivr-menus", label: "IVR Menus" },
  { href: "/use-cases#outbound-campaigns", label: "Outbound Campaigns" },
  { href: "/use-cases#after-hours", label: "After-Hours Handling" },
  { href: "/use-cases#surveys", label: "Survey Collection" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white">Voxmation</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              Voice prompt automation for businesses that need reliable, scalable phone interactions — without the complexity.
            </p>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors mb-4"
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE_NUMBER}
            </a>
            <div className="flex items-center gap-3">
              <a href="https://github.com/voxmation" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/voxmation" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/company/voxmation" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Use Cases</h3>
            <ul className="space-y-2">
              {USE_CASE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a href={PHONE_HREF} className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li>
                <a href="mailto:info@voxmation.com" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                  info@voxmation.com
                </a>
              </li>
              <li>
                <p className="text-sm text-gray-600">Mon – Fri, 9am – 6pm ET</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Voxmation. All rights reserved.
          </p>
          <p className="text-sm text-gray-600">
            Voice prompt automation built for scale.
          </p>
        </div>
      </div>
    </footer>
  );
}
