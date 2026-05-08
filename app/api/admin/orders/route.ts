import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/clerk-auth";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;
    await connectDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ orders, count: orders.length }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
