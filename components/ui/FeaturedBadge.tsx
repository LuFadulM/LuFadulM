import React from "react";

interface FeaturedBadgeProps {
  label?: string;
  variant?: "gold" | "tendencia";
}

/**
 * Editorial curation badge for featured placements.
 * Intentionally subtle — feels like curation, not advertising.
 * Never use "Publicidad", "Anuncio", or "Patrocinado".
 */
export default function FeaturedBadge({ label = "Destacado", variant = "gold" }: FeaturedBadgeProps) {
  const styles =
    variant === "tendencia"
      ? {
          color: "rgba(255, 122, 122, 0.95)",
          background: "rgba(255, 122, 122, 0.08)",
          border: "1px solid rgba(255, 122, 122, 0.2)",
        }
      : {
          color: "#C8A44E",
          background: "rgba(200, 164, 78, 0.06)",
          border: "1px solid rgba(200, 164, 78, 0.3)",
        };

  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "9px",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontWeight: 600,
        fontFamily: "'Sora', system-ui, sans-serif",
        padding: "3px 9px",
        ...styles,
      }}
    >
      {label}
    </span>
  );
}
