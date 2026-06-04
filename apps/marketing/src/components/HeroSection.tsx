"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "82vh", minHeight: "520px" }}>
      {/* Desktop banner */}
      <Image
        src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/Header.PNG"
        alt="VOXmatiON AI Receptionist"
        fill
        className="hidden sm:block object-cover object-center"
        priority
        unoptimized
      />
      {/* Mobile banner */}
      <Image
        src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/Header-Mobile%20.PNG"
        alt="VOXmatiON AI Receptionist"
        fill
        className="block sm:hidden object-cover object-top"
        priority
        unoptimized
      />

      {/* Bottom fade into site background */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#060A10] to-transparent pointer-events-none" />

      {/* CTA buttons — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-20 left-6 sm:left-16 flex flex-col sm:flex-row gap-3 z-10"
      >
        <Link
          href="/demo"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-sm glow-orange hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.4)]"
        >
          Book a Demo →
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass border-subtle text-[#F7F5F0] font-semibold font-body text-sm hover:bg-white/5 transition-all"
        >
          See How It Works
        </Link>
      </motion.div>

      {/* Animated scroll indicator — bottom-center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-[#8A99B3] font-body">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-[rgba(255,255,255,0.2)] flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-[#FF8A1F]"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#8A99B3]" />
        </motion.div>
      </div>
    </section>
  );
}
