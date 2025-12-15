import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const transactionId = searchParams.get("id");

        if (!transactionId) {
            return NextResponse.json(
                { error: "Transaction ID is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const order = await Order.findOne({ transactionId })
            .select('-user -paymentResult')
            .lean();

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            order: {
                transactionId: order.transactionId,
                status: order.status,
                orderItems: order.orderItems,
                shippingAddress: order.shippingAddress,
                totalPrice: order.totalPrice,
                estimatedDelivery: order.estimatedDelivery,
                trackingNumber: order.trackingNumber,
                statusHistory: order.statusHistory,
                createdAt: order.createdAt,
                isPaid: order.isPaid,
                isDelivered: order.isDelivered,
            }
        });
    } catch (error: any) {
        console.error("Error tracking order:", error);
        return NextResponse.json(
            { error: "Failed to track order", details: error.message },
            { status: 500 }
        );
    }
}
