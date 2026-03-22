"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RankedPlace } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import FeaturedBadge from "@/components/ui/FeaturedBadge";
import { trackFeaturedEvent } from "@/lib/analytics";

interface SpotlightSectionProps {
  place: RankedPlace;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? "#C8A44E" : "#2A2A28", fontSize: "13px" }}>★</span>
      ))}
    </span>
  );
}

export default function SpotlightSection({ place }: SpotlightSectionProps) {
  const handleClick = () => {
    if (place.placementId) {
      trackFeaturedEvent({ placementId: place.placementId, placeId: place.id, eventType: "card_click", surface: "homepage" });
    }
  };

  return (
    <section className="mb-20">
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.04)]">
        <div>
          <p className="label-micro mb-3">Spotlight</p>
          <h2 className="text-3xl font-serif" style={{ color: "#D4D0C8" }}>
            En foco
          </h2>
        </div>
      </div>

      <Link href={`/places/${place.slug}`} className="block group" onClick={handleClick}>
        <article
          className="card-hover card-rounded relative overflow-hidden"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.04)",
            minHeight: "360px",
          }}
        >
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-700"
              style={{ transition: "transform 0.7s cubic-bezier(.2,0,.2,1)" }}
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "#111110" }} />
          )}

          {/* Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12" style={{ maxWidth: "560px" }}>
            <div className="mb-4">
              <FeaturedBadge label={place.featuredLabelText ?? "Destacado"} />
            </div>

            <p style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A0A0A0",
              marginBottom: "12px",
              fontWeight: 500,
            }}>
              {place.neighborhood ? `${place.neighborhood} · ` : ""}{place.city}
            </p>

            <h3
              className="font-serif text-white mb-4 leading-tight transition-colors duration-300"
              style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
            >
              {place.name}
            </h3>

            {place.description && (
              <p style={{
                color: "rgba(212,208,200,0.65)",
                fontSize: "14px",
                lineHeight: "1.7",
                fontWeight: 300,
                marginBottom: "20px",
              }}
                className="line-clamp-3"
              >
                {place.description}
              </p>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Stars rating={place.avg_rating} />
                <span style={{ color: "rgba(212,208,200,0.9)", fontSize: "13px", fontWeight: 500 }}>
                  {formatRating(place.avg_rating)}
                </span>
                <span style={{ color: "rgba(212,208,200,0.4)", fontSize: "12px" }}>
                  ({place.review_count})
                </span>
              </div>
              {place.price_level && (
                <span style={{
                  fontSize: "11px",
                  color: "rgba(212,208,200,0.5)",
                  letterSpacing: "0.06em",
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  paddingLeft: "16px",
                }}>
                  {place.price_level}
                </span>
              )}
            </div>

            <div className="mt-6">
              <span style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "#C8A44E",
              }}>
                Ver perfil →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
}
