"use client";

import React, { useState } from "react";

interface ColombiaMapProps {
  onCitySelect?: (city: string) => void;
  selectedCity?: string;
}

// ─── City markers ─────────────────────────────────────────────────────────────
// Coordinates relative to the SVG viewBox (0 0 240 300)

const CITY_MARKERS = [
  {
    id: "Cartagena",
    x: 80,
    y: 36,
    labelAnchor: "end" as const,
    labelX: 74,
    labelY: 34,
  },
  {
    id: "Barranquilla",
    x: 100,
    y: 24,
    labelAnchor: "middle" as const,
    labelX: 100,
    labelY: 16,
  },
  {
    id: "Santa Marta",
    x: 120,
    y: 26,
    labelAnchor: "start" as const,
    labelX: 126,
    labelY: 24,
  },
  {
    id: "Medellín",
    x: 76,
    y: 132,
    labelAnchor: "end" as const,
    labelX: 70,
    labelY: 130,
  },
  {
    id: "Bogotá",
    x: 120,
    y: 180,
    labelAnchor: "start" as const,
    labelX: 126,
    labelY: 178,
  },
  {
    id: "Cali",
    x: 66,
    y: 206,
    labelAnchor: "end" as const,
    labelX: 60,
    labelY: 204,
  },
];

// ─── Colombia outline path ────────────────────────────────────────────────────
// Clockwise from the Panama/Pacific northwest corner

const COLOMBIA_PATH =
  "M 44,94 " +
  "L 32,112 26,140 28,170 38,200 52,228 68,248 " +    // Pacific coast + SW corner
  "L 92,260 120,268 152,266 178,254 " +               // South border
  "L 196,226 200,192 196,158 190,122 180,90 " +       // East border (Venezuela)
  "L 170,66 162,44 155,26 148,14 " +                  // NE + Guajira rise
  "L 140,22 130,30 " +                                // Guajira descent to coast
  "L 116,24 98,24 82,32 " +                           // Caribbean coast west
  "L 68,54 58,72 48,82 44,94 " +                      // Gulf of Urabá + back
  "Z";

// ─── Interior accent lines (Andes + Magdalena river, very faint) ─────────────
const ANDES_PATH  = "M 66,205 C 72,175 76,148 80,128 C 84,108 88,92 90,72";
const MAGDALENA_PATH = "M 94,258 C 98,228 104,198 108,172 C 112,148 114,128 116,108 C 118,90 118,70 116,52";

export default function ColombiaMap({ onCitySelect, selectedCity }: ColombiaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCityClick = (cityId: string) => {
    if (!onCitySelect) return;
    // Toggle off if already selected
    onCitySelect(selectedCity === cityId ? "All" : cityId);
  };

  return (
    <div
      className="relative flex items-center justify-center w-full h-full"
      style={{ minHeight: "360px" }}
    >
      <svg
        viewBox="0 0 240 300"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          maxWidth: "340px",
          height: "auto",
          overflow: "visible",
        }}
        aria-label="Mapa de Colombia"
      >
        <defs>
          {/* Sea diagonal hatching */}
          <pattern
            id="sea-hatch"
            x="0" y="0" width="10" height="10"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0" y1="10" x2="10" y2="0"
              stroke="rgba(212,175,55,0.055)"
              strokeWidth="0.6"
            />
          </pattern>

          {/* Clip to SVG bounds */}
          <clipPath id="svg-bounds">
            <rect x="0" y="0" width="240" height="300" />
          </clipPath>

          {/* City glow filter */}
          <filter id="city-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gold glow for selected/hovered */}
          <filter id="gold-glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0.8 0 0 0  0.8 0.6 0 0 0  0 0 0 0 0  0 0 0 1.2 0"
              result="goldBlur"
            />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Map drawing animation */}
          <style>{`
            @keyframes draw-colombia {
              from { stroke-dashoffset: 1800; opacity: 0.3; }
              to   { stroke-dashoffset: 0;    opacity: 1; }
            }
            .colombia-outline {
              stroke-dasharray: 1800;
              animation: draw-colombia 2.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            @keyframes dot-appear {
              from { opacity: 0; transform: scale(0); }
              to   { opacity: 1; transform: scale(1); }
            }
            .city-group {
              animation: dot-appear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              opacity: 0;
            }
          `}</style>
        </defs>

        {/* ── Sea hatching (full background) ── */}
        <rect
          x="-20" y="-20" width="280" height="340"
          fill="url(#sea-hatch)"
          clipPath="url(#svg-bounds)"
        />

        {/* ── Colombia land fill ── */}
        <path
          d={COLOMBIA_PATH}
          fill="rgba(18, 16, 10, 0.95)"
          stroke="none"
        />

        {/* ── Very faint interior geography ── */}
        <path
          d={ANDES_PATH}
          fill="none"
          stroke="rgba(212,175,55,0.06)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d={MAGDALENA_PATH}
          fill="none"
          stroke="rgba(138,180,224,0.07)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />

        {/* ── Colombia outline — animated draw ── */}
        <path
          className="colombia-outline"
          d={COLOMBIA_PATH}
          fill="none"
          stroke="rgba(212,175,55,0.38)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* ── Mar Caribe label ── */}
        <text
          x="154"
          y="52"
          textAnchor="middle"
          fill="rgba(212,175,55,0.18)"
          fontSize="6.5"
          fontFamily="'Sora', system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="0.18em"
          style={{ textTransform: "uppercase" }}
        >
          MAR CARIBE
        </text>

        {/* ── Océano Pacífico label ── */}
        <text
          x="14"
          y="160"
          textAnchor="middle"
          fill="rgba(212,175,55,0.15)"
          fontSize="6"
          fontFamily="'Sora', system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="0.14em"
          transform="rotate(-90 14 160)"
          style={{ textTransform: "uppercase" }}
        >
          OCÉANO PACÍFICO
        </text>

        {/* ── Compass rose — top right ── */}
        <g transform="translate(214, 30)">
          {/* N indicator */}
          <line x1="0" y1="-8" x2="0" y2="-2" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8" />
          <polygon points="0,-12 -2,-4 2,-4" fill="rgba(212,175,55,0.55)" />
          <text
            x="0" y="-13"
            textAnchor="middle"
            fill="rgba(212,175,55,0.45)"
            fontSize="5"
            fontFamily="'Sora', system-ui, sans-serif"
            fontWeight="700"
            letterSpacing="0.1em"
          >
            N
          </text>
          {/* Cross hairs */}
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="rgba(212,175,55,0.35)" />
        </g>

        {/* ── "Colombia" italic label — center of map ── */}
        <text
          x="128"
          y="148"
          textAnchor="middle"
          fill="rgba(212,175,55,0.09)"
          fontSize="13"
          fontFamily="'Playfair Display', Georgia, serif"
          fontStyle="italic"
          letterSpacing="0.08em"
        >
          Colombia
        </text>

        {/* ── City markers ── */}
        {CITY_MARKERS.map((city, i) => {
          const isSelected = selectedCity === city.id;
          const isHovered  = hovered === city.id;
          const isActive   = isSelected || isHovered;

          const dotColor   = isSelected ? "#D4AF37" : isHovered ? "#E8CC7A" : "rgba(242,242,242,0.55)";
          const ringColor  = isActive ? "rgba(212,175,55,0.25)" : "rgba(255,255,255,0.06)";
          const labelColor = isSelected ? "#D4AF37" : isHovered ? "#E8CC7A" : "rgba(255,255,255,0.35)";
          const delay      = `${0.8 + i * 0.12}s`;

          return (
            <g
              key={city.id}
              className="city-group"
              style={{ animationDelay: delay, cursor: onCitySelect ? "pointer" : "default" }}
              onMouseEnter={() => setHovered(city.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleCityClick(city.id)}
            >
              {/* Outer ring */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isActive ? 7 : 5}
                fill="none"
                stroke={ringColor}
                strokeWidth="0.8"
                style={{ transition: "all 0.25s ease" }}
              />

              {/* Inner dot */}
              <circle
                cx={city.x}
                cy={city.y}
                r={isActive ? 3 : 2}
                fill={dotColor}
                filter={isActive ? "url(#gold-glow)" : undefined}
                style={{ transition: "all 0.25s ease" }}
              />

              {/* Crosshair tick lines (croquis style) */}
              <line
                x1={city.x - 5} y1={city.y}
                x2={city.x - 3} y2={city.y}
                stroke={isActive ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.6"
                style={{ transition: "stroke 0.25s ease" }}
              />
              <line
                x1={city.x + 3} y1={city.y}
                x2={city.x + 5} y2={city.y}
                stroke={isActive ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.12)"}
                strokeWidth="0.6"
                style={{ transition: "stroke 0.25s ease" }}
              />

              {/* City label */}
              <text
                x={city.labelX}
                y={city.labelY}
                textAnchor={city.labelAnchor}
                fill={labelColor}
                fontSize="6.2"
                fontFamily="'Sora', system-ui, sans-serif"
                fontWeight="600"
                letterSpacing="0.16em"
                style={{
                  textTransform: "uppercase",
                  transition: "fill 0.25s ease",
                  userSelect: "none",
                }}
              >
                {city.id}
              </text>
            </g>
          );
        })}

        {/* ── Scale bar — bottom right ── */}
        <g transform="translate(170, 282)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="0" y1="-2" x2="0" y2="2" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="30" y1="-2" x2="30" y2="2" stroke="rgba(212,175,55,0.25)" strokeWidth="0.6" />
          <line x1="15" y1="-1" x2="15" y2="1" stroke="rgba(212,175,55,0.2)" strokeWidth="0.6" />
          <text
            x="15" y="-4"
            textAnchor="middle"
            fill="rgba(212,175,55,0.22)"
            fontSize="4.5"
            fontFamily="'Sora', system-ui, sans-serif"
            fontWeight="500"
            letterSpacing="0.08em"
          >
            ~600 km
          </text>
        </g>
      </svg>
    </div>
  );
}
