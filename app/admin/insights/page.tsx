"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getAllFeaturedInsights, type DateRange, type PlaceInsights } from "@/lib/supabase/analytics-queries";
import DateRangeSelector from "@/components/analytics/DateRangeSelector";
import MetricGrid from "@/components/analytics/MetricGrid";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@hyex.co"];

const planLabel: Record<string, string> = {
  monthly:         "Mensual",
  quarterly:       "Trimestral",
  founding_partner:"Socio fundador",
  custom:          "Custom",
};

type SortKey = "impressions" | "clicks" | "ctr" | "priority";

export default function AdminInsightsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>("30d");
  const [sort, setSort] = useState<SortKey>("impressions");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (!data.user || !ADMIN_EMAILS.includes(data.user.email ?? "")) {
        router.push("/");
      }
    });
  }, [router]);

  const overview = useMemo(() => getAllFeaturedInsights(range), [range]);

  const sorted = useMemo(() => {
    return [...overview.placements].sort((a, b) => {
      if (sort === "impressions") return b.totalImpressions - a.totalImpressions;
      if (sort === "clicks")     return b.totalClicks - a.totalClicks;
      if (sort === "ctr")        return b.ctr - a.ctr;
      return b.rankPriority - a.rankPriority;
    });
  }, [overview.placements, sort]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
        <p style={{ color: "#4A4843", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Verificando acceso…
        </p>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) return null;

  const summaryMetrics = [
    { label: "Impresiones totales", value: overview.totalImpressions.toLocaleString("es-CO") },
    { label: "Clicks totales",      value: overview.totalClicks.toLocaleString("es-CO") },
    { label: "Vistas de perfil",    value: overview.totalProfileViews.toLocaleString("es-CO") },
    { label: "CTR promedio",        value: `${(overview.avgCtr * 100).toFixed(1)}%`, highlight: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/admin/featured"
              style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500 }}
              className="hover:text-[#706D64] transition-colors"
            >
              ← Placements
            </Link>
          </div>
          <p className="label-micro mb-3" style={{ color: "#C8A44E" }}>Admin · Analytics</p>
          <h1 className="font-serif" style={{ fontSize: "36px", color: "#D4D0C8" }}>
            Business Insights
          </h1>
        </div>
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      {/* Summary metrics */}
      <div className="mb-10">
        <MetricGrid metrics={summaryMetrics} cols={4} />
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-6 mb-6">
        <p style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600 }}>
          Ordenar por
        </p>
        {(["impressions", "clicks", "ctr", "priority"] as SortKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setSort(k)}
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: sort === k ? "#C8A44E" : "#4A4843",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              borderBottom: sort === k ? "1px solid rgba(200,164,78,0.5)" : "1px solid transparent",
              paddingBottom: "1px",
              transition: "color 0.15s",
            }}
          >
            {k === "impressions" ? "Impresiones" : k === "clicks" ? "Clicks" : k === "ctr" ? "CTR" : "Prioridad"}
          </button>
        ))}
      </div>

      {/* Placements table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Lugar", "Ciudad", "Plan", "Impresiones", "Clicks", "Vistas perfil", "CTR", "Engagement", ""].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#4A4843",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((p: PlaceInsights) => (
              <tr key={p.placementId} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#D4D0C8", fontWeight: 500, marginBottom: "2px" }}>
                      {p.placeName}
                    </p>
                    <span style={{
                      fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                      color: "#C8A44E", fontWeight: 600,
                      background: "rgba(200,164,78,0.06)", border: "1px solid rgba(200,164,78,0.2)",
                      padding: "1px 6px", display: "inline-block",
                    }}>
                      {p.labelText}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "12px", color: "#706D64" }}>{p.city}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "11px", color: "#706D64" }}>{planLabel[p.planType] ?? p.planType}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8" }}>
                    {p.totalImpressions.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8" }}>
                    {p.totalClicks.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8" }}>
                    {p.totalProfileViews.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    className="font-serif"
                    style={{
                      fontSize: "18px",
                      color: p.ctr >= 0.08 ? "#5A8F6E" : p.ctr >= 0.05 ? "#C8A44E" : "#706D64",
                    }}
                  >
                    {(p.ctr * 100).toFixed(1)}%
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#706D64" }}>
                    {(p.engagementRate * 100).toFixed(1)}%
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <Link
                    href={`/admin/insights/${p.placementId}`}
                    style={{
                      fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
                      fontWeight: 600, color: "#C8A44E", whiteSpace: "nowrap",
                    }}
                    className="hover:text-[#D4B05A] transition-colors"
                  >
                    Ver detalle →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "11px", color: "#3A3835", marginTop: "24px" }}>
        Datos de prueba (mock). Conectar Supabase para datos en tiempo real.
        {/* Future: expose /negocio/[placeId]/insights for claimed business owners */}
      </p>
    </div>
  );
}
