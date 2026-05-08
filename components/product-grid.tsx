"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Heart, GitCompare } from "lucide-react";
import toast from "react-hot-toast";
import { useCompareStore } from "@/store/compare-store";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  featured: boolean;
  stock: number;
  rating?: number;
}

export default function ProductGrid({
  category,
  subcategory,
  search,
}: {
  category?: string;
  subcategory?: string;
  search?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompareStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (subcategory) params.append("subcategory", subcategory);
        if (search) params.append("search", search);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory, search]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      image: product.images[0] || "/placeholder.jpg",
      price: product.price,
    });
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-lg bg-gray-800 animate-pulse">
            <div className="aspect-square" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-5 bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <Card key={product._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-200 group">
          <Link href={`/shop/${product.slug}`}>
            <div className="aspect-square bg-gray-800 relative overflow-hidden">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                  No Image
                </div>
              )}
              {product.featured && (
                <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">
                  Featured
                </span>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const inWishlist = isInWishlist(product._id);
                  if (inWishlist) {
                    removeFromWishlist(product._id);
                    toast.success("Removed from wishlist");
                  } else {
                    addToWishlist({
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0] || "/placeholder.jpg",
                      slug: product.slug,
                    });
                    toast.success("Added to wishlist");
                  }
                }}
                className="absolute top-2 left-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </button>
            </div>
          </Link>
          <CardContent className="p-3 md:p-4">
            <Link href={`/shop/${product.slug}`}>
              <h3 className="font-semibold text-sm md:text-base mb-1 hover:text-primary transition-colors line-clamp-2 leading-snug">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-400 mb-1 hidden sm:block">{product.category}</p>
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-xs text-orange-400 font-medium mb-1">Only {product.stock} left!</p>
            )}
            <div className="flex items-center justify-between gap-2 mt-2">
              <p className="text-base md:text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </p>
              <div className="flex gap-1 items-center">
                <Button
                  size="sm"
                  variant={isInCompare(product._id) ? "default" : "outline"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInCompare(product._id)) {
                      removeFromCompare(product._id);
                    } else {
                      addToCompare({
                        id: product._id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        image: product.images[0] || "",
                        category: product.category,
                        rating: (product as any).rating ?? 0,
                        stock: product.stock,
                      });
                      toast.success("Added to compare!");
                    }
                  }}
                  className="h-8 w-8 p-0 hidden sm:flex"
                  title="Compare"
                >
                  <GitCompare className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="h-8 px-3 text-xs shrink-0"
                >
                  <ShoppingCart className="h-3.5 w-3.5 sm:mr-1" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
            </div>
            {product.stock === 0 && (
              <p className="text-xs text-destructive mt-1">Out of Stock</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
