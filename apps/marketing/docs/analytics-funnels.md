# Funnel analytics — PostHog setup & playbook

This site is instrumented for PostHog (see `src/components/Analytics.tsx` and
`src/lib/analytics.ts`). Analytics is **gated on `NEXT_PUBLIC_POSTHOG_KEY`** — with
no key set it's a no-op. Set the key (and optionally `NEXT_PUBLIC_POSTHOG_HOST`)
in Vercel to activate, then redeploy.

## 1. Activate (one time)
1. Create a free project at https://posthog.com → copy the **Project API Key**.
2. Vercel → `apps/marketing` project → Settings → Environment Variables:
   - `NEXT_PUBLIC_POSTHOG_KEY` = your project key
   - `NEXT_PUBLIC_POSTHOG_HOST` = `https://us.i.posthog.com` (or `https://eu.i.posthog.com`)
3. Redeploy. Open the site, click around, then check PostHog → Activity to
   confirm events are arriving.

## 2. Event taxonomy

| Event | Fires when | Key props |
|-------|------------|-----------|
| `$pageview` | every page / route change | `$current_url` |
| `$autocapture` | any click/input (automatic) | element info |
| `demo_talk_started` | visitor taps "talk to the AI" | `source` = `home_widget` \| `talk_card` \| `demo_page` |
| `demo_talk_connected` | live AI session actually connects | `source` |
| `demo_talk_error` | live demo fails / times out | `source`, `reason` |
| `demo_call_requested` | "have the AI call you" submitted (private pages) | `slug` |
| `demo_form_submitted` | booking form submit pressed | — |
| `demo_form_success` | booking form accepted (lead sent) | `industry` |
| `demo_form_error` | booking form failed | — |
| `tap_to_call_clicked` | any phone CTA tapped | `source` = `hero` \| `navbar_desktop` \| `navbar_mobile` \| `navbar_mobile_menu` |

## 3. Funnels to build (PostHog → Product analytics → New funnel)

### A. Primary conversion funnel
Find where visitors drop off on the way to booking a demo.
1. `$pageview`
2. `demo_talk_started`  *(engaged with the live demo)*
3. `demo_form_submitted`
4. `demo_form_success`

Tip: set the conversion window to 1 day and break down by `$pageview` entry URL
to see which landing pages convert best.

### B. "Did the live demo work?" reliability funnel
1. `demo_talk_started`
2. `demo_talk_connected`
A big gap here = visitors trying the demo but it failing to connect (e.g.
ElevenLabs/mic issues) — a silent conversion killer worth fixing first.

### C. Phone-intent funnel
Break down `tap_to_call_clicked` by `source` to see which placement (hero vs
navbar vs mobile) actually drives calls, and weight the design accordingly.

## 4. Insights worth pinning to a dashboard
- **Trend:** `demo_form_success` per day (your north-star conversion).
- **Trend:** `tap_to_call_clicked` per day, broken down by `source`.
- **Funnel:** the Primary conversion funnel (A) with weekly comparison.
- **Ratio:** `demo_talk_connected` / `demo_talk_started` (live-demo health).
- **Path analysis:** start at `/` → see where sessions go and where they exit.

## 5. Session replay & heatmaps (the "watch where they leave" part)
- PostHog → Settings → **Replay** → enable session recordings.
- Filter replays to sessions that fired `demo_form_submitted` but **not**
  `demo_form_success`, or that bounced from `/demo` — watch exactly where the
  friction is.
- Enable **Heatmaps** (toolbar) on `/` and `/demo` to see scroll depth and where
  attention/clicks actually land.

## 6. Reading it
- High bounce on `/` with few `demo_talk_started` → the hero/offer isn't landing.
- Many `demo_talk_started` but few `demo_form_submitted` → the demo impresses but
  the ask/next-step is weak.
- Many `demo_form_submitted` but few `demo_form_success` → a technical failure in
  the booking pipeline (check the Make webhook / `demo_form_error`).
