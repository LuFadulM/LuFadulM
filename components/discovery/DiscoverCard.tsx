"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";

// ─── Category system for light backgrounds ────────────────────────────────────

const CAT_COLORS: Record<string, { text: string; bg: string }> = {
  Restaurants: { text: "#B84A36", bg: "rgba(184,74,54,0.10)" },
  Bars:        { text: "#B84A36", bg: "rgba(184,74,54,0.10)" },
  Nightlife:   { text: "#7050B8", bg: "rgba(112,80,184,0.10)" },
  Cafés:       { text: "#8C6820", bg: "rgba(140,104,32,0.10)" },
  Hotels:      { text: "#1E7262", bg: "rgba(30,114,98,0.10)" },
  Attractions: { text: "#27734A", bg: "rgba(39,115,74,0.10)" },
};

const CAT_LABELS: Record<string, string> = {
  Restaurants: "Restaurante",
  Bars: "Bar",
  Nightlife: "Vida nocturna",
  Cafés: "Café",
  Hotels: "Hotel",
  Attractions: "Atracción",
};

interface DiscoverCardProps {
  place: Place;
  momentTag?: string;
  /** "3/2" | "4/3" | "16/9" */
  aspectRatio?: string;
  isGem?: boolean;
}

export default function DiscoverCard({
  place,
  momentTag,
  aspectRatio = "3/2",
  isGem = false,
}: DiscoverCardProps) {
  const [hovered, setHovered] = useState(false);
  const loc = [place.neighborhood, place.city].filter(Boolean).join(" · ");
  const catCfg = CAT_COLORS[place.category] ?? { text: "#6A6A6A", bg: "rgba(0,0,0,0.06)" };
  const catLabel = CAT_LABELS[place.category] ?? place.category;

  return (
    <Link href={`/places/${place.slug}`} className="block h-full">
      <article
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: hovered
            ? "0 16px 48px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)"
            : "0 2px 14px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Image ── */}
        <div
          style={{
            position: "relative",
            aspectRatio,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover"
              style={{
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "#F0EDE8" }} />
          )}

          {/* Tags on image */}
          <div style={{ position: "absolute", top: 12, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {momentTag && (
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontFamily: "'Sora', system-ui, sans-serif",
                  color: "rgba(255,255,255,0.95)",
                  background: "rgba(0,0,0,0.52)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "3px 9px",
                  borderRadius: "100px",
                }}
              >
                {momentTag}
              </span>
            )}
            {isGem && (
              <span
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontFamily: "'Sora', system-ui, sans-serif",
                  color: "#3DDC97",
                  background: "rgba(7,18,13,0.55)",
                  border: "1px solid rgba(61,220,151,0.40)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: "3px 9px",
                  borderRadius: "100px",
                }}
              >
                Joya
              </span>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "14px 16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Category pill */}
          <div style={{ marginBottom: "8px" }}>
            <span
              style={{
                fontSize: "8px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "'Sora', system-ui, sans-serif",
                color: catCfg.text,
                background: catCfg.bg,
                padding: "3px 8px",
                borderRadius: "100px",
              }}
            >
              {catLabel}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "16px",
              fontWeight: 600,
              color: "#0D1B14",
              lineHeight: "1.32",
              marginBottom: "5px",
              letterSpacing: "-0.01em",
              transition: "color 0.2s ease",
            }}
            className={hovered ? "text-[#3DDC97]" : ""}
          >
            {place.name}
          </h3>

          {/* Location */}
          {loc && (
            <p
              style={{
                fontSize: "11px",
                color: "#8A8680",
                fontFamily: "'Sora', system-ui, sans-serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
                marginBottom: "10px",
                flex: 1,
              }}
            >
              {loc}
            </p>
          )}

          {/* Rating */}
          {place.avg_rating > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "auto" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg
                    key={s}
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill={s <= Math.round(place.avg_rating) ? "#3DDC97" : "#DDD8D0"}
                    aria-hidden="true"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "#8A8680",
                  fontFamily: "'Sora', system-ui, sans-serif",
                }}
              >
                {formatRating(place.avg_rating)}
                {place.review_count > 0 && (
                  <span style={{ color: "#B8B4B0" }}> ({place.review_count})</span>
                )}
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
