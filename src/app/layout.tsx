import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ZohoSalesIQWidget from "@/components/ZohoSalesIQWidget";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voxmation — AI Receptionist & Missed Call Recovery",
    template: "%s | Voxmation",
  },
  description:
    "VOXmatiON recovers missed calls, qualifies leads, follows up automatically, and books appointments with a managed AI receptionist system.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Voxmation",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@voxmation",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-gray-950 text-gray-100 antialiased">
        <ZohoSalesIQWidget />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
