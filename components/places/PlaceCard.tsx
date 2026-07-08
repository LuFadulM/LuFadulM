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

const CATEGORY_TAG: Record<string, { color: string; label: string }> = {
  Restaurants: { color: "#3DDC97", label: "Restaurante" },
  Bars:        { color: "#3DDC97", label: "Bar" },
  Nightlife:   { color: "#3DDC97", label: "Vida nocturna" },
  Cafés:       { color: "#3DDC97", label: "Café" },
  Hotels:      { color: "#3DDC97", label: "Hotel" },
  Attractions: { color: "#3DDC97", label: "Atracción" },
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

  const catCfg = CATEGORY_TAG[place.category] ?? { color: "#3DDC97", label: place.category };
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
            borderRadius: "var(--radius-card)",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            transform: hovered ? "translateY(-5px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 20px 60px rgba(0,0,0,0.50)"
              : "0 4px 20px rgba(0,0,0,0.30)",
            transition: "transform 300ms cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 300ms ease",
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
                    transform: hovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 400ms cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgba(7,18,13,0.70) 0%, rgba(7,18,13,0.15) 50%, transparent 100%)",
                }} />
              </>
            ) : (
              <div style={{ position: "absolute", inset: 0, background: "var(--surface-alt)" }} />
            )}

            {/* Category tag */}
            <div style={{ position: "absolute", bottom: 12, left: 12 }}>
              <span style={{
                fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase",
                fontWeight: 700, fontFamily: "var(--font-sans)",
                color: "var(--gold)",
                background: "rgba(7,18,13,0.75)",
                border: "1px solid var(--gold-border)",
                padding: "0.25rem 0.625rem", borderRadius: "var(--radius-pill)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}>
                {catCfg.label}
              </span>
            </div>

            {/* Featured badge */}
            {isFeaturedPlacement && (
              <div style={{ position: "absolute", top: 12, right: 12 }}>
                <span style={{
                  fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  fontWeight: 700, fontFamily: "var(--font-sans)",
                  color: "var(--bg)", background: "var(--gold)",
                  padding: "0.25rem 0.625rem", borderRadius: "var(--radius-pill)",
                }}>
                  Destacado
                </span>
              </div>
            )}
          </div>

          {/* ── Content ── */}
          <div style={{
            padding: "1.125rem 1.25rem 1.375rem",
            flex: 1, display: "flex", flexDirection: "column",
          }}>
            {/* Meta line — NEIGHBORHOOD · CATEGORY */}
            {loc && (
              <p style={{
                fontSize: "var(--text-micro)",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontFamily: "var(--font-sans)",
                marginBottom: "0.5rem",
                display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap",
              }}>
                {loc.split(" · ").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < arr.length - 1 && (
                      <span style={{ width: "2px", height: "2px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                    )}
                  </React.Fragment>
                ))}
                {place.price_level && (
                  <>
                    <span style={{ width: "2px", height: "2px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                    <span>{place.price_level}</span>
                  </>
                )}
              </p>
            )}

            {/* Name */}
            <h3 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-md)",
              fontWeight: 400,
              color: hovered ? "var(--gold)" : "var(--text-primary)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              marginBottom: "0.625rem",
              transition: "color 250ms ease",
            }}>
              {place.name}
            </h3>

            {/* Description */}
            {place.description && (
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-small)",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                flex: 1,
                margin: 0,
              }}>
                {place.description}
              </p>
            )}

            {/* CTA row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: "1rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid var(--border)",
            }}>
              {place.avg_rating > 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="11" height="11" viewBox="0 0 24 24"
                        fill={s <= Math.round(place.avg_rating) ? "#3DDC97" : "rgba(236,243,238,0.12)"}
                        aria-hidden="true">
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 500,
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-sans)",
                  }}>
                    {formatRating(place.avg_rating)}
                    {place.review_count > 0 && (
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> ({place.review_count})</span>
                    )}
                  </span>
                </div>
              ) : <span />}
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-micro)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--gold)",
                display: "inline-flex", alignItems: "center", gap: "0.375rem",
                transition: "gap 200ms ease",
              }}>
                Ver →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
