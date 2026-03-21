import React from "react";
import type { DailyMetric } from "@/lib/supabase/analytics-queries";

interface InsightsChartProps {
  data: DailyMetric[];
  height?: number;
}

const PAD = { top: 20, right: 20, bottom: 36, left: 52 };

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function fmtDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", { month: "short", day: "numeric" });
}

export default function InsightsChart({ data, height = 220 }: InsightsChartProps) {
  if (data.length === 0) return null;

  const W = 800;
  const H = height;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxImp = Math.max(...data.map((d) => d.impressions), 1);
  const maxClk = Math.max(...data.map((d) => d.clicks), 1);
  const yMax = Math.ceil(Math.max(maxImp, maxClk) * 1.15);

  const xOf = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
  const yOf = (v: number) => PAD.top + innerH - (v / yMax) * innerH;

  // Y-axis labels (5 ticks)
  const ticks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));

  // X-axis: show up to 7 date labels evenly spaced
  const xLabelStep = Math.ceil(data.length / 7);
  const xLabels = data.filter((_, i) => i % xLabelStep === 0 || i === data.length - 1);

  const polyline = (points: [number, number][]) =>
    points.map(([x, y]) => `${x},${y}`).join(" ");

  const impPoints = data.map((d, i) => [xOf(i), yOf(d.impressions)] as [number, number]);
  const clkPoints = data.map((d, i) => [xOf(i), yOf(d.clicks)] as [number, number]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-hidden="true"
    >
      {/* Grid lines */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD.left}
            y1={yOf(t)}
            x2={W - PAD.right}
            y2={yOf(t)}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          <text
            x={PAD.left - 8}
            y={yOf(t) + 4}
            textAnchor="end"
            fill="#3A3835"
            fontSize="10"
            fontFamily="'Sora', system-ui, sans-serif"
          >
            {fmt(t)}
          </text>
        </g>
      ))}

      {/* X-axis date labels */}
      {xLabels.map((d) => {
        const i = data.indexOf(d);
        return (
          <text
            key={d.date}
            x={xOf(i)}
            y={H - 8}
            textAnchor="middle"
            fill="#3A3835"
            fontSize="10"
            fontFamily="'Sora', system-ui, sans-serif"
          >
            {fmtDate(d.date)}
          </text>
        );
      })}

      {/* Impressions area fill */}
      <polygon
        points={[
          [PAD.left, PAD.top + innerH],
          ...impPoints,
          [W - PAD.right, PAD.top + innerH],
        ]
          .map(([x, y]) => `${x},${y}`)
          .join(" ")}
        fill="rgba(212,208,200,0.04)"
      />

      {/* Impressions line */}
      <polyline
        points={polyline(impPoints)}
        fill="none"
        stroke="rgba(212,208,200,0.35)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Clicks area fill */}
      <polygon
        points={[
          [PAD.left, PAD.top + innerH],
          ...clkPoints,
          [W - PAD.right, PAD.top + innerH],
        ]
          .map(([x, y]) => `${x},${y}`)
          .join(" ")}
        fill="rgba(200,164,78,0.06)"
      />

      {/* Clicks line */}
      <polyline
        points={polyline(clkPoints)}
        fill="none"
        stroke="#C8A44E"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots on last points */}
      {[impPoints[impPoints.length - 1], clkPoints[clkPoints.length - 1]].map(
        ([x, y], idx) => (
          <circle
            key={idx}
            cx={x}
            cy={y}
            r="3"
            fill={idx === 0 ? "rgba(212,208,200,0.5)" : "#C8A44E"}
          />
        )
      )}

      {/* Legend */}
      <g transform={`translate(${PAD.left}, ${PAD.top - 6})`}>
        <line x1="0" y1="0" x2="16" y2="0" stroke="rgba(212,208,200,0.4)" strokeWidth="1.5" />
        <text x="22" y="4" fill="#706D64" fontSize="10" fontFamily="'Sora', system-ui, sans-serif">
          Impresiones
        </text>
        <line x1="110" y1="0" x2="126" y2="0" stroke="#C8A44E" strokeWidth="2" />
        <text x="132" y="4" fill="#706D64" fontSize="10" fontFamily="'Sora', system-ui, sans-serif">
          Clicks
        </text>
      </g>
    </svg>
  );
}
