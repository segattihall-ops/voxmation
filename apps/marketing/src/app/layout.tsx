import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ZohoSalesIQWidget from "@/components/ZohoSalesIQWidget";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "VOXmatiON — AI That Answers Every Call, Books Every Job", template: "%s | VOXmatiON" },
  description: "AI voice automation that answers missed calls, qualifies leads, and books jobs 24/7. Built for HVAC, plumbing, electrical, and roofing companies.",
  openGraph: { type: "website", locale: "en_US", url: SITE_URL, siteName: "VOXmatiON", images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", site: "@voxmation", images: [DEFAULT_OG_IMAGE] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased bg-[#060A10] text-[#F7F5F0]">
        <ZohoSalesIQWidget />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
