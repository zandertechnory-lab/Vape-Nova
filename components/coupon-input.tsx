"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, X } from "lucide-react";
import toast from "react-hot-toast";

interface CouponInputProps {
    onCouponApplied: (coupon: any) => void;
    onCouponRemoved: () => void;
    appliedCoupon?: any;
}

export default function CouponInput({
    onCouponApplied,
    onCouponRemoved,
    appliedCoupon,
}: CouponInputProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!code.trim()) {
            toast.error("Please enter a coupon code");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/coupons/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await res.json();

            if (res.ok) {
                onCouponApplied(data.coupon);
                toast.success("Coupon applied successfully!");
                setCode("");
            } else {
                toast.error(data.error || "Invalid coupon code");
            }
        } catch (error) {
            toast.error("Failed to apply coupon");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        onCouponRemoved();
        toast.success("Coupon removed");
    };

    if (appliedCoupon) {
        return (
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/50 rounded-lg">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-green-500">{appliedCoupon.code}</span>
                    <span className="text-sm text-gray-400">
                        {appliedCoupon.type === "percentage"
                            ? `${appliedCoupon.value}% off`
                            : `$${appliedCoupon.value} off`}
                    </span>
                </div>
                <button
                    onClick={handleRemove}
                    className="text-gray-400 hover:text-gray-300"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <div className="flex-1 relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="pl-10"
                    onKeyPress={(e) => e.key === "Enter" && handleApply()}
                />
            </div>
            <Button onClick={handleApply} disabled={loading}>
                {loading ? "Applying..." : "Apply"}
            </Button>
        </div>
    );
}
