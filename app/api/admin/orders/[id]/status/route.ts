import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Order, { OrderStatus } from "@/lib/models/Order";
import { sendStatusUpdateEmail } from "@/lib/email/email-service";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any)?.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { status, trackingNumber, note } = await req.json();

        if (!status) {
            return NextResponse.json(
                { error: "Status is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const order = await Order.findById(params.id);

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        // Update order status
        order.status = status as OrderStatus;

        // Add to status history
        order.statusHistory.push({
            status: status as OrderStatus,
            timestamp: new Date(),
            note: note || undefined,
        });

        // Update tracking number if provided
        if (trackingNumber) {
            order.trackingNumber = trackingNumber;
        }

        // Update delivery status
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        }

        await order.save();

        // Send email notification if customer email is available
        if (order.customerEmail) {
            await sendStatusUpdateEmail({
                customerEmail: order.customerEmail,
                customerName: order.shippingAddress.fullName,
                transactionId: order.transactionId,
                status: status as OrderStatus,
                trackingNumber: trackingNumber,
            });
        }

        return NextResponse.json({
            success: true,
            message: "Order status updated successfully",
            order: {
                _id: order._id,
                transactionId: order.transactionId,
                status: order.status,
                statusHistory: order.statusHistory,
            }
        });
    } catch (error: any) {
        console.error("Error updating order status:", error);
        return NextResponse.json(
            { error: "Failed to update order status", details: error.message },
            { status: 500 }
        );
    }
}
