import ComparePage from "../components/ComparePage";

export default function VsNextphonePage() {
  return (
    <ComparePage
      competitor="NextPhone"
      canonical="/vs-nextphone"
      title="Voxmation vs NextPhone — AI Receptionist Alternative"
      description="Compare Voxmation and NextPhone. Both are pure-AI receptionists for field-service businesses, but Voxmation adds missed-call SMS textback, CRM sync, and flexible plans for low-volume businesses."
      intro="NextPhone offers a flat-rate, unlimited AI receptionist focused on field services — great for high call volume, but the single flat plan can be overkill for smaller shops. Voxmation scales from a lightweight Starter plan up to high-volume Pro, and adds missed-call textback and CRM sync. Here's the comparison."
      rows={[
        { feature: "Answers in under 2 seconds", vox: true, other: true },
        { feature: "Missed call SMS textback", vox: true, other: false },
        { feature: "Entry plan for low call volume", vox: true, other: false, note: "NextPhone is one flat ~$199/mo plan" },
        { feature: "Predictable pricing", vox: true, other: true },
        { feature: "Lead qualification & routing", vox: true, other: true },
        { feature: "Emergency keyword routing", vox: true, other: true },
        { feature: "CRM sync (HubSpot, Zoho)", vox: true, other: false },
        { feature: "Unlimited minutes flat rate", vox: false, other: true, note: "NextPhone's model for high volume" },
        { feature: "White-label for agencies", vox: true, other: false },
      ]}
      voxWins={[
        "Affordable Starter tier for low-volume businesses",
        "Missed-call textback to recover leads automatically",
        "Two-way CRM sync with HubSpot and Zoho",
        "White-label option for agencies and resellers",
      ]}
      otherWins={[
        "Flat unlimited pricing suits very high call volume",
        "Field-service-specific keyword routing",
        "Simple single-plan structure",
      ]}
    />
  );
}
