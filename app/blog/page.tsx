import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import { blogPosts } from "@/lib/data/blog-posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "VapeNova Blog - Vaping Guides, Reviews & Tips",
  description:
    "Read expert guides, product reviews, and tips on vaping, CBD vapes, dry herb vaporizers, and mushroom gummies on the VapeNova blog.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "VapeNova Blog - Vaping Guides, Reviews & Tips",
    description:
      "Expert vaping guides, product reviews, and wellness tips from the VapeNova team.",
    url: `${SITE_URL}/blog`,
    images: [{ url: "/images/hero/vaping-lifestyle.png", width: 1200, height: 630 }],
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "VapeNova Blog",
  url: `${SITE_URL}/blog`,
  description: "Expert vaping guides, product reviews, and wellness content from VapeNova.",
  publisher: {
    "@type": "Organization",
    name: "VapeNova",
    url: SITE_URL,
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${SITE_URL}/blog/${post.id}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    description: post.excerpt,
  })),
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={blogListSchema} />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-4xl font-bold mb-4">VapeNova Blog</h1>
        <p className="text-gray-400 mb-12 text-lg max-w-2xl">
          Expert guides, in-depth reviews, and tips on vaping, CBD products, dry herb vaporizers, and functional mushroom gummies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gray-800">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary/90 text-white text-xs font-semibold px-2 py-1 rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
