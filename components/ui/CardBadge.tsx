import React from "react";

interface CardBadgeProps {
  label: string;
  variant?: "editorial" | "moment" | "status" | "live";
  icon?: React.ReactNode;
}

const VARIANT_STYLES: Record<
  "editorial" | "moment" | "status" | "live",
  { color: string; bg: string; border: string }
> = {
  /** Gold — editorial picks, gems, premium curation */
  editorial: {
    color: "#D98D72",
    bg: "rgba(177,152,124,0.08)",
    border: "rgba(177,152,124,0.22)",
  },
  /** Warm amber — time-of-day / moment tags (unified, no per-moment hue) */
  moment: {
    color: "rgba(177,152,124,0.75)",
    bg: "rgba(177,152,124,0.06)",
    border: "rgba(177,152,124,0.15)",
  },
  /** Muted white — trending / popular status (subdued, not distracting) */
  status: {
    color: "rgba(255,255,255,0.45)",
    bg: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.10)",
  },
  /** Sage — live / nuevo (only for freshness signal) */
  live: {
    color: "#8A9E6A",
    bg: "rgba(138,158,106,0.10)",
    border: "rgba(138,158,106,0.25)",
  },
};

export default function CardBadge({ label, variant = "editorial", icon }: CardBadgeProps) {
  const s = VARIANT_STYLES[variant];
  const isLive = variant === "live";
  return (
    <span
      style={{
        borderRadius: "100px",
        fontSize: "8px",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        padding: "3px 10px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        backdropFilter: "blur(4px)",
        fontFamily: "'Sora', system-ui, sans-serif",
        whiteSpace: "nowrap",
      }}
    >
      {isLive && (
        <span
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#8A9E6A",
            flexShrink: 0,
            animation: "pulse-dot 2s ease-in-out infinite",
            display: "inline-block",
          }}
        />
      )}
      {icon && !isLive && icon}
      {label}
    </span>
  );
}
