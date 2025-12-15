import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductGrid from "@/components/product-grid";
import FilterSidebar from "@/components/filter-sidebar";
import { Button } from "@/components/ui/button";

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; subcategory?: string; search?: string };
}) {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Category Banners with Neon Backgrounds */}
      <section className="relative w-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 py-12 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Vapes Category - with Mighty vaporizer image */}
            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/mighty-vaporizer.jpg"
                alt="Mighty Vaporizer with Neon Smoke"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Vapes</h3>
                <p className="text-white/90 text-center mb-4">Premium CBD & STHL Vapes</p>
                <Link href="/shop?category=Vapes">
                  <Button className="shadow-lg shadow-primary/50">Explore Vapes</Button>
                </Link>
              </div>
            </div>

            {/* Vaporizers Category - with Volcano vaporizer image */}
            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/volcano-vaporizer.jpg"
                alt="Volcano Vaporizer with Neon Background"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Vaporizers</h3>
                <p className="text-white/90 text-center mb-4">Mighty Premium Devices</p>
                <Link href="/shop?category=Vaporizers">
                  <Button className="shadow-lg shadow-pink-500/50">Explore Vaporizers</Button>
                </Link>
              </div>
            </div>

            {/* Gummies Category - with generated image */}
            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/gummies.png"
                alt="Premium Gummies with Neon Background"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Gummies</h3>
                <p className="text-white/90 text-center mb-4">Mushroom Edibles</p>
                <Link href="/shop?category=Gummies">
                  <Button className="shadow-lg shadow-cyan-500/50">Explore Gummies</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>
          <main className="flex-1">
            <h1 className="text-4xl font-bold mb-8">Shop</h1>
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid
                category={searchParams.category}
                subcategory={searchParams.subcategory}
                search={searchParams.search}
              />
            </Suspense>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

