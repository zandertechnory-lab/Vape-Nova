import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProductGrid from "@/components/product-grid";
import FilterSidebar from "@/components/filter-sidebar";
import Breadcrumb from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";

const categoryMeta: Record<string, { title: string; description: string }> = {
  Vapes: {
    title: "Buy CBD Vapes & STHL Vape Pens Online",
    description:
      "Shop premium CBD vapes, STHL vape pens, and e-liquids at VapeNova. Lab-tested, 100% authentic. Free shipping on orders over $50.",
  },
  Vaporizers: {
    title: "Buy Premium Vaporizers Online — Mighty, Volcano & Crafty",
    description:
      "Shop Storz & Bickel vaporizers including Mighty+, Volcano Classic, and Crafty+. Authorized retailer. Free shipping available.",
  },
  Gummies: {
    title: "Buy Mushroom Gummies & Edibles Online",
    description:
      "Shop premium mushroom edibles and functional gummies at VapeNova. Natural, lab-tested ingredients. Fast discreet shipping.",
  },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string };
}): Promise<Metadata> {
  const cat = searchParams.category;
  const meta = cat && categoryMeta[cat] ? categoryMeta[cat] : null;

  return {
    title: meta ? meta.title : "Shop Premium Vapes, Vaporizers & Gummies",
    description: meta
      ? meta.description
      : "Browse our full collection of CBD vapes, Mighty & Volcano vaporizers, and mushroom gummies. Filter by category, compare prices, free shipping available.",
    alternates: {
      canonical: cat ? `/shop?category=${cat}` : "/shop",
    },
    openGraph: {
      title: meta ? meta.title : "Shop | VapeNova",
      description: meta ? meta.description : "Premium vapes, vaporizers, and gummies at VapeNova.",
      images: [{ url: "/images/categories/mighty-vaporizer.jpg", width: 1200, height: 630 }],
    },
  };
}

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; subcategory?: string; search?: string };
}) {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    ...(searchParams.category ? [{ name: searchParams.category, href: `/shop?category=${searchParams.category}` }] : []),
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Category Banners */}
      <section className="relative w-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 py-12 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/mighty-vaporizer.jpg"
                alt="Premium CBD Vapes and STHL Vape Pens"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Vapes</h3>
                <p className="text-white/90 text-center mb-4">Premium CBD &amp; STHL Vapes</p>
                <Link href="/shop?category=Vapes">
                  <Button className="shadow-lg shadow-primary/50">Explore Vapes</Button>
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/volcano-vaporizer.jpg"
                alt="Mighty and Volcano Premium Dry Herb Vaporizers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Vaporizers</h3>
                <p className="text-white/90 text-center mb-4">Mighty, Volcano &amp; Crafty Devices</p>
                <Link href="/shop?category=Vaporizers">
                  <Button className="shadow-lg shadow-pink-500/50">Explore Vaporizers</Button>
                </Link>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer">
              <Image
                src="/images/categories/gummies.png"
                alt="Premium Mushroom Gummies and Functional Edibles"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 backdrop-blur-sm bg-black/20 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Gummies</h3>
                <p className="text-white/90 text-center mb-4">Premium Mushroom Edibles</p>
                <Link href="/shop?category=Gummies">
                  <Button className="shadow-lg shadow-cyan-500/50">Explore Gummies</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={breadcrumbs} />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>
          <main className="flex-1">
            <h1 className="text-4xl font-bold mb-8">
              {searchParams.category ? `${searchParams.category}` : "All Products"}
            </h1>
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
