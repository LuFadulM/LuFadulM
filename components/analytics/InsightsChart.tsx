"use client";

import React, { useRef, useState, useCallback } from "react";
import type { DailyMetric } from "@/lib/supabase/analytics-queries";

interface InsightsChartProps {
  data: DailyMetric[];
  height?: number;
}

interface TooltipState {
  screenX: number;
  screenY: number;
  item: DailyMetric;
}

const W = 800;
const PAD = { top: 28, right: 20, bottom: 36, left: 52 };

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function fmtDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", { weekday: "short", month: "short", day: "numeric" });
}

function fmtAxisDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-CO", { month: "short", day: "numeric" });
}

export default function InsightsChart({ data, height = 220 }: InsightsChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const H = height;
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const maxImp = Math.max(...data.map((d) => d.impressions), 1);
  const maxClk = Math.max(...data.map((d) => d.clicks), 1);
  const yMax = Math.ceil(Math.max(maxImp, maxClk) * 1.15);

  const xOf = (i: number) =>
    data.length < 2 ? PAD.left + innerW / 2 : PAD.left + (i / (data.length - 1)) * innerW;
  const yOf = (v: number) => PAD.top + innerH - (v / yMax) * innerH;

  const ticks = Array.from({ length: 5 }, (_, i) => Math.round((yMax / 4) * i));
  const xLabelStep = Math.max(1, Math.ceil(data.length / 7));

  const polyline = (pts: [number, number][]) => pts.map(([x, y]) => `${x},${y}`).join(" ");
  const impPts = data.map((_, i) => [xOf(i), yOf(data[i].impressions)] as [number, number]);
  const clkPts = data.map((_, i) => [xOf(i), yOf(data[i].clicks)] as [number, number]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current || !wrapRef.current || data.length === 0) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      // Map screen x → viewBox x
      const vbX = ((e.clientX - svgRect.left) / svgRect.width) * W;
      const dataX = vbX - PAD.left;
      if (dataX < 0 || dataX > innerW) { setTooltip(null); return; }
      const idx = Math.max(0, Math.min(data.length - 1, Math.round((dataX / innerW) * (data.length - 1))));

      const wrapRect = wrapRef.current.getBoundingClientRect();
      setTooltip({
        screenX: e.clientX - wrapRect.left,
        screenY: e.clientY - wrapRect.top,
        item: data[idx],
      });
    },
    [data, innerW]
  );

  if (data.length === 0) return null;

  return (
    <div ref={wrapRef} style={{ position: "relative", userSelect: "none" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid lines + Y labels */}
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} y1={yOf(t)} x2={W - PAD.right} y2={yOf(t)}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x={PAD.left - 8} y={yOf(t) + 4} textAnchor="end"
              fill="#3A3835" fontSize="10" fontFamily="'Sora',system-ui,sans-serif">
              {fmt(t)}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {data.filter((_, i) => i % xLabelStep === 0 || i === data.length - 1).map((d) => {
          const i = data.indexOf(d);
          return (
            <text key={d.date} x={xOf(i)} y={H - 8} textAnchor="middle"
              fill="#3A3835" fontSize="10" fontFamily="'Sora',system-ui,sans-serif">
              {fmtAxisDate(d.date)}
            </text>
          );
        })}

        {/* Impressions area fill */}
        <polygon
          points={[[PAD.left, PAD.top + innerH], ...impPts, [W - PAD.right, PAD.top + innerH]]
            .map(([x, y]) => `${x},${y}`).join(" ")}
          fill="rgba(212,208,200,0.04)"
        />
        {/* Impressions line */}
        <polyline points={polyline(impPts)} fill="none"
          stroke="rgba(212,208,200,0.35)" strokeWidth="1.5"
          strokeLinejoin="round" strokeLinecap="round" />

        {/* Clicks area fill */}
        <polygon
          points={[[PAD.left, PAD.top + innerH], ...clkPts, [W - PAD.right, PAD.top + innerH]]
            .map(([x, y]) => `${x},${y}`).join(" ")}
          fill="rgba(200,164,78,0.07)"
        />
        {/* Clicks line */}
        <polyline points={polyline(clkPts)} fill="none"
          stroke="#C8A44E" strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round" />

        {/* Hover vertical line */}
        {tooltip && (() => {
          const idx = data.indexOf(tooltip.item);
          return (
            <>
              <line x1={xOf(idx)} y1={PAD.top} x2={xOf(idx)} y2={PAD.top + innerH}
                stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={xOf(idx)} cy={yOf(tooltip.item.impressions)} r="3.5"
                fill="rgba(212,208,200,0.6)" />
              <circle cx={xOf(idx)} cy={yOf(tooltip.item.clicks)} r="3.5"
                fill="#C8A44E" />
            </>
          );
        })()}

        {/* Terminal dots */}
        <circle cx={impPts[impPts.length - 1][0]} cy={impPts[impPts.length - 1][1]}
          r="3" fill="rgba(212,208,200,0.5)" />
        <circle cx={clkPts[clkPts.length - 1][0]} cy={clkPts[clkPts.length - 1][1]}
          r="3" fill="#C8A44E" />

        {/* Legend */}
        <g transform={`translate(${PAD.left},${PAD.top - 12})`}>
          <line x1="0" y1="0" x2="16" y2="0" stroke="rgba(212,208,200,0.4)" strokeWidth="1.5" />
          <text x="22" y="4" fill="#706D64" fontSize="10" fontFamily="'Sora',system-ui,sans-serif">
            Impresiones
          </text>
          <line x1="114" y1="0" x2="130" y2="0" stroke="#C8A44E" strokeWidth="2" />
          <text x="136" y="4" fill="#706D64" fontSize="10" fontFamily="'Sora',system-ui,sans-serif">
            Clics
          </text>
        </g>
      </svg>

      {/* Tooltip overlay */}
      {tooltip && (
        <div
          style={{
            position: "absolute",
            left: Math.min(tooltip.screenX + 12, (wrapRef.current?.clientWidth ?? 9999) - 160),
            top: Math.max(tooltip.screenY - 60, 0),
            background: "#1A1918",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "10px 14px",
            pointerEvents: "none",
            minWidth: "140px",
            zIndex: 10,
          }}
        >
          <p style={{ fontSize: "9px", color: "#4A4843", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px" }}>
            {fmtDate(tooltip.item.date)}
          </p>
          <div className="flex items-center justify-between gap-4" style={{ marginBottom: "4px" }}>
            <span style={{ fontSize: "10px", color: "rgba(212,208,200,0.5)" }}>Impresiones</span>
            <span style={{ fontSize: "13px", color: "#D4D0C8", fontWeight: 500, fontFamily: "'Playfair Display',serif" }}>
              {tooltip.item.impressions}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span style={{ fontSize: "10px", color: "#C8A44E" }}>Clics</span>
            <span style={{ fontSize: "13px", color: "#C8A44E", fontWeight: 500, fontFamily: "'Playfair Display',serif" }}>
              {tooltip.item.clicks}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
