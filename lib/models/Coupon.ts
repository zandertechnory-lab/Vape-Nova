import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    minPurchase: number;
    maxDiscount?: number;
    expiresAt: Date;
    usageLimit: number;
    usedCount: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CouponSchema: Schema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["percentage", "fixed"],
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 0,
        },
        minPurchase: {
            type: Number,
            default: 0,
        },
        maxDiscount: {
            type: Number,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        usageLimit: {
            type: Number,
            default: 0, // 0 means unlimited
        },
        usedCount: {
            type: Number,
            default: 0,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

CouponSchema.index({ code: 1 });
CouponSchema.index({ active: 1, expiresAt: 1 });

const Coupon: Model<ICoupon> =
    mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);

export default Coupon;
