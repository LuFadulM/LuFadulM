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

// Category system for light backgrounds
const CATEGORY_TAG: Record<string, { text: string; bg: string; label: string }> = {
  Restaurants: { text: "#B84A36", bg: "rgba(184,74,54,0.10)", label: "Restaurante" },
  Bars:        { text: "#B84A36", bg: "rgba(184,74,54,0.10)", label: "Bar" },
  Nightlife:   { text: "#7050B8", bg: "rgba(112,80,184,0.10)", label: "Vida nocturna" },
  Cafés:       { text: "#8C6820", bg: "rgba(140,104,32,0.10)", label: "Café" },
  Hotels:      { text: "#1E7262", bg: "rgba(30,114,98,0.10)", label: "Hotel" },
  Attractions: { text: "#27734A", bg: "rgba(39,115,74,0.10)", label: "Atracción" },
};

function getShortCopy(description: string | null | undefined): string {
  if (!description) return "";
  const first = description.split(/\.\s+/)[0]?.trim() ?? "";
  return first.length > 90 ? first.slice(0, 87) + "…" : first;
}

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

  const catCfg = CATEGORY_TAG[place.category] ?? { text: "#6A6A6A", bg: "rgba(0,0,0,0.06)", label: place.category };
  const shortCopy = getShortCopy(place.description);
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
            background: "#FFFFFF",
            borderRadius: "14px",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: hovered
              ? "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
              : "0 2px 14px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
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
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.65s cubic-bezier(0.23,1,0.32,1)",
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: "#F0EDE8" }} />
            )}

            {/* Premium badge */}
            {isFeaturedPlacement && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span style={{
                  fontSize: "8px", letterSpacing: "0.14em", textTransform: "uppercase",
                  fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                  color: "#FFFFFF", background: "#C6A85C",
                  padding: "3px 9px", borderRadius: "100px",
                }}>
                  Premium
                </span>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
            {/* Category pill */}
            <div style={{ marginBottom: "8px" }}>
              <span style={{
                fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase",
                fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                color: catCfg.text, background: catCfg.bg,
                padding: "3px 8px", borderRadius: "100px",
              }}>
                {catCfg.label}
              </span>
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "16px",
                fontWeight: 600,
                color: hovered ? "#C6A85C" : "#1C1C1C",
                lineHeight: "1.32",
                marginBottom: "4px",
                letterSpacing: "-0.01em",
                transition: "color 0.2s ease",
              }}
            >
              {place.name}
            </h3>

            {/* Location */}
            {loc && (
              <p style={{
                fontSize: "11px", color: "#8A8680",
                fontFamily: "'Sora', system-ui, sans-serif",
                fontWeight: 400, marginBottom: "8px",
              }}>
                {loc}
              </p>
            )}

            {/* Short copy */}
            {shortCopy && (
              <p
                className="line-clamp-2"
                style={{
                  fontSize: "12px", lineHeight: "1.6",
                  color: "#6A6A6A", fontWeight: 400,
                  marginBottom: "12px", flex: 1,
                }}
              >
                {shortCopy}
              </p>
            )}

            {/* Rating + price */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
              {place.avg_rating > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="10" height="10" viewBox="0 0 24 24"
                        fill={s <= Math.round(place.avg_rating) ? "#C6A85C" : "#DDD8D0"} aria-hidden="true">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#8A8680", fontFamily: "'Sora', system-ui, sans-serif" }}>
                    {formatRating(place.avg_rating)}
                  </span>
                </div>
              ) : <span />}
              {place.price_level && (
                <span style={{ fontSize: "11px", color: "#B0ABA4", fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 500 }}>
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
