import ComparePage from "../components/ComparePage";

export default function VsGoodcallPage() {
  return (
    <ComparePage
      competitor="Goodcall"
      canonical="/vs-goodcall"
      title="Voxmation vs Goodcall — AI Phone Agent Alternative"
      description="Compare Voxmation and Goodcall. Both are pure-AI phone agents for local businesses, but Voxmation adds missed-call SMS textback, lead qualification depth, and a white-label option for agencies."
      intro="Goodcall is a solid AI phone agent with strong Google Business Profile integration. Voxmation focuses on home-service businesses, pairing the AI receptionist with missed-call textback, deeper qualification, and an agency white-label tier. Here's the comparison."
      rows={[
        { feature: "Answers in under 2 seconds", vox: true, other: true },
        { feature: "Missed call SMS textback", vox: true, other: false },
        { feature: "Lead qualification & routing", vox: true, other: true },
        { feature: "Predictable volume-based pricing", vox: true, other: true },
        { feature: "No per-customer overage surprises", vox: true, other: false, note: "Goodcall bills per unique customer" },
        { feature: "Built for home-service trades", vox: true, other: true },
        { feature: "CRM sync (HubSpot, Zoho)", vox: true, other: false },
        { feature: "Google Business Profile sync", vox: false, other: true, note: "Goodcall's standout integration" },
        { feature: "White-label for agencies", vox: true, other: false },
      ]}
      voxWins={[
        "Missed-call textback recovers leads Goodcall would lose to voicemail",
        "Two-way CRM sync with HubSpot and Zoho",
        "Deeper qualification and routing logic for trades",
        "White-label option for agencies and resellers",
      ]}
      otherWins={[
        "Native Google Business Profile integration",
        "Simple per-customer pricing for very low-volume businesses",
        "Quick self-serve setup",
      ]}
    />
  );
}
