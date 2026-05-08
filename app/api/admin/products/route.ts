import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/clerk-auth";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ products, count: products.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error } = await requireAdmin();
    if (error) return error;
    await connectDB();
    const body = await request.json();
    const { name, description, price, category, subcategory, stock, featured, images } = body;
    if (!name || !description || !price || !category || !subcategory)
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
    const slug = slugify(name);
    const existing = await Product.findOne({ slug });
    if (existing) return NextResponse.json({ error: "Product with this name already exists" }, { status: 400 });
    const product = new Product({ name, slug, description, price, category, subcategory, stock: stock || 0, featured: featured || false, images: images || [] });
    await product.save();
    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
