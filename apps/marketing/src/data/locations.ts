// Local landing pages powering /locations and /locations/[slug].
// Only cities VOXmatiON genuinely serves (Texas metros listed in areaServed)
// are included — each page carries differentiated local context, not just a
// swapped city name.

export interface Location {
  slug: string;
  city: string;
  metro: string;
  state: string;
  intro: string;
  localContext: string;
  topIndustries: string[];
  areas: string[];
  stat: { value: string; label: string };
  faq: { q: string; a: string }[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "dallas",
    city: "Dallas",
    metro: "Dallas–Fort Worth Metroplex",
    state: "TX",
    intro:
      "An AI receptionist that answers every call for Dallas home-service and local businesses — 24/7, in under two seconds, even during peak season.",
    localContext:
      "Dallas contractors compete in one of the fastest-growing metros in the country, where a customer who reaches voicemail simply calls the next company on the list. With brutal summer AC demand and a constant flow of new construction, missed calls in Dallas are missed jobs. VOXmatiON answers, qualifies, and books them automatically.",
    topIndustries: ["HVAC", "Plumbing", "Roofing", "Electrical", "Med Spa"],
    areas: ["Downtown Dallas", "Uptown", "Oak Cliff", "Lakewood", "Preston Hollow", "Far North Dallas"],
    stat: { value: "1.3M+", label: "Dallas residents who could be calling" },
    faq: [
      {
        q: "Does VOXmatiON work for Dallas businesses?",
        a: "Yes. VOXmatiON answers calls 24/7 for Dallas home-service and local businesses, qualifies the caller, books the appointment, and texts back missed calls — so you stop losing jobs to competitors who answer first.",
      },
      {
        q: "Is VOXmatiON cheaper than a Dallas answering service?",
        a: "In most cases, yes. Traditional Dallas answering services bill per minute or per call. VOXmatiON uses predictable, volume-based pricing and answers instantly with no hold queue.",
      },
    ],
  },
  {
    slug: "fort-worth",
    city: "Fort Worth",
    metro: "Dallas–Fort Worth Metroplex",
    state: "TX",
    intro:
      "A 24/7 AI receptionist for Fort Worth contractors and local businesses that answers every call and books the job automatically.",
    localContext:
      "Fort Worth's mix of established neighborhoods and rapid suburban growth keeps service crews in the field all day — which is exactly when calls go unanswered. VOXmatiON covers the phones while your team works, capturing emergency calls and routine bookings across Tarrant County without sending a single caller to voicemail.",
    topIndustries: ["HVAC", "Plumbing", "Garage Door", "Landscaping", "Roofing"],
    areas: ["Downtown Fort Worth", "Sundance Square", "TCU area", "Arlington Heights", "North Fort Worth", "Keller"],
    stat: { value: "24/7", label: "Coverage across Tarrant County" },
    faq: [
      {
        q: "Can VOXmatiON answer calls for my Fort Worth business after hours?",
        a: "Yes. VOXmatiON answers 24/7, including nights, weekends, and holidays, so Fort Worth customers always reach a live, helpful voice instead of voicemail.",
      },
      {
        q: "How fast does VOXmatiON answer Fort Worth calls?",
        a: "Under two seconds, on every call — faster than any live answering service and faster than your competitors down the road.",
      },
    ],
  },
  {
    slug: "houston",
    city: "Houston",
    metro: "Greater Houston",
    state: "TX",
    intro:
      "An AI receptionist for Houston home-service companies that answers every call, recovers missed calls, and books jobs around the clock.",
    localContext:
      "Houston's size and storm-driven demand mean call volume can spike without warning — a single freeze or flood can bury your phone in emergency calls. VOXmatiON handles unlimited simultaneous calls, triages emergencies, and books estimates across the Greater Houston area so no opportunity slips through during a surge.",
    topIndustries: ["HVAC", "Plumbing", "Roofing", "Electrical", "Cleaning"],
    areas: ["Downtown Houston", "The Heights", "Montrose", "Sugar Land", "Katy", "The Woodlands"],
    stat: { value: "∞", label: "Simultaneous calls handled during surges" },
    faq: [
      {
        q: "Can VOXmatiON handle a storm-season call surge in Houston?",
        a: "Yes. VOXmatiON answers unlimited calls at the same time, so even when a Houston freeze or storm floods your phone, every caller is answered, triaged, and booked instantly.",
      },
      {
        q: "Does VOXmatiON serve the whole Greater Houston area?",
        a: "Yes — from Downtown and the Heights out to Katy, Sugar Land, and The Woodlands, VOXmatiON answers and qualifies calls for businesses across Greater Houston.",
      },
    ],
  },
  {
    slug: "austin",
    city: "Austin",
    metro: "Greater Austin",
    state: "TX",
    intro:
      "A 24/7 AI receptionist for Austin businesses that answers every call, qualifies the lead, and books the appointment automatically.",
    localContext:
      "Austin's booming population and tech-savvy customers expect an instant, professional response — and they'll move on fast if they get voicemail. VOXmatiON gives Austin home-service and local businesses an always-on receptionist that sounds great, qualifies the job, and books it on the spot across the Greater Austin area.",
    topIndustries: ["HVAC", "Plumbing", "Electrical", "Med Spa", "Real Estate"],
    areas: ["Downtown Austin", "South Congress", "East Austin", "Round Rock", "Cedar Park", "Pflugerville"],
    stat: { value: "< 2s", label: "Average answer time in Austin" },
    faq: [
      {
        q: "Why do Austin businesses use VOXmatiON?",
        a: "Austin customers expect a fast, polished response. VOXmatiON answers in under two seconds, sounds natural and on-brand, qualifies the caller, and books the appointment — so you win the customer before a competitor calls back.",
      },
      {
        q: "Does VOXmatiON integrate with my Austin business's tools?",
        a: "Yes. VOXmatiON syncs with CRMs like HubSpot and Zoho and can send call details and bookings straight into your existing workflow.",
      },
    ],
  },
  {
    slug: "san-antonio",
    city: "San Antonio",
    metro: "Greater San Antonio",
    state: "TX",
    intro:
      "An AI receptionist for San Antonio home-service and local businesses that answers every call, 24/7, and books jobs automatically.",
    localContext:
      "San Antonio's large, spread-out service area means crews spend hours driving between jobs — time when the phone goes unanswered. VOXmatiON keeps every call covered across Bexar County, qualifying callers and booking work while your team stays focused on the job in front of them.",
    topIndustries: ["HVAC", "Plumbing", "Roofing", "Garage Door", "Cleaning"],
    areas: ["Downtown San Antonio", "Alamo Heights", "Stone Oak", "Schertz", "New Braunfels", "Helotes"],
    stat: { value: "100%", label: "Of calls answered across Bexar County" },
    faq: [
      {
        q: "Does VOXmatiON answer calls for San Antonio businesses 24/7?",
        a: "Yes. VOXmatiON answers every call around the clock across the San Antonio area, so customers reach a helpful voice day or night instead of going to voicemail.",
      },
      {
        q: "Can VOXmatiON book jobs while my crew is driving between San Antonio job sites?",
        a: "Absolutely. While your team is on the road or on a job, VOXmatiON answers, qualifies, and books incoming calls automatically — no missed work.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
