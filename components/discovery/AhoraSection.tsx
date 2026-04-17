"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import CardBadge from "@/components/ui/CardBadge";

interface AhoraSectionProps {
  places: Place[];
}

type NowBadgeType = "nuevo" | "popular" | "tendencia" | "local";

const NOW_BADGE_CONFIG: Record<NowBadgeType, { label: string; variant: "live" | "status" | "editorial" }> = {
  nuevo: { label: "Nuevo", variant: "live" },
  popular: { label: "Muy solicitado", variant: "status" },
  tendencia: { label: "En tendencia", variant: "status" },
  local: { label: "Favorito local", variant: "editorial" },
};

function getBadge(place: Place): NowBadgeType {
  const ageMs = Date.now() - new Date(place.created_at).getTime();
  const ageMonths = ageMs / (1000 * 60 * 60 * 24 * 30);
  if (ageMonths < 3) return "nuevo";
  if (place.review_count > 300) return "popular";
  if (place.is_featured) return "tendencia";
  return "local";
}

interface NowCardProps {
  place: Place;
  index: number;
}

function NowCard({ place, index }: NowCardProps) {
  const badge = getBadge(place);
  const { label, variant } = NOW_BADGE_CONFIG[badge];

  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article
        className="flex gap-4 items-start transition-all duration-300 group-hover:pl-2"
        style={{
          padding: "16px 0",
          borderBottom: "1px solid rgba(245,240,232,0.07)",
        }}
      >
        {/* Index */}
        <span
          className="font-serif shrink-0 select-none"
          aria-hidden="true"
          style={{
            fontSize: "18px",
            color: "rgba(245,240,232,0.35)",
            lineHeight: 1,
            minWidth: "26px",
            paddingTop: "5px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Thumbnail */}
        <div
          className="relative shrink-0 overflow-hidden card-rounded-sm"
          style={{ width: "80px", height: "80px" }}
        >
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="72px"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "#1E1B17" }} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="mb-2">
            <CardBadge label={label} variant={variant} />
          </div>

          {/* Name */}
          <h3
            className="font-serif leading-snug transition-colors duration-200 group-hover:text-[#F5F0E8] mb-1"
            style={{ fontSize: "15px", color: "#F5F0E8", fontWeight: 600 }}
          >
            {place.name}
          </h3>

          {/* Location + Category */}
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "rgba(245,240,232,0.65)",
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 400,
            }}
          >
            {place.neighborhood ? `${place.neighborhood} · ` : ""}
            {place.city}
            {place.category ? (
              <span style={{ color: "rgba(245,240,232,0.35)", marginLeft: "6px" }}>
                · {place.category === "Restaurants" ? "Restaurante" : place.category === "Attractions" ? "Atracción" : place.category}
              </span>
            ) : null}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="shrink-0 flex items-center self-center transition-all duration-200 group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
          style={{ color: "#C9A84C" }}
          aria-hidden="true"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </article>
    </Link>
  );
}

export default function AhoraSection({ places }: AhoraSectionProps) {
  // Sort: featured first, then by review count for "buzz"
  const sorted = [...places]
    .sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return b.review_count - a.review_count;
    })
    .slice(0, 6);

  if (sorted.length === 0) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar" style={{ alignItems: "center", gap: "8px" }}>
            <span className="pulse-dot" style={{ marginRight: "2px" }} />
            <span className="label-micro">En tiempo real</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(36px, 5vw, 62px)", color: "#F5F0E8" }}
          >
            Lo que está pasando
          </h2>
        </div>
        <p
          className="hidden sm:block"
          style={{
            fontSize: "12px",
            color: "rgba(245,240,232,0.35)",
            fontWeight: 300,
          }}
        >
          Activo esta semana
        </p>
      </div>

      {/* ── Two-column list ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
        {sorted.map((place, i) => (
          <NowCard key={place.id} place={place} index={i} />
        ))}
      </div>
    </section>
  );
}
