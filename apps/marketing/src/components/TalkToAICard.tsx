"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

// Public, generic browser-mic live demo card (uses the "home" demo persona).
// Lets any visitor talk to the real AI receptionist with zero signup — the
// lowest-friction proof of the product. Safe to expose publicly: the mic runs
// in the visitor's own browser (unlike the outbound "call me" flow, which can
// dial arbitrary numbers and must stay behind abuse protection).
const HOME_SLUG = "home";
const CONNECT_TIMEOUT_MS = 12000;

type MicStatus = "idle" | "connecting" | "active" | "error";

function VoiceBars({ speaking }: { speaking: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="w-1 rounded-full animate-pulse"
          style={{
            height: "100%",
            background: speaking ? "#FF8A1F" : "#1E4B8F",
            animationDelay: `${i * 0.06}s`,
            transform: "scaleY(0.6)",
          }}
        />
      ))}
    </div>
  );
}

export default function TalkToAICard() {
  const [micStatus, setMicStatus] = useState<MicStatus>("idle");
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationRef = useRef<{ endSession: () => Promise<void> } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
  };

  const stop = useCallback(async () => {
    clearTimer();
    try {
      await conversationRef.current?.endSession();
    } finally {
      conversationRef.current = null;
      setMicStatus("idle");
      setSpeaking(false);
    }
  }, []);

  const start = useCallback(async () => {
    setError(null);
    setMicStatus("connecting");
    clearTimer();
    timer.current = setTimeout(() => {
      void conversationRef.current?.endSession().catch(() => {});
      conversationRef.current = null;
      setMicStatus("error");
      setError("The live agent didn't answer — try again.");
    }, CONNECT_TIMEOUT_MS);

    try {
      const tokenRes = await fetch("/api/demo/conversation-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: HOME_SLUG }),
      });
      if (!tokenRes.ok) {
        const { error: msg } = await tokenRes.json().catch(() => ({ error: "" }));
        throw new Error(msg || "Could not start the live demo.");
      }
      const { signed_url, dynamicVariables } = await tokenRes.json();

      const { Conversation } = await import("@elevenlabs/client");
      const conversation = await Conversation.startSession({
        signedUrl: signed_url,
        dynamicVariables,
        onModeChange: ({ mode }: { mode: string }) => setSpeaking(mode === "speaking"),
        onStatusChange: ({ status }: { status: string }) => {
          if (status === "connected") { clearTimer(); setMicStatus("active"); }
          if (status === "disconnected") {
            clearTimer();
            setMicStatus("idle");
            setSpeaking(false);
            conversationRef.current = null;
          }
        },
        onError: (message: string) => {
          clearTimer();
          setError(typeof message === "string" ? message : "Connection error.");
          setMicStatus("error");
        },
      });
      conversationRef.current = conversation;
    } catch (err) {
      clearTimer();
      setError(err instanceof Error ? err.message : "Microphone unavailable.");
      setMicStatus("error");
    }
  }, []);

  useEffect(() => () => clearTimer(), []);

  const active = micStatus === "active";
  const busy = micStatus === "connecting";

  return (
    <div className="glass rounded-3xl border border-[rgba(255,138,31,0.25)] p-8 flex flex-col">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-[rgba(255,138,31,0.12)] flex items-center justify-center">
          <Mic className="w-5 h-5 text-[#FF8A1F]" />
        </div>
        <div>
          <h2 className="font-display text-xl font-extrabold text-[#F7F5F0]">Talk to the AI now</h2>
          <p className="text-xs text-[#8A99B3] font-body">No form, no signup — right in your browser</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 transition-all ${active ? "bg-[rgba(255,138,31,0.12)] border border-[rgba(255,138,31,0.35)] glow-orange-sm" : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"}`}>
          {busy ? <Loader2 className="w-8 h-8 text-[#FF8A1F] animate-spin" /> : active ? <VoiceBars speaking={speaking} /> : <Mic className="w-8 h-8 text-[rgba(255,138,31,0.6)]" />}
        </div>
        <p className="text-sm text-[#8A99B3] font-body text-center min-h-[20px]">
          {micStatus === "idle" && "Tap to start — we'll ask for mic access."}
          {busy && "Connecting to the agent…"}
          {active && (speaking ? "AI is speaking…" : "Listening — go ahead.")}
          {micStatus === "error" && <span className="text-red-400">{error}</span>}
        </p>
      </div>

      {active || busy ? (
        <button onClick={stop} className="w-full py-3.5 rounded-xl border border-[rgba(255,138,31,0.3)] text-[#FF8A1F] font-bold text-sm font-body hover:bg-[rgba(255,138,31,0.08)] transition-colors flex items-center justify-center gap-2">
          <MicOff className="w-4 h-4" /> {busy ? "Cancel" : "End conversation"}
        </button>
      ) : (
        <button onClick={start} className="w-full py-3.5 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold text-sm font-body hover:bg-[#FFB347] transition-colors glow-orange-sm flex items-center justify-center gap-2">
          <Mic className="w-4 h-4" /> {micStatus === "error" ? "Try again" : "Start talking"}
        </button>
      )}
    </div>
  );
}
