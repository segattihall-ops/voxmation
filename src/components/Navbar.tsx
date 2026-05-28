"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mic } from "lucide-react";
import clsx from "clsx";
import { PHONE_NUMBER, PHONE_HREF } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-gray-950/95 backdrop-blur-md border-b border-gray-800/60 shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-violet-500/25 transition-shadow">
              <Mic className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Voxmation
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href
                    ? "text-violet-400 bg-violet-500/10"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/60"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-medium">{PHONE_NUMBER}</span>
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-violet-900/30"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800">
          <nav className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx(
                  "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname === l.href
                    ? "text-violet-400 bg-violet-500/10"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/60"
                )}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-800 mt-2 space-y-2">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-violet-300"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
