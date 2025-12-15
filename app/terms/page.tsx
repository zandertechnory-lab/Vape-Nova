import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="max-w-4xl">
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-300">
                  By accessing and using VapeNova, you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-gray-300">
                  Permission is granted to temporarily use VapeNova for personal, non-commercial
                  transitory viewing only.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
                <p className="text-gray-300">
                  We strive to provide accurate product information, but we do not warrant that
                  product descriptions or other content is accurate, complete, reliable, current,
                  or error-free.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Pricing</h2>
                <p className="text-gray-300">
                  All prices are subject to change without notice. We reserve the right to modify
                  prices at any time.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                <p className="text-gray-300">
                  VapeNova shall not be liable for any indirect, incidental, special, consequential,
                  or punitive damages resulting from your use of or inability to use the service.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

