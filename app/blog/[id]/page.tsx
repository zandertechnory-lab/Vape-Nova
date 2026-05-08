import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import { blogPosts, getBlogPost } from "@/lib/data/blog-posts";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vapenovashop.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ id: String(post.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = getBlogPost(Number(params.id));
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.id}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableRows.length < 2) {
      tableRows = [];
      inTable = false;
      return;
    }
    const headers = tableRows[0];
    const body = tableRows.slice(2);
    elements.push(
      <div key={key++} className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              {headers.map((h, i) => (
                <th key={i} className="text-left py-2 px-3 font-semibold text-gray-200">{h.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-800 hover:bg-gray-800/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="py-2 px-3 text-gray-300">{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  for (const line of lines) {
    if (line.startsWith("|")) {
      inTable = true;
      const cells = line.split("|").slice(1, -1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-2xl font-bold mt-10 mb-4 text-white">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="text-xl font-bold mt-6 mb-3 text-gray-100">{line.slice(4)}</h3>);
    } else if (line.startsWith("#### ")) {
      elements.push(<h4 key={key++} className="text-lg font-semibold mt-4 mb-2 text-gray-200">{line.slice(5)}</h4>);
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="border-gray-700 my-8" />);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="border-l-4 border-primary pl-4 my-4 italic text-gray-300">
          {line.slice(2)}
        </blockquote>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(<li key={key++} className="text-gray-300 ml-4 mb-1 list-disc">{processInline(line.slice(2))}</li>);
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(<li key={key++} className="text-gray-300 ml-4 mb-1 list-decimal">{processInline(text)}</li>);
    } else if (line.trim() === "") {
      elements.push(<br key={key++} />);
    } else {
      elements.push(<p key={key++} className="text-gray-300 leading-relaxed mb-3">{processInline(line)}</p>);
    }
  }

  if (inTable) flushTable();
  return elements;
}

function processInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = getBlogPost(Number(params.id));

  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.id}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "VapeNova",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/hero/vaping-lifestyle.png` },
    },
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    timeRequired: post.readTime,
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title.length > 50 ? post.title.slice(0, 50) + "…" : post.title, href: `/blog/${post.id}` },
  ];

  const otherPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <JsonLd data={articleSchema} />
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <span className="bg-primary/20 text-primary text-sm font-semibold px-3 py-1 rounded-full">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-white leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span>By {post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="aspect-video relative rounded-xl overflow-hidden mb-10 bg-gray-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <Card>
            <CardContent className="p-8 md:p-12">
              <article className="prose prose-invert max-w-none">
                {renderMarkdown(post.content)}
              </article>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Posts */}
          {otherPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">More from the Blog</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.id}`}>
                    <Card className="h-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
                      <CardContent className="p-4">
                        <span className="text-xs text-primary font-semibold">{related.category}</span>
                        <h3 className="font-semibold mt-1 mb-2 text-sm line-clamp-2 hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-500">{related.readTime}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
