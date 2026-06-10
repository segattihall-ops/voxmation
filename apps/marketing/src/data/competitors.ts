// Competitor comparison data powering /compare and /compare/[slug].
// Pricing reflects competitors' publicly advertised plans at time of writing
// and is intentionally described qualitatively where it changes often.

export interface CompareRow {
  feature: string;
  vox: boolean;
  them: boolean;
  note?: string;
}

export interface Competitor {
  slug: string;
  name: string;
  /** Short label for nav/cards, e.g. "Smith.ai". */
  shortName: string;
  category: string;
  /** One-line positioning of the competitor. */
  summary: string;
  /** Why a buyer might look for an alternative. */
  weakness: string;
  pricingModel: string;
  rows: CompareRow[];
  voxWins: string[];
  theirStrengths: string[];
  faq: { q: string; a: string }[];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "smith-ai",
    name: "Smith.ai",
    shortName: "Smith.ai",
    category: "Hybrid AI + human answering service",
    summary:
      "Smith.ai pairs AI with live human agents, which is great for delicate or complex calls but bills per call/minute — costs that climb fast in busy season.",
    weakness:
      "Per-call and per-human-minute pricing makes monthly costs unpredictable, and human handoff adds answer delay.",
    pricingModel:
      "Advertised from ~$95/mo for AI and ~$292.50/mo for human-hybrid, with per-call overage (≈$2.40+/AI call, $8.50+/human call).",
    rows: [
      { feature: "Answers in under 2 seconds", vox: true, them: false, note: "Human handoff adds delay" },
      { feature: "Pure-AI, consistent on every call", vox: true, them: false, note: "Smith.ai routes to humans" },
      { feature: "Missed-call SMS textback", vox: true, them: false },
      { feature: "Predictable, volume-based pricing", vox: true, them: false, note: "Smith.ai bills per call/minute" },
      { feature: "No per-call human fees", vox: true, them: false },
      { feature: "Lead qualification & routing", vox: true, them: true },
      { feature: "Appointment booking", vox: true, them: true },
      { feature: "Built for home-service trades", vox: true, them: false, note: "Smith.ai leans legal/professional" },
      { feature: "Live human agents for complex calls", vox: false, them: true, note: "Smith.ai's core strength" },
    ],
    voxWins: [
      "Instant, sub-2-second AI answering on every call — no human queue",
      "Missed-call textback recovers leads automatically",
      "Predictable pricing that scales with call volume, not per-call fees",
      "Purpose-built for HVAC, plumbing, electrical, and home services",
    ],
    theirStrengths: [
      "Live human agents handle delicate or complex conversations",
      "Established brand with legal and professional-services focus",
      "Hybrid model for businesses that specifically want a human touch",
    ],
    faq: [
      {
        q: "Is VOXmatiON cheaper than Smith.ai?",
        a: "For most home-service businesses, yes. Smith.ai bills per call (and more for human-handled calls), so costs spike in busy season. VOXmatiON uses predictable, volume-based pricing with no per-call human fees.",
      },
      {
        q: "Does VOXmatiON use human agents like Smith.ai?",
        a: "VOXmatiON is a pure-AI receptionist that answers in under two seconds on every call and can warm-transfer to your team when a human is genuinely needed. Smith.ai routes more calls to live agents, which adds cost and answer delay.",
      },
    ],
  },
  {
    slug: "goodcall",
    name: "Goodcall",
    shortName: "Goodcall",
    category: "AI phone agent for local businesses",
    summary:
      "Goodcall is a solid AI phone agent with strong Google Business Profile integration, aimed broadly at local businesses.",
    weakness:
      "No missed-call SMS textback, per-unique-customer billing, and lighter CRM integration for trades.",
    pricingModel:
      "Advertised from ~$59/mo based on unique customers, with overage per additional unique customer.",
    rows: [
      { feature: "Answers in under 2 seconds", vox: true, them: true },
      { feature: "Missed-call SMS textback", vox: true, them: false },
      { feature: "Lead qualification & routing", vox: true, them: true },
      { feature: "No per-customer overage surprises", vox: true, them: false, note: "Goodcall bills per unique customer" },
      { feature: "CRM sync (HubSpot, Zoho)", vox: true, them: false },
      { feature: "Built for home-service trades", vox: true, them: true },
      { feature: "Appointment booking", vox: true, them: true },
      { feature: "Google Business Profile sync", vox: false, them: true, note: "Goodcall's standout integration" },
    ],
    voxWins: [
      "Missed-call textback recovers leads Goodcall would lose to voicemail",
      "Two-way CRM sync with HubSpot and Zoho",
      "Deeper qualification and routing logic tuned for the trades",
      "Volume-based pricing without per-unique-customer overage",
    ],
    theirStrengths: [
      "Native Google Business Profile integration",
      "Simple per-customer pricing for very low-volume businesses",
      "Quick self-serve setup",
    ],
    faq: [
      {
        q: "What does VOXmatiON do that Goodcall doesn't?",
        a: "VOXmatiON adds missed-call SMS textback to recover leads that go unanswered, two-way CRM sync with HubSpot and Zoho, and qualification/routing logic tuned specifically for home-service trades.",
      },
      {
        q: "Is Goodcall or VOXmatiON better for HVAC and plumbing?",
        a: "Both answer calls with AI, but VOXmatiON is purpose-built for the trades — with emergency triage, service-area routing, and missed-call textback that matter most for high-urgency home-service calls.",
      },
    ],
  },
  {
    slug: "nextphone",
    name: "NextPhone",
    shortName: "NextPhone",
    category: "Flat-rate AI receptionist for field services",
    summary:
      "NextPhone offers a flat-rate, unlimited AI receptionist focused on field services — strong for high call volume, but a single plan can be overkill for smaller shops.",
    weakness:
      "One flat plan with no lightweight entry tier, no missed-call textback, and limited CRM sync.",
    pricingModel:
      "Advertised as a single flat plan around ~$199/mo with unlimited minutes (no per-minute fees).",
    rows: [
      { feature: "Answers in under 2 seconds", vox: true, them: true },
      { feature: "Missed-call SMS textback", vox: true, them: false },
      { feature: "Entry tier for low call volume", vox: true, them: false, note: "NextPhone is one flat plan" },
      { feature: "Predictable pricing", vox: true, them: true },
      { feature: "Lead qualification & routing", vox: true, them: true },
      { feature: "Emergency keyword routing", vox: true, them: true },
      { feature: "CRM sync (HubSpot, Zoho)", vox: true, them: false },
      { feature: "Flat unlimited-minutes plan", vox: false, them: true, note: "NextPhone's model for high volume" },
    ],
    voxWins: [
      "Affordable entry tier for low-volume businesses, not just one flat plan",
      "Missed-call textback to recover unanswered leads automatically",
      "Two-way CRM sync with HubSpot and Zoho",
      "Plans that scale from solo operators up to multi-location",
    ],
    theirStrengths: [
      "Flat unlimited pricing suits very high call volume",
      "Field-service-specific keyword routing",
      "Simple single-plan structure",
    ],
    faq: [
      {
        q: "Is VOXmatiON a good NextPhone alternative for small businesses?",
        a: "Yes. NextPhone's single flat plan (~$199/mo) can be overkill for lower-volume shops. VOXmatiON offers a lighter entry tier and scales up, plus adds missed-call textback and CRM sync.",
      },
      {
        q: "Does VOXmatiON charge per minute like some services?",
        a: "No. VOXmatiON pricing is based on call volume tiers, not an unpredictable per-minute meter, so your monthly cost stays predictable even in busy season.",
      },
    ],
  },
  {
    slug: "agentzap",
    name: "AgentZap",
    shortName: "AgentZap",
    category: "AI receptionist with broad integrations",
    summary:
      "AgentZap is a capable AI receptionist known for a large integration catalog and calendar scheduling, with per-minute billing above a base allotment.",
    weakness:
      "Per-minute overage above the base minutes can make busy-season bills unpredictable, and there's no missed-call textback.",
    pricingModel:
      "Advertised from ~$109/mo for a base of ~150 minutes, with per-minute overage (≈$0.70–$0.85/min).",
    rows: [
      { feature: "Answers in under 2 seconds", vox: true, them: true },
      { feature: "Missed-call SMS textback", vox: true, them: false },
      { feature: "No per-minute overage surprises", vox: true, them: false, note: "AgentZap bills per extra minute" },
      { feature: "Predictable, volume-based pricing", vox: true, them: false },
      { feature: "Lead qualification & routing", vox: true, them: true },
      { feature: "Appointment booking", vox: true, them: true },
      { feature: "Built for home-service trades", vox: true, them: true },
      { feature: "Very large integration catalog", vox: false, them: true, note: "AgentZap's standout strength" },
    ],
    voxWins: [
      "No per-minute overage — predictable cost even in peak season",
      "Missed-call SMS textback to recover unanswered leads",
      "Pricing tuned to home-service call patterns",
      "Sub-2-second answering with trade-specific qualification",
    ],
    theirStrengths: [
      "Very large catalog of third-party integrations",
      "Direct calendar scheduling across many tools",
      "Flexible for businesses with complex tool stacks",
    ],
    faq: [
      {
        q: "How is VOXmatiON priced versus AgentZap?",
        a: "AgentZap includes a base number of minutes and charges per minute beyond it, which can spike in busy months. VOXmatiON uses volume-based tiers with no per-minute overage, so costs stay predictable.",
      },
      {
        q: "Does VOXmatiON integrate with my tools like AgentZap?",
        a: "VOXmatiON syncs with CRMs like HubSpot and Zoho and supports webhooks for follow-up automations. AgentZap advertises a larger raw integration count; VOXmatiON focuses on the integrations home-service businesses actually use.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
