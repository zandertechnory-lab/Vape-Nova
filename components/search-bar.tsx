"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface SearchResult {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: string[];
    category: string;
    subcategory: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const searchProducts = async () => {
            if (query.trim().length < 2) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.products || []);
                setIsOpen(true);
            } catch (error) {
                console.error("Search error:", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(searchProducts, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setIsOpen(false);
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-10"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {loading ? (
                        <div className="p-4 text-center text-gray-400">Searching...</div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            {results.map((product) => (
                                <Link
                                    key={product._id}
                                    href={`/shop/${product.slug}`}
                                    onClick={handleResultClick}
                                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-gray-800 rounded relative flex-shrink-0">
                                        {product.images[0] ? (
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                sizes="48px"
                                                className="object-cover rounded"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                                                No img
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{product.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {product.category} • {product.subcategory}
                                        </p>
                                    </div>
                                    <p className="font-bold text-primary text-sm">
                                        {formatPrice(product.price)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : query.trim().length >= 2 ? (
                        <div className="p-4 text-center text-gray-400">
                            No products found for "{query}"
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
