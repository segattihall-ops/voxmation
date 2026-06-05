export type DemoSlug = {
  slug: string;
  companyName: string;
  ownerName?: string;
  vertical: "hvac" | "plumbing" | "roofing" | "electrical" | "field-service";
  city: string;
  callVolumePerDay?: number; // from Zoho field Call_Volume_Day
  agentScript: string; // persona instruction sent to ElevenLabs as dynamic variable
  // --- Business info (sent to the agent as dynamic variables). Placeholders —
  // replace with each company's real details. ---
  services?: string[]; // services offered
  hours?: string; // business / dispatch hours
  serviceArea?: string; // geographic coverage
  bookingPolicy?: string; // scheduling / emergency policy
  pricingNote?: string; // pricing guidance (no firm quotes)
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
    services: ["AC repair & install", "heating", "plumbing", "electrical", "maintenance"],
    hours: "Mon–Sat 7am–8pm; 24/7 emergency line",
    serviceArea: "the Dallas–Fort Worth metro",
    bookingPolicy: "Same-day slots for emergencies, next-day for standard visits",
    pricingNote: "Free estimates on installs; a standard diagnostic fee on repairs, confirmed before the visit",
  },
  "rescue-air": {
    slug: "rescue-air",
    companyName: "Rescue Air",
    vertical: "hvac",
    city: "Dallas",
    callVolumePerDay: 85,
    agentScript:
      "You are the AI receptionist for Rescue Air, an HVAC company in Dallas. Greet callers warmly, qualify the service need (AC repair, heating, maintenance), collect address and best callback number, and confirm a technician visit window. Be efficient and professional.",
    services: ["AC repair", "AC installation", "heating & furnace", "maintenance plans", "indoor air quality"],
    hours: "Mon–Sat 7am–7pm; 24/7 emergency service",
    serviceArea: "Dallas and the surrounding DFW suburbs",
    bookingPolicy: "Same-day appointments for no-cooling or no-heat emergencies",
    pricingNote: "A diagnostic fee applies and is confirmed up front; replacement estimates are free",
  },
  berkeys: {
    slug: "berkeys",
    companyName: "Berkeys",
    vertical: "hvac",
    city: "Fort Worth",
    callVolumePerDay: 120,
    agentScript:
      "You are the AI receptionist for Berkeys Home Services in Fort Worth. Handle calls for HVAC, plumbing, and electrical. Qualify the issue type, collect customer address and availability, and schedule the appropriate technician.",
    services: ["HVAC repair & install", "plumbing", "water heaters", "electrical panels & wiring", "drain cleaning"],
    hours: "Mon–Sun 7am–9pm",
    serviceArea: "Fort Worth and the greater DFW area",
    bookingPolicy: "Same-day for emergencies (leaks, no power, no heat or AC)",
    pricingNote: "Upfront flat-rate pricing; the service-call fee is confirmed before booking",
  },
  hvac: {
    slug: "hvac",
    companyName: "your HVAC company",
    vertical: "hvac",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for an HVAC company. Greet callers, qualify their service need, collect address and preferred contact number, and schedule a technician visit.",
    services: ["AC repair", "heating", "maintenance"],
    hours: "regular business hours, with emergency service available",
    serviceArea: "the DFW metro",
    bookingPolicy: "Same-day for emergencies",
    pricingNote: "A diagnostic fee is confirmed before the visit",
  },
  roofing: {
    slug: "roofing",
    companyName: "your roofing company",
    vertical: "roofing",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for a roofing company. Handle inbound calls for inspections, repairs, and storm damage assessments. Collect address, describe the issue, and book an estimate appointment.",
    services: ["roof inspections", "repairs", "storm & hail damage", "replacements"],
    hours: "Mon–Fri 8am–6pm",
    serviceArea: "the DFW metro",
    bookingPolicy: "Priority scheduling for active leaks",
    pricingNote: "Inspections and estimates are free",
  },
  plumbing: {
    slug: "plumbing",
    companyName: "your plumbing company",
    vertical: "plumbing",
    city: "DFW",
    agentScript:
      "You are an AI receptionist for a plumbing company. Qualify the plumbing issue, determine urgency, collect address, and schedule a technician.",
    services: ["leak repair", "drain cleaning", "water heaters", "fixtures"],
    hours: "Mon–Sat, with 24/7 emergency service",
    serviceArea: "the DFW metro",
    bookingPolicy: "Same-day for active leaks or flooding",
    pricingNote: "Upfront pricing; the service-call fee is confirmed first",
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
      services: ["service calls"],
      hours: "regular business hours",
      serviceArea: "the DFW metro",
      bookingPolicy: "Same-day for emergencies",
      pricingNote: "Pricing is confirmed before any work",
    }
  );
}

// Builds the dynamic-variable map sent to the ElevenLabs agent. Reference these
// in the agent's system prompt as {{company_name}}, {{services}}, {{hours}}, etc.
export function buildAgentVariables(data: DemoSlug): Record<string, string> {
  return {
    agent_script: data.agentScript,
    company_name: data.companyName,
    city: data.city,
    vertical: data.vertical,
    services: data.services?.join(", ") ?? "",
    hours: data.hours ?? "",
    service_area: data.serviceArea ?? "",
    booking_policy: data.bookingPolicy ?? "",
    pricing_note: data.pricingNote ?? "",
  };
}
