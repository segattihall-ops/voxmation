import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const SITE_URL = "https://voxmation.io";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title.includes("Voxmation")
    ? title
    : `${title} | Voxmation OS`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Voxmation OS",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      "https://github.com/voxmation/voxmation-os",
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Voxmation OS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Linux, Docker",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Open-source, self-hosted CRM with built-in telephony, delivery ops, billing, and integration hub.",
    url: SITE_URL,
  };

  const schemas = [orgSchema, softwareSchema, ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Voxmation OS" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}
