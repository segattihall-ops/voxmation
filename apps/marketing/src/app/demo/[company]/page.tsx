import type { Metadata } from "next";
import PersonalizedDemoClient from "./PersonalizedDemoClient";

interface Props {
  params: { company: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = decodeURIComponent(params.company).replace(/-/g, " ");
  const displayName = name.replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${displayName} × VOXmatiON — Custom AI Demo`,
    description: `See exactly how VOXmatiON would recover missed calls and book more jobs for ${displayName}. Built specifically for your business.`,
    robots: { index: false, follow: false },
  };
}

export default function PersonalizedDemoPage({ params }: Props) {
  const raw = decodeURIComponent(params.company).replace(/-/g, " ");
  const companyName = raw.replace(/\b\w/g, (c) => c.toUpperCase());
  return <PersonalizedDemoClient companyName={companyName} />;
}
