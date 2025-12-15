import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal, PayID, Revolut Pay, and Bank Transfer.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy on unopened items. Please see our Refund Policy page for more details.",
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, all our products are 100% authentic and sourced directly from authorized distributors.",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email that you can use to track your package.",
  },
];

export default function FAQsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
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

