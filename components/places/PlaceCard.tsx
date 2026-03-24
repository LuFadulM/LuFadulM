"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackFeaturedEvent } from "@/lib/analytics";
import type { AnalyticsSurface } from "@/lib/types";

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
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 2C9 7 6 9.5 6 13a6 6 0 0 0 12 0c0-2.5-1.5-5-3-6 0 1.5-.5 2.5-1.5 3.5C14 10 12 2 12 2z" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0 }}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

// ─── Badge config ──────────────────────────────────────────────────────────

type BadgeVariant = "premium" | "tendencia" | "outdoor";

const BADGE_CONFIG: Record<
  BadgeVariant,
  { label: string; icon: React.ReactNode; bg: string; color: string; border: string }
> = {
  premium: {
    label: "Premium",
    icon: <StarIcon />,
    bg: "rgba(212,175,55,0.14)",
    color: "#E0C060",
    border: "rgba(212,175,55,0.35)",
  },
  tendencia: {
    label: "Tendencia",
    icon: <FlameIcon />,
    bg: "rgba(215,65,65,0.18)",
    color: "#FF7575",
    border: "rgba(215,65,65,0.38)",
  },
  outdoor: {
    label: "Outdoor",
    icon: <LeafIcon />,
    bg: "rgba(60,180,110,0.15)",
    color: "#5CC98A",
    border: "rgba(60,180,110,0.35)",
  },
};

function BadgePill({ variant }: { variant: BadgeVariant }) {
  const cfg = BADGE_CONFIG[variant];
  return (
    <span
      className="tag-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        padding: "3px 10px",
        fontSize: "8px",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        backdropFilter: "blur(4px)",
      }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
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

// ─── Rating dots ───────────────────────────────────────────────────────────

function RatingDots({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex items-center gap-[3px]" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: "4px",
            height: "4px",
            borderRadius: "50% !important",
            background: i < filled ? "#D4AF37" : "rgba(255,255,255,0.12)",
            flexShrink: 0,
          }}
        />
      ))}
    </span>
  );
}

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

  let badge: BadgeVariant | null = null;
  if (isFeaturedPlacement) badge = "premium";
  else if (place.is_featured) badge = "tendencia";
  else if (place.category === "Attractions") badge = "outdoor";

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
          className="atmo-card card-rounded overflow-hidden h-full"
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
                  "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
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
                <BadgePill variant={badge} />
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="px-4 pt-3.5 pb-4">
            {/* Name */}
            <h3
              className="font-serif text-white leading-snug mb-2 transition-colors duration-200 group-hover:text-[#F5F0E8]"
              style={{ fontSize: "15px", fontWeight: 400 }}
            >
              {place.name}
            </h3>

            {/* Editorial copy — italic, atmospheric */}
            {shortCopy && (
              <p
                className="mb-3 line-clamp-2"
                style={{
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "rgba(242,237,232,0.52)",
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
                <div className="flex items-center gap-2">
                  <RatingDots rating={place.avg_rating} />
                  <span
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
