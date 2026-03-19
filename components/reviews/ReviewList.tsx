import React from "react";
import { Review } from "@/lib/types";
import ReviewCard from "./ReviewCard";

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
}

export default function ReviewList({ reviews, isLoading = false }: ReviewListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-5 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-bg-surface" />
              <div className="space-y-1">
                <div className="h-3 w-24 bg-bg-surface rounded" />
                <div className="h-2 w-16 bg-bg-surface rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-bg-surface rounded" />
              <div className="h-3 w-3/4 bg-bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-text-muted text-sm">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-serif text-text mb-4">
        {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
      </h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
