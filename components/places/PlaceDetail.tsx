"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Place, Review } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import StarRating from "@/components/reviews/StarRating";
import ReviewList from "@/components/reviews/ReviewList";
import WriteReview from "@/components/reviews/WriteReview";
import FeaturedBadge from "@/components/ui/FeaturedBadge";
import { trackFeaturedEvent } from "@/lib/analytics";
import { MOCK_FEATURED_PLACEMENTS } from "@/app/data/featured";

interface PlaceDetailProps {
  place: Place;
  reviews?: Review[];
  isAuthenticated?: boolean;
}

export default function PlaceDetail({ place, reviews = [], isAuthenticated = false }: PlaceDetailProps) {
  // Find active featured placement for this place
  const placement = MOCK_FEATURED_PLACEMENTS.find((fp) => fp.place_slug === place.slug && fp.is_active);

  // Track profile_view on mount
  useEffect(() => {
    if (placement) {
      trackFeaturedEvent({
        placementId: placement.id,
        placeId: place.id,
        eventType: "profile_view",
        surface: "homepage",
      });
    }
  }, [placement, place.id]);

  const trackClick = (eventType: "website_click" | "instagram_click" | "phone_click" | "directions_click") => {
    if (placement) {
      trackFeaturedEvent({ placementId: placement.id, placeId: place.id, eventType, surface: "homepage" });
    }
  };

  const categoryLabel: Record<string, string> = {
    Restaurants: "Gastronomía",
    Cafés: "Café",
    Bars: "Noche",
    Hotels: "Hoteles",
    Attractions: "Cultura",
    Nightlife: "Vida Activa",
  };

  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 md:h-[420px] bg-bg-surface">
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-bg-surface" />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,9,0.95) 0%, rgba(10,10,9,0.4) 50%, rgba(10,10,9,0.1) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10 pb-20">
        {/* Header card */}
        <div
          className="mb-8 p-8"
          style={{
            background: "#0F1B15",
            border: placement ? "1px solid rgba(61,220,151,0.15)" : "1px solid rgba(255,255,255,0.06)",
            borderTop: placement ? "2px solid rgba(61,220,151,0.3)" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#3DDC97",
                fontWeight: 600,
              }}
            >
              {categoryLabel[place.category] ?? place.category}
            </span>
            {place.price_level && (
              <span style={{
                fontSize: "10px",
                color: "#64756B",
                letterSpacing: "0.06em",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                paddingLeft: "10px",
              }}>
                {place.price_level}
              </span>
            )}
            {placement && (
              <div style={{ marginLeft: "auto" }}>
                <FeaturedBadge label={placement.label_text} />
              </div>
            )}
          </div>

          <h1 className="font-serif mb-2" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#CBD6CE", lineHeight: 1.1 }}>
            {place.name}
          </h1>

          <p style={{ color: "#64756B", fontSize: "13px", marginBottom: "20px" }}>
            {place.neighborhood ? `${place.neighborhood}, ` : ""}{place.city}, Colombia
          </p>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <span className="font-serif" style={{ fontSize: "36px", color: "#CBD6CE", lineHeight: 1 }}>
              {formatRating(place.avg_rating)}
            </span>
            <div>
              <StarRating rating={place.avg_rating} size="lg" />
              <p style={{ fontSize: "11px", color: "#64756B", marginTop: "2px" }}>
                {place.review_count} {place.review_count === 1 ? "reseña" : "reseñas"}
              </p>
            </div>
          </div>

          {/* Tags */}
          {place.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {place.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#3A4A41",
                    fontWeight: 500,
                    border: "1px solid rgba(255,255,255,0.04)",
                    padding: "4px 10px",
                    background: "#0D0D0C",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main column */}
          <div className="md:col-span-2 space-y-6">
            {place.description && (
              <div style={{ background: "#0F1B15", border: "1px solid rgba(255,255,255,0.06)", padding: "24px" }}>
                <h2 className="font-serif mb-4" style={{ fontSize: "20px", color: "#CBD6CE" }}>
                  Sobre este lugar
                </h2>
                <p style={{ color: "#64756B", fontSize: "14px", lineHeight: "1.8", fontWeight: 300 }}>
                  {place.description}
                </p>
              </div>
            )}

            <ReviewList reviews={reviews} />

            {isAuthenticated ? (
              <WriteReview placeId={place.id} />
            ) : (
              <div
                style={{ background: "#0F1B15", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", textAlign: "center" }}
              >
                <p style={{ color: "#64756B", fontSize: "13px", marginBottom: "12px" }}>
                  Inicia sesión para escribir una reseña
                </p>
                <Link
                  href="/auth/login"
                  style={{
                    display: "inline-block",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#08130E",
                    background: "#3DDC97",
                    padding: "10px 20px",
                  }}
                >
                  Acceder
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div style={{ background: "#0F1B15", border: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
              <h3 className="font-serif mb-5" style={{ fontSize: "16px", color: "#CBD6CE" }}>
                Información
              </h3>
              <div className="space-y-4">
                {place.hours && (
                  <InfoRow icon="clock" label="Horario" value={place.hours} />
                )}
                {place.address && (
                  <InfoRow icon="pin" label="Dirección" value={place.address} />
                )}
                {place.phone && (
                  <div className="flex gap-3">
                    <ClockIcon type="phone" />
                    <div>
                      <p style={{ fontSize: "10px", color: "#3A4A41", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Teléfono</p>
                      <a
                        href={`tel:${place.phone}`}
                        onClick={() => trackClick("phone_click")}
                        style={{ fontSize: "13px", color: "#64756B" }}
                        className="hover:text-[#CBD6CE] transition-colors"
                      >
                        {place.phone}
                      </a>
                    </div>
                  </div>
                )}
                {place.website && (
                  <div className="flex gap-3">
                    <ClockIcon type="web" />
                    <div>
                      <p style={{ fontSize: "10px", color: "#3A4A41", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Sitio web</p>
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick("website_click")}
                        style={{ fontSize: "13px", color: "#3DDC97" }}
                        className="hover:text-[#4FE3A4] transition-colors break-all"
                      >
                        {place.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  </div>
                )}
                {place.instagram && (
                  <div className="flex gap-3">
                    <ClockIcon type="instagram" />
                    <div>
                      <p style={{ fontSize: "10px", color: "#3A4A41", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>Instagram</p>
                      <a
                        href={`https://instagram.com/${place.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick("instagram_click")}
                        style={{ fontSize: "13px", color: "#3DDC97" }}
                        className="hover:text-[#4FE3A4] transition-colors"
                      >
                        {place.instagram}
                      </a>
                    </div>
                  </div>
                )}

                {place.address && (
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(place.address + ", " + place.city + ", Colombia")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("directions_click")}
                    className="block w-full text-center mt-4 transition-all duration-200 hover:border-[rgba(61,220,151,0.3)]"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      color: "#64756B",
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "10px",
                    }}
                  >
                    Cómo llegar →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Business claim CTA */}
        {!place.is_claimed && (
          <div
            className="mt-8 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background: "#0D0D0C",
              border: "1px solid rgba(255,255,255,0.04)",
              borderLeft: "2px solid rgba(61,220,151,0.2)",
            }}
          >
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#3DDC97", fontWeight: 600, marginBottom: "6px" }}>
                ¿Es tu negocio?
              </p>
              <p style={{ fontSize: "13px", color: "#64756B", fontWeight: 300, lineHeight: "1.6" }}>
                Reclama este perfil para responder reseñas y gestionar tu presencia en Hyex.
              </p>
            </div>
            <a
              href={`mailto:hola@hyex.co?subject=Reclamo de perfil: ${encodeURIComponent(place.name)}&body=Nombre del negocio: ${encodeURIComponent(place.name)}%0ANombre del propietario: %0AEmail: %0ATeléfono: %0APrueba de propiedad: `}
              className="shrink-0 transition-all duration-200"
              style={{
                fontSize: "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#08130E",
                background: "#3DDC97",
                padding: "10px 20px",
                whiteSpace: "nowrap",
              }}
            >
              Reclamar perfil
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <ClockIcon type={icon} />
      <div>
        <p style={{ fontSize: "10px", color: "#3A4A41", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{label}</p>
        <p style={{ fontSize: "13px", color: "#64756B" }}>{value}</p>
      </div>
    </div>
  );
}

function ClockIcon({ type }: { type: string }) {
  const style = { color: "#2A3A31", flexShrink: 0, marginTop: "2px" };
  if (type === "clock") return (
    <svg style={style} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
  if (type === "pin") return (
    <svg style={style} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
  if (type === "phone") return (
    <svg style={style} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
  if (type === "web") return (
    <svg style={style} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
  if (type === "instagram") return (
    <svg style={style} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
  return null;
}
