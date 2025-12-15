import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("q");

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ products: [] });
        }

        await connectDB();

        // Search products by name or category
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { subcategory: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ],
            stock: { $gt: 0 }, // Only show in-stock products
        })
            .limit(10)
            .select("name slug price images category subcategory")
            .lean();

        return NextResponse.json({ products });
    } catch (error: any) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Failed to search products", products: [] },
            { status: 500 }
        );
    }
}
