import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/data/posts";
import { COMPETITORS } from "@/data/competitors";
import { LOCATIONS } from "@/data/locations";

// Industry landing pages — keep in sync with the INDUSTRIES map in
// src/app/industries/[slug]/page.tsx.
const INDUSTRY_SLUGS = [
  "hvac-ai-receptionist",
  "plumbing-ai-receptionist",
  "roofing-ai-receptionist",
  "electrical-ai-receptionist",
  "cleaning-ai-receptionist",
  "medical-spa-ai-receptionist",
  "legal-intake-ai-receptionist",
  "landscaping-ai-receptionist",
  "real-estate-ai-receptionist",
  "garage-door-ai-receptionist",
];

// Served at /sitemap.xml. The /demo/[slug] pages are intentionally excluded —
// they are noindex private sales assets.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const at = (path: string) => `${SITE_URL}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: at("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: at("/ai-receptionist"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: at("/missed-call-recovery"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: at("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: at("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: at("/how-it-works"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: at("/pricing"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: at("/compare"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: at("/roi-calculator"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: at("/locations"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: at("/what-is-an-ai-receptionist"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: at("/demo"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: at("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: at("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: at("/privacy-policy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: at("/terms-of-service"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: at("/demo-terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const industryPages: MetadataRoute.Sitemap = INDUSTRY_SLUGS.map((slug) => ({
    url: at(`/industries/${slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: at(`/blog/${post.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const comparePages: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: at(`/compare/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationPages: MetadataRoute.Sitemap = LOCATIONS.map((l) => ({
    url: at(`/locations/${l.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...industryPages, ...comparePages, ...locationPages, ...blogPages];
}
