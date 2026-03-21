import React from "react";
import MetricCard from "./MetricCard";

export interface MetricDef {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}

interface MetricGridProps {
  metrics: MetricDef[];
  cols?: 2 | 3 | 4;
}

export default function MetricGrid({ metrics, cols = 3 }: MetricGridProps) {
  const colClass =
    cols === 4 ? "grid-cols-2 sm:grid-cols-4"
    : cols === 3 ? "grid-cols-2 sm:grid-cols-3"
    : "grid-cols-2";

  return (
    <div className={`grid ${colClass} gap-px`} style={{ background: "rgba(255,255,255,0.04)" }}>
      {metrics.map((m) => (
        <MetricCard key={m.label} {...m} />
      ))}
    </div>
  );
}
