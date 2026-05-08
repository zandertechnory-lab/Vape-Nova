"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Order {
  _id: string;
  orderItems: Array<{ name: string; quantity: number; price: number }>;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  paymentMethod: string;
}

export default function AdminOrdersPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = isLoaded && (user?.publicMetadata as any)?.role === "admin";

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.push("/sign-in"); return; }
    if (!isAdmin) { router.push("/"); return; }
    fetchOrders();
  }, [isLoaded, user, isAdmin, router]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Manage Orders</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order #{order._id.slice(-8)}</CardTitle>
                  <span className={`px-2 py-1 rounded text-sm ${order.isPaid ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Payment: {order.paymentMethod} • {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-xl font-bold">Total: {formatPrice(order.totalPrice)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
