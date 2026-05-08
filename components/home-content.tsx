import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSlider from "@/components/hero-slider";

export default function HomeContent() {
  return (
    <>
      <HeroSlider />

      {/* Lifestyle Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-72 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/vaping-lifestyle.png"
                alt="Premium Vaping Experience at VapeNova"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="space-y-5">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent leading-tight">
                Experience Premium Vaping
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Discover the ultimate vaping experience with our curated selection of premium devices. From sleek vape pens to powerful vaporizers, we offer only the finest quality products.
              </p>
              <p className="text-base text-gray-400">
                Our collection features industry-leading brands like Mighty, Volcano, and Crafty — designed for those who demand excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/50">Shop Collection</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2">Our Story</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: "Vapes", subcategories: ["CBD Vapes", "STHL Vapes"], href: "/shop?category=Vapes" },
              { name: "Vaporizers", subcategories: ["Mighty Vaporizers"], href: "/shop?category=Vaporizers" },
              { name: "Gummies", subcategories: ["Mushroom Edibles"], href: "/shop?category=Gummies" },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="h-full hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-200 cursor-pointer group">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <ul className="space-y-1">
                      {category.subcategories.map((sub) => (
                        <li key={sub} className="text-gray-400 text-sm">{sub}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Bestsellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-square bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                    Product Image
                  </div>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-1">Product {item}</h3>
                  <p className="text-base md:text-xl font-bold text-primary">$99.99</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">New Arrivals</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-shadow duration-200">
              <div className="aspect-square bg-gradient-to-br from-cyan-900/20 to-blue-900/20 relative">
                <Image
                  src="/images/products/arctic-menthol.png"
                  alt="Arctic Menthol E Liquid 10ml — VapeNova"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-4"
                />
              </div>
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold text-sm md:text-base mb-1">Arctic Menthol E Liquid</h3>
                <p className="text-base md:text-xl font-bold text-primary">$10.00</p>
              </CardContent>
            </Card>

            {[2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="aspect-square bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                    Product Image
                  </div>
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base mb-1">New Product {item}</h3>
                  <p className="text-base md:text-xl font-bold text-primary">$129.99</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20 border-2 border-primary/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3">Special Promotion</h2>
              <p className="text-base sm:text-xl mb-6 text-gray-300">Get 20% off on all vaporizers this month!</p>
              <Link href="/shop?category=Vaporizers">
                <Button size="lg" className="text-base">Shop Vaporizers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Subscribe to Our Newsletter</h2>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">Get the latest updates on new products and exclusive offers.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-sm"
                />
                <Button type="submit" className="w-full sm:w-auto">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
