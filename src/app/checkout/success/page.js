"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Printer } from 'lucide-react';
import Button from '@/components/Button';
import { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const transactionId = searchParams.get('id');
    const total = searchParams.get('total');

    if (!transactionId) {
        return (
            <div className="text-center">
                <p>Invalid order details.</p>
                <Button onClick={() => router.push('/')}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto bg-card p-8 rounded-2xl shadow-xl border border-border text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
                Thank you for your purchase. Your order has been received and is being processed.
            </p>

            <div className="bg-muted p-6 rounded-xl mb-8 text-left">
                <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
                <div className="flex items-center justify-between mb-4">
                    <code className="text-lg font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded">
                        {transactionId}
                    </code>
                    <button
                        onClick={() => window.print()}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        title="Print Receipt"
                    >
                        <Printer size={18} />
                    </button>
                </div>

                {total && (
                    <>
                        <div className="h-px bg-border my-4"></div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total Amount</span>
                            <span className="font-bold text-lg">${total}</span>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    variant="outline"
                    onClick={() => router.push('/track-order')}
                >
                    Track Order
                </Button>
                <Button
                    variant="primary"
                    onClick={() => router.push('/shop')}
                    className="flex items-center gap-2"
                >
                    Continue Shopping <ArrowRight size={16} />
                </Button>
            </div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <div className="container py-20 min-h-[80vh] flex items-center justify-center">
            <Suspense fallback={<p>Loading order details...</p>}>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
