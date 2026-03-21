import React from "react";
import { Place, RankedPlace, AnalyticsSurface } from "@/lib/types";
import PlaceCard from "./PlaceCard";

interface PlaceGridProps {
  places: (Place | RankedPlace)[];
  isLoading?: boolean;
  emptyMessage?: string;
  surface?: AnalyticsSurface;
}

function SkeletonCard() {
  return (
    <div
      className="bg-bg-card border border-[rgba(255,255,255,0.04)] overflow-hidden animate-pulse"
      style={{ aspectRatio: "3/2" }}
    >
      <div className="w-full h-full bg-bg-surface" />
    </div>
  );
}

function isRanked(place: Place | RankedPlace): place is RankedPlace {
  return "isFeaturedPlacement" in place;
}

export default function PlaceGrid({
  places,
  isLoading = false,
  emptyMessage = "Ningún lugar encontrado.",
  surface = "homepage",
}: PlaceGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2px" }}>
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="py-24 text-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
          style={{ color: "#3A3835", margin: "0 auto 16px" }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <p style={{ color: "#4A4843", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "2px" }}>
      {places.map((place) => {
        const ranked = isRanked(place) ? place : null;
        return (
          <PlaceCard
            key={place.id}
            place={place}
            isFeaturedPlacement={ranked?.isFeaturedPlacement}
            featuredLabelText={ranked?.featuredLabelText}
            placementId={ranked?.placementId}
            surface={surface}
          />
        );
      })}
    </div>
  );
}
