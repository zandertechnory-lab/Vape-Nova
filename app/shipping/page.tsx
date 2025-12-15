import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>
        <div className="max-w-4xl space-y-6">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Standard Shipping</h3>
                  <p className="text-gray-300">
                    5-7 business days • $10.00
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Express Shipping</h3>
                  <p className="text-gray-300">
                    2-3 business days • $25.00
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Overnight Shipping</h3>
                  <p className="text-gray-300">
                    Next business day • $50.00
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
              <p className="text-gray-300 mb-4">
                We ship to most countries worldwide. International shipping times vary by location
                and typically take 10-21 business days.
              </p>
              <p className="text-gray-300">
                International shipping costs are calculated at checkout based on your location.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-gray-300">
                Once your order ships, you'll receive a tracking number via email. You can use
                this number to track your package's progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

