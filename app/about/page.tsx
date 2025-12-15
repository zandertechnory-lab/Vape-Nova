import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Vaping Person Image */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/hero/vaping-person.png"
          alt="VapeNova - Premium Vaping Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent drop-shadow-2xl">
              About VapeNova
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
              Your trusted source for premium vaping products and exceptional experiences
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">About VapeNova</h1>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-300 mb-4">
                VapeNova was founded with a mission to provide premium vaping products
                to enthusiasts around the world. We carefully curate our selection to
                ensure only the highest quality products reach our customers.
              </p>
              <p className="text-gray-300">
                Our commitment to excellence, customer service, and innovation has made
                us a trusted name in the vaping community. We're constantly expanding
                our product range to include the latest and greatest in vaping technology.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-300">
                To provide exceptional vaping products and experiences while maintaining
                the highest standards of quality, safety, and customer satisfaction.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
              <ul className="space-y-2 text-gray-300">
                <li>• Premium quality products</li>
                <li>• Fast and reliable shipping</li>
                <li>• Excellent customer support</li>
                <li>• Competitive prices</li>
                <li>• Wide selection of products</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

