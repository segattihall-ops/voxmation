"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function VideoReel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 bg-[#060A10] overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-[#FF8A1F] bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] uppercase tracking-widest mb-4 font-body">
            See It In Action
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#F7F5F0]">
            Meet Your AI Voice Team
          </h2>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.07)] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
        >
          {/* Orange glow behind video */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,138,31,0.08)_0%,transparent_70%)] pointer-events-none z-10" />

          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
          >
            <source src="https://2ywrmvccumupilj7.public.blob.vercel-storage.com/mp4.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
