import React from "react";

interface RatingDisplayProps {
  rating: number;
  /** "dots" = 4px filled dots (browse cards), "stars" = unicode ★ (editorial), "starsvg" = SVG polygon (reviews) */
  mode?: "dots" | "stars" | "starsvg";
  /** "sm" = default, "md" = slightly larger */
  size?: "sm" | "md";
}

function RatingDots({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const filled = Math.round(rating);
  const px = size === "md" ? "5px" : "4px";
  return (
    <span className="flex items-center gap-[3px]" role="img" aria-label={`Calificación ${rating} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: px,
            height: px,
            borderRadius: "50%",
            background: i < filled ? "#D98D72" : "rgba(255,255,255,0.12)",
            flexShrink: 0,
          }}
        />
      ))}
    </span>
  );
}

function RatingStars({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const fontSize = size === "md" ? "13px" : "11px";
  return (
    <span role="img" aria-label={`Calificación ${rating} de 5`} aria-hidden="false">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ color: i < Math.round(rating) ? "#3DDC97" : "#2A2A28", fontSize }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function RatingStarSvg({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const px = size === "md" ? 11 : 9;
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Calificación ${rating} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={px} height={px} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i < rating ? "#3DDC97" : "#252522"}
            stroke={i < rating ? "#3DDC97" : "#252522"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function RatingDisplay({ rating, mode = "dots", size = "sm" }: RatingDisplayProps) {
  if (mode === "stars") return <RatingStars rating={rating} size={size} />;
  if (mode === "starsvg") return <RatingStarSvg rating={rating} size={size} />;
  return <RatingDots rating={rating} size={size} />;
}
