"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Copy, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

function OrderConfirmationContent() {
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
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-gray-400 text-lg">Thank you for your purchase</p>
            </div>

            <Card className="mb-6 border-2 border-primary/50">
                <CardHeader>
                    <CardTitle className="text-center">Your Transaction ID</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                                <p className="text-2xl font-mono font-bold text-primary">{transactionId}</p>
                            </div>
                            <Button variant="outline" size="icon" onClick={copyToClipboard} className="shrink-0">
                                <Copy className={`w-4 h-4 ${copied ? "text-green-500" : ""}`} />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">
                            Save this ID to track your order. We&apos;ve also sent it to your email.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>What&apos;s Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { num: 1, title: "Order Confirmation Email", desc: "You'll receive an email with your order details and transaction ID." },
                        { num: 2, title: "Order Processing", desc: "We'll process your order and prepare it for shipment." },
                        { num: 3, title: "Shipping Updates", desc: "You'll receive email updates when your order ships and is delivered." },
                    ].map(({ num, title, desc }) => (
                        <div key={num} className="flex gap-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full shrink-0">
                                <span className="font-bold text-primary">{num}</span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">{title}</h3>
                                <p className="text-sm text-gray-400">{desc}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

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

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                    Need help? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
                </p>
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <Suspense fallback={<div className="h-96 animate-pulse bg-gray-800 rounded max-w-2xl mx-auto" />}>
                    <OrderConfirmationContent />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
}
