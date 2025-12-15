import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Coupon from "@/lib/models/Coupon";

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json(
                { error: "Coupon code is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const coupon = await Coupon.findOne({
            code: code.toUpperCase(),
            active: true,
            expiresAt: { $gt: new Date() },
        });

        if (!coupon) {
            return NextResponse.json(
                { error: "Invalid or expired coupon code" },
                { status: 404 }
            );
        }

        // Check usage limit
        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
            return NextResponse.json(
                { error: "Coupon usage limit reached" },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            coupon: {
                code: coupon.code,
                type: coupon.type,
                value: coupon.value,
                minPurchase: coupon.minPurchase,
                maxDiscount: coupon.maxDiscount,
            },
        });
    } catch (error: any) {
        console.error("Coupon validation error:", error);
        return NextResponse.json(
            { error: "Failed to validate coupon" },
            { status: 500 }
        );
    }
}
