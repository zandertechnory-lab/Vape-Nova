import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/clerk-auth";
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Review from "@/lib/models/Review";
import Product from "@/lib/models/Product";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.searchParams.get("productId");
    if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

    await connectDB();
    const reviews = await Review.find({ product: productId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ reviews });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { error, userId } = await requireAuth();
    if (error) return error;

    const user = await currentUser();
    const userName = user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : "Anonymous";

    const { productId, rating, title, comment } = await req.json();
    if (!productId || !rating || !title || !comment)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

    await connectDB();

    const existing = await Review.findOne({ product: productId, user: userId });
    if (existing) return NextResponse.json({ error: "You already reviewed this product" }, { status: 400 });

    const review = await Review.create({
      product: productId,
      user: userId,
      userName,
      rating,
      title,
      comment,
    });

    // Recalculate product rating
    const all = await Review.find({ product: productId });
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
    await Product.findByIdAndUpdate(productId, { rating: avg, numReviews: all.length });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
