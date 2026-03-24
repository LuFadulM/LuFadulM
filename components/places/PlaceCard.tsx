"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackFeaturedEvent } from "@/lib/analytics";
import type { AnalyticsSurface } from "@/lib/types";
import RatingDisplay from "@/components/ui/RatingDisplay";
import CardBadge from "@/components/ui/CardBadge";

interface PlaceCardProps {
  place: Place;
  isFeaturedPlacement?: boolean;
  featuredLabelText?: string;
  placementId?: string;
  surface?: AnalyticsSurface;
}

// ─── Badge icons ─────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

// ─── Category tag colours ──────────────────────────────────────────────────

const CATEGORY_TAG: Record<string, { color: string; bg: string; border: string }> = {
  Restaurants: { color: "#E07B6A", bg: "rgba(226,114,91,0.10)", border: "rgba(226,114,91,0.18)" },
  Bars:        { color: "#E07B6A", bg: "rgba(226,114,91,0.10)", border: "rgba(226,114,91,0.18)" },
  Nightlife:   { color: "#B07AE0", bg: "rgba(176,122,224,0.10)", border: "rgba(176,122,224,0.18)" },
  Cafés:       { color: "#C8A44E", bg: "rgba(200,164,78,0.10)", border: "rgba(200,164,78,0.18)" },
  Hotels:      { color: "#5CC9AD", bg: "rgba(92,201,173,0.10)", border: "rgba(92,201,173,0.18)" },
  Attractions: { color: "#5CC98A", bg: "rgba(92,201,138,0.10)", border: "rgba(92,201,138,0.18)" },
};

// ─── Editorial copy ────────────────────────────────────────────────────────

function getShortCopy(description: string | null | undefined): string {
  if (!description) return "";
  const first = description.split(/\.\s+/)[0]?.trim() ?? "";
  return first.length > 90 ? first.slice(0, 87) + "…" : first;
}

// ─── Component ────────────────────────────────────────────────────────────

export default function PlaceCard({
  place,
  isFeaturedPlacement = false,
  featuredLabelText,
  placementId,
  surface = "homepage",
}: PlaceCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionTracked = useRef(false);

  const categoryLabel =
    t.placeCard[place.category as keyof typeof t.placeCard] ?? place.category;
  const catCfg = CATEGORY_TAG[place.category] ?? {
    color: "#888888",
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.08)",
  };

  type BadgeConfig = { label: string; variant: "editorial" | "status"; icon?: React.ReactNode } | null;
  let badge: BadgeConfig = null;
  if (isFeaturedPlacement) badge = { label: "Premium", variant: "editorial", icon: <StarIcon /> };
  else if (place.is_featured) badge = { label: "Tendencia", variant: "status" };
  else if (place.category === "Attractions") badge = { label: "Outdoor", variant: "editorial" };

  const shortCopy = getShortCopy(place.description);

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

  return (
    <div ref={cardRef}>
      <Link href={`/places/${place.slug}`} className="block group" onClick={handleClick}>
        <article
          className="atmo-card card-rounded-lg overflow-hidden h-full"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* ── Image ── */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {place.cover_image_url ? (
              <Image
                src={place.cover_image_url}
                alt={place.name}
                fill
                className="object-cover atmo-image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "#181818" }} />
            )}

            {/* Bottom gradient for atmosphere */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)",
              }}
            />

            {/* Top: neighborhood */}
            {place.neighborhood && (
              <div className="absolute top-3 left-3">
                <span
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {place.neighborhood}
                </span>
              </div>
            )}

            {/* Badge */}
            {badge && (
              <div className="absolute top-3 right-3">
                <CardBadge label={badge.label} variant={badge.variant} icon={badge.icon} />
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="px-4 pt-3.5 pb-4">
            {/* Name */}
            <h3
              className="font-serif text-white leading-snug mb-2 transition-colors duration-200 group-hover:text-[#F5F0E8]"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              {place.name}
            </h3>

            {/* Editorial copy — italic, atmospheric */}
            {shortCopy && (
              <p
                className="mb-3 line-clamp-2"
                style={{
                  fontSize: "11px",
                  lineHeight: "1.65",
                  color: "rgba(242,237,232,0.76)",
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                {shortCopy}
              </p>
            )}

            {/* Row: rating + price */}
            <div className="flex items-center justify-between mb-3">
              {place.avg_rating > 0 ? (
                <div
                  className="flex items-center gap-2"
                  aria-label={`Calificación: ${formatRating(place.avg_rating)} de 5`}
                >
                  <RatingDisplay rating={place.avg_rating} mode="dots" />
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: "10px",
                      color: "rgba(212,175,55,0.85)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {formatRating(place.avg_rating)}
                  </span>
                </div>
              ) : (
                <span />
              )}
              {place.price_level && (
                <span
                  aria-label={`Nivel de precio: ${place.price_level}`}
                  style={{
                    color: "rgba(255,255,255,0.32)",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {place.price_level}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {/* Category tag */}
              <span
                className="tag-pill"
                style={{
                  color: catCfg.color,
                  background: catCfg.bg,
                  border: `1px solid ${catCfg.border}`,
                }}
              >
                {categoryLabel}
              </span>

              {/* Cuisine or first tag */}
              {place.cuisine ? (
                <span className="tag-pill">{place.cuisine}</span>
              ) : place.tags[0] ? (
                <span className="tag-pill">{place.tags[0]}</span>
              ) : null}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
