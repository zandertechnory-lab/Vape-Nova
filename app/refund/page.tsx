import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <div className="max-w-4xl">
          <Card>
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">30-Day Return Policy</h2>
                <p className="text-gray-300">
                  We offer a 30-day return policy on unopened items in their original packaging.
                  Items must be in new, unused condition.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">How to Return</h2>
                <p className="text-gray-300">
                  To initiate a return, please contact our customer service team with your order
                  number. We will provide you with a return authorization and shipping instructions.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
                <p className="text-gray-300">
                  Once we receive and inspect your returned item, we will process your refund
                  within 5-10 business days. Refunds will be issued to the original payment method.
                </p>
              </section>
              <section>
                <h2 className="text-2xl font-bold mb-4">Non-Refundable Items</h2>
                <p className="text-gray-300">
                  Opened items, items without original packaging, and items damaged by misuse are
                  not eligible for return.
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

