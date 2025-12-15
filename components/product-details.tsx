"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  stock: number;
  rating: number;
  numReviews: number;
  variants?: Array<{ name: string; price: number; stock: number }>;
}

export default function ProductDetails({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const currentPrice = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.price || product.price
    : product.price;

  const currentStock = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.stock || product.stock
    : product.stock;

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      image: product.images[0] || "/placeholder.jpg",
      price: currentPrice,
      variant: selectedVariant || undefined,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="sticky top-24">
          <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">
              ({product.numReviews} reviews)
            </span>
          </div>
          <p className="text-3xl font-bold text-primary mb-6">
            {formatPrice(currentPrice)}
          </p>
          <p className="text-gray-300 mb-6">{product.description}</p>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Variants</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.name}
                    variant={selectedVariant === variant.name ? "default" : "outline"}
                    onClick={() => setSelectedVariant(variant.name)}
                    disabled={variant.stock === 0}
                  >
                    {variant.name} - {formatPrice(variant.price)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className="flex-1"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Category:</span> {product.category}
            </p>
            <p>
              <span className="font-medium">Subcategory:</span> {product.subcategory}
            </p>
            <p>
              <span className="font-medium">Stock:</span>{" "}
              {currentStock > 0 ? `${currentStock} available` : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
        </CardContent>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Link key={related._id} href={`/shop/${related.slug || related._id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gray-800 relative">
                    {related.images[0] ? (
                      <Image
                        src={related.images[0]}
                        alt={related.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{related.name}</h3>
                    <p className="text-xl font-bold text-primary">
                      {formatPrice(related.price)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

