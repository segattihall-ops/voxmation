import posthog from "posthog-js";

// Safe wrapper around posthog.capture for funnel/conversion events. No-ops when
// analytics isn't configured (no NEXT_PUBLIC_POSTHOG_KEY) or during SSR, so it
// can be called freely from any client component.
export function track(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  try {
    posthog.capture(event, props);
  } catch {
    // never let analytics break the UI
  }
}

// Funnel event names — keep centralized so PostHog funnels stay consistent.
export const EVENTS = {
  talkStarted: "demo_talk_started",
  talkConnected: "demo_talk_connected",
  talkError: "demo_talk_error",
  callRequested: "demo_call_requested",
  formSubmitted: "demo_form_submitted",
  formSuccess: "demo_form_success",
  formError: "demo_form_error",
  tapToCall: "tap_to_call_clicked",
} as const;
