"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall } from "lucide-react";

// Lightweight launcher. The actual conversation UI — and the heavy
// "@elevenlabs/react" SDK it pulls in — is only fetched when the visitor opens
// the agent, so it no longer ships with every page's initial load.
const VoiceAgentSession = dynamic(() => import("./VoiceAgentSession"), {
  ssr: false,
});

export default function VoiceAgent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,138,31,0.4)] bg-[#FF8A1F]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Talk to VOX AI"
      >
        <PhoneCall className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {open && <VoiceAgentSession onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
