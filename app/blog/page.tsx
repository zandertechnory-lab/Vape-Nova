import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  // Placeholder blog posts - in production, these would come from the database
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Vaping",
      excerpt: "Everything you need to know about getting started with vaping.",
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Best Vaporizers of 2024",
      excerpt: "Our top picks for the best vaporizers this year.",
      date: "2024-01-10",
    },
    {
      id: 3,
      title: "Understanding CBD Vapes",
      excerpt: "A comprehensive guide to CBD vaping products.",
      date: "2024-01-05",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-4"></div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
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

