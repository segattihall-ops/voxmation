"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "90vh", minHeight: "560px" }}>
      {/* Desktop banner */}
      <Image
        src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/Header.png"
        alt="VOXmatiON AI Receptionist"
        fill
        className="hidden sm:block object-cover object-center"
        priority
        unoptimized
      />
      {/* Mobile banner */}
      <Image
        src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/header_mobile.png"
        alt="VOXmatiON AI Receptionist"
        fill
        className="block sm:hidden object-cover object-top"
        priority
        unoptimized
      />

      {/* Bottom fade into site background */}
      <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-[#060A10] to-transparent pointer-events-none" />

      {/* CTA buttons — bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-24 left-6 sm:left-16 flex flex-col sm:flex-row gap-3 z-10"
      >
        <Link
          href="/demo"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-sm hover:bg-[#FFB347] transition-all shadow-[0_8px_30px_rgba(255,138,31,0.5)]"
        >
          Book a Demo →
        </Link>
        <Link
          href="/how-it-works"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold font-body text-sm hover:bg-white/20 transition-all"
        >
          See How It Works
        </Link>
      </motion.div>

      {/* Scroll indicator — bottom-center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="text-[10px] uppercase tracking-widest text-white/50 font-body">Scroll</span>
        <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
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
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </div>
    </section>
  );
}
