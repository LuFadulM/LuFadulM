"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { MOCK_FEATURED_PLACEMENTS } from "@/app/data/featured";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAILS = ["admin@hyex.co"]; // extend as needed

const statusColor: Record<string, string> = {
  paid: "#5A8F6E",
  pending: "#3DDC97",
  expired: "#3A4A41",
  cancelled: "#7A3835",
};

const planLabel: Record<string, string> = {
  monthly: "Mensual",
  quarterly: "Trimestral",
  founding_partner: "Socio fundador",
  custom: "Custom",
};

const typeLabel: Record<string, string> = {
  category_top: "Top categoría",
  city_spotlight: "Spotlight ciudad",
  homepage_featured: "Homepage",
  curated_list: "Lista curada",
  search_boost: "Búsqueda",
};

export default function AdminFeaturedPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 flex items-center justify-center">
        <p style={{ color: "#3A4A41", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Verificando acceso…
        </p>
      </div>
    );
  }

  if (!user || !ADMIN_EMAILS.includes(user.email ?? "")) return null;

  const totalImpressions = 1240; // would come from featured_analytics in production
  const totalClicks = 87;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <p className="label-micro mb-3" style={{ color: "#3DDC97" }}>Admin</p>
          <h1 className="font-serif" style={{ fontSize: "36px", color: "#CBD6CE" }}>
            Placements destacados
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/insights"
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#64756B",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "10px 20px",
            }}
            className="hover:text-[#CBD6CE] hover:border-[rgba(255,255,255,0.14)] transition-all duration-200"
          >
            Ver insights →
          </Link>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#08130E",
              background: "#3DDC97",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            + Nuevo placement
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-10" style={{ background: "rgba(255,255,255,0.04)" }}>
        {[
          { label: "Activos", value: MOCK_FEATURED_PLACEMENTS.filter((p) => p.is_active).length },
          { label: "Impresiones (mock)", value: totalImpressions.toLocaleString() },
          { label: "Clicks (mock)", value: totalClicks },
          { label: "CTR (mock)", value: `${((totalClicks / totalImpressions) * 100).toFixed(1)}%` },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#0F1B15", padding: "20px 24px" }}>
            <p style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A4A41", fontWeight: 600, marginBottom: "8px" }}>
              {stat.label}
            </p>
            <p className="font-serif" style={{ fontSize: "28px", color: "#CBD6CE", lineHeight: 1 }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mb-10 p-8" style={{ background: "#0F1B15", border: "1px solid rgba(61,220,151,0.15)", borderTop: "2px solid rgba(61,220,151,0.3)" }}>
          <h2 className="font-serif mb-6" style={{ fontSize: "20px", color: "#CBD6CE" }}>
            Nuevo placement
          </h2>
          <AddPlacementForm onClose={() => setShowAddForm(false)} />
        </div>
      )}

      {/* Placements table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["Lugar", "Ciudad", "Tipo", "Label", "Plan", "Estado", "Prioridad", "Vigencia", "Pago", "Acciones"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    padding: "10px 16px",
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#3A4A41",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_FEATURED_PLACEMENTS.map((fp) => (
              <tr
                key={fp.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                className="group"
              >
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "13px", color: "#CBD6CE", fontWeight: 500 }}>
                    {fp.place_slug}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "12px", color: "#64756B" }}>{fp.city ?? "—"}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "10px", color: "#64756B", letterSpacing: "0.08em" }}>
                    {typeLabel[fp.placement_type] ?? fp.placement_type}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#3DDC97",
                    fontWeight: 600,
                    background: "rgba(61,220,151,0.06)",
                    border: "1px solid rgba(61,220,151,0.2)",
                    padding: "2px 8px",
                    display: "inline-block",
                  }}>
                    {fp.label_text}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "11px", color: "#64756B" }}>{planLabel[fp.plan_type]}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: fp.is_active ? "#5A8F6E" : "#3A4A41",
                  }}>
                    {fp.is_active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: "12px", color: "#3DDC97", fontFamily: "'Playfair Display', serif" }}>
                    {fp.rank_priority}/10
                  </span>
                </td>
                <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "11px", color: "#3A4A41" }}>
                    {new Date(fp.start_at).toLocaleDateString("es-CO", { month: "short", day: "numeric" })}
                    {" — "}
                    {new Date(fp.end_at).toLocaleDateString("es-CO", { month: "short", day: "numeric", year: "2-digit" })}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: statusColor[fp.payment_status] ?? "#64756B",
                  }}>
                    {fp.payment_status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div className="flex gap-3 items-center">
                    <button
                      style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#64756B", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      className="hover:text-[#CBD6CE] transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: fp.is_active ? "#7A3835" : "#5A8F6E", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                      className="transition-colors"
                    >
                      {fp.is_active ? "Desactivar" : "Activar"}
                    </button>
                    <Link
                      href={`/admin/insights/${fp.id}`}
                      style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3DDC97", whiteSpace: "nowrap" }}
                      className="hover:text-[#4FE3A4] transition-colors"
                    >
                      Ver insights →
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "11px", color: "#2A3A31", marginTop: "24px" }}>
        Los datos de analítica requieren conexión a Supabase. Los placements mostrados son datos de prueba (mock).
      </p>
    </div>
  );
}

function AddPlacementForm({ onClose }: { onClose: () => void }) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#0D0D0C",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#CBD6CE",
    fontSize: "13px",
    padding: "10px 12px",
    outline: "none",
    fontFamily: "'Sora', system-ui, sans-serif",
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { id: "place_slug", label: "Slug del lugar" },
        { id: "city", label: "Ciudad" },
        { id: "category", label: "Categoría" },
        { id: "label_text", label: "Label badge", placeholder: "Destacado" },
        { id: "start_at", label: "Inicio", type: "date" },
        { id: "end_at", label: "Fin", type: "date" },
      ].map((field) => (
        <div key={field.id}>
          <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A4A41", fontWeight: 600, marginBottom: "6px" }}>
            {field.label}
          </label>
          <input type={field.type ?? "text"} placeholder={field.placeholder} style={inputStyle} />
        </div>
      ))}

      <div>
        <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A4A41", fontWeight: 600, marginBottom: "6px" }}>
          Tipo
        </label>
        <select style={{ ...inputStyle, appearance: "none" }}>
          {Object.entries(typeLabel).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A4A41", fontWeight: 600, marginBottom: "6px" }}>
          Plan
        </label>
        <select style={{ ...inputStyle, appearance: "none" }}>
          {Object.entries(planLabel).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A4A41", fontWeight: 600, marginBottom: "6px" }}>
          Prioridad (1–10)
        </label>
        <input type="number" min={1} max={10} defaultValue={5} style={inputStyle} />
      </div>

      <div className="sm:col-span-2 lg:col-span-3 flex gap-3 pt-2">
        <button
          type="submit"
          style={{
            fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600,
            color: "#08130E", background: "#3DDC97", border: "none", padding: "10px 24px", cursor: "pointer",
          }}
        >
          Guardar placement
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 500,
            color: "#64756B", background: "none", border: "1px solid rgba(255,255,255,0.06)", padding: "10px 24px", cursor: "pointer",
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
