"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Copy, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [transactionId, setTransactionId] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const id = searchParams.get("transactionId");
        if (!id) {
            router.push("/");
            return;
        }
        setTransactionId(id);
    }, [searchParams, router]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transactionId);
        setCopied(true);
        toast.success("Transaction ID copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    if (!transactionId) {
        return null;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-2xl mx-auto">
                    {/* Success Message */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
                        <p className="text-gray-400 text-lg">
                            Thank you for your purchase
                        </p>
                    </div>

                    {/* Transaction ID Card */}
                    <Card className="mb-6 border-2 border-primary/50">
                        <CardHeader>
                            <CardTitle className="text-center">Your Transaction ID</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                                        <p className="text-2xl font-mono font-bold text-primary">
                                            {transactionId}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={copyToClipboard}
                                        className="shrink-0"
                                    >
                                        <Copy className={`w-4 h-4 ${copied ? 'text-green-500' : ''}`} />
                                    </Button>
                                </div>
                                <p className="text-sm text-gray-400 mt-4">
                                    Save this ID to track your order. We've also sent it to your email.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* What's Next */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>What's Next?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full shrink-0">
                                    <span className="font-bold text-primary">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Order Confirmation Email</h3>
                                    <p className="text-sm text-gray-400">
                                        You'll receive an email with your order details and transaction ID.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full shrink-0">
                                    <span className="font-bold text-primary">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Order Processing</h3>
                                    <p className="text-sm text-gray-400">
                                        We'll process your order and prepare it for shipment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full shrink-0">
                                    <span className="font-bold text-primary">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Shipping Updates</h3>
                                    <p className="text-sm text-gray-400">
                                        You'll receive email updates when your order ships and is delivered.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href={`/track-order?id=${transactionId}`}>
                            <Button className="w-full" size="lg">
                                <Package className="w-4 h-4 mr-2" />
                                Track Your Order
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button variant="outline" className="w-full" size="lg">
                                Continue Shopping
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Need help? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
