import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";
import ContactForm from "@/components/contact-form";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "Contact VapeNova - Get in Touch with Our Team",
  description:
    "Contact the VapeNova team for help with orders, product questions, or general enquiries. Email us at support@vapenova.com or use our contact form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact VapeNova",
    description: "Get in touch with the VapeNova team for product support, order help, or general questions.",
    url: `${SITE_URL}/contact`,
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact VapeNova",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: "VapeNova",
    email: "support@vapenova.com",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@vapenova.com",
      contactType: "customer support",
      availableLanguage: "English",
      hoursAvailable: "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
    },
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={contactSchema} />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 mb-8 text-lg">
          Have a question about an order, product, or anything else? We are here to help.
        </p>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
