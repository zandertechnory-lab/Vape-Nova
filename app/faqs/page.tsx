import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";
import JsonLd from "@/components/json-ld";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vape-nova-store.vercel.app";

export const metadata: Metadata = {
  title: "Frequently Asked Questions â€” Vaping, Shipping & Orders",
  description:
    "Find answers to common questions about VapeNova â€” payment methods, shipping times, international delivery, return policy, product authenticity, and order tracking.",
  alternates: { canonical: "/faqs" },
  openGraph: {
    title: "FAQs | VapeNova",
    description: "Answers to your questions about vaping products, shipping, returns, and more at VapeNova.",
    url: `${SITE_URL}/faqs`,
  },
};

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, PayID, Revolut Pay, and Bank Transfer. All transactions are processed securely.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days. Overnight shipping delivers the next business day.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. International orders typically take 10-21 business days.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on unopened items in original condition. Opened items may be returned within 14 days if defective. Please see our Refund Policy page for full details.",
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, all our products are 100% authentic and sourced directly from authorized distributors. We are an authorized Storz & Bickel retailer and stock only genuine CBDfx products.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also use our Track Order page at vapenovashop.com/track-order to check your order status at any time.",
  },
  {
    question: "What vaporizer brands do you carry?",
    answer: "We carry Storz & Bickel products including the Mighty+, Volcano Classic, Volcano Hybrid, and Crafty+ vaporizers â€” all 100% authentic with full manufacturer warranty.",
  },
  {
    question: "Is CBD vaping legal?",
    answer: "CBD vaping is legal in most countries including the UK, USA, and EU, provided the products contain less than the legal THC threshold (0.2% in UK/EU, 0.3% in USA). All our CBD products comply with applicable regulations.",
  },
  {
    question: "What is the difference between CBD vapes and regular vapes?",
    answer: "CBD vapes use CBD-infused e-liquid containing cannabidiol, a non-psychoactive compound from hemp. Regular vapes typically contain nicotine. CBD vapes produce no high â€” they're used for wellness purposes like stress relief, sleep support, and relaxation.",
  },
  {
    question: "Do you offer a warranty on vaporizers?",
    answer: "Yes. Storz & Bickel products include the manufacturer's warranty: 2 years on the Mighty+ and Crafty+, 3 years on Volcano devices. VapeNova also offers our own satisfaction guarantee.",
  },
  {
    question: "Are mushroom gummies legal?",
    answer: "Our mushroom gummies contain functional (non-psilocybin) mushroom extracts such as Lion's Mane, Reishi, Chaga, and Cordyceps. These are 100% legal dietary supplements available worldwide.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our support team via email at support@vapenova.com, through our live chat on the website, or by filling out the contact form on our Contact page. We respond within 24 hours on business days.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "FAQs", href: "/faqs" },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={faqSchema} />
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Breadcrumb items={breadcrumbs} />
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 mb-10 text-lg max-w-2xl">
          Everything you need to know about shopping at VapeNova â€” from payment and shipping to product authenticity and returns.
        </p>
        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

