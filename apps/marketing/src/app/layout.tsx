import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ZohoSalesIQWidget from "@/components/ZohoSalesIQWidget";
import dynamic from "next/dynamic";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const VoiceAgent = dynamic(() => import("@/components/VoiceAgent"), { ssr: false });

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "VOXmatiON — AI That Answers Every Call, Books Every Job", template: "%s | VOXmatiON" },
  description: "AI voice automation that answers missed calls, qualifies leads, and books jobs 24/7. Built for HVAC, plumbing, electrical, and roofing companies.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: { type: "website", locale: "en_US", url: SITE_URL, siteName: "VOXmatiON", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", site: "@voxmation", images: [DEFAULT_OG_IMAGE] },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "VOXmatiON",
      url: SITE_URL,
      logo: `${SITE_URL}/Logo.PNG`,
      description:
        "AI voice automation that answers missed calls, qualifies leads, and books jobs 24/7 for HVAC, plumbing, electrical, and roofing companies.",
      email: "sales@voxmation.com",
      areaServed: ["Dallas", "Fort Worth", "Houston", "Austin", "Texas"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-844-687-7999",
        email: "sales@voxmation.com",
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English"],
      },
      sameAs: ["https://twitter.com/voxmation"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "VOXmatiON",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased bg-[#060A10] text-[#F7F5F0]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ZohoSalesIQWidget />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <VoiceAgent />
      </body>
    </html>
  );
}
