"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AdminBlogPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const isAdmin = isLoaded && (user?.publicMetadata as any)?.role === "admin";

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/sign-in"); return; }
    if (!isAdmin) { router.push("/"); return; }
  }, [isLoaded, user, isAdmin, router]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Blog</h1>
          <Link href="/admin/blog/new">
            <Button>Create New Post</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-400">Blog management coming soon. This is a CMS-ready system.</p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

