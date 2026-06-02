"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  {
    label: "Industries",
    children: [
      { href: "/industries/hvac-ai-receptionist", label: "HVAC" },
      { href: "/industries/plumbing-ai-receptionist", label: "Plumbing" },
      { href: "/industries/roofing-ai-receptionist", label: "Roofing" },
      { href: "/industries/electrical-ai-receptionist", label: "Electrical" },
      { href: "/industries/cleaning-ai-receptionist", label: "Cleaning" },
      { href: "/industries/medical-spa-ai-receptionist", label: "Med Spa" },
      { href: "/industries/legal-intake-ai-receptionist", label: "Legal" },
      { href: "/industries/real-estate-ai-receptionist", label: "Real Estate" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdownOpen(null); }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-dark shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-orange-gradient flex items-center justify-center glow-orange">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M4 17 L7 7 L12 14 L16 5 L20 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">VOXmati</span>
              <span className="text-gradient-orange">ON</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setDropdownOpen(link.label)}
                  onMouseLeave={() => setDropdownOpen(null)}>
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                    {link.label}
                    <ChevronDown className={clsx("w-3.5 h-3.5 transition-transform duration-200", dropdownOpen === link.label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === link.label && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 glass-dark rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden py-2">
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} href={link.href!}
                  className={clsx("px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === link.href ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+18446877999" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-[#FF8A1F]" />1-844-687-7999
            </a>
            <Link href="/demo"
              className="px-5 py-2.5 rounded-xl bg-orange-gradient text-white text-sm font-semibold glow-orange hover:opacity-90 transition-all duration-200 hover:scale-105">
              Book a Demo
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="lg:hidden glass-dark border-t border-white/10 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest">{link.label}</p>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}
                        className="block pl-6 pr-3 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.href} href={link.href!}
                    className="block px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a href="tel:+18446877999" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-[#FF8A1F]" />1-844-687-7999
                </a>
                <Link href="/demo" className="flex items-center justify-center py-3 rounded-xl bg-orange-gradient text-white text-sm font-semibold">
                  Book a Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
