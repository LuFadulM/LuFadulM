import React from "react";
import { Place } from "@/lib/types";
import PlaceCard from "./PlaceCard";

interface PlaceGridProps {
  places: Place[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function SkeletonCard() {
  return (
    <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-bg-surface" />
      <div className="px-4 py-3 space-y-2">
        <div className="h-3 bg-bg-surface rounded w-3/4" />
        <div className="h-2 bg-bg-surface rounded w-1/2" />
      </div>
    </div>
  );
}

export default function PlaceGrid({
  places,
  isLoading = false,
  emptyMessage = "No places found.",
}: PlaceGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="py-16 text-center">
        <svg
          className="w-12 h-12 mx-auto mb-4 text-text-dim"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
}
