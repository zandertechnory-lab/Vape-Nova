"use client";

import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate tracking lookup
        setStatus('searching');
        setTimeout(() => {
            setStatus('found');
        }, 1500);
    };

    return (
        <div className="container py-20 min-h-[60vh]">
            <div className="max-w-md mx-auto bg-card p-8 rounded-xl shadow-lg border border-border">
                <h1 className="text-3xl font-bold mb-2 text-center">Track Your Order</h1>
                <p className="text-muted-foreground text-center mb-8">
                    Enter your order details below to check the status of your shipment.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Order ID"
                        placeholder="e.g. VF-12345"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Button variant="primary" size="lg" className="w-full">
                        {status === 'searching' ? 'Locating Order...' : 'Track Order'}
                    </Button>
                </form>

                {status === 'found' && (
                    <div className="mt-8 p-4 bg-muted rounded-lg border border-border animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold">Order #{orderId}</span>
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">Processing</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                <p className="text-sm">Order Confirmed</p>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                                <p className="text-sm">Shipped</p>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                                <p className="text-sm">Out for Delivery</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
