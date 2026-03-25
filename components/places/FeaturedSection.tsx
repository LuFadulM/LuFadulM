"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import RatingDisplay from "@/components/ui/RatingDisplay";

interface FeaturedSectionProps {
  places: Place[];
}

function FeaturedHero({ place, editorialPick, reviews }: { place: Place; editorialPick: string; reviews: string }) {
  return (
    <Link href={`/places/${place.slug}`} className="block group col-span-2 row-span-2">
      <article
        className="atmo-card card-rounded-lg relative overflow-hidden h-full"
        style={{
          minHeight: "540px",
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover atmo-image"
            sizes="(max-width: 640px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#252219" }} />
        )}

        {/* Gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
          }}
        />

        {/* Editorial Pick badge — top left */}
        <div className="absolute top-5 left-5">
          <span
            style={{
              fontSize: "8px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#B1987C",
              background: "rgba(177,152,124,0.08)",
              border: "1px solid rgba(177,152,124,0.22)",
              padding: "4px 10px",
              display: "inline-block",
              backdropFilter: "blur(4px)",
            }}
          >
            {editorialPick}
          </span>
        </div>

        {/* Content — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-8"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              marginBottom: "10px",
              fontWeight: 500,
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            }}
          >
            {place.neighborhood ? `${place.neighborhood} · ` : ""}
            {place.city}
          </p>
          <h3
            className="font-serif text-white mb-3 transition-colors duration-300 group-hover:text-[#F5F0E8]"
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              lineHeight: "1.15",
              fontWeight: 700,
              textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 0 32px rgba(0,0,0,0.6)",
            }}
          >
            {place.name}
          </h3>
          {place.description && (
            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "14px",
                lineHeight: "1.65",
                fontWeight: 400,
                maxWidth: "440px",
                marginBottom: "20px",
                fontFamily: "'Sora', system-ui, sans-serif",
                textShadow: "0 1px 8px rgba(0,0,0,0.8)",
              }}
              className="line-clamp-2"
            >
              {place.description}
            </p>
          )}
          <div className="atmo-cta flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RatingDisplay rating={place.avg_rating} mode="stars" />
              <span style={{ color: "rgba(242,237,232,0.85)", fontSize: "12px", fontWeight: 500 }}>
                {formatRating(place.avg_rating)}
              </span>
              <span style={{ color: "rgba(242,237,232,0.52)", fontSize: "12px" }}>
                {place.review_count} {reviews}
              </span>
            </div>
            <span style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600, color: "#B1987C", fontFamily: "'Sora', system-ui, sans-serif" }}>
              Ver lugar <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function FeaturedSmall({ place, index }: { place: Place; index: number }) {
  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article
        className="atmo-card card-rounded-lg relative overflow-hidden h-full"
        style={{
          minHeight: "216px",
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover atmo-image"
            sizes="(max-width: 640px) 100vw, 30vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#252219" }} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)",
          }}
        />

        {/* Number index — top left */}
        <div className="absolute top-4 left-4">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.16em",
              color: "rgba(177,152,124,0.45)",
              fontWeight: 700,
              fontFamily: "'Sora', system-ui, sans-serif",
            }}
          >
            0{index + 2}
          </span>
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-serif text-white leading-tight mb-1 transition-colors duration-200 group-hover:text-[#F5F0E8]"
            style={{
              fontSize: "17px",
              fontWeight: 700,
              textShadow: "0 1px 10px rgba(0,0,0,0.9)",
            }}
          >
            {place.name}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.60)",
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "'Sora', system-ui, sans-serif",
              textShadow: "0 1px 6px rgba(0,0,0,0.8)",
            }}
          >
            {place.neighborhood ? `${place.neighborhood} · ` : ""}{place.city}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedSection({ places }: FeaturedSectionProps) {
  const { t } = useLanguage();
  if (places.length === 0) return null;

  const [hero, ...rest] = places;

  return (
    <section className="mb-32">
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">{t.featured.sectionLabel}</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#E8E4DC", fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            {t.featured.sectionTitle}
          </h2>
        </div>
        <Link
          href="/?featured=true"
          className="label-micro transition-colors duration-200 hidden sm:block"
          style={{ color: "rgba(255,255,255,0.30)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B1987C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.30)")}
        >
          {t.featured.viewAll} →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "16px" }}>
        {hero && (
          <FeaturedHero
            place={hero}
            editorialPick={t.featured.editorialPick}
            reviews={t.featured.reviews}
          />
        )}
        <div className="flex flex-col" style={{ gap: "16px" }}>
          {rest.slice(0, 2).map((place, i) => (
            <FeaturedSmall key={place.id} place={place} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
