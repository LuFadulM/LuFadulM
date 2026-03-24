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
        className="card-hover card-rounded relative overflow-hidden h-full"
        style={{
          minHeight: "460px",
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover group-hover:scale-105"
            style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
            sizes="(max-width: 640px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#111110" }} />
        )}

        {/* Strong bottom gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* Editorial Pick badge — top left */}
        <div className="absolute top-5 left-5">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#C8A44E",
              background: "rgba(200,164,78,0.06)",
              border: "1px solid rgba(200,164,78,0.3)",
              padding: "4px 10px",
              display: "inline-block",
            }}
          >
            {editorialPick}
          </span>
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#A0A0A0",
              marginBottom: "12px",
              fontWeight: 500,
            }}
          >
            {place.neighborhood ? `${place.neighborhood} · ` : ""}
            {place.city}
          </p>
          <h3 className="font-serif text-white mb-4" style={{ fontSize: "30px", lineHeight: "1.2" }}>
            {place.name}
          </h3>
          {place.description && (
            <p
              style={{
                color: "rgba(242,237,232,0.55)",
                fontSize: "13px",
                lineHeight: "1.65",
                fontWeight: 300,
                maxWidth: "420px",
                marginBottom: "16px",
              }}
              className="line-clamp-2"
            >
              {place.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <RatingDisplay rating={place.avg_rating} mode="stars" />
            <span style={{ color: "rgba(242,237,232,0.85)", fontSize: "12px", fontWeight: 500 }}>
              {formatRating(place.avg_rating)}
            </span>
            <span style={{ color: "rgba(242,237,232,0.3)", fontSize: "12px" }}>
              {place.review_count} {reviews}
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
        className="card-hover card-rounded relative overflow-hidden h-full"
        style={{
          minHeight: "220px",
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover group-hover:scale-105"
            style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
            sizes="(max-width: 640px) 100vw, 30vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#111110" }} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
          }}
        />

        {/* Number index — top right */}
        <div className="absolute top-4 right-4">
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", color: "rgba(200,164,78,0.5)", fontWeight: 600 }}>
            0{index + 2}
          </span>
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-serif text-white leading-tight mb-1" style={{ fontSize: "16px" }}>
            {place.name}
          </h3>
          <p
            style={{
              color: "#A0A0A0",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {place.city}
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
    <section className="mb-24">
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">{t.featured.sectionLabel}</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            {t.featured.sectionTitle}
          </h2>
        </div>
        <Link
          href="/?featured=true"
          className="label-micro transition-colors duration-200 hidden sm:block"
          style={{ color: "#666666" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
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
