"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-6 h-6",
};

export default function StarRating({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = "md",
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number>(0);
  const displayRating = hovered || rating;

  const handleClick = (star: number) => {
    if (interactive && onChange) {
      onChange(star);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-0.5",
        interactive && "cursor-pointer",
        className
      )}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
        const filled = star <= displayRating;
        const halfFilled = !filled && star - 0.5 <= displayRating;

        return (
          <svg
            key={star}
            className={cn(
              sizeClasses[size],
              "transition-colors duration-100",
              filled
                ? "text-gold"
                : halfFilled
                ? "text-gold/60"
                : "text-text-dim",
              interactive && "hover:scale-110 transition-transform"
            )}
            viewBox="0 0 24 24"
            fill={filled || halfFilled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={filled || halfFilled ? "0" : "1.5"}
            onClick={() => handleClick(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? star <= rating : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={
              interactive
                ? (e) => e.key === "Enter" && handleClick(star)
                : undefined
            }
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      })}
    </div>
  );
}
