"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSlider from "@/components/hero-slider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Lifestyle Vaping Section with Uploaded Image */}
      <section className="relative py-20 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/hero/vaping-lifestyle.png"
                alt="Premium Vaping Experience"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Experience Premium Vaping
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover the ultimate vaping experience with our curated selection of premium devices. From sleek vape pens to powerful vaporizers, we offer only the finest quality products.
              </p>
              <p className="text-lg text-gray-400">
                Our collection features industry-leading brands like Mighty, Volcano, and Crafty - designed for those who demand excellence in every puff.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/shop">
                  <Button size="lg" className="shadow-lg shadow-primary/50">
                    Shop Collection
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-2">
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Vapes", subcategories: ["CBD Vapes", "STHL Vapes"], href: "/shop?category=Vapes" },
              { name: "Vaporizers", subcategories: ["Mighty Vaporizers"], href: "/shop?category=Vaporizers" },
              { name: "Gummies", subcategories: ["Mushroom Edibles"], href: "/shop?category=Gummies" },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={category.href}>
                  <Card className="h-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <ul className="space-y-2">
                        {category.subcategories.map((sub) => (
                          <li key={sub} className="text-gray-400">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Bestsellers</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                      Product Image
                    </div>
                  </div>
                  <CardContent className="p-2 sm:p-3 md:p-4">
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">Product {item}</h3>
                    <p className="text-sm sm:text-lg md:text-2xl font-bold text-primary">$99.99</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">New Arrivals</h2>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {/* Product 1 - Arctic Menthol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
                <div className="aspect-square bg-gradient-to-br from-cyan-900/20 to-blue-900/20 relative">
                  <Image
                    src="/images/products/arctic-menthol.png"
                    alt="Arctic Menthol E Liquid"
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 25vw, (max-width: 1024px) 25vw, 25vw"
                    className="object-contain p-4"
                  />
                </div>
                <CardContent className="p-2 sm:p-3 md:p-4">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">Arctic Menthol E Liquid</h3>
                  <p className="text-sm sm:text-lg md:text-2xl font-bold text-primary">$10.00</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Products 2-4 - Placeholder */}
            {[2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                      Product Image
                    </div>
                  </div>
                  <CardContent className="p-2 sm:p-3 md:p-4">
                    <h3 className="font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">New Product {item}</h3>
                    <p className="text-sm sm:text-lg md:text-2xl font-bold text-primary">$129.99</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-neon-purple/20 via-neon-pink/20 to-neon-cyan/20 border-2 border-primary/50">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">Special Promotion</h2>
              <p className="text-xl mb-6">Get 20% off on all vaporizers this month!</p>
              <Link href="/shop?category=Vaporizers">
                <Button size="lg" className="text-lg">
                  Shop Vaporizers
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-400 mb-6">Get the latest updates on new products and exclusive offers.</p>
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

