"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist-store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import toast from "react-hot-toast";

export default function WishlistPage() {
    const { items, removeItem } = useWishlistStore();
    const addToCart = useCartStore((state) => state.addItem);

    const handleAddToCart = (item: any) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        });
        toast.success("Added to cart!");
    };

    const handleRemove = (id: string) => {
        removeItem(id);
        toast.success("Removed from wishlist");
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Heart className="w-8 h-8 text-primary fill-primary" />
                        <h1 className="text-4xl font-bold">My Wishlist</h1>
                    </div>

                    {items.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                                <p className="text-gray-400 mb-6">
                                    Save your favorite products to buy them later
                                </p>
                                <Link href="/shop">
                                    <Button>Start Shopping</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <Card key={item.id} className="overflow-hidden group">
                                    <Link href={`/shop/${item.slug}`}>
                                        <div className="aspect-square bg-gray-800 relative">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                    <CardContent className="p-4">
                                        <Link href={`/shop/${item.slug}`}>
                                            <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-2xl font-bold text-primary mb-4">
                                            {formatPrice(item.price)}
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                className="flex-1"
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
