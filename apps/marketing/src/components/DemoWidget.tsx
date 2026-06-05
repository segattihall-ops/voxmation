"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Phone,
  PhoneCall,
  Loader2,
  Zap,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { DemoSlug } from "@/lib/demo-data";
import { PHONE_HREF, PHONE_NUMBER } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/* Vertical-specific copy                                             */
/* ------------------------------------------------------------------ */

const VERTICAL_META: Record<
  DemoSlug["vertical"],
  { label: string; services: string; tech: string; avgTicket: number }
> = {
  hvac: {
    label: "HVAC",
    services: "AC repair, heating, and maintenance calls",
    tech: "technician",
    avgTicket: 350,
  },
  plumbing: {
    label: "Plumbing",
    services: "leaks, clogs, and water-heater calls",
    tech: "technician",
    avgTicket: 320,
  },
  roofing: {
    label: "Roofing",
    services: "inspections, repairs, and storm-damage calls",
    tech: "crew",
    avgTicket: 1200,
  },
  electrical: {
    label: "Electrical",
    services: "panel, wiring, and outage calls",
    tech: "electrician",
    avgTicket: 300,
  },
  "field-service": {
    label: "Field Service",
    services: "inbound service calls",
    tech: "technician",
    avgTicket: 350,
  },
};

const HOW_IT_HELPS = [
  "Answers every call within 2 seconds — day, night, weekends, and holidays",
  "Qualifies the job, captures the details, and flags urgent work instantly",
  "Texts an instant follow-up to anyone it couldn't reach",
  "Creates the lead and books the appointment straight into your CRM",
];

/* ------------------------------------------------------------------ */
/* Animated voice bars                                                */
/* ------------------------------------------------------------------ */

function VoiceBars({ active, speaking }: { active: boolean; speaking: boolean }) {
  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: speaking ? "#FF8A1F" : "#1E4B8F",
            height: "100%",
            transformOrigin: "center",
          }}
          animate={
            active
              ? {
                  scaleY: speaking
                    ? [0.3, 1, 0.5, 0.9, 0.3]
                    : [0.2, 0.45, 0.25, 0.5, 0.2],
                  opacity: [0.6, 1, 0.7, 1, 0.6],
                }
              : { scaleY: 0.18, opacity: 0.3 }
          }
          transition={
            active
              ? {
                  duration: speaking ? 0.8 : 1.3,
                  repeat: Infinity,
                  delay: i * 0.06,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */

type MicStatus = "idle" | "connecting" | "active" | "error";
type CallStatus = "idle" | "calling" | "sent" | "error";

export default function DemoWidget({ slugData }: { slugData: DemoSlug }) {
  const { companyName, city, vertical, callVolumePerDay } = slugData;
  const meta = VERTICAL_META[vertical];

  /* ---- Browser-mic live demo state ---- */
  const [micStatus, setMicStatus] = useState<MicStatus>("idle");
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  // The ElevenLabs Conversation instance (loosely typed — SDK is loaded lazily).
  const conversationRef = useRef<{ endSession: () => Promise<void> } | null>(null);

  const startVoiceDemo = useCallback(async () => {
    setMicError(null);
    setMicStatus("connecting");
    try {
      const tokenRes = await fetch("/api/demo/conversation-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: slugData.slug }),
      });
      if (!tokenRes.ok) {
        const { error } = await tokenRes.json().catch(() => ({ error: "" }));
        throw new Error(error || "Could not start the demo.");
      }
      const { signed_url, agentScript, companyName: cn } = await tokenRes.json();

      // Lazy-load the browser SDK so it never runs during SSR.
      const { Conversation } = await import("@elevenlabs/client");
      const conversation = await Conversation.startSession({
        signedUrl: signed_url,
        dynamicVariables: {
          agent_script: agentScript,
          company_name: cn,
        },
        onModeChange: ({ mode }: { mode: string }) =>
          setAgentSpeaking(mode === "speaking"),
        onStatusChange: ({ status }: { status: string }) => {
          if (status === "connected") setMicStatus("active");
          if (status === "disconnected") {
            setMicStatus("idle");
            setAgentSpeaking(false);
            conversationRef.current = null;
          }
        },
        onError: (message: string) => {
          setMicError(typeof message === "string" ? message : "Connection error.");
          setMicStatus("error");
        },
      });
      conversationRef.current = conversation;
    } catch (err) {
      setMicError(
        err instanceof Error ? err.message : "Microphone access was blocked."
      );
      setMicStatus("error");
    }
  }, [slugData.slug]);

  const stopVoiceDemo = useCallback(async () => {
    try {
      await conversationRef.current?.endSession();
    } finally {
      conversationRef.current = null;
      setMicStatus("idle");
      setAgentSpeaking(false);
    }
  }, []);

  /* ---- Call-me-back state ---- */
  const [phone, setPhone] = useState("");
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [callError, setCallError] = useState<string | null>(null);

  const requestCall = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setCallError(null);
      setCallStatus("calling");
      try {
        const res = await fetch("/api/demo/call-me", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, slug: slugData.slug }),
        });
        if (!res.ok) {
          const { error, reason } = await res
            .json()
            .catch(() => ({ error: "", reason: "" }));
          throw new Error(
            [error, reason].filter(Boolean).join(" — ") ||
              "We couldn't place the call."
          );
        }
        setCallStatus("sent");
      } catch (err) {
        setCallError(err instanceof Error ? err.message : "Something went wrong.");
        setCallStatus("error");
      }
    },
    [phone, slugData.slug]
  );

  /* ---- Derived ROI figures ---- */
  const roi = (() => {
    if (!callVolumePerDay) return null;
    const missedPerDay = Math.round(callVolumePerDay * 0.28); // unanswered at peak
    const missedPerMonth = missedPerDay * 30;
    const recoverableMonthly = Math.round(missedPerMonth * 0.25 * meta.avgTicket);
    return { missedPerDay, missedPerMonth, recoverableMonthly };
  })();

  const currency = (n: number) =>
    `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  const micActive = micStatus === "active";
  const micBusy = micStatus === "connecting";

  return (
    <main className="min-h-screen bg-[#0B1F3A] text-[#FCFBF8]">
      {/* ============================================================ */}
      {/* SECTION 1 — Personalized Hero                                */}
      {/* ============================================================ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse,rgba(255,138,31,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(30,75,143,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-subtle mb-8"
          >
            <Zap className="w-3.5 h-3.5 text-[#FF8A1F]" />
            <span className="text-xs font-semibold text-[#FF8A1F] uppercase tracking-widest font-body">
              Live AI demo · personalized for {companyName}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] mb-6"
          >
            Hear how VOXmatiON<br />
            answers every call for<br />
            <span className="text-orange">{companyName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#8A99B3] font-body max-w-2xl mb-10 leading-relaxed"
          >
            This is the exact AI receptionist we&apos;d run for a {meta.label}{" "}
            business in {city}. Talk to it right now in your browser, or have it
            call your phone — it&apos;ll handle {meta.services} just like it
            would for your customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 text-sm text-[#8A99B3] font-body"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF8A1F]" /> No signup
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF8A1F]" /> Real voice AI
            </span>
            <span className="inline-flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#FF8A1F]" /> Live in 2 seconds
            </span>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — The two live demo modes                          */}
      {/* ============================================================ */}
      <section className="relative pb-20">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* ---- Browser mic card ---- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl border-subtle p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[rgba(255,138,31,0.12)] flex items-center justify-center">
                  <Mic className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-extrabold">
                    Talk to the AI now
                  </h2>
                  <p className="text-xs text-[#8A99B3] font-body">
                    Right here in your browser
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 transition-all ${
                    micActive
                      ? "bg-[rgba(255,138,31,0.12)] border border-[rgba(255,138,31,0.35)] glow-orange-sm"
                      : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
                  }`}
                >
                  {micBusy ? (
                    <Loader2 className="w-8 h-8 text-[#FF8A1F] animate-spin" />
                  ) : micActive ? (
                    <VoiceBars active speaking={agentSpeaking} />
                  ) : (
                    <Mic className="w-8 h-8 text-[rgba(255,138,31,0.6)]" />
                  )}
                </div>

                <p className="text-sm text-[#8A99B3] font-body text-center min-h-[20px] mb-1">
                  {micStatus === "idle" && "Tap to start — we'll ask for mic access."}
                  {micBusy && "Connecting to the agent…"}
                  {micActive &&
                    (agentSpeaking ? "AI is speaking…" : "Listening — go ahead.")}
                  {micStatus === "error" && (
                    <span className="text-red-400">{micError}</span>
                  )}
                </p>
              </div>

              {micActive || micBusy ? (
                <button
                  onClick={stopVoiceDemo}
                  className="w-full py-3.5 rounded-xl border border-[rgba(255,138,31,0.3)] text-[#FF8A1F] font-bold text-sm font-body hover:bg-[rgba(255,138,31,0.08)] transition-colors flex items-center justify-center gap-2"
                >
                  <MicOff className="w-4 h-4" /> End conversation
                </button>
              ) : (
                <button
                  onClick={startVoiceDemo}
                  className="w-full py-3.5 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold text-sm font-body hover:bg-[#FFB347] transition-colors glow-orange-sm flex items-center justify-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  {micStatus === "error" ? "Try again" : "Start talking"}
                </button>
              )}
            </motion.div>

            {/* ---- Call-me-back card ---- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-3xl border-subtle p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[rgba(30,75,143,0.25)] flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-extrabold">
                    Have the AI call you
                  </h2>
                  <p className="text-xs text-[#8A99B3] font-body">
                    Rings your phone in seconds
                  </p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {callStatus === "sent" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center mx-auto mb-4">
                        <PhoneCall className="w-6 h-6 text-green-400" />
                      </div>
                      <p className="font-display font-extrabold mb-1">
                        Calling you now
                      </p>
                      <p className="text-sm text-[#8A99B3] font-body">
                        Pick up — the AI receptionist for {companyName} is on the
                        line.
                      </p>
                      <button
                        onClick={() => {
                          setCallStatus("idle");
                          setPhone("");
                        }}
                        className="mt-5 text-xs font-semibold text-[#FF8A1F] hover:underline font-body"
                      >
                        Call a different number
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={requestCall}
                      className="space-y-4"
                    >
                      <label className="block">
                        <span className="block text-xs font-semibold text-[#8A99B3] uppercase tracking-wider mb-2 font-body">
                          Your phone number
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          disabled={callStatus === "calling"}
                          className="w-full px-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#FCFBF8] placeholder-[#8A99B3] focus:outline-none focus:border-[#FF8A1F] transition-colors text-sm font-body disabled:opacity-60"
                        />
                      </label>

                      {callStatus === "error" && (
                        <p className="text-xs text-red-400 font-body">{callError}</p>
                      )}

                      <button
                        type="submit"
                        disabled={callStatus === "calling"}
                        className="w-full py-3.5 rounded-xl bg-[#FF8A1F] text-[#0D0D0D] font-bold text-sm font-body hover:bg-[#FFB347] transition-colors glow-orange-sm flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {callStatus === "calling" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Dialing…
                          </>
                        ) : (
                          <>
                            <Phone className="w-4 h-4" /> Call me now
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-[#8A99B3] text-center font-body">
                        One-time demo call. Standard carrier rates may apply.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — What it does + ROI                               */}
      {/* ============================================================ */}
      <section className="py-16 bg-[#060f1f]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-extrabold mb-6 leading-tight">
                What it does for<br />
                <span className="text-orange">{companyName}</span>
              </h2>
              <ul className="space-y-4">
                {HOW_IT_HELPS.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF8A1F] flex-shrink-0 mt-0.5" />
                    <span className="text-[#8A99B3] font-body">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ROI / volume card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 border-subtle"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[rgba(255,138,31,0.1)] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#FF8A1F]" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-[#FCFBF8]">
                    {roi ? "Revenue you're leaving on the table" : "Why it matters"}
                  </p>
                  <p className="text-xs text-[#8A99B3] font-body">
                    {meta.label} · {city}
                  </p>
                </div>
              </div>

              {roi ? (
                <>
                  {[
                    {
                      label: "Inbound calls per day",
                      value: `${callVolumePerDay}`,
                    },
                    {
                      label: "Unanswered at peak (~28%)",
                      value: `~${roi.missedPerDay}/day`,
                    },
                    { label: "Average ticket", value: currency(meta.avgTicket) },
                    {
                      label: "Missed calls per month",
                      value: `~${roi.missedPerMonth}`,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex justify-between py-2.5 border-b border-[rgba(255,255,255,0.06)] last:border-0"
                    >
                      <span className="text-sm text-[#8A99B3] font-body">
                        {row.label}
                      </span>
                      <span className="text-sm font-semibold text-[#FCFBF8] font-body">
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <div className="mt-5 p-4 rounded-xl bg-[rgba(255,138,31,0.08)] border border-[rgba(255,138,31,0.2)]">
                    <p className="text-xs text-[#8A99B3] font-body mb-1">
                      Recoverable revenue / month
                    </p>
                    <p className="font-display text-3xl font-extrabold text-[#FF8A1F]">
                      {currency(roi.recoverableMonthly)}
                    </p>
                  </div>
                </>
              ) : (
                <ul className="space-y-3">
                  {[
                    "Up to 1 in 3 calls to service businesses goes unanswered.",
                    "85% of callers who hit voicemail never call back.",
                    "Every missed call is a job handed to a competitor.",
                    "VOXmatiON answers all of them — automatically.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-[#8A99B3] font-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#FF8A1F] flex-shrink-0 mt-0.5" />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* Final CTA                                                    */}
      {/* ============================================================ */}
      <section className="py-20 bg-[linear-gradient(135deg,#0B1F3A_0%,#0D2040_40%,rgba(255,138,31,0.15)_100%)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-extrabold mb-4">
              Ready to put this to work for<br />
              <span className="text-orange">{companyName}?</span>
            </h2>
            <p className="text-lg text-[#8A99B3] font-body mb-8">
              Book a free 15-minute setup and we&apos;ll have your AI{" "}
              {meta.tech === "crew" ? "front desk" : "receptionist"} live on your
              own number.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl bg-[#FF8A1F] text-[#0D0D0D] font-bold font-body text-base hover:bg-[#FFB347] transition-colors glow-orange shadow-[0_0_60px_rgba(255,138,31,0.3)]"
              >
                <Phone className="w-5 h-5" />
                Call {PHONE_NUMBER}
              </a>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl glass border-subtle text-[#FCFBF8] font-semibold font-body text-base hover:border-[rgba(255,138,31,0.3)] transition-colors"
              >
                Book a full demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
