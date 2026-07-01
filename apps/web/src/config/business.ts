// Single source of truth for Voxmation brand, contact (NAP), and product facts.
// Used across page copy, structured data (JSON-LD), and the static index.html.

export const SITE_URL = "https://voxmation.com";

export const BRAND = {
  name: "Voxmation",
  legalName: "Voxmation",
  // Stylized display form used in marketing copy.
  display: "VOXmatiON",
  tagline: "AI Receptionist & Missed Call Recovery for service businesses",
};

// NAP — Name, Address, Phone. Keep consistent everywhere for local SEO.
export const CONTACT = {
  phone: "1-844-687-7999",
  phoneHref: "tel:+18446877999",
  email: "sales@voxmation.com",
  emailHref: "mailto:sales@voxmation.com",
};

export const SOCIAL = {
  twitter: "https://twitter.com/voxmation",
  linkedin: "https://www.linkedin.com/company/voxmation",
  facebook: "https://www.facebook.com/voxmation",
};

// Verticals the AI receptionist is tuned for.
export const VERTICALS = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Garage Door",
  "Pest Control",
  "Landscaping",
  "Home Services",
];

// Organization schema reused as the site-wide entity anchor.
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  legalName: BRAND.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "Voxmation is an AI receptionist and missed-call recovery platform for home-service businesses. It answers, qualifies, and routes every call 24/7 and texts back missed calls in seconds.",
  email: CONTACT.email,
  telephone: `+${CONTACT.phone.replace(/[^0-9]/g, "")}`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+${CONTACT.phone.replace(/[^0-9]/g, "")}`,
    email: CONTACT.email,
    contactType: "sales",
    areaServed: "US",
    availableLanguage: ["English"],
  },
  sameAs: [SOCIAL.twitter, SOCIAL.linkedin, SOCIAL.facebook],
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI receptionist and missed call recovery",
  provider: { "@type": "Organization", name: BRAND.name, url: SITE_URL },
  areaServed: "US",
  audience: {
    "@type": "Audience",
    audienceType: "Home service businesses (HVAC, plumbing, electrical)",
  },
  description:
    "24/7 AI receptionist that answers, qualifies, and routes inbound calls, plus instant SMS textback to recover missed calls.",
  url: SITE_URL,
};
