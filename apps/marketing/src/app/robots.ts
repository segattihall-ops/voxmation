import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Served at /robots.txt
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private sales assets (noindex) and API routes — keep them out of crawl.
        disallow: ["/api/", "/demo/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
