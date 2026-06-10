"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

/* ─── brand tokens ──────────────────────────────────────────────────────── */
const B = {
  pageBg: "#0B1F3A",
  cardBg: "#0E2647",
  border: "#1E4B8F",
  orange: "#FF8A1F",
  gold:   "#FFB347",
  text:   "#EAF0F8",
  muted:  "#B9C7DA",
  danger: "#FF6B6B",
} as const;

/* ─── state machine ───────────────────────────────────────────────────────────────────────── */
type Phase =
  | { id: "loading" }
  | { id: "success"; workspaceId: string }
  | { id: "invalid"; message: string }
  | { id: "missing" };

/* ─── main component ────────────────────────────────────────────────────────────────────────── */
export default function ActivateClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [phase, setPhase] = useState<Phase>(
    token ? { id: "loading" } : { id: "missing" }
  );
  const [reduced, setReduced] = useState(false);
  // Guard: activation API is single-use — must not fire twice (e.g. React Strict Mode).
  const ran = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const cb = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  }, []);

  useEffect(() => {
    if (!token || ran.current) return;
    ran.current = true;

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

    (async () => {
      try {
        const res = await fetch(
          `${base}/rest/v1/rpc/vx_validate_magic_link`,
          {
            method: "POST",
            headers: {
              apikey: key,
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_token: token }),
          }
        );

        const json = await res.json();

        if (json.valid === true) {
          try {
            sessionStorage.setItem("vx_trial_jwt", json.jwt);
          } catch {
            // Private-browsing mode blocks sessionStorage — continue anyway.
          }
          setPhase({ id: "success", workspaceId: json.workspace_id });
        } else {
          setPhase({
            id: "invalid",
            message:
              json.message ?? "This link is invalid, expired, or already used.",
          });
        }
      } catch {
        setPhase({
          id: "invalid",
          message:
            "We could not reach the activation service. Try again in a minute.",
        });
      }
    })();
  }, [token]);

  return (
    <>
      <style>{`
        @keyframes vx-slide {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(400%);  }
        }
        .vx-primary:hover   { background: ${B.gold}  !important; }
        .vx-secondary:hover { border-color: ${B.muted} !important; color: ${B.text} !important; }
        *:focus-visible {
          outline: 2px solid ${B.orange};
          outline-offset: 3px;
          border-radius: 6px;
        }
      `}</style>

      {/* page shell */}
      <div
        style={{
          minHeight: "100vh",
          background: B.pageBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* card */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            background: B.cardBg,
            borderRadius: "16px",
            border: `1px solid ${B.border}`,
            padding: "40px 36px",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* brand row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "36px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                flexShrink: 0,
                background: `linear-gradient(135deg, ${B.orange} 0%, ${B.gold} 100%)`,
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.16em",
                color: B.gold,
                textTransform: "uppercase",
              }}
            >
              VOXMATION
            </span>
          </div>

          {/* state panels */}
          {phase.id === "loading" && <LoadingPanel reduced={reduced} />}
          {phase.id === "success" && (
            <SuccessPanel workspaceId={phase.workspaceId} />
          )}
          {phase.id === "invalid" && <InvalidPanel message={phase.message} />}
          {phase.id === "missing" && <MissingPanel />}
        </div>
      </div>
    </>
  );
}

/* ─── loading ───────────────────────────────────────────────────────────────────────────────────── */
function LoadingPanel({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: B.text,
          margin: "0 0 12px",
          lineHeight: 1.3,
        }}
      >
        Activating your workspace
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: B.muted,
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        We&apos;re provisioning your AI receptionist and setting up your trial
        environment. This only takes a moment.
      </p>

      <div
        role="progressbar"
        aria-label="Activating workspace"
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          marginTop: "28px",
          height: "6px",
          borderRadius: "999px",
          background: B.border,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "45%",
            borderRadius: "999px",
            background: `linear-gradient(90deg, ${B.orange}, ${B.gold})`,
            ...(reduced ? {} : { animation: "vx-slide 1.6s ease-in-out infinite" }),
          }}
        />
      </div>
    </div>
  );
}

/* ─── success ───────────────────────────────────────────────────────────────────────────────────── */
function SuccessPanel({ workspaceId }: { workspaceId: string }) {
  return (
    <div>
      <StateIcon borderColor={B.orange} bg="rgba(255,138,31,0.1)">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4 10.5L8.5 15L16 7"
            stroke={B.orange}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </StateIcon>

      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: B.text,
          margin: "0 0 12px",
          lineHeight: 1.3,
        }}
      >
        Your trial is live
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: B.muted,
          margin: "0 0 28px",
          lineHeight: 1.65,
        }}
      >
        Your workspace is active for the next 7 days. Your AI receptionist is
        ready to answer calls, capture missed-call leads, and deliver intake
        summaries to your team.
      </p>

      <a
        href={`/trial/dashboard?ws=${encodeURIComponent(workspaceId)}`}
        className="vx-primary"
        style={{
          display: "block",
          padding: "14px 20px",
          borderRadius: "10px",
          background: B.orange,
          color: "#0B1F3A",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "15px",
          textAlign: "center",
          transition: "background 0.15s ease",
        }}
      >
        Go to your dashboard →
      </a>

      <p
        style={{
          fontSize: "11px",
          color: B.muted,
          marginTop: "14px",
          opacity: 0.5,
          wordBreak: "break-all",
          lineHeight: 1.5,
        }}
      >
        Workspace: {workspaceId}
      </p>
    </div>
  );
}

/* ─── invalid ───────────────────────────────────────────────────────────────────────────────────── */
function InvalidPanel({ message }: { message: string }) {
  return (
    <div>
      <StateIcon
        borderColor="rgba(255,107,107,0.5)"
        bg="rgba(255,107,107,0.08)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M10 6v5"
            stroke={B.danger}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="10" cy="14.5" r="1.25" fill={B.danger} />
        </svg>
      </StateIcon>

      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: B.text,
          margin: "0 0 12px",
          lineHeight: 1.3,
        }}
      >
        This link didn&apos;t work
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: B.muted,
          margin: "0 0 10px",
          lineHeight: 1.65,
        }}
      >
        {message}
      </p>
      <p
        style={{
          fontSize: "14px",
          color: B.muted,
          opacity: 0.7,
          margin: "0 0 28px",
          lineHeight: 1.65,
        }}
      >
        Activation links are single-use and expire after 48 hours. If you need
        a new link, reach out and we&apos;ll send one right away.
      </p>

      <a
        href="mailto:bruno.santos@tryvoxmation.com?subject=New%20trial%20activation%20link"
        className="vx-secondary"
        style={{
          display: "block",
          padding: "14px 20px",
          borderRadius: "10px",
          background: "transparent",
          color: B.muted,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "15px",
          textAlign: "center",
          border: `1.5px solid ${B.border}`,
          transition: "border-color 0.15s ease, color 0.15s ease",
        }}
      >
        Request a new activation link
      </a>
    </div>
  );
}

/* ─── missing ───────────────────────────────────────────────────────────────────────────────────── */
function MissingPanel() {
  return (
    <div>
      <StateIcon
        borderColor="rgba(185,199,218,0.25)"
        bg="rgba(185,199,218,0.06)"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect
            x="3" y="5" width="14" height="11" rx="2"
            stroke={B.muted}
            strokeWidth="2"
          />
          <path
            d="M3 8l7 5 7-5"
            stroke={B.muted}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </StateIcon>

      <h1
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: B.text,
          margin: "0 0 12px",
          lineHeight: 1.3,
        }}
      >
        No activation token found
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: B.muted,
          margin: 0,
          lineHeight: 1.65,
        }}
      >
        Open the link directly from your invitation email — it includes a
        unique token that validates your workspace and cannot be entered
        manually.
      </p>
    </div>
  );
}

/* ─── shared icon container ─────────────────────────────────────────────────────────────────────── */
function StateIcon({
  children,
  borderColor,
  bg,
}: {
  children: React.ReactNode;
  borderColor: string;
  bg: string;
}) {
  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: bg,
        border: `1.5px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}
