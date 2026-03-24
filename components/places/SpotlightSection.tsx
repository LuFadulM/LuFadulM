"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RankedPlace } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import FeaturedBadge from "@/components/ui/FeaturedBadge";
import { trackFeaturedEvent } from "@/lib/analytics";
import RatingDisplay from "@/components/ui/RatingDisplay";

interface SpotlightSectionProps {
  place: RankedPlace;
}

export default function SpotlightSection({ place }: SpotlightSectionProps) {
  const handleClick = () => {
    if (place.placementId) {
      trackFeaturedEvent({ placementId: place.placementId, placeId: place.id, eventType: "card_click", surface: "homepage" });
    }
  };

  return (
    <section>
      <Link href={`/places/${place.slug}`} className="block group" onClick={handleClick}>
        <article
          className="atmo-card card-rounded-lg relative overflow-hidden"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.05)",
            minHeight: "380px",
          }}
        >
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover atmo-image"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "#111110" }} />
          )}

          {/* Gradient — stronger left side for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.12) 100%)",
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
                <RatingDisplay rating={place.avg_rating} mode="stars" size="md" />
                <span aria-hidden="true" style={{ color: "rgba(212,208,200,0.9)", fontSize: "13px", fontWeight: 500 }}>
                  {formatRating(place.avg_rating)}
                </span>
                <span aria-hidden="true" style={{ color: "rgba(212,208,200,0.38)", fontSize: "12px" }}>
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

            <div className="atmo-cta mt-6 flex items-center gap-2">
              <span style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#D4AF37",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}>
                Ver perfil
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
}
