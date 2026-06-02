import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VOXmatiON — AI Receptionist & Missed Call Recovery",
    template: "%s | VOXmatiON",
  },
  description: "VOXmatiON answers calls, qualifies leads, follows up instantly, and routes every opportunity to the right place — automatically, 24/7.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "VOXmatiON",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "VOXmatiON" }],
  },
  twitter: { card: "summary_large_image", site: "@voxmation", images: [DEFAULT_OG_IMAGE] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#0B1F3A] text-white">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
