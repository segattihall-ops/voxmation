import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Phone, Github, Twitter, Linkedin } from "lucide-react";
import clsx from "clsx";

const NAV_LINKS = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
];

const COMPARE_LINKS = [
  { to: "/vs-hubspot", label: "vs HubSpot" },
  { to: "/vs-salesforce", label: "vs Salesforce" },
  { to: "/vs-zoho", label: "vs Zoho" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
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
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:shadow-violet-500/25 transition-shadow">
                <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Voxmation<span className="text-violet-400"> OS</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    clsx(
                      "px-3.5 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-violet-400 bg-violet-500/10"
                        : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/60"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="relative group ml-1">
                <button className="px-3.5 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800/60 transition-colors flex items-center gap-1">
                  Compare
                  <svg className="w-3 h-3 mt-0.5 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-44 bg-gray-900 border border-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {COMPARE_LINKS.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-gray-100 hover:bg-gray-800/60 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/voxmation/voxmation-os"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-gray-100 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href="https://github.com/voxmation/voxmation-os"
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-violet-900/30"
              >
                Get Started Free
              </a>
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
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    clsx(
                      "block px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-violet-400 bg-violet-500/10"
                        : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/60"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-1 border-t border-gray-800 mt-2">
                <p className="px-3 py-1 text-xs font-semibold text-gray-600 uppercase tracking-wider">Compare</p>
                {COMPARE_LINKS.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-400 hover:text-gray-100 hover:bg-gray-800/60 transition-colors"
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-800 mt-2">
                <a
                  href="https://github.com/voxmation/voxmation-os"
                  className="block w-full text-center px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Get Started Free
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-gray-950 border-t border-gray-800/60 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-white">Voxmation OS</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed">
                Open-source, self-hosted CRM with built-in telephony. Own your data, own your stack.
              </p>
              <div className="flex items-center gap-3 mt-4">
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
                {[
                  { to: "/features", label: "Features" },
                  { to: "/pricing", label: "Pricing" },
                  { to: "/blog", label: "Blog" },
                  { to: "/faq", label: "FAQ" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Compare</h3>
              <ul className="space-y-2">
                {[
                  { to: "/vs-hubspot", label: "vs HubSpot" },
                  { to: "/vs-salesforce", label: "vs Salesforce" },
                  { to: "/vs-zoho", label: "vs Zoho" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Open Source</h3>
              <ul className="space-y-2">
                {[
                  { href: "https://github.com/voxmation/voxmation-os", label: "GitHub" },
                  { href: "https://github.com/voxmation/voxmation-os/blob/main/LICENSE", label: "MIT License" },
                  { href: "https://github.com/voxmation/voxmation-os/issues", label: "Issues" },
                  { href: "https://github.com/voxmation/voxmation-os/discussions", label: "Community" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Voxmation OS. Released under the MIT License.
            </p>
            <p className="text-sm text-gray-600">
              Built for teams who own their stack.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
