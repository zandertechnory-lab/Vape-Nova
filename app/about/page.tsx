import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "About VapeNova - Our Story, Mission & Values",
  description:
    "Learn about VapeNova - your trusted online vape shop. We curate premium vapes, Storz & Bickel vaporizers, CBD products, and mushroom gummies with a commitment to quality and customer satisfaction.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About VapeNova - Our Story, Mission & Values",
    description:
      "Learn about VapeNova - your trusted online vape shop selling premium vapes, vaporizers, and CBD products.",
    url: `${SITE_URL}/about`,
    images: [{ url: "/images/hero/vaping-person.png", width: 1200, height: 630, alt: "About VapeNova" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VapeNova",
  url: SITE_URL,
  description:
    "VapeNova is a premium online vape shop offering authentic vapes, Storz & Bickel vaporizers, CBD vape pens, and functional mushroom gummies.",
  email: "support@vapenova.com",
  foundingDate: "2023",
  knowsAbout: ["vaping", "vaporizers", "CBD vapes", "dry herb vaporizers", "mushroom gummies"],
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={organizationSchema} />
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src="/images/hero/vaping-person.png"
          alt="VapeNova - Premium Vaping Experience"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
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

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={breadcrumbs} />

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
                us a trusted name in the vaping community. We are constantly expanding
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
                We stock only 100% authentic products from authorized distributors,
                so you can shop with complete confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Why Choose VapeNova?</h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>100% Authentic Products</strong> - sourced directly from authorized distributors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>Fast &amp; Reliable Shipping</strong> - standard, express, and overnight options available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>Expert Customer Support</strong> - real people who know vaping, ready to help</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>Competitive Prices</strong> - premium products without the premium markup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>Wide Selection</strong> - vapes, vaporizers, CBD products, and mushroom gummies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">&#10003;</span>
                  <span><strong>30-Day Returns</strong> - shop risk-free with our hassle-free return policy</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Link href="/shop">
              <Button size="lg">Browse Our Products</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
