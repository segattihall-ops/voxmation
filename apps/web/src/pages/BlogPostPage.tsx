import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "../components/SEOHead";
import { BLOG_POSTS } from "../blog/posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Voxmation OS",
    },
    publisher: {
      "@type": "Organization",
      name: "Voxmation OS",
      logo: {
        "@type": "ImageObject",
        url: "https://voxmation.io/logo.svg",
      },
    },
    url: `https://voxmation.io/blog/${post.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://voxmation.io" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://voxmation.io/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://voxmation.io/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.description}
        canonical={`/blog/${post.slug}`}
        jsonLd={[articleSchema, breadcrumb]}
      />

      <article className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">{post.description}</p>
          </header>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-li:text-gray-400
            prose-strong:text-gray-200
            prose-code:text-violet-300 prose-code:bg-gray-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
            prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800/60 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
            prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-gray-300
            prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline
            prose-table:border-collapse
            prose-th:text-left prose-th:text-gray-400 prose-th:font-semibold prose-th:py-2 prose-th:px-4 prose-th:border prose-th:border-gray-800
            prose-td:text-gray-400 prose-td:py-2 prose-td:px-4 prose-td:border prose-td:border-gray-800
            prose-blockquote:border-l-violet-500 prose-blockquote:text-gray-500
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/60">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              More articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
