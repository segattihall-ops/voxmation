export type DemoSlug = {
  slug: string;
  companyName: string;
  ownerName?: string;
  vertical: "hvac" | "plumbing" | "roofing" | "electrical" | "field-service";
  city: string;
  callVolumePerDay?: number; // from Zoho field Call_Volume_Day
  agentScript: string; // persona instruction sent to ElevenLabs as dynamic variable
};

export const demoSlugs: Record<string, DemoSlug> = {
  "rescue-air": {
    slug: "rescue-air",
    companyName: "Rescue Air",
    vertical: "hvac",
    city: "Dallas",
    callVolumePerDay: 85,
    agentScript:
      "You are the AI receptionist for Rescue Air, an HVAC company in Dallas. Greet callers warmly, qualify the service need (AC repair, heating, maintenance), collect address and best callback number, and confirm a technician visit window. Be efficient and professional.",
  },
  berkeys: {
    slug: "berkeys",
    companyName: "Berkeys",
    vertical: "hvac",
    city: "Fort Worth",
    callVolumePerDay: 120,
    agentScript:
      "You are the AI receptionist for Berkeys Home Services in Fort Worth. Handle calls for HVAC, plumbing, and electrical. Qualify the issue type, collect customer address and availability, and schedule the appropriate technician.",
  },
  hvac: {
    slug: "hvac",
    companyName: "your HVAC company",
    vertical: "hvac",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for an HVAC company. Greet callers, qualify their service need, collect address and preferred contact number, and schedule a technician visit.",
  },
  roofing: {
    slug: "roofing",
    companyName: "your roofing company",
    vertical: "roofing",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for a roofing company. Handle inbound calls for inspections, repairs, and storm damage assessments. Collect address, describe the issue, and book an estimate appointment.",
  },
  plumbing: {
    slug: "plumbing",
    companyName: "your plumbing company",
    vertical: "plumbing",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for a plumbing company. Qualify the plumbing issue, determine urgency, collect address, and schedule a technician.",
  },
};

export function getSlugData(slug: string): DemoSlug {
  return (
    demoSlugs[slug] ?? {
      slug,
      companyName: "your business",
      vertical: "field-service",
      city: "DFW",
      agentScript:
        "You are an AI receptionist for a field service company. Greet callers professionally, qualify their service need, collect their address and contact number, and schedule the appropriate technician.",
    }
  );
}
