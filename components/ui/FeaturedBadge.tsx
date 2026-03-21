import React from "react";

interface FeaturedBadgeProps {
  label?: string;
}

/**
 * Editorial curation badge for featured placements.
 * Intentionally subtle — feels like curation, not advertising.
 * Never use "Publicidad", "Anuncio", or "Patrocinado".
 */
export default function FeaturedBadge({ label = "Destacado" }: FeaturedBadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "9px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontWeight: 600,
        fontFamily: "'Sora', system-ui, sans-serif",
        color: "#C8A44E",
        background: "rgba(200,164,78,0.06)",
        border: "1px solid rgba(200,164,78,0.25)",
        padding: "3px 8px",
      }}
    >
      {label}
    </span>
  );
}
