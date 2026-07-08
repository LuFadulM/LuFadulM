import React from "react";
import { Review } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const displayName = review.profile?.display_name ?? "Anonymous";
  const initials = getInitials(displayName);

  return (
    <div className="bg-bg-card border border-[rgba(234,241,236,0.07)] rounded-card p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {review.profile?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profile.avatar_url}
              alt={displayName}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-bg-surface border border-[rgba(234,241,236,0.14)] flex items-center justify-center text-xs font-semibold text-text-muted">
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-text">{displayName}</p>
            <p className="text-xs text-text-dim">{formatDate(review.created_at)}</p>
          </div>
        </div>

        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Text */}
      {review.text && (
        <p className="text-sm text-text-muted leading-relaxed">{review.text}</p>
      )}

      {/* Helpful */}
      {review.helpful_count > 0 && (
        <p className="mt-3 text-xs text-text-dim">
          {review.helpful_count} {review.helpful_count === 1 ? "person" : "people"} found this helpful
        </p>
      )}
    </div>
  );
}
