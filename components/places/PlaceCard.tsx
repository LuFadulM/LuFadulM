import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";

interface PlaceCardProps {
  place: Place;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} de 5 estrellas`}>
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

const categoryLabel: Record<string, string> = {
  Restaurants: "Gastronomía",
  Cafés: "Café",
  Bars: "Noche",
  Hotels: "Hoteles",
  Attractions: "Cultura",
  Nightlife: "Vida Activa",
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const label = categoryLabel[place.category] ?? place.category;

  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article className="card-hover bg-bg-card border border-[rgba(255,255,255,0.04)] overflow-hidden h-full">
        {/* Image — 66% of card */}
        <div className="relative overflow-hidden bg-bg-surface" style={{ aspectRatio: "3/2" }}>
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: "#111110" }}
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 img-overlay" />

          {/* Top — featured badge */}
          {place.is_featured && (
            <div className="absolute top-3 left-3">
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#C8A44E",
                  background: "rgba(200,164,78,0.12)",
                  border: "1px solid rgba(200,164,78,0.25)",
                  padding: "3px 8px",
                  display: "inline-block",
                }}
              >
                Destacado
              </span>
            </div>
          )}

          {/* Price */}
          {place.price_level && (
            <div className="absolute top-3 right-3">
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.06em",
                  color: "rgba(212,208,200,0.7)",
                  background: "rgba(0,0,0,0.5)",
                  padding: "2px 7px",
                  display: "inline-block",
                }}
              >
                {place.price_level}
              </span>
            </div>
          )}

          {/* Bottom — name + location */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3
              className="font-serif text-white leading-tight mb-1"
              style={{ fontSize: "16px" }}
            >
              {place.name}
            </h3>
            <p
              style={{
                color: "rgba(212,208,200,0.6)",
                fontSize: "11px",
                letterSpacing: "0.06em",
                marginBottom: "6px",
              }}
            >
              {place.neighborhood ? `${place.neighborhood} · ` : ""}
              {place.city}
            </p>
            <div className="flex items-center gap-2">
              <Stars rating={place.avg_rating} />
              <span
                style={{
                  color: "rgba(212,208,200,0.9)",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {formatRating(place.avg_rating)}
              </span>
              <span style={{ color: "rgba(212,208,200,0.4)", fontSize: "11px" }}>
                ({place.review_count})
              </span>
            </div>
          </div>
        </div>

        {/* Bottom strip — category + tags */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#C8A44E",
              fontWeight: 600,
            }}
          >
            {label}
          </span>
          {place.tags.length > 0 && (
            <div className="flex gap-2">
              {place.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#4A4843",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
