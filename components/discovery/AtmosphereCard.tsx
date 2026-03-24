"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import CardBadge from "@/components/ui/CardBadge";

interface AtmosphereCardProps {
  place: Place;
  /** If provided, overrides the editorial copy extracted from description */
  editorialCopy?: string;
  /** Mood tag shown on the card (e.g. "Esta noche", "Fin de semana") */
  momentTag?: string;
  /** Height class override for the card */
  heightClass?: string;
  /** Show the gem badge */
  isGem?: boolean;
}

function getEditorialCopy(description: string | null | undefined): string {
  if (!description) return "";
  const sentences = description.split(/\.\s+/);
  const first = sentences[0]?.trim() ?? "";
  return first.length > 110 ? first.slice(0, 107) + "…" : first;
}

export default function AtmosphereCard({
  place,
  editorialCopy,
  momentTag,
  heightClass = "h-[380px]",
  isGem = false,
}: AtmosphereCardProps) {
  const copy = editorialCopy ?? getEditorialCopy(place.description);
  const location = [place.neighborhood, place.city].filter(Boolean).join(" · ");

  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article
        className={`atmo-card card-rounded-lg relative overflow-hidden ${heightClass}`}
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* ── Image ── */}
        <div className="absolute inset-0 overflow-hidden card-rounded-lg">
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover atmo-image"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "#181818" }} />
          )}
        </div>

        {/* ── Overlay gradient ── */}
        <div
          className="absolute inset-0 atmo-overlay pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* ── Top row ── */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {/* Location */}
          {location && (
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 500,
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
              {location}
            </span>
          )}

          {/* Gem or moment tag */}
          {isGem ? (
            <CardBadge
              label="Joya"
              variant="editorial"
              icon={
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              }
            />
          ) : momentTag ? (
            <CardBadge label={momentTag} variant="moment" />
          ) : null}
        </div>

        {/* ── Bottom content ── */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
          {/* Name */}
          <h3
            className="font-serif text-white leading-tight"
            style={{ fontSize: "clamp(17px, 2.2vw, 22px)" }}
          >
            {place.name}
          </h3>

          {/* Editorial copy */}
          {copy && (
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.6",
                color: "rgba(242,237,232,0.5)",
                fontWeight: 300,
                fontStyle: "italic",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {copy}
            </p>
          )}

          {/* CTA — appears on hover */}
          <div className="atmo-cta flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              {place.price_level && (
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color: "rgba(212,175,55,0.55)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {place.price_level}
                </span>
              )}
              {place.cuisine && (
                <span className="tag-pill" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {place.cuisine}
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#D4AF37",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
              Quiero ir <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
