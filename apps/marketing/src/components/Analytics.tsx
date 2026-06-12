"use client";

import posthog from "posthog-js";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// PostHog funnel analytics. Fully gated on NEXT_PUBLIC_POSTHOG_KEY: with no key
// set (e.g. local dev or before the project is configured in Vercel) this is a
// no-op and ships nothing. Set NEXT_PUBLIC_POSTHOG_KEY (and optionally
// NEXT_PUBLIC_POSTHOG_HOST) in the environment to activate.
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

// App Router is a client-side SPA after first load, so pageviews on navigation
// must be captured manually. useSearchParams must live under <Suspense>.
function Pageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY || typeof window === "undefined") return;
    let url = window.location.origin + pathname;
    const qs = searchParams?.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: false, // captured manually above for App Router
      capture_pageleave: true,
      autocapture: true,
      capture_exceptions: true, // surface client errors in the funnel context
      capture_dead_clicks: true, // spot rage/dead clicks that stall conversion
      persistence: "localStorage+cookie",
      person_profiles: "identified_only",
    });
  }, []);

  if (!KEY) return null;
  return (
    <Suspense fallback={null}>
      <Pageviews />
    </Suspense>
  );
}
