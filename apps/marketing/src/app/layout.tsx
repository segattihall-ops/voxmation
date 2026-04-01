import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Voxmation — Voice Prompt Automation Platform",
    template: "%s | Voxmation",
  },
  description:
    "Voxmation automates inbound and outbound voice interactions with intelligent call flows, IVR menus, appointment reminders, and outbound campaigns — powered by Asterisk, FreeSWITCH, or Twilio.",
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
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
