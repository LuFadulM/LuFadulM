// Future: expose this as /negocio/[placeId]/insights for claimed business owners
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  getPlaceInsights,
  daysAgo,
  ANALYTICS_END_DATE,
} from "@/lib/supabase/analytics-queries";
import DateRangeSelector from "@/components/analytics/DateRangeSelector";
import InsightsChart from "@/components/analytics/InsightsChart";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@hyex.co"];

const planLabel: Record<string, string> = {
  monthly:          "Mensual",
  quarterly:        "Trimestral",
  founding_partner: "Socio fundador",
  custom:           "Custom",
};

interface MetricTile {
  label: string;
  value: string | number;
}

function MetricTile({ label, value }: MetricTile) {
  return (
    <div style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.04)", padding: "20px 22px" }}>
      <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600, marginBottom: "10px" }}>
        {label}
      </p>
      <p style={{ fontSize: "24px", color: "#D4D0C8", fontWeight: 300, fontFamily: "'Sora',system-ui,sans-serif", lineHeight: 1 }}>
        {value}
      </p>
    </div>
  );
}

function BigStatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.04)", borderTop: "2px solid rgba(200,164,78,0.35)", padding: "24px 28px", flex: 1 }}>
      <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600, marginBottom: "14px" }}>
        {label}
      </p>
      <p className="font-serif" style={{ fontSize: "42px", color: "#C8A44E", lineHeight: 1 }}>
        {value}
      </p>
      {sub && (
        <p style={{ fontSize: "11px", color: "#4A4843", marginTop: "6px" }}>{sub}</p>
      )}
    </div>
  );
}

export default function PlaceInsightsPage() {
  const router = useRouter();
  const params = useParams();
  const placementId = params.placeId as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(daysAgo(30, ANALYTICS_END_DATE));
  const [endDate, setEndDate] = useState(ANALYTICS_END_DATE);

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

  const insights = useMemo(
    () => getPlaceInsights(placementId, startDate, endDate),
    [placementId, startDate, endDate]
  );

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
  if (!insights) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p style={{ color: "#4A4843", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Placement no encontrado.
        </p>
        <Link href="/admin/insights" style={{ color: "#C8A44E", fontSize: "11px", marginTop: "12px", display: "inline-block" }}>
          ← Volver
        </Link>
      </div>
    );
  }

  const { totals } = insights;
  const ctrPct = (insights.ctr * 100).toFixed(1) + "%";
  const engPct = (insights.engagementRate * 100).toFixed(1) + "%";

  // 9 metric tiles per spec
  const metrics: MetricTile[] = [
    { label: "Impresiones",        value: totals.impressions.toLocaleString("es-CO") },
    { label: "Clics en tarjeta",   value: totals.cardClicks.toLocaleString("es-CO") },
    { label: "Visitas al perfil",  value: totals.profileViews.toLocaleString("es-CO") },
    { label: "Guardados",          value: totals.saves.toLocaleString("es-CO") },
    { label: "Compartidos",        value: totals.shares.toLocaleString("es-CO") },
    { label: "Cómo llegar",        value: totals.directionsClicks.toLocaleString("es-CO") },
    { label: "Sitio web",          value: totals.websiteClicks.toLocaleString("es-CO") },
    { label: "Instagram",          value: totals.instagramClicks.toLocaleString("es-CO") },
    { label: "Teléfono",           value: totals.phoneClicks.toLocaleString("es-CO") },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-10">
        <Link
          href="/admin/insights"
          style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500 }}
          className="hover:text-[#706D64] transition-colors"
        >
          ← Insights
        </Link>
        <span style={{ color: "#3A3835" }}>·</span>
        <Link
          href="/admin/featured"
          style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500 }}
          className="hover:text-[#706D64] transition-colors"
        >
          Placements
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A44E", fontWeight: 600, marginBottom: "8px" }}>
            Admin · Analytics · Detalle
          </p>
          <h1 className="font-serif" style={{ fontSize: "36px", color: "#D4D0C8", lineHeight: 1.1 }}>
            {insights.placeName}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span style={{ fontSize: "12px", color: "#706D64" }}>{insights.city}</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span style={{ fontSize: "11px", color: "#706D64" }}>{planLabel[insights.planType] ?? insights.planType}</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span style={{ fontSize: "11px", color: "#4A4843" }}>Prioridad {insights.rankPriority}/10</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span style={{
              fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
              color: "#C8A44E", background: "rgba(200,164,78,0.06)", border: "1px solid rgba(200,164,78,0.2)",
              padding: "2px 8px",
            }}>
              {insights.labelText}
            </span>
          </div>
        </div>
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
        />
      </div>

      {/* 9 metric cards — 3-col desktop, 2-col tablet */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-px mb-10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {metrics.map((m) => <MetricTile key={m.label} {...m} />)}
      </div>

      {/* Daily chart */}
      <div style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.06)", padding: "24px", marginBottom: "6px" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif" style={{ fontSize: "20px", color: "#D4D0C8" }}>
            Tendencia diaria
          </h2>
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4843" }}>
            {insights.daily.length} días
          </span>
        </div>
        <InsightsChart data={insights.daily} />
      </div>

      {/* CTR + Engagement — two large cards side by side */}
      <div className="flex gap-px mb-10" style={{ background: "rgba(255,255,255,0.04)" }}>
        <BigStatCard
          label="CTR"
          value={ctrPct}
          sub={`${totals.cardClicks.toLocaleString("es-CO")} clics · ${totals.impressions.toLocaleString("es-CO")} impresiones`}
        />
        <BigStatCard
          label="Tasa de engagement"
          value={engPct}
          sub="(guardados + compartidos + acciones) / visitas al perfil"
        />
      </div>

      {/* Conversion funnel */}
      <div style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.06)", padding: "24px" }}>
        <h2 className="font-serif mb-6" style={{ fontSize: "18px", color: "#D4D0C8" }}>
          Funnel de conversión
        </h2>
        {[
          { label: "Impresiones",         value: totals.impressions, base: totals.impressions },
          { label: "Clics en tarjeta",    value: totals.cardClicks,  base: totals.impressions },
          { label: "Visitas al perfil",   value: totals.profileViews, base: totals.impressions },
          { label: "Acciones totales",    value: totals.saves + totals.shares + totals.directionsClicks + totals.websiteClicks + totals.instagramClicks + totals.phoneClicks, base: totals.impressions },
        ].map((row) => {
          const pct = row.base > 0 ? (row.value / row.base) * 100 : 0;
          return (
            <div key={row.label} className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: "11px", color: "#706D64", letterSpacing: "0.06em" }}>{row.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-serif" style={{ fontSize: "16px", color: "#D4D0C8", fontWeight: 300 }}>
                    {row.value.toLocaleString("es-CO")}
                  </span>
                  <span style={{ fontSize: "10px", color: "#4A4843", width: "40px", textAlign: "right" }}>
                    {pct.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div style={{ height: "2px", background: "rgba(255,255,255,0.04)", position: "relative" }}>
                <div style={{
                  position: "absolute", left: 0, top: 0, height: "100%",
                  width: `${Math.min(pct, 100)}%`,
                  background: row.label === "Impresiones" ? "rgba(212,208,200,0.3)" : "#C8A44E",
                  transition: "width 0.4s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: "11px", color: "#3A3835", marginTop: "24px" }}>
        Datos de prueba (mock). Conectar Supabase para datos en tiempo real.
      </p>
    </div>
  );
}
