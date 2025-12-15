"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import OrderStatusTimeline from "@/components/order-status-timeline";
import OrderStatusBadge from "@/components/order-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, MapPin, Calendar, Truck } from "lucide-react";
import toast from "react-hot-toast";

export default function TrackOrderPage() {
    const searchParams = useSearchParams();
    const [transactionId, setTransactionId] = useState(searchParams.get("id") || "");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!transactionId.trim()) {
            toast.error("Please enter a transaction ID");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/track-order?id=${transactionId}`);
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Order not found");
                setOrder(null);
                return;
            }

            setOrder(data.order);
            toast.success("Order found!");
        } catch (error) {
            toast.error("Failed to track order");
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
                        <p className="text-gray-400">
                            Enter your transaction ID to track your order status
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <form onSubmit={handleTrackOrder} className="flex gap-4">
                                <div className="flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Enter Transaction ID (e.g., VN-20231215-A1B2C)"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        className="w-full"
                                    />
                                </div>
                                <Button type="submit" disabled={loading}>
                                    <Search className="w-4 h-4 mr-2" />
                                    {loading ? "Tracking..." : "Track Order"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Order Details */}
                    {order && (
                        <div className="space-y-6">
                            {/* Order Header */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="w-5 h-5" />
                                            Order Details
                                        </CardTitle>
                                        <OrderStatusBadge status={order.status} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-400">Transaction ID</p>
                                            <p className="font-mono font-semibold">{order.transactionId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Order Date</p>
                                            <p className="font-semibold">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-400">Estimated Delivery</p>
                                            <p className="font-semibold flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {order.trackingNumber && (
                                            <div>
                                                <p className="text-sm text-gray-400">Tracking Number</p>
                                                <p className="font-semibold flex items-center gap-2">
                                                    <Truck className="w-4 h-4" />
                                                    {order.trackingNumber}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Status Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <OrderStatusTimeline
                                        currentStatus={order.status}
                                        statusHistory={order.statusHistory}
                                    />
                                </CardContent>
                            </Card>

                            {/* Shipping Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-gray-300">
                                        <p className="font-semibold">{order.shippingAddress.fullName}</p>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>
                                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                        </p>
                                        <p>{order.shippingAddress.country}</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Order Items */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order Items</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {order.orderItems.map((item: any, index: number) => (
                                            <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-800 last:border-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                                </div>
                                                <p className="font-semibold">${item.price.toFixed(2)}</p>
                                            </div>
                                        ))}
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                                            <p className="text-lg font-semibold">Total</p>
                                            <p className="text-2xl font-bold text-primary">
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Empty State */}
                    {!order && !loading && (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                                <h3 className="text-xl font-semibold mb-2">No Order Found</h3>
                                <p className="text-gray-400">
                                    Enter your transaction ID above to track your order
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
