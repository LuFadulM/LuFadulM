"use client";

import React from "react";
import { Place } from "@/lib/types";
import AtmosphereCard from "./AtmosphereCard";

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
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "28px", paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div>
          <p style={{
            fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
            color: "#C6A85C", marginBottom: "8px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#C6A85C" }} />
            Solo para locales
          </p>
          <h2 className="font-serif" style={{
            fontSize: "clamp(22px, 3vw, 32px)",
            color: "#E8E4DC", fontWeight: 400, letterSpacing: "-0.02em",
          }}>
            Joyas escondidas
          </h2>
          <p style={{
            fontSize: "13px", color: "rgba(220,215,207,0.52)",
            fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 300, marginTop: "6px",
          }}>
            Los rincones que los locales no comparten fácilmente
          </p>
        </div>
        <p className="hidden sm:block font-serif" style={{
          fontSize: "13px", color: "rgba(255,255,255,0.32)",
          fontStyle: "italic", maxWidth: "200px", textAlign: "right", lineHeight: "1.6",
        }}>
          Curado sin patrocinios, sin rankings vacíos
        </p>
      </div>

      {/* ── Asymmetric grid — 7 + 5 columns ── */}
      {gems.length >= 3 ? (
        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: "16px" }}>
          {/* Large gem */}
          <AtmosphereCard place={gems[0]} isGem heightClass="h-[440px]" />
          {/* Stacked smaller gems */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {gems.slice(1, 3).map((place) => (
              <AtmosphereCard key={place.id} place={place} isGem heightClass="h-[204px]" />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "16px" }}>
          {gems.map((place) => (
            <AtmosphereCard key={place.id} place={place} isGem heightClass="h-[360px]" />
          ))}
        </div>
      )}

      {/* Optional 4th gem — full width short */}
      {gems.length >= 4 && (
        <div style={{ marginTop: "16px" }}>
          <AtmosphereCard place={gems[3]} isGem heightClass="h-[200px]" />
        </div>
      )}
    </section>
  );
}
