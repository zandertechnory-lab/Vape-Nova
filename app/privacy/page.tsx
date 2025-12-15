import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="max-w-4xl">
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-gray-300">
                  We collect information that you provide directly to us, including when you create
                  an account, make a purchase, or contact us for support.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-300">
                  We use the information we collect to process transactions, send you updates about
                  your orders, and improve our services.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-gray-300">
                  We do not sell, trade, or rent your personal information to third parties. We
                  may share information only as necessary to process your orders and provide our
                  services.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-gray-300">
                  We implement appropriate security measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
                <p className="text-gray-300">
                  You have the right to access, update, or delete your personal information at any
                  time by contacting us or accessing your account settings.
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

