"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { getPlaceInsights, type DateRange } from "@/lib/supabase/analytics-queries";
import DateRangeSelector from "@/components/analytics/DateRangeSelector";
import MetricGrid from "@/components/analytics/MetricGrid";
import InsightsChart from "@/components/analytics/InsightsChart";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@hyex.co"];

const planLabel: Record<string, string> = {
  monthly:          "Mensual",
  quarterly:        "Trimestral",
  founding_partner: "Socio fundador",
  custom:           "Custom",
};

export default function PlaceInsightsPage() {
  const router = useRouter();
  const params = useParams();
  const placementId = params.placeId as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>("30d");

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

  const insights = useMemo(() => getPlaceInsights(placementId, range), [placementId, range]);

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

  const ctrPct = (insights.ctr * 100).toFixed(2) + "%";
  const engPct = (insights.engagementRate * 100).toFixed(2) + "%";
  const avgDailyImp = Math.round(insights.totalImpressions / Math.max(insights.daily.length, 1));
  const avgDailyClk = Math.round(insights.totalClicks / Math.max(insights.daily.length, 1));

  const topMetrics = [
    { label: "Impresiones",       value: insights.totalImpressions.toLocaleString("es-CO") },
    { label: "Clicks tarjeta",    value: insights.totalClicks.toLocaleString("es-CO") },
    { label: "Vistas de perfil",  value: insights.totalProfileViews.toLocaleString("es-CO") },
    { label: "Guardados",         value: insights.totalSaves.toLocaleString("es-CO") },
  ];

  const rateMetrics = [
    { label: "CTR",               value: ctrPct, highlight: true },
    { label: "Engagement",        value: engPct, highlight: false },
    { label: "Imp. promedio / día", value: avgDailyImp.toLocaleString("es-CO") },
    { label: "Clicks / día",      value: avgDailyClk.toLocaleString("es-CO") },
  ];

  const actionMetrics = [
    { label: "Sitio web",         value: insights.totalWebsiteClicks.toLocaleString("es-CO") },
    { label: "Instagram",         value: insights.totalInstagramClicks.toLocaleString("es-CO") },
    { label: "Teléfono",          value: insights.totalPhoneClicks.toLocaleString("es-CO") },
    { label: "Cómo llegar",       value: insights.totalDirectionsClicks.toLocaleString("es-CO") },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/admin/insights"
              style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500 }}
              className="hover:text-[#706D64] transition-colors"
            >
              ← Insights
            </Link>
            <span style={{ color: "#3A3835", fontSize: "9px" }}>·</span>
            <Link
              href="/admin/featured"
              style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#4A4843", fontWeight: 500 }}
              className="hover:text-[#706D64] transition-colors"
            >
              Placements
            </Link>
          </div>
          <p className="label-micro mb-3" style={{ color: "#C8A44E" }}>Admin · Analytics · Detalle</p>
          <h1 className="font-serif" style={{ fontSize: "36px", color: "#D4D0C8", lineHeight: 1.1 }}>
            {insights.placeName}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span style={{ fontSize: "12px", color: "#706D64" }}>{insights.city}</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span style={{ fontSize: "11px", color: "#706D64" }}>{planLabel[insights.planType] ?? insights.planType}</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span style={{ fontSize: "11px", color: "#4A4843" }}>Prioridad {insights.rankPriority}/10</span>
            <span style={{ color: "#3A3835" }}>·</span>
            <span
              style={{
                fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600,
                color: "#C8A44E", background: "rgba(200,164,78,0.06)",
                border: "1px solid rgba(200,164,78,0.2)", padding: "2px 8px",
              }}
            >
              {insights.labelText}
            </span>
          </div>
        </div>
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      {/* Volume metrics */}
      <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600, marginBottom: "10px" }}>
        Volumen
      </p>
      <div className="mb-8">
        <MetricGrid metrics={topMetrics} cols={4} />
      </div>

      {/* Rate metrics */}
      <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600, marginBottom: "10px" }}>
        Tasas
      </p>
      <div className="mb-8">
        <MetricGrid metrics={rateMetrics} cols={4} />
      </div>

      {/* Action metrics */}
      <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4A4843", fontWeight: 600, marginBottom: "10px" }}>
        Acciones
      </p>
      <div className="mb-10">
        <MetricGrid metrics={actionMetrics} cols={4} />
      </div>

      {/* Chart */}
      <div style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.06)", padding: "24px" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif" style={{ fontSize: "18px", color: "#D4D0C8" }}>
            Tendencia diaria
          </h2>
          <span style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A4843" }}>
            {insights.daily.length} días
          </span>
        </div>
        <InsightsChart data={insights.daily} />
      </div>

      {/* CTR breakdown bar */}
      <div className="mt-6" style={{ background: "#111110", border: "1px solid rgba(255,255,255,0.06)", padding: "24px" }}>
        <h2 className="font-serif mb-6" style={{ fontSize: "18px", color: "#D4D0C8" }}>
          Funnel de conversión
        </h2>
        {[
          { label: "Impresiones", value: insights.totalImpressions, pct: 100 },
          { label: "Clicks tarjeta", value: insights.totalClicks, pct: insights.totalImpressions ? (insights.totalClicks / insights.totalImpressions) * 100 : 0 },
          { label: "Vistas de perfil", value: insights.totalProfileViews, pct: insights.totalImpressions ? (insights.totalProfileViews / insights.totalImpressions) * 100 : 0 },
          { label: "Acciones (web/IG/tel/maps)", value: insights.totalWebsiteClicks + insights.totalInstagramClicks + insights.totalPhoneClicks + insights.totalDirectionsClicks, pct: insights.totalImpressions ? ((insights.totalWebsiteClicks + insights.totalInstagramClicks + insights.totalPhoneClicks + insights.totalDirectionsClicks) / insights.totalImpressions) * 100 : 0 },
        ].map((row) => (
          <div key={row.label} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: "11px", color: "#706D64", letterSpacing: "0.06em" }}>{row.label}</span>
              <div className="flex items-center gap-3">
                <span className="font-serif" style={{ fontSize: "16px", color: "#D4D0C8" }}>
                  {row.value.toLocaleString("es-CO")}
                </span>
                <span style={{ fontSize: "10px", color: "#4A4843", width: "40px", textAlign: "right" }}>
                  {row.pct.toFixed(1)}%
                </span>
              </div>
            </div>
            <div style={{ height: "2px", background: "rgba(255,255,255,0.04)", position: "relative" }}>
              <div
                style={{
                  position: "absolute", left: 0, top: 0, height: "100%",
                  width: `${Math.min(row.pct, 100)}%`,
                  background: row.label === "Impresiones" ? "rgba(212,208,200,0.3)" : "#C8A44E",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: "11px", color: "#3A3835", marginTop: "24px" }}>
        Datos de prueba (mock). Conectar Supabase para datos en tiempo real.
        {/* Future: expose this as /negocio/{insights.placeSlug}/insights for claimed business owners */}
      </p>
    </div>
  );
}
