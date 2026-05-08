"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useCompareStore } from "@/store/compare-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingCart, Star, Plus, Minus, GitCompare,
  Share2, Check, ZoomIn, X
} from "lucide-react";
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
  slug?: string;
  variants?: Array<{ name: string; price: number; stock: number }>;
}

interface Review {
  _id: string;
  user: { name: string };
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
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
  const [quantity, setQuantity] = useState(1);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", comment: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompareStore();
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addItem);
  const recentlyViewed = useRecentlyViewedStore((state) => state.items);
  const { user } = useUser();
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const currentPrice = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.price ?? product.price
    : product.price;

  const currentStock = selectedVariant
    ? product.variants?.find((v) => v.name === selectedVariant)?.stock ?? product.stock
    : product.stock;

  // Track recently viewed
  useEffect(() => {
    addToRecentlyViewed({
      id: product._id,
      name: product.name,
      slug: product.slug || product._id,
      price: product.price,
      image: product.images[0] || "",
    });
  }, [product._id]);

  // Fetch reviews
  useEffect(() => {
    fetch(`/api/reviews?productId=${product._id}`)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews || []))
      .finally(() => setReviewsLoading(false));
  }, [product._id]);

  // Sticky add-to-cart on scroll
  useEffect(() => {
    const onScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setShowSticky(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      image: product.images[0] || "/placeholder.jpg",
      price: currentPrice,
      quantity,
      variant: selectedVariant || undefined,
    });
    toast.success(`${quantity > 1 ? `${quantity}x ` : ""}Added to cart!`);
  };

  const handleCompare = () => {
    if (isInCompare(product._id)) {
      removeFromCompare(product._id);
      toast("Removed from compare");
    } else {
      addToCompare({
        id: product._id,
        name: product.name,
        slug: product.slug || product._id,
        price: product.price,
        image: product.images[0] || "",
        category: product.category,
        rating: product.rating,
        stock: product.stock,
      });
      toast.success("Added to compare!");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied!");
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Sign in to leave a review"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, ...reviewForm }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error); return; }
      setReviews([data.review, ...reviews]);
      setReviewForm({ rating: 5, title: "", comment: "" });
      setShowReviewForm(false);
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredRecent = recentlyViewed.filter((r) => r.id !== product._id).slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white" onClick={() => setZoomedImage(null)}>
            <X className="h-8 w-8" />
          </button>
          <div className="relative w-full max-w-2xl aspect-square">
            <Image src={zoomedImage} alt={product.name} fill className="object-contain" />
          </div>
        </div>
      )}

      {/* Sticky mobile Add to Cart */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t p-3 flex items-center gap-3 md:hidden shadow-2xl">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{product.name}</p>
            <p className="text-primary font-bold">{formatPrice(currentPrice)}</p>
          </div>
          <Button onClick={handleAddToCart} disabled={currentStock === 0} size="sm">
            <ShoppingCart className="h-4 w-4 mr-1" />
            {currentStock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div ref={stickyRef} className="lg:sticky lg:top-24 space-y-3">
          <div
            className="aspect-square bg-gray-800 rounded-xl overflow-hidden relative cursor-zoom-in group"
            onClick={() => setZoomedImage(product.images[selectedImage])}
          >
            {product.images[selectedImage] ? (
              <>
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-3 right-3 bg-black/50 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-gray-500"
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={100} height={100} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-primary font-medium mb-1">{product.category} › {product.subcategory}</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
              ))}
            </div>
            <span className="text-sm text-gray-400">
              {product.rating > 0 ? `${product.rating.toFixed(1)} · ` : ""}{product.numReviews} {product.numReviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          <p className="text-3xl font-bold text-primary">{formatPrice(currentPrice)}</p>

          {/* Stock badge */}
          <div>
            {currentStock > 0 ? (
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${
                currentStock <= 5 ? "bg-orange-500/20 text-orange-400" : "bg-green-500/20 text-green-400"
              }`}>
                <Check className="h-3.5 w-3.5" />
                {currentStock <= 5 ? `Only ${currentStock} left!` : "In Stock"}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                <X className="h-3.5 w-3.5" /> Out of Stock
              </span>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-2">Choose Variant</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <Button
                    key={variant.name}
                    variant={selectedVariant === variant.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(variant.name)}
                    disabled={variant.stock === 0}
                  >
                    {variant.name} — {formatPrice(variant.price)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to Cart */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold">Qty:</label>
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-800 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-800 transition-colors"
                  disabled={quantity >= currentStock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={currentStock === 0}
                className="flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {currentStock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant={isInCompare(product._id) ? "default" : "outline"}
                onClick={handleCompare}
                title="Compare"
              >
                <GitCompare className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare} title="Share">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="border border-gray-800 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Category</span><span>{product.category}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Subcategory</span><span>{product.subcategory}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Free shipping</span><span className="text-green-400">On orders over $50</span></div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {user && !showReviewForm && (
            <Button onClick={() => setShowReviewForm(true)} size="sm">Write a Review</Button>
          )}
          {!user && (
            <Link href="/sign-in">
              <Button variant="outline" size="sm">Sign in to Review</Button>
            </Link>
          )}
        </div>

        {showReviewForm && (
          <Card className="mb-6">
            <CardContent className="p-5">
              <h3 className="font-semibold mb-4">Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })}>
                        <Star className={`h-7 w-7 transition-colors ${star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600 hover:text-yellow-400"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Summarize your experience"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Review</label>
                  <textarea
                    className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell other customers what you think..."
                    rows={4}
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                    maxLength={1000}
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {reviewsLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />)}
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review._id}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-semibold text-sm">{(review as any).userName || "Customer"}</p>
                      <div className="flex mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">
                      {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <p className="font-medium text-sm mb-1">{review.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <Star className="h-10 w-10 mx-auto mb-3 text-gray-700" />
              <p className="text-gray-400">No reviews yet. Be the first!</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-5">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((related) => (
              <Link key={related._id} href={`/shop/${related.slug || related._id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-200 group">
                  <div className="aspect-square bg-gray-800 relative overflow-hidden">
                    {related.images[0] ? (
                      <Image
                        src={related.images[0]}
                        alt={related.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{related.name}</h3>
                    <p className="font-bold text-primary">{formatPrice(related.price)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {filteredRecent.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-5">Recently Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredRecent.map((item) => (
              <Link key={item.id} href={`/shop/${item.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
                  <div className="aspect-square bg-gray-800 relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">No Image</div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
                    <p className="font-bold text-primary text-sm">{formatPrice(item.price)}</p>
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
