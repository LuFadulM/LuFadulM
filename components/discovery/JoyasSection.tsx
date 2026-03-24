"use client";

import React from "react";
import { Place } from "@/lib/types";
import AtmosphereCard from "./AtmosphereCard";

interface JoyasSectionProps {
  places: Place[];
}

// A hidden gem: not too many reviews, authentically rated
function isHiddenGem(place: Place): boolean {
  return place.avg_rating >= 4.2 && place.review_count < 150;
}

export default function JoyasSection({ places }: JoyasSectionProps) {
  const gems = places.filter(isHiddenGem).slice(0, 3);
  if (gems.length < 2) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Solo para locales</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Joyas escondidas
          </h2>
        </div>
        <p
          className="hidden sm:block"
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 300,
            maxWidth: "200px",
            textAlign: "right",
            lineHeight: "1.6",
          }}
        >
          Lugares que pocos conocen, que valen la pena
        </p>
      </div>

      {/* ── Grid ── */}
      {gems.length === 3 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <AtmosphereCard
              place={gems[0]}
              isGem
              heightClass="h-[440px]"
            />
          </div>
          <div className="flex flex-col gap-4">
            {gems.slice(1).map((place) => (
              <AtmosphereCard
                key={place.id}
                place={place}
                isGem
                heightClass="h-[210px]"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gems.map((place) => (
            <AtmosphereCard
              key={place.id}
              place={place}
              isGem
              heightClass="h-[380px]"
            />
          ))}
        </div>
      )}

      {/* ── Footer note ── */}
      <p
        className="mt-6 text-center"
        style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.28)",
          fontStyle: "italic",
          fontFamily: "'Playfair Display', Georgia, serif",
          letterSpacing: "0.02em",
        }}
      >
        Curado por el equipo de Descubre Colombia — sin patrocinios, sin rankings vacíos
      </p>
    </section>
  );
}
