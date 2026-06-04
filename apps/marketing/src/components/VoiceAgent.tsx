"use client";

import {
  ConversationProvider,
  useConversationControls,
  useConversationStatus,
  useConversationMode,
} from "@elevenlabs/react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Volume2, PhoneCall } from "lucide-react";

const AGENT_ID = "agent_1401kj43s7b2fnhrt42zvq0qeshf";

function SpeakingWave({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full bg-[#FF8A1F]"
          animate={active ? { scaleY: [0.3, 1, 0.4, 0.9, 0.3] } : { scaleY: 0.2 }}
          transition={active ? { duration: 0.9, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" } : { duration: 0.3 }}
          style={{ height: "100%", transformOrigin: "center" }}
        />
      ))}
    </div>
  );
}

function AgentWidget({ onClose }: { onClose: () => void }) {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { isSpeaking } = useConversationMode();
  const [permissionDenied, setPermissionDenied] = useState(false);

  const isConnected = status === "connected";
  const isConnecting = status === "connecting";

  const start = useCallback(async () => {
    setPermissionDenied(false);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await startSession({ agentId: AGENT_ID, connectionType: "webrtc" });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "NotAllowedError") setPermissionDenied(true);
    }
  }, [startSession]);

  const stop = useCallback(async () => { await endSession(); }, [endSession]);

  const handleClose = async () => {
    if (isConnected) await stop();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-24 right-6 z-50 w-80 glass rounded-3xl border-subtle shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isConnected ? "bg-green-500/20" : "bg-[rgba(255,138,31,0.15)]"}`}>
            <PhoneCall className={`w-4 h-4 ${isConnected ? "text-green-400" : "text-[#FF8A1F]"}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#F7F5F0] font-body">VOX AI</p>
            <p className="text-[10px] text-[#8A99B3] font-body">VOXmatiON Voice Agent</p>
          </div>
        </div>
        <button onClick={handleClose} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-[#8A99B3]" />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 py-6 flex flex-col items-center gap-5">
        {/* Orb visualizer */}
        <div className="relative flex items-center justify-center">
          {isConnected && [1, 2].map((i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full border ${isSpeaking ? "border-[#FF8A1F]" : "border-green-400"}`}
              style={{ width: 64 + i * 32, height: 64 + i * 32 }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-500 ${
            isConnected ? isSpeaking ? "bg-[rgba(255,138,31,0.2)]" : "bg-green-500/20" : "bg-[rgba(255,138,31,0.1)]"
          }`}>
            {isConnected
              ? isSpeaking ? <SpeakingWave active={true} /> : <Mic className="w-6 h-6 text-green-400" />
              : <Mic className="w-6 h-6 text-[#FF8A1F]" />}
          </div>
        </div>

        {/* Status text */}
        <div className="text-center">
          {isConnecting && (
            <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, repeat: Infinity }} className="text-sm text-[#8A99B3] font-body">
              Connecting…
            </motion.p>
          )}
          {isConnected && <p className="text-sm text-[#F7F5F0] font-body">{isSpeaking ? "VOX AI is speaking…" : "Listening — go ahead"}</p>}
          {!isConnected && !isConnecting && !permissionDenied && (
            <p className="text-sm text-[#8A99B3] font-body text-center leading-relaxed">
              Talk to VOX AI — ask about pricing, how it works, or book a demo.
            </p>
          )}
          {permissionDenied && (
            <p className="text-sm text-red-400 font-body text-center">Microphone access denied. Please allow it in your browser settings.</p>
          )}
        </div>

        {/* Action button */}
        {!isConnected && !isConnecting ? (
          <button onClick={start} className="w-full py-3 rounded-xl bg-[#FF8A1F] text-white font-bold font-body text-sm hover:bg-[#FFB347] transition-colors flex items-center justify-center gap-2 glow-orange-sm">
            <Mic className="w-4 h-4" /> Start Conversation
          </button>
        ) : isConnecting ? (
          <div className="w-full py-3 rounded-xl bg-[rgba(255,138,31,0.1)] border border-[rgba(255,138,31,0.2)] text-[#FF8A1F] font-body text-sm text-center">Connecting…</div>
        ) : (
          <button onClick={stop} className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold font-body text-sm hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
            <MicOff className="w-4 h-4" /> End Call
          </button>
        )}

        <p className="text-[10px] text-[#8A99B3] font-body text-center">Powered by ElevenLabs · VOXmatiON AI</p>
      </div>
    </motion.div>
  );
}

function VoiceAgentInner() {
  const [open, setOpen] = useState(false);
  const { status } = useConversationStatus();
  const isConnected = status === "connected";

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(255,138,31,0.4)] ${isConnected ? "bg-green-500" : "bg-[#FF8A1F]"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Talk to VOX AI"
      >
        {isConnected ? <Volume2 className="w-6 h-6 text-white" /> : <PhoneCall className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {open && <AgentWidget onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function VoiceAgent() {
  return (
    <ConversationProvider>
      <VoiceAgentInner />
    </ConversationProvider>
  );
}
