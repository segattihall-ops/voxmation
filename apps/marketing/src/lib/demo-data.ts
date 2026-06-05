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
  // Public homepage demo — a sample brand so the agent has a natural name to
  // speak (rather than "your business"). Used by the homepage live-demo widget.
  home: {
    slug: "home",
    companyName: "Apex Home Services",
    vertical: "hvac",
    city: "Dallas",
    agentScript:
      "You are the AI receptionist for Apex Home Services, a home-services company (HVAC, plumbing, and electrical) in the Dallas–Fort Worth area. This is a live product demo for a business owner evaluating VOXmatiON, so make a great impression: greet warmly, qualify the service need, collect the address and best callback number, and book a technician visit window. Keep replies short and natural, one question at a time.",
  },
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
