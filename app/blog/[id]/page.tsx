import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // In production, fetch the blog post from the database
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-4">Blog Post Title</h1>
              <p className="text-gray-400 mb-8">Published on {new Date().toLocaleDateString()}</p>
              <div className="aspect-video bg-gray-800 rounded-lg mb-8"></div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  This is a placeholder blog post. In production, this content would be fetched
                  from the database and displayed here. The blog system is CMS-ready and can be
                  extended to include rich text editing, image uploads, and more.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

