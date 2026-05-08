import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "Shipping Information - Delivery Times & Costs",
  description:
    "Learn about VapeNova shipping options: standard (5-7 days), express (2-3 days), and overnight delivery. International shipping available to most countries.",
  alternates: { canonical: "/shipping" },
  openGraph: {
    title: "Shipping Information | VapeNova",
    description: "VapeNova shipping options, delivery times, costs, and international shipping details.",
    url: `${SITE_URL}/shipping`,
  },
};

const shippingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Shipping Information - VapeNova",
  url: `${SITE_URL}/shipping`,
  description: "Shipping options, delivery times, and costs for VapeNova orders.",
  publisher: {
    "@type": "Organization",
    name: "VapeNova",
    url: SITE_URL,
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Shipping Information", href: "/shipping" },
];

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={shippingSchema} />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
        <p className="text-gray-400 mb-8 text-lg max-w-2xl">
          We offer multiple shipping options to get your order to you as quickly as possible, anywhere in the world.
        </p>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="bg-primary/20 rounded-lg p-3 flex-shrink-0">
                    <span className="text-2xl">&#128230;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Standard Shipping</h3>
                    <p className="text-gray-300">5-7 business days &middot; <strong className="text-primary">$10.00</strong></p>
                    <p className="text-gray-400 text-sm mt-1">Tracked delivery with email updates. Free on orders over $50.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 pb-4 border-b border-gray-800">
                  <div className="bg-primary/20 rounded-lg p-3 flex-shrink-0">
                    <span className="text-2xl">&#9889;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Express Shipping</h3>
                    <p className="text-gray-300">2-3 business days &middot; <strong className="text-primary">$25.00</strong></p>
                    <p className="text-gray-400 text-sm mt-1">Priority tracked delivery. Order by 2pm for same-day dispatch.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 rounded-lg p-3 flex-shrink-0">
                    <span className="text-2xl">&#128640;</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Overnight Shipping</h3>
                    <p className="text-gray-300">Next business day &middot; <strong className="text-primary">$50.00</strong></p>
                    <p className="text-gray-400 text-sm mt-1">Guaranteed next-day delivery. Order by 12pm for same-day dispatch.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
              <p className="text-gray-300 mb-4">
                We ship to most countries worldwide. International shipping times vary by location
                and typically take 10-21 business days. All international orders are fully tracked.
              </p>
              <p className="text-gray-300 mb-4">
                International shipping costs are calculated at checkout based on your location and order weight.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Note:</strong> International customers are responsible for any customs duties or import taxes applicable in their country.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-gray-300 mb-4">
                Once your order ships, you will receive a confirmation email with your tracking number.
                Use our <Link href="/track-order" className="text-primary hover:underline">Track Order</Link> page
                to check your delivery status at any time.
              </p>
              <p className="text-gray-300">
                Orders are typically processed and dispatched within 1-2 business days of payment confirmation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Packaging</h2>
              <p className="text-gray-300">
                All orders are packed securely in plain, discreet packaging. There is no branding visible on the outside of the box - your privacy is important to us.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
