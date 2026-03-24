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
      className="card-rounded-lg overflow-hidden animate-pulse"
      style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Image skeleton */}
      <div style={{ aspectRatio: "4/3", background: "#181816" }} />
      {/* Content skeleton */}
      <div className="px-4 pt-3.5 pb-4">
        <div style={{ height: "14px", background: "#1E1E1C", marginBottom: "10px", width: "65%" }} />
        <div style={{ height: "10px", background: "#191917", marginBottom: "16px", width: "45%" }} />
        <div className="flex gap-2">
          <div style={{ height: "18px", background: "#1C1C1A", width: "64px" }} />
          <div style={{ height: "18px", background: "#181816", width: "52px" }} />
        </div>
      </div>
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
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        style={{ gap: "16px" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="py-28 text-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          style={{ color: "#2E2C29", margin: "0 auto 20px" }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <p
          style={{
            color: "#3E3B38",
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 500,
            fontFamily: "'Sora', system-ui, sans-serif",
          }}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{ gap: "16px" }}
    >
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
