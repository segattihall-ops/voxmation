import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { BLOG_POSTS } from "../blog/posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://voxmation.com/blog" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Blog — Self-Hosted CRM, Telephony, and Open Source Business Tools"
        description="In-depth articles on self-hosted CRM, open-source telephony integration, and running your business stack on your own infrastructure."
        canonical="/blog"
        jsonLd={breadcrumb}
      />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Blog
          </h1>
          <p className="text-xl text-gray-400">
            Deep dives on self-hosted CRM, open-source telephony, and owning your business stack.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-gray-900/30 border border-gray-800/60 rounded-2xl p-7 hover:border-violet-500/30 hover:bg-gray-900/60 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.description}</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-violet-400 group-hover:gap-2.5 transition-all">
                Read article
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
