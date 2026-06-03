"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 4000);
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-0 right-0 flex justify-center z-40 sm:hidden px-4"
        >
          <Link href="/demo"
            className="flex items-center gap-2 w-full max-w-sm py-4 px-6 rounded-2xl bg-orange-gradient text-white font-bold text-base shadow-[0_8px_30px_rgba(255,138,31,0.4)] justify-center">
            <Calendar className="w-5 h-5" />
            Book a Free Demo
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
