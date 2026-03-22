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

// ─── Badge icons ────────────────────────────────────────────────────────────

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

// ─── Badge config ─────────────────────────────────────────────────────────

type BadgeVariant = "premium" | "tendencia" | "outdoor";

const BADGE_CONFIG: Record<
  BadgeVariant,
  { label: string; icon: React.ReactNode; bg: string; color: string; border: string }
> = {
  premium: {
    label: "Premium",
    icon: <StarIcon />,
    bg: "rgba(212,175,55,0.18)",
    color: "#E0C060",
    border: "rgba(212,175,55,0.4)",
  },
  tendencia: {
    label: "Tendencia",
    icon: <FlameIcon />,
    bg: "rgba(215,65,65,0.22)",
    color: "#FF7575",
    border: "rgba(215,65,65,0.45)",
  },
  outdoor: {
    label: "Outdoor",
    icon: <LeafIcon />,
    bg: "rgba(60,180,110,0.2)",
    color: "#5CC98A",
    border: "rgba(60,180,110,0.4)",
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
        padding: "4px 10px",
        fontSize: "9px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        backdropFilter: "blur(4px)",
      }}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ─── Category tag colours ─────────────────────────────────────────────────

const CATEGORY_TAG: Record<string, { color: string; bg: string; heart: boolean }> = {
  Restaurants: { color: "#E07B6A", bg: "rgba(226,114,91,0.14)", heart: true },
  Bars:        { color: "#E07B6A", bg: "rgba(226,114,91,0.14)", heart: true },
  Nightlife:   { color: "#B07AE0", bg: "rgba(176,122,224,0.13)", heart: true },
  Cafés:       { color: "#C8A44E", bg: "rgba(200,164,78,0.13)", heart: false },
  Hotels:      { color: "#5CC9AD", bg: "rgba(92,201,173,0.13)", heart: false },
  Attractions: { color: "#5CC98A", bg: "rgba(92,201,138,0.13)", heart: false },
};

// ─── Stars ────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-px" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? "#D4AF37" : "#2A2A28", fontSize: "11px" }}>
          ★
        </span>
      ))}
    </span>
  );
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
    bg: "rgba(255,255,255,0.06)",
    heart: false,
  };

  // Badge: paid → Premium, organic featured → Tendencia, Attractions → Outdoor
  let badge: BadgeVariant | null = null;
  if (isFeaturedPlacement) badge = "premium";
  else if (place.is_featured) badge = "tendencia";
  else if (place.category === "Attractions") badge = "outdoor";

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
          className="card-hover card-rounded overflow-hidden h-full"
          style={{
            background: "#131313",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* ── Image ── */}
          <div className="relative overflow-hidden card-rounded" style={{ aspectRatio: "16/10" }}>
            {place.cover_image_url ? (
              <Image
                src={place.cover_image_url}
                alt={place.name}
                fill
                className="object-cover group-hover:scale-105"
                style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "#1A1A18" }} />
            )}

            {/* Subtle vignette for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(0,0,0,0.25) 100%)",
              }}
            />

            {/* Badge */}
            {badge && (
              <div className="absolute top-3 left-3">
                <BadgePill variant={badge} />
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div className="px-4 pt-3 pb-4">
            {/* Row 1 — Name + Rating */}
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3
                className="font-serif text-white leading-snug"
                style={{ fontSize: "15px", fontWeight: 400 }}
              >
                {place.name}
              </h3>
              {place.avg_rating > 0 && (
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <Stars rating={place.avg_rating} />
                  <span
                    style={{
                      color: "rgba(242,242,242,0.6)",
                      fontSize: "11px",
                      fontWeight: 500,
                    }}
                  >
                    {formatRating(place.avg_rating)}
                  </span>
                </div>
              )}
            </div>

            {/* Row 2 — Location + Price */}
            <div className="flex items-center justify-between mb-3">
              <p style={{ color: "#909090", fontSize: "11px", letterSpacing: "0.02em" }}>
                {place.neighborhood ? `${place.neighborhood} · ` : ""}
                {place.city}
              </p>
              {place.price_level && (
                <span
                  style={{
                    color: "#686868",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    fontWeight: 500,
                  }}
                >
                  {place.price_level}
                </span>
              )}
            </div>

            {/* Row 3 — Tags */}
            <div className="flex flex-wrap gap-1.5">
              {/* Category tag — coloured */}
              <span
                className="tag-pill"
                style={{
                  color: catCfg.color,
                  background: catCfg.bg,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {catCfg.heart && (
                  <span style={{ fontSize: "8px" }}>♥</span>
                )}
                {categoryLabel}
              </span>

              {/* Cuisine tag — neutral */}
              {place.cuisine && (
                <span className="tag-pill">{place.cuisine}</span>
              )}

              {/* First place tag — neutral (only if no cuisine) */}
              {!place.cuisine && place.tags[0] && (
                <span className="tag-pill">{place.tags[0]}</span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
