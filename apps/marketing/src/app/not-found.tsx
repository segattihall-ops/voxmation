import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#060A10] overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative text-center px-4 max-w-xl mx-auto">
        <p className="font-display text-[120px] sm:text-[160px] font-bold text-[#FF8A1F] leading-none opacity-20 select-none">404</p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#F7F5F0] mb-4">Page Not Found</h1>
          <p className="text-[#8A99B3] font-body text-lg mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body text-sm hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass border border-[rgba(255,255,255,0.1)] text-[#F7F5F0] font-semibold font-body text-sm hover:bg-white/5 transition-all"
            >
              <Phone className="w-4 h-4" /> Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
