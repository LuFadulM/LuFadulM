import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";

interface FeaturedSectionProps {
  places: Place[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{ color: i < Math.round(rating) ? "#C8A44E" : "#2A2A28", fontSize: "11px" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function FeaturedHero({ place }: { place: Place }) {
  return (
    <Link href={`/places/${place.slug}`} className="block group col-span-2 row-span-2">
      <article
        className="card-hover relative overflow-hidden h-full border border-[rgba(255,255,255,0.04)]"
        style={{ minHeight: "420px" }}
      >
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
            sizes="(max-width: 640px) 100vw, 60vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#111110" }} />
        )}

        {/* Heavy gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        {/* Top label */}
        <div className="absolute top-5 left-5">
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#C8A44E",
              background: "rgba(200,164,78,0.12)",
              border: "1px solid rgba(200,164,78,0.25)",
              padding: "4px 10px",
              display: "inline-block",
            }}
          >
            Editorial Pick
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-7">
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,208,200,0.5)",
              marginBottom: "10px",
              fontWeight: 500,
            }}
          >
            {place.neighborhood ? `${place.neighborhood} · ` : ""}
            {place.city}
          </p>
          <h3
            className="font-serif text-white mb-3"
            style={{ fontSize: "28px", lineHeight: "1.2" }}
          >
            {place.name}
          </h3>
          {place.description && (
            <p
              style={{
                color: "rgba(212,208,200,0.6)",
                fontSize: "13px",
                lineHeight: "1.6",
                fontWeight: 300,
                maxWidth: "400px",
                marginBottom: "14px",
              }}
              className="line-clamp-2"
            >
              {place.description}
            </p>
          )}
          <div className="flex items-center gap-3">
            <Stars rating={place.avg_rating} />
            <span style={{ color: "rgba(212,208,200,0.8)", fontSize: "12px", fontWeight: 500 }}>
              {formatRating(place.avg_rating)}
            </span>
            <span style={{ color: "rgba(212,208,200,0.35)", fontSize: "12px" }}>
              {place.review_count} reseñas
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
      <article className="card-hover relative overflow-hidden border border-[rgba(255,255,255,0.04)] h-full" style={{ minHeight: "200px" }}>
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-700"
            style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
            sizes="(max-width: 640px) 100vw, 30vw"
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "#111110" }} />
        )}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className="font-serif text-white leading-tight mb-1"
            style={{ fontSize: "15px" }}
          >
            {place.name}
          </h3>
          <p
            style={{
              color: "rgba(212,208,200,0.5)",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {place.city}
          </p>
        </div>

        {/* Index number */}
        <div className="absolute top-3 right-3">
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "rgba(200,164,78,0.6)",
              fontWeight: 600,
            }}
          >
            0{index + 2}
          </span>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedSection({ places }: FeaturedSectionProps) {
  if (places.length === 0) return null;

  const [hero, ...rest] = places;

  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.04)]">
        <div>
          <p className="label-micro mb-3">Selección</p>
          <h2 className="text-3xl font-serif" style={{ color: "#D4D0C8" }}>
            Lugares Destacados
          </h2>
        </div>
        <Link
          href="/?featured=true"
          style={{
            fontSize: "11px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#C8A44E",
            fontWeight: 500,
          }}
          className="transition-colors duration-200"
        >
          Ver todos →
        </Link>
      </div>

      {/* Magazine-style grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: "2px" }}
      >
        {/* Hero — left 2/3 */}
        {hero && <FeaturedHero place={hero} />}

        {/* Side cards — right 1/3 */}
        <div className="flex flex-col" style={{ gap: "2px" }}>
          {rest.slice(0, 2).map((place, i) => (
            <FeaturedSmall key={place.id} place={place} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
