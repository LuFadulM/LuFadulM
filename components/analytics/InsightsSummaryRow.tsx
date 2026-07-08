import React from "react";
import type { FeaturedOverview } from "@/lib/supabase/analytics-queries";

interface InsightsSummaryRowProps {
  overview: FeaturedOverview;
}

interface SummaryCell {
  label: string;
  value: string;
  gold?: boolean;
}

export default function InsightsSummaryRow({ overview }: InsightsSummaryRowProps) {
  const cells: SummaryCell[] = [
    {
      label: "Total impresiones",
      value: overview.totalImpressions.toLocaleString("es-CO"),
    },
    {
      label: "Total clics",
      value: overview.totalClicks.toLocaleString("es-CO"),
    },
    {
      label: "CTR promedio",
      value: `${(overview.avgCtr * 100).toFixed(1)}%`,
      gold: true,
    },
    {
      label: "Guardados totales",
      value: overview.totalSaves.toLocaleString("es-CO"),
    },
  ];

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-px"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {cells.map((c) => (
        <div
          key={c.label}
          style={{
            background: "#0F1B15",
            borderTop: c.gold
              ? "2px solid rgba(61,220,151,0.4)"
              : "1px solid rgba(255,255,255,0.06)",
            padding: "22px 24px",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#3A4A41",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            {c.label}
          </p>
          <p
            className="font-serif"
            style={{
              fontSize: "32px",
              color: c.gold ? "#3DDC97" : "#CBD6CE",
              lineHeight: 1,
            }}
          >
            {c.value}
          </p>
        </div>
      ))}
    </div>
  );
}
