"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  featured: boolean;
}

export default function AdminProductsPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = isLoaded && (user?.publicMetadata as any)?.role === "admin";

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/sign-in"); return; }
    if (!isAdmin) { router.push("/"); return; }
    fetchProducts();
  }, [isLoaded, user, isAdmin, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  if (!isLoaded || loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Products</h1>
          <Link href="/admin/products/new">
            <Button>Add New Product</Button>
          </Link>
        </div>
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product._id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-400">
                      {product.category} • ${product.price} • Stock: {product.stock}
                      {product.featured && " • Featured"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product._id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Button variant="destructive" onClick={() => handleDelete(product._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
