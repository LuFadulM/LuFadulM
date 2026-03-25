"use client";

import React from "react";
import { Place } from "@/lib/types";
import DiscoverCard from "./DiscoverCard";

interface JoyasSectionProps {
  places: Place[];
}

function isHiddenGem(place: Place): boolean {
  return place.avg_rating >= 4.2 && place.review_count < 150;
}

export default function JoyasSection({ places }: JoyasSectionProps) {
  const gems = places.filter(isHiddenGem).slice(0, 4);
  if (gems.length < 2) return null;

  return (
    <section>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "28px", paddingBottom: "20px",
          borderBottom: "1px solid rgba(28,28,28,0.08)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
              fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
              color: "#C6A85C", marginBottom: "8px",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#C6A85C", verticalAlign: "middle" }} />
            Solo para locales
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "#1C1C1C", fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Joyas escondidas
          </h2>
        </div>
        <p
          className="hidden sm:block font-serif"
          style={{ fontSize: "13px", color: "#9A9087", fontStyle: "italic", maxWidth: "200px", textAlign: "right", lineHeight: "1.6" }}
        >
          Lugares que pocos conocen, que valen la pena
        </p>
      </div>

      {/* ── Grid — asymmetric for first card ── */}
      {gems.length >= 3 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "16px" }}>
          {/* First gem — large (6 cols) */}
          <div style={{ gridColumn: "span 6" }}>
            <DiscoverCard place={gems[0]} isGem aspectRatio="4/3" />
          </div>
          {/* Remaining gems — 3 cols each */}
          {gems.slice(1, 4).map((place) => (
            <div key={place.id} style={{ gridColumn: "span 3" }}>
              <DiscoverCard place={place} isGem aspectRatio="3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "16px" }}
          className="md:grid-cols-2"
        >
          {gems.map((place) => (
            <DiscoverCard key={place.id} place={place} isGem aspectRatio="3/2" />
          ))}
        </div>
      )}

      {/* Footer note */}
      <p
        className="mt-8 text-center font-serif"
        style={{ fontSize: "12px", color: "#B0ABA4", fontStyle: "italic" }}
      >
        Curado por el equipo de Descubre Colombia — sin patrocinios, sin rankings vacíos
      </p>
    </section>
  );
}
