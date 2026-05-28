import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/constants";
import { BLOG_POSTS } from "@/data/posts";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Blog — Voice Automation Insights & Guides";
  const description =
    "In-depth articles on voice prompt automation, IVR design, Asterisk vs Twilio, outbound campaign strategy, and telephony best practices from the Voxmation team.";
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog` },
    openGraph: {
      title: "Blog — Voxmation Voice Automation",
      description:
        "Guides and insights on voice automation, IVR design, Asterisk, Twilio, and outbound campaign strategy.",
      url: `${SITE_URL}/blog`,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Voxmation Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function BlogPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-950 to-gray-950/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Resource Library
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Voice automation, explained
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Practical guides on building IVR menus, running outbound campaigns, choosing your telephony stack, and getting the most out of voice automation.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 bg-gray-900/40 border border-gray-800/60 rounded-2xl hover:border-violet-500/30 hover:bg-gray-900 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span className="text-gray-700">·</span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-violet-400 group-hover:text-violet-300 transition-colors font-medium">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
