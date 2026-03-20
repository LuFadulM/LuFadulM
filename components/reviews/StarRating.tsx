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

const sizePx: Record<string, string> = {
  sm: "13px",
  md: "16px",
  lg: "22px",
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

  return (
    <span
      className={cn("inline-flex items-center gap-0", className)}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Calificación: ${rating} de ${maxStars} estrellas`}
    >
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
        const filled = star <= Math.round(displayRating);
        return (
          <span
            key={star}
            style={{
              fontSize: sizePx[size],
              color: filled ? "#C8A44E" : "#2A2A28",
              cursor: interactive ? "pointer" : "default",
              lineHeight: 1,
              transition: "color 0.15s",
            }}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(0)}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? star <= rating : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={interactive ? (e) => e.key === "Enter" && onChange?.(star) : undefined}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
