import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { generateTransactionId, calculateEstimatedDelivery } from "@/lib/utils/order-utils";
import { sendOrderConfirmationEmail } from "@/lib/email/email-service";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = body;

    // Verify products and stock
    for (const item of orderItems) {
      const product = await Product.findById(item.id);
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.name} not found` },
          { status: 404 }
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();
    const estimatedDelivery = calculateEstimatedDelivery();

    // Create order
    const order = new Order({
      user: session.user.id,
      transactionId,
      orderItems: orderItems.map((item: any) => ({
        product: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid: false,
      isDelivered: false,
      status: 'Pending',
      statusHistory: [{
        status: 'Pending',
        timestamp: new Date(),
        note: 'Order placed successfully'
      }],
      estimatedDelivery,
      customerEmail: session.user.email || shippingAddress.email,
    });

    await order.save();

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Send confirmation email
    if (session.user.email) {
      await sendOrderConfirmationEmail({
        customerEmail: session.user.email,
        customerName: session.user.name || shippingAddress.fullName,
        transactionId,
        orderItems: orderItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        estimatedDelivery,
      });
    }

    return NextResponse.json({
      order: {
        _id: order._id,
        transactionId: order.transactionId,
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

