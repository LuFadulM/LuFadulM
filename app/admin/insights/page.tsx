// Future: expose featured analytics as /negocio/[placeId]/insights for claimed business owners
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  getAllFeaturedInsights,
  daysAgo,
  ANALYTICS_END_DATE,
  ANALYTICS_START_DATE,
  type PlaceInsights,
} from "@/lib/supabase/analytics-queries";
import DateRangeSelector from "@/components/analytics/DateRangeSelector";
import InsightsSummaryRow from "@/components/analytics/InsightsSummaryRow";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@hyex.co"];

type SortKey = "impressions" | "clicks" | "ctr" | "profileViews" | "saves" | "shares";
type SortDir = "desc" | "asc";

function SortTh({
  label, col, current, dir, onSort,
}: {
  label: string; col: SortKey; current: SortKey; dir: SortDir;
  onSort: (col: SortKey) => void;
}) {
  const active = col === current;
  return (
    <th
      onClick={() => onSort(col)}
      style={{
        textAlign: "left",
        padding: "10px 16px",
        fontSize: "9px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 600,
        color: active ? "#C8A44E" : "#4A4843",
        whiteSpace: "nowrap",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {label}
      <span style={{ marginLeft: "4px", opacity: active ? 1 : 0.3 }}>
        {active ? (dir === "desc" ? "↓" : "↑") : "↕"}
      </span>
    </th>
  );
}

export default function AdminInsightsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(daysAgo(30, ANALYTICS_END_DATE));
  const [endDate, setEndDate] = useState(ANALYTICS_END_DATE);
  const [sortKey, setSortKey] = useState<SortKey>("impressions");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

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

  const overview = useMemo(() => getAllFeaturedInsights(startDate, endDate), [startDate, endDate]);

  function handleSort(col: SortKey) {
    if (col === sortKey) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(col);
      setSortDir("desc");
    }
  }

  const sorted = useMemo(() => {
    const sign = sortDir === "desc" ? -1 : 1;
    return [...overview.placements].sort((a, b) => {
      let av = 0, bv = 0;
      if (sortKey === "impressions")   { av = a.totals.impressions;   bv = b.totals.impressions; }
      if (sortKey === "clicks")        { av = a.totals.cardClicks;    bv = b.totals.cardClicks; }
      if (sortKey === "ctr")           { av = a.ctr;                  bv = b.ctr; }
      if (sortKey === "profileViews")  { av = a.totals.profileViews;  bv = b.totals.profileViews; }
      if (sortKey === "saves")         { av = a.totals.saves;         bv = b.totals.saves; }
      if (sortKey === "shares")        { av = a.totals.shares;        bv = b.totals.shares; }
      return (av - bv) * sign;
    });
  }, [overview.placements, sortKey, sortDir]);

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <Link
            href="/admin/featured"
            style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500, display: "block", marginBottom: "12px" }}
            className="hover:text-[#706D64] transition-colors"
          >
            ← Placements
          </Link>
          <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A44E", fontWeight: 600, marginBottom: "8px" }}>
            Admin · Analytics
          </p>
          <h1 className="font-serif" style={{ fontSize: "36px", color: "#D4D0C8", lineHeight: 1 }}>
            Insights
          </h1>
        </div>
        <DateRangeSelector startDate={startDate} endDate={endDate}
          onChange={(s, e) => { setStartDate(s); setEndDate(e); }} />
      </div>

      {/* Summary row */}
      <div className="mb-10">
        <InsightsSummaryRow overview={overview} />
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#4A4843", whiteSpace: "nowrap" }}>
                Lugar
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#4A4843", whiteSpace: "nowrap" }}>
                Ciudad
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#4A4843", whiteSpace: "nowrap" }}>
                Estado
              </th>
              <SortTh label="Impresiones"  col="impressions"  current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortTh label="Clics"        col="clicks"       current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortTh label="CTR"          col="ctr"          current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortTh label="Vistas perfil" col="profileViews" current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortTh label="Guardados"    col="saves"        current={sortKey} dir={sortDir} onSort={handleSort} />
              <SortTh label="Compartidos"  col="shares"       current={sortKey} dir={sortDir} onSort={handleSort} />
              <th style={{ padding: "10px 16px" }} />
            </tr>
          </thead>
          <tbody>
            {sorted.map((p: PlaceInsights) => (
              <tr
                key={p.placementId}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                className="hover:bg-[#141413] transition-colors duration-100"
              >
                {/* Place name */}
                <td style={{ padding: "14px 16px" }}>
                  <Link href={`/admin/insights/${p.placementId}`}>
                    <p style={{ fontSize: "13px", color: "#C8A44E", fontWeight: 500, marginBottom: "3px" }}>
                      {p.placeName}
                    </p>
                  </Link>
                  <span style={{
                    fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#706D64", fontWeight: 600,
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "1px 6px", display: "inline-block",
                  }}>
                    {p.labelText}
                  </span>
                </td>
                {/* City */}
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "12px", color: "#706D64" }}>{p.city}</span>
                </td>
                {/* Status dot */}
                <td style={{ padding: "14px 16px" }}>
                  <div className="flex items-center gap-2">
                    <span style={{
                      width: "6px", height: "6px", borderRadius: "50%", display: "inline-block",
                      background: p.isActive ? "#5A8F6E" : "#3A3835",
                      boxShadow: p.isActive ? "0 0 6px rgba(90,143,110,0.6)" : "none",
                    }} />
                    <span style={{ fontSize: "10px", color: p.isActive ? "#5A8F6E" : "#3A3835" }}>
                      {p.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </td>
                {/* Metrics */}
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8", fontWeight: 300 }}>
                    {p.totals.impressions.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8", fontWeight: 300 }}>
                    {p.totals.cardClicks.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{
                    fontSize: "18px", fontWeight: 300,
                    color: p.ctr >= 0.08 ? "#5A8F6E" : p.ctr >= 0.05 ? "#C8A44E" : "#706D64",
                  }}>
                    {(p.ctr * 100).toFixed(1)}%
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8", fontWeight: 300 }}>
                    {p.totals.profileViews.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8", fontWeight: 300 }}>
                    {p.totals.saves.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8", fontWeight: 300 }}>
                    {p.totals.shares.toLocaleString("es-CO")}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <Link
                    href={`/admin/insights/${p.placementId}`}
                    style={{ fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "#C8A44E", whiteSpace: "nowrap" }}
                    className="hover:text-[#D4B05A] transition-colors"
                  >
                    Ver →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "11px", color: "#3A3835", marginTop: "24px" }}>
        Datos de prueba (mock). Conectar Supabase para datos en tiempo real.
      </p>
    </div>
  );
}
