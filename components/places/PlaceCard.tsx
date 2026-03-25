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

// Category colors for dark overlay cards
const CATEGORY_TAG: Record<string, { color: string; bg: string; label: string }> = {
  Restaurants: { color: "#E2925B", bg: "rgba(226,146,91,0.18)", label: "Restaurante" },
  Bars:        { color: "#E2925B", bg: "rgba(226,146,91,0.18)", label: "Bar" },
  Nightlife:   { color: "#B09FE8", bg: "rgba(176,159,232,0.18)", label: "Vida nocturna" },
  Cafés:       { color: "#D4A03C", bg: "rgba(212,160,60,0.18)", label: "Café" },
  Hotels:      { color: "#3CC9AD", bg: "rgba(60,201,173,0.18)", label: "Hotel" },
  Attractions: { color: "#3CC9AD", bg: "rgba(60,201,173,0.18)", label: "Atracción" },
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

  const catCfg = CATEGORY_TAG[place.category] ?? { color: "#C6A85C", bg: "rgba(198,168,92,0.18)", label: place.category };
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
            background: "#141413",
            border: "1px solid rgba(255,255,255,0.06)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 20px 50px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.35)"
              : "0 4px 20px rgba(0,0,0,0.25)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* ── Image ── */}
          <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", flexShrink: 0 }}>
            {place.cover_image_url ? (
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
            ) : (
              <div style={{ position: "absolute", inset: 0, background: "#1C1C1A" }} />
            )}

            {/* Category badge — top left */}
            <div style={{ position: "absolute", top: 12, left: 12 }}>
              <span style={{
                fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                color: catCfg.color,
                background: catCfg.bg,
                border: `1px solid ${catCfg.color}40`,
                padding: "3px 9px", borderRadius: "100px",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}>
                {catCfg.label}
              </span>
            </div>

            {/* Premium badge */}
            {isFeaturedPlacement && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span style={{
                  fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                  fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                  color: "#0A0A09", background: "#C6A85C",
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
            background: "#141413",
          }}>
            {/* Name */}
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "17px",
              fontWeight: 600,
              color: hovered ? "#C6A85C" : "#EDE9E2",
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
                color: "rgba(255,255,255,0.45)",
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
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}>
              {place.avg_rating > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="11" height="11" viewBox="0 0 24 24"
                        fill={s <= Math.round(place.avg_rating) ? "#C6A85C" : "rgba(255,255,255,0.12)"}
                        aria-hidden="true">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 500,
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                  }}>
                    {formatRating(place.avg_rating)}
                    {place.review_count > 0 && (
                      <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 400 }}> ({place.review_count})</span>
                    )}
                  </span>
                </div>
              ) : <span />}
              {place.price_level && (
                <span style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
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
