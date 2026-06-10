import ComparePage from "../components/ComparePage";

export default function VsSmithAiPage() {
  return (
    <ComparePage
      competitor="Smith.ai"
      canonical="/vs-smith-ai"
      title="Voxmation vs Smith.ai — AI Receptionist Alternative"
      description="Compare Voxmation and Smith.ai. Voxmation is a pure-AI receptionist with sub-2-second answering, missed-call SMS textback, and predictable volume-based pricing — without Smith.ai's per-call human fees."
      intro="Smith.ai blends AI with human agents, which is great for delicate calls but adds per-call and per-minute costs that spike in busy season. Voxmation is a fast, pure-AI receptionist with predictable pricing and built-in missed-call textback. Here's how they compare."
      rows={[
        { feature: "Answers in under 2 seconds", vox: true, other: false, note: "Human handoff adds delay" },
        { feature: "Missed call SMS textback", vox: true, other: false },
        { feature: "Predictable volume-based pricing", vox: true, other: false, note: "Smith.ai bills per call/minute" },
        { feature: "No per-call human fees", vox: true, other: false, note: "Smith.ai ~$2.40+/AI call, $8.50+/human call" },
        { feature: "Lead qualification & routing", vox: true, other: true },
        { feature: "CRM sync (HubSpot, Zoho)", vox: true, other: true },
        { feature: "Built for home-service trades", vox: true, other: false },
        { feature: "Live human agents for complex calls", vox: false, other: true, note: "Smith.ai's core strength" },
        { feature: "White-label for agencies", vox: true, other: false },
      ]}
      voxWins={[
        "Instant, sub-2-second AI answering on every call",
        "Missed-call textback recovers leads automatically",
        "Predictable pricing that scales with call volume",
        "No expensive per-call or per-minute human fees",
        "White-label option for agencies and resellers",
      ]}
      otherWins={[
        "Live human agents handle delicate or complex calls",
        "Established brand with legal/professional-services focus",
        "Hybrid model for businesses that want a human touch",
      ]}
    />
  );
}
