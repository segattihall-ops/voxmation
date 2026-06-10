import { Helmet } from "react-helmet-async";
import { SITE_URL, BRAND, organizationSchema, serviceSchema } from "../config/business";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = title.includes(BRAND.name)
    ? title
    : `${title} | ${BRAND.name}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  const schemas = [
    organizationSchema,
    serviceSchema,
    ...(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
  ];

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
      <meta property="og:site_name" content={BRAND.name} />

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
