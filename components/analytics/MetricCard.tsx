import React from "react";

interface MetricCardProps {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean; // gold accent
}

export default function MetricCard({ label, value, sub, highlight = false }: MetricCardProps) {
  return (
    <div
      style={{
        background: "#0F1B15",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: highlight ? "2px solid rgba(61,220,151,0.4)" : "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
      }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#3A4A41",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {label}
      </p>
      <p
        className="font-serif"
        style={{
          fontSize: "30px",
          color: highlight ? "#3DDC97" : "#CBD6CE",
          lineHeight: 1,
          marginBottom: sub ? "6px" : 0,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: "11px", color: "#3A4A41", marginTop: "4px" }}>{sub}</p>
      )}
    </div>
  );
}
