"use client";

import React, { useRef, useEffect, useState } from "react";
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

const CATEGORY_TAG: Record<string, { color: string; bg: string; label: string }> = {
  Restaurants: { color: "#C6A85C", bg: "rgba(198,168,92,0.12)", label: "Restaurante" },
  Bars:        { color: "#B06040", bg: "rgba(176,96,64,0.10)",  label: "Bar" },
  Nightlife:   { color: "#7050A0", bg: "rgba(112,80,160,0.10)", label: "Vida nocturna" },
  Cafés:       { color: "#C6A85C", bg: "rgba(198,168,92,0.12)", label: "Café" },
  Hotels:      { color: "#5A8A6A", bg: "rgba(90,138,106,0.10)", label: "Hotel" },
  Attractions: { color: "#4070A0", bg: "rgba(64,112,160,0.10)", label: "Atracción" },
};

export default function PlaceCard({
  place,
  isFeaturedPlacement = false,
  placementId,
  surface = "homepage",
}: PlaceCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const impressionTracked = useRef(false);
  const [hovered, setHovered] = useState(false);

  const catCfg = CATEGORY_TAG[place.category] ?? { color: "#C6A85C", bg: "rgba(198,168,92,0.12)", label: place.category };
  const loc = [place.neighborhood, place.city].filter(Boolean).join(" · ");

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
      <Link href={`/places/${place.slug}`} className="block h-full" onClick={handleClick}>
        <article
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "14px",
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.07)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
              : "0 1px 4px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* ── Image ── */}
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", flexShrink: 0 }}>
            {place.cover_image_url ? (
              <>
                <Image
                  src={place.cover_image_url}
                  alt={place.name}
                  fill
                  className="object-cover"
                  style={{
                    transform: hovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay for readability */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                }} />
              </>
            ) : (
              <div style={{ position: "absolute", inset: 0, background: "#EFEAE4" }} />
            )}

            {/* Category badge — bottom left over gradient */}
            <div style={{ position: "absolute", bottom: 12, left: 12 }}>
              <span style={{
                fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                color: "#FFFFFF",
                background: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(255,255,255,0.20)",
                padding: "3px 9px", borderRadius: "100px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}>
                {catCfg.label}
              </span>
            </div>

            {/* Featured badge */}
            {isFeaturedPlacement && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span style={{
                  fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                  fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                  color: "#1C1C1C", background: "#C6A85C",
                  padding: "3px 9px", borderRadius: "100px",
                }}>
                  Destacado
                </span>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div style={{
            padding: "16px 18px 20px",
            flex: 1, display: "flex", flexDirection: "column",
            background: "#FFFFFF",
          }}>
            {/* Name */}
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "17px",
              fontWeight: 600,
              color: hovered ? "#C6A85C" : "#1C1C1C",
              lineHeight: "1.3",
              marginBottom: "5px",
              letterSpacing: "-0.01em",
              transition: "color 0.25s ease",
            }}>
              {place.name}
            </h3>

            {/* Location */}
            {loc && (
              <p style={{
                fontSize: "11px",
                color: "#9A9A9A",
                fontFamily: "'Sora', system-ui, sans-serif",
                fontWeight: 400,
                marginBottom: "10px",
                letterSpacing: "0.02em",
              }}>
                {loc}
              </p>
            )}

            {/* Rating + price row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: "auto",
              paddingTop: "10px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
            }}>
              {place.avg_rating > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="11" height="11" viewBox="0 0 24 24"
                        fill={s <= Math.round(place.avg_rating) ? "#C6A85C" : "#E8E2DA"}
                        aria-hidden="true">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 500,
                    color: "#6A6A6A",
                    fontFamily: "'Sora', system-ui, sans-serif",
                  }}>
                    {formatRating(place.avg_rating)}
                    {place.review_count > 0 && (
                      <span style={{ color: "#C0BAB2", fontWeight: 400 }}> ({place.review_count})</span>
                    )}
                  </span>
                </div>
              ) : <span />}
              {place.price_level && (
                <span style={{
                  fontSize: "11px",
                  color: "#9A9A9A",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}>
                  {place.price_level}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
