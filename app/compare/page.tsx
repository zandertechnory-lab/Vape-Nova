"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Star, ShoppingCart, Check, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") || [];
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (ids.length === 0) return;
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          ids.map((id) => fetch(`/api/products?id=${id}`).then((r) => r.json()))
        );
        setProducts(results.map((r) => r.product || r.products?.[0]).filter(Boolean));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20">Loading comparison...</div>;
  if (products.length < 2) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">Add at least 2 products to compare.</p>
      <Link href="/shop"><Button>Browse Products</Button></Link>
    </div>
  );

  const rows = [
    { label: "Price", key: "price", render: (v: any) => <span className="font-bold text-primary">{formatPrice(v)}</span> },
    { label: "Category", key: "category" },
    { label: "Subcategory", key: "subcategory" },
    { label: "Rating", key: "rating", render: (v: any) => (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < Math.round(v) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
        ))}
        <span className="text-sm text-gray-400 ml-1">{v?.toFixed(1)}</span>
      </div>
    )},
    { label: "Stock", key: "stock", render: (v: any) => v > 0
      ? <span className="flex items-center gap-1 text-green-500"><Check className="h-4 w-4" /> In Stock ({v})</span>
      : <span className="flex items-center gap-1 text-red-500"><X className="h-4 w-4" /> Out of Stock</span>
    },
    { label: "Description", key: "description", render: (v: any) => <span className="text-sm text-gray-400 line-clamp-3">{v}</span> },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left py-4 pr-4 w-32 text-gray-500 font-medium text-sm">Product</th>
            {products.map((p) => (
              <th key={p._id} className="px-4 py-4 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-800">
                    {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" />}
                  </div>
                  <Link href={`/shop/${p.slug}`} className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                    {p.name}
                  </Link>
                  <Button size="sm" onClick={() => {
                    addItem({ id: p._id, name: p.name, image: p.images?.[0] || "", price: p.price });
                    toast.success("Added to cart!");
                  }}>
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" /> Add to Cart
                  </Button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-t border-gray-800">
              <td className="py-4 pr-4 text-sm font-medium text-gray-400">{row.label}</td>
              {products.map((p) => (
                <td key={p._id} className="px-4 py-4 text-center text-sm">
                  {row.render ? row.render(p[row.key]) : p[row.key] || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8">Compare Products</h1>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <CompareContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
