import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Phone, User } from "lucide-react";
import { SITE_URL, PHONE_NUMBER, PHONE_HREF, DEFAULT_OG_IMAGE } from "@/lib/constants";
import { BLOG_POSTS } from "@/data/posts";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-x-auto my-6">
          <code className="text-sm text-gray-300 font-mono leading-relaxed">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("| ")) {
        tableLines.push(lines[i]);
        i++;
      }
      const [header, , ...rows] = tableLines;
      const headers = header.split("|").filter(Boolean).map((h) => h.trim());
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="w-full text-sm border border-gray-800 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-900">
                {headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-gray-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => {
                const cells = row.split("|").filter(Boolean).map((c) => c.trim());
                return (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-gray-950/50" : "bg-gray-900/20"}>
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-gray-400">{cell}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="my-4 space-y-2">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-2 text-gray-400">
              <span className="text-violet-400 mt-1.5 text-xs">●</span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-200'>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(
        <p key={i} className="text-gray-400 leading-relaxed my-3"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-200'>$1</strong>")
              .replace(/`(.*?)`/g, "<code class='bg-gray-900 text-violet-300 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>"),
          }}
        />
      );
    }

    i++;
  }

  return elements;
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Voxmation" },
    publisher: {
      "@type": "Organization",
      name: "Voxmation",
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
    image: DEFAULT_OG_IMAGE,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">{post.description}</p>
        </header>

        <div className="prose-custom">
          {renderMarkdown(post.content)}
        </div>

        <div className="mt-16 p-6 bg-gray-900/40 border border-violet-500/20 rounded-2xl">
          <h3 className="font-bold text-white mb-2">Ready to automate your voice interactions?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Voxmation makes it easy to build IVR menus, appointment reminders, and outbound campaigns — on your infrastructure or ours.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-violet-400" />
              {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
