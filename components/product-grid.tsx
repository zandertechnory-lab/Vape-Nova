"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
    return <div className="text-center py-12">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-12">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <Link href={`/shop/${product.slug}`}>
              <div className="aspect-square bg-gray-800 relative overflow-hidden">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    priority={index < 8}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                    No Image
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-1 right-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-bold">
                    Featured
                  </div>
                )}
                {/* Wishlist Heart Button */}
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
                  className="absolute top-1 left-1 sm:top-2 sm:left-2 p-1.5 sm:p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all z-10"
                >
                  <Heart
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist(product._id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                      }`}
                  />
                </button>
              </div>
            </Link>
            <CardContent className="p-2 sm:p-3 md:p-4">
              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              <p className="text-[10px] sm:text-xs text-gray-400 mb-1 sm:mb-2 hidden sm:block">
                {product.category}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                <p className="text-sm sm:text-lg md:text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </p>
                <Button
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full sm:w-auto text-[10px] sm:text-xs h-7 sm:h-8 px-2 sm:px-3"
                >
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </div>
              {product.stock === 0 && (
                <p className="text-[10px] sm:text-xs text-destructive mt-1 sm:mt-2">Out of Stock</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

