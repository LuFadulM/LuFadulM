"use client";

import React, { useState } from "react";
import { Place } from "@/lib/types";
import AtmosphereCard from "./AtmosphereCard";

interface HoySectionProps {
  places: Place[];
}

const CITY_FILTERS = ["Todas", "Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta"];

// Derived moment for a place based on its category and tags
function getMoment(place: Place): string {
  if (place.category === "Cafés") return "Esta mañana";
  if (place.category === "Nightlife") return "Esta noche";
  if (place.category === "Bars") return "Esta tarde";
  if (place.category === "Hotels") return "Este fin";
  if (place.category === "Attractions") return "Plan del día";
  // Restaurants — vary by tags
  if (place.tags.some((t) => t.includes("brunch") || t.includes("breakfast"))) return "Esta mañana";
  if (place.tags.some((t) => t.includes("rooftop") || t.includes("cocktail"))) return "Esta noche";
  return "Para hoy";
}

export default function HoySection({ places }: HoySectionProps) {
  const [activeCity, setActiveCity] = useState("Todas");

  const filtered = places.filter((p) => {
    if (activeCity === "Todas") return true;
    return p.city === activeCity;
  }).slice(0, 8);

  if (places.length === 0) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Descubre</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Hoy en tu ciudad
          </h2>
        </div>

        <a href="#explore" className="link-gold hidden sm:flex">
          Ver todo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* ── City filter pills ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
        {CITY_FILTERS.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            style={{
              flexShrink: 0,
              padding: "5px 14px",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "'Sora', system-ui, sans-serif",
              background:
                activeCity === city
                  ? "rgba(212,175,55,0.12)"
                  : "rgba(255,255,255,0.04)",
              color:
                activeCity === city
                  ? "#D4AF37"
                  : "rgba(255,255,255,0.35)",
              border:
                activeCity === city
                  ? "1px solid rgba(212,175,55,0.3)"
                  : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "100px !important",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      {/* ── Horizontal scroll ── */}
      <div className="scroll-row">
        {filtered.map((place) => (
          <div
            key={place.id}
            className="scroll-row-item"
            style={{ width: "clamp(240px, 30vw, 300px)" }}
          >
            <AtmosphereCard
              place={place}
              momentTag={getMoment(place)}
              heightClass="h-[340px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
