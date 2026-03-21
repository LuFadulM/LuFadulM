"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import FeaturedBadge from "@/components/ui/FeaturedBadge";
import { trackFeaturedEvent } from "@/lib/analytics";
import type { AnalyticsSurface } from "@/lib/types";

interface PlaceCardProps {
  place: Place;
  isFeaturedPlacement?: boolean;
  featuredLabelText?: string;
  placementId?: string;
  surface?: AnalyticsSurface;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? "#C8A44E" : "#2A2A28", fontSize: "11px" }}>★</span>
      ))}
    </span>
  );
}

export default function PlaceCard({
  place,
  isFeaturedPlacement = false,
  featuredLabelText = "Destacado",
  placementId,
  surface = "homepage",
}: PlaceCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionTracked = useRef(false);
  const label = t.placeCard[place.category as keyof typeof t.placeCard] ?? place.category;

  // Track impression when card enters viewport
  useEffect(() => {
    if (!placementId || impressionTracked.current) return;
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !impressionTracked.current) {
          impressionTracked.current = true;
          trackFeaturedEvent({ placementId, placeId: place.id, eventType: "impression", surface });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [placementId, place.id, surface]);

  const handleClick = () => {
    if (placementId) {
      trackFeaturedEvent({ placementId, placeId: place.id, eventType: "card_click", surface });
    }
  };

  const showFeatured = isFeaturedPlacement || place.is_featured;
  const badgeLabel = isFeaturedPlacement ? featuredLabelText : "Destacado";

  return (
    <div ref={cardRef}>
      <Link href={`/places/${place.slug}`} className="block group" onClick={handleClick}>
        <article
          className="card-hover bg-bg-card overflow-hidden h-full"
          style={{
            border: isFeaturedPlacement
              ? "1px solid rgba(200,164,78,0.12)"
              : "1px solid rgba(255,255,255,0.04)",
            borderTop: isFeaturedPlacement
              ? "1px solid rgba(200,164,78,0.2)"
              : "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Image */}
          <div className="relative overflow-hidden bg-bg-surface" style={{ aspectRatio: "3/2" }}>
            {place.cover_image_url ? (
              <Image
                src={place.cover_image_url}
                alt={place.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="w-full h-full" style={{ background: "#111110" }} />
            )}

            <div className="absolute inset-0 img-overlay" />

            {/* Featured badge — top left */}
            {showFeatured && (
              <div className="absolute top-3 left-3">
                <FeaturedBadge label={badgeLabel} />
              </div>
            )}

            {/* Price — top right */}
            {place.price_level && (
              <div className="absolute top-3 right-3">
                <span style={{
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: "rgba(212,208,200,0.7)",
                  background: "rgba(0,0,0,0.5)",
                  padding: "2px 7px",
                  display: "inline-block",
                }}>
                  {place.price_level}
                </span>
              </div>
            )}

            {/* Name + location overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-serif text-white leading-tight mb-1" style={{ fontSize: "16px" }}>
                {place.name}
              </h3>
              <p style={{ color: "rgba(212,208,200,0.6)", fontSize: "11px", letterSpacing: "0.06em", marginBottom: "6px" }}>
                {place.neighborhood ? `${place.neighborhood} · ` : ""}{place.city}
              </p>
              <div className="flex items-center gap-2">
                <Stars rating={place.avg_rating} />
                <span style={{ color: "rgba(212,208,200,0.9)", fontSize: "11px", fontWeight: 500 }}>
                  {formatRating(place.avg_rating)}
                </span>
                <span style={{ color: "rgba(212,208,200,0.4)", fontSize: "11px" }}>
                  ({place.review_count})
                </span>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isFeaturedPlacement ? "#C8A44E" : "#C8A44E",
              fontWeight: 600,
            }}>
              {label}
            </span>
            {place.tags.length > 0 && (
              <div className="flex gap-2">
                {place.tags.slice(0, 2).map((tag) => (
                  <span key={tag} style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4A4843",
                    fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </Link>
    </div>
  );
}
