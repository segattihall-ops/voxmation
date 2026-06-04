import type { Metadata } from "next";
import { getSlugData } from "@/lib/demo-data";
import DemoWidget from "@/components/DemoWidget";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = getSlugData(params.slug);
  return {
    // The root layout applies the "%s | VOXmatiON" template, so omit it here.
    title: `Live AI Demo for ${data.companyName}`,
    description: `Hear exactly how VOXmatiON handles inbound calls for ${data.companyName}. Try the live AI voice demo now.`,
    // noindex — these are sales assets, not SEO pages
    robots: { index: false, follow: false },
  };
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const data = getSlugData(params.slug);
  return <DemoWidget slugData={data} />;
}
