import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HomeContent from "@/components/home-content";
import JsonLd from "@/components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "VapeNova | Premium Vapes, Vaporizers & Gummies Online",
  description:
    "Shop premium vapes, Mighty & Volcano vaporizers, CBD vape pens, and mushroom gummies at VapeNova. Free shipping on orders over $50. 100% authentic products, top brands.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VapeNova | Premium Vapes, Vaporizers & Gummies Online",
    description:
      "Shop premium vapes, Mighty & Volcano vaporizers, CBD vape pens, and mushroom gummies. Free shipping over $50.",
    url: SITE_URL,
    images: [{ url: "/images/hero/vaping-lifestyle.png", width: 1200, height: 630, alt: "VapeNova Premium Vaping" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VapeNova",
  url: SITE_URL,
  logo: `${SITE_URL}/images/hero/vaping-lifestyle.png`,
  description: "Premium online vape shop selling vapes, vaporizers, CBD vape pens, and mushroom gummies.",
  email: "support@vapenova.com",
  sameAs: [
    "https://instagram.com/vapenovashop",
    "https://facebook.com/vapenovashop",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VapeNova",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?search={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <Navbar />
      <HomeContent />
      <Footer />
    </div>
  );
}

