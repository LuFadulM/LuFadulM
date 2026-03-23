"use client";

import React, { useState } from "react";

// ─── Coordinate helpers ───────────────────────────────────────────────────────
// ViewBox: 0 0 290 310
// Real Colombia bounds: W 79.5° – W 66.9° (13° wide), N 12.6° – S 4.2° (16.8° tall)
// x = (79.5 - lon_W) / 13 * 210 + 40
// y = (12.6 - lat_N) / 18 * 272 + 15

// ─── Colombia outline (clockwise from SW corner) ──────────────────────────────
// Derived from real border coordinates, simplified to ~29 key points
const COLOMBIA_PATH =
  "M 48,183 " +                                  // SW – Ecuador / Pacific coast
  "L 56,160 L 67,130 L 72,107 " +               // Pacific coast going NW
  "L 64,100 " +                                  // Panama / Pacific corner (notch W)
  "L 74,92 " +                                   // Panama border heading to Caribbean
  "L 80,75 L 85,86 L 88,75 " +                  // Gulf of Urabá (dips south then back)
  "L 97,58 L 105,48 " +                          // Caribbean coast (west of Cartagena)
  "L 116,39 L 126,36 " +                         // Barranquilla → Santa Marta
  "L 137,24 " +                                  // Caribbean coast east
  "L 166,17 " +                                  // ← Guajira tip (northernmost)
  "L 163,24 L 158,29 " +                         // Guajira descent into Venezuela
  "L 164,47 L 177,69 L 193,85 " +               // Venezuela border curving SE
  "L 234,100 " +                                 // ← Easternmost point
  "L 234,145 L 234,190 " +                       // East border going south
  "L 210,221 " +                                 // Brazil border heading SW
  "L 192,269 " +                                 // ← Southernmost (Amazon)
  "L 169,236 L 163,213 L 153,198 " +            // South border going W (Peru / Ecuador)
  "L 105,190 " +                                 // Ecuador border interior
  "L 51,186 " +                                  // Ecuador / Pacific
  "Z";

// ─── Interior geography (very faint) ─────────────────────────────────────────
const ANDES_PATH     = "M 76,192 L 82,168 L 88,153 L 96,130 L 100,114 L 96,90 L 94,70";
const MAGDALENA_PATH = "M 102,172 L 108,148 L 115,128 L 118,108 L 116,80 L 120,55";

// ─── City markers (lat/lon → same coordinate formula) ────────────────────────
const CITY_MARKERS = [
  {
    id: "Cartagena",
    x: 103, y: 51,
    labelAnchor: "end"    as const, labelX: 97,  labelY: 49,
  },
  {
    id: "Barranquilla",
    x: 114, y: 42,
    labelAnchor: "middle" as const, labelX: 114, labelY: 34,
  },
  {
    id: "Santa Marta",
    x: 124, y: 38,
    labelAnchor: "start"  as const, labelX: 130, labelY: 36,
  },
  {
    id: "Medellín",
    x: 103, y: 111,
    labelAnchor: "end"    as const, labelX: 97,  labelY: 109,
  },
  {
    id: "Bogotá",
    x: 128, y: 134,
    labelAnchor: "start"  as const, labelX: 134, labelY: 132,
  },
  {
    id: "Cali",
    x: 88,  y: 153,
    labelAnchor: "end"    as const, labelX: 82,  labelY: 151,
  },
];

interface ColombiaMapProps {
  onCitySelect?: (city: string) => void;
  selectedCity?: string;
}

export default function ColombiaMap({ onCitySelect, selectedCity }: ColombiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCityClick = (id: string) => {
    if (!onCitySelect) return;
    onCitySelect(selectedCity === id ? "All" : id);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full" style={{ minHeight: "340px" }}>
      <svg
        viewBox="0 0 290 310"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: "360px", height: "auto", overflow: "visible" }}
        aria-label="Mapa de Colombia"
      >
        <defs>
          {/* Sea hatching */}
          <pattern id="sea-hatch" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="10" x2="10" y2="0" stroke="rgba(212,175,55,0.05)" strokeWidth="0.6" />
          </pattern>

          {/* Gold glow for active cities */}
          <filter id="gold-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0.8 0 0 0  0.8 0.6 0 0 0  0 0 0 0 0  0 0 0 1.4 0"
              result="goldBlur" />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <style>{`
            @keyframes draw-colombia {
              from { stroke-dashoffset: 2600; opacity: 0.2; }
              to   { stroke-dashoffset: 0;   opacity: 1; }
            }
            .colombia-outline {
              stroke-dasharray: 2600;
              animation: draw-colombia 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            @keyframes city-pop {
              from { opacity: 0; transform: scale(0.2); }
              to   { opacity: 1; transform: scale(1); }
            }
            .city-group {
              opacity: 0;
              animation: city-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
        </defs>

        {/* Sea hatching (full canvas) */}
        <rect x="-5" y="-5" width="300" height="320" fill="url(#sea-hatch)" />

        {/* Land fill — covers hatching inside Colombia */}
        <path d={COLOMBIA_PATH} fill="rgba(14,12,8,0.97)" stroke="none" />

        {/* Very faint Andes + Magdalena river */}
        <path d={ANDES_PATH}     fill="none" stroke="rgba(212,175,55,0.055)" strokeWidth="1" strokeLinecap="round" />
        <path d={MAGDALENA_PATH} fill="none" stroke="rgba(120,165,210,0.07)"  strokeWidth="0.8" strokeLinecap="round" />

        {/* Colombia outline — animated draw */}
        <path
          className="colombia-outline"
          d={COLOMBIA_PATH}
          fill="none"
          stroke="rgba(212,175,55,0.42)"
          strokeWidth="1.1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── Decorative labels ── */}

        {/* MAR CARIBE */}
        <text x="175" y="52" textAnchor="middle"
          fill="rgba(212,175,55,0.18)" fontSize="6"
          fontFamily="'Sora',system-ui,sans-serif" fontWeight="500" letterSpacing="0.2em">
          MAR CARIBE
        </text>

        {/* OCÉANO PACÍFICO — rotated */}
        <text x="28" y="148" textAnchor="middle"
          fill="rgba(212,175,55,0.15)" fontSize="5.5"
          fontFamily="'Sora',system-ui,sans-serif" fontWeight="500" letterSpacing="0.15em"
          transform="rotate(-90 28 148)">
          OCÉANO PACÍFICO
        </text>

        {/* Colombia italic watermark */}
        <text x="158" y="155" textAnchor="middle"
          fill="rgba(212,175,55,0.08)" fontSize="13"
          fontFamily="'Playfair Display',Georgia,serif" fontStyle="italic">
          Colombia
        </text>

        {/* ── Compass rose ── */}
        <g transform="translate(262,30)">
          <line x1="0" y1="-9" x2="0" y2="-3" stroke="rgba(212,175,55,0.5)" strokeWidth="0.7" />
          <polygon points="0,-13 -2.5,-4 2.5,-4" fill="rgba(212,175,55,0.55)" />
          <text x="0" y="-15" textAnchor="middle"
            fill="rgba(212,175,55,0.5)" fontSize="5"
            fontFamily="'Sora',system-ui,sans-serif" fontWeight="700" letterSpacing="0.1em">
            N
          </text>
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="rgba(212,175,55,0.35)" />
        </g>

        {/* ── Scale bar ── */}
        <g transform="translate(202,292)">
          <line x1="0" y1="0" x2="32" y2="0" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="32" y1="-2.5" x2="32" y2="2.5" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="16" y1="-1.5" x2="16" y2="1.5" stroke="rgba(212,175,55,0.18)" strokeWidth="0.6" />
          <text x="16" y="-5" textAnchor="middle"
            fill="rgba(212,175,55,0.22)" fontSize="4.5"
            fontFamily="'Sora',system-ui,sans-serif" fontWeight="500" letterSpacing="0.08em">
            ~600 km
          </text>
        </g>

        {/* ── City markers ── */}
        {CITY_MARKERS.map((city, i) => {
          const isSelected = selectedCity === city.id;
          const isHovered  = hovered === city.id;
          const isActive   = isSelected || isHovered;

          const dotFill    = isActive ? "#D4AF37" : "rgba(242,242,242,0.65)";
          const ringStroke = isActive ? "rgba(212,175,55,0.3)" : "rgba(255,255,255,0.08)";
          const labelFill  = isSelected ? "#D4AF37" : isHovered ? "#E0C878" : "rgba(255,255,255,0.38)";

          return (
            <g
              key={city.id}
              className="city-group"
              style={{
                animationDelay: `${0.9 + i * 0.1}s`,
                cursor: onCitySelect ? "pointer" : "default",
              }}
              onMouseEnter={() => setHovered(city.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCityClick(city.id)}
            >
              {/* Outer ring */}
              <circle cx={city.x} cy={city.y} r={isActive ? 7 : 5}
                fill="none" stroke={ringStroke} strokeWidth="0.8"
                style={{ transition: "all 0.25s ease" }} />

              {/* Crosshair ticks */}
              <line x1={city.x - 6} y1={city.y} x2={city.x - 3} y2={city.y}
                stroke={isActive ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.14)"}
                strokeWidth="0.6" style={{ transition: "stroke 0.25s ease" }} />
              <line x1={city.x + 3} y1={city.y} x2={city.x + 6} y2={city.y}
                stroke={isActive ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.14)"}
                strokeWidth="0.6" style={{ transition: "stroke 0.25s ease" }} />

              {/* Dot */}
              <circle cx={city.x} cy={city.y} r={isActive ? 2.8 : 2}
                fill={dotFill}
                filter={isActive ? "url(#gold-glow)" : undefined}
                style={{ transition: "all 0.25s ease" }} />

              {/* Label */}
              <text
                x={city.labelX} y={city.labelY}
                textAnchor={city.labelAnchor}
                fill={labelFill}
                fontSize="6"
                fontFamily="'Sora',system-ui,sans-serif"
                fontWeight="600"
                letterSpacing="0.15em"
                style={{ textTransform: "uppercase", transition: "fill 0.25s ease", userSelect: "none" }}
              >
                {city.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
