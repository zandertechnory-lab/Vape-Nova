"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    maxRating?: number;
    size?: number;
    showNumber?: boolean;
    interactive?: boolean;
    onRatingChange?: (rating: number) => void;
}

export default function StarRating({
    rating,
    maxRating = 5,
    size = 20,
    showNumber = false,
    interactive = false,
    onRatingChange,
}: StarRatingProps) {
    const handleClick = (newRating: number) => {
        if (interactive && onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= Math.round(rating);

                return (
                    <Star
                        key={index}
                        size={size}
                        className={`${isFilled
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-none text-gray-400"
                            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                        onClick={() => handleClick(starValue)}
                    />
                );
            })}
            {showNumber && (
                <span className="ml-1 text-sm text-gray-400">
                    ({rating.toFixed(1)})
                </span>
            )}
        </div>
    );
}
