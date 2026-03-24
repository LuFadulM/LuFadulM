"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";

interface PlanesSectionProps {
  places: Place[];
}

interface PlanCard {
  place: Place;
  planTitle: string;
  planMoment: string;
  momentColor: string;
  momentBg: string;
  momentBorder: string;
}

const MOMENT_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  "Mañana": {
    color: "#C8A44E",
    bg: "rgba(200,164,78,0.1)",
    border: "rgba(200,164,78,0.22)",
  },
  "Tarde": {
    color: "#E08F6A",
    bg: "rgba(224,143,106,0.1)",
    border: "rgba(224,143,106,0.22)",
  },
  "Noche": {
    color: "#A07AE0",
    bg: "rgba(160,122,224,0.1)",
    border: "rgba(160,122,224,0.22)",
  },
  "Fin de semana": {
    color: "#5CC9AD",
    bg: "rgba(92,201,173,0.1)",
    border: "rgba(92,201,173,0.22)",
  },
};

function derivePlan(place: Place): { planTitle: string; planMoment: string } {
  if (place.category === "Cafés") {
    return {
      planTitle: `Café de especialidad en ${place.neighborhood ?? place.city}`,
      planMoment: "Mañana",
    };
  }
  if (place.category === "Bars") {
    return {
      planTitle: `Tragos y conversación en ${place.neighborhood ?? place.city}`,
      planMoment: "Tarde",
    };
  }
  if (place.category === "Nightlife") {
    return {
      planTitle: `La noche empieza en ${place.neighborhood ?? place.city}`,
      planMoment: "Noche",
    };
  }
  if (place.category === "Attractions") {
    return {
      planTitle: `Explorar ${place.name} con tiempo`,
      planMoment: "Fin de semana",
    };
  }
  if (place.category === "Hotels") {
    return {
      planTitle: `Quedarse en ${place.city} sin apuros`,
      planMoment: "Fin de semana",
    };
  }
  // Restaurants
  const isLunch = place.tags.some((t) => t.includes("lunch") || t.includes("almuerzo"));
  return {
    planTitle: `${isLunch ? "Almuerzo" : "Cena"} en ${place.neighborhood ?? place.city}`,
    planMoment: isLunch ? "Tarde" : "Noche",
  };
}

export default function PlanesSection({ places }: PlanesSectionProps) {
  const plans: PlanCard[] = places.slice(0, 7).map((place) => {
    const { planTitle, planMoment } = derivePlan(place);
    const momentStyle = MOMENT_STYLES[planMoment] ?? MOMENT_STYLES["Tarde"];
    return {
      place,
      planTitle,
      planMoment,
      momentColor: momentStyle.color,
      momentBg: momentStyle.bg,
      momentBorder: momentStyle.border,
    };
  });

  if (plans.length === 0) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Inspiración</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Pequeños planes
          </h2>
        </div>
        <p
          className="hidden sm:block"
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 300,
          }}
        >
          ¿Qué hacer hoy?
        </p>
      </div>

      {/* ── Horizontal scroll ── */}
      <div className="scroll-row">
        {plans.map(({ place, planTitle, planMoment, momentColor, momentBg, momentBorder }) => (
          <div
            key={place.id}
            className="scroll-row-item"
            style={{ width: "clamp(200px, 26vw, 260px)" }}
          >
            <Link href={`/places/${place.slug}`} className="block group">
              <article
                className="event-card card-rounded overflow-hidden"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "180px" }}
                >
                  {place.cover_image_url ? (
                    <Image
                      src={place.cover_image_url}
                      alt={place.name}
                      fill
                      className="object-cover event-image"
                      sizes="(max-width: 640px) 60vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: "#1A1A18" }} />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Moment badge */}
                  <span
                    className="tag-pill mb-3 inline-block"
                    style={{
                      color: momentColor,
                      background: momentBg,
                      border: `1px solid ${momentBorder}`,
                      borderRadius: "100px !important",
                    }}
                  >
                    {planMoment}
                  </span>

                  {/* Plan title */}
                  <p
                    className="font-serif"
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      color: "#D8D4CC",
                      fontWeight: 400,
                      marginBottom: "8px",
                    }}
                  >
                    {planTitle}
                  </p>

                  {/* Place name */}
                  <p
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {place.name}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
