"use client";

import React, { useState, useRef, useEffect } from "react";
import { Place, Category } from "@/lib/types";
import AtmosphereCard from "./AtmosphereCard";

interface HoySectionProps {
  places: Place[];
}

const CITIES = ["Todas", "Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta"];

const CATEGORIES: { label: string; value: Category | "Todas" }[] = [
  { label: "Todas", value: "Todas" },
  { label: "Restaurantes", value: "Restaurants" },
  { label: "Cafés", value: "Cafés" },
  { label: "Bares", value: "Bars" },
  { label: "Vida nocturna", value: "Nightlife" },
  { label: "Hoteles", value: "Hotels" },
  { label: "Atracciones", value: "Attractions" },
];

// Day-aware moment tag
function getMoment(place: Place, date: Date): string {
  const day = date.getDay(); // 0=Sun 6=Sat
  const isWeekend = day === 0 || day === 6;
  if (place.category === "Cafés") return isWeekend ? "Este fin" : "Esta mañana";
  if (place.category === "Nightlife") return "Esta noche";
  if (place.category === "Bars") return isWeekend ? "Esta noche" : "Esta tarde";
  if (place.category === "Hotels") return "Este fin";
  if (place.category === "Attractions") return isWeekend ? "Plan del fin" : "Plan del día";
  if (place.tags.some((t) => t.includes("brunch") || t.includes("breakfast"))) return "Esta mañana";
  if (place.tags.some((t) => t.includes("rooftop") || t.includes("cocktail"))) return "Esta noche";
  return isWeekend ? "Este fin" : "Para hoy";
}

function formatDateLabel(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const diffDays = Math.round((d.getTime() - today.getTime()) / 86400000);
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Mañana";
  return date.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" });
}

// ─── Generic dropdown ──────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
  isActive?: boolean;
}

function FilterDropdown({ label, value, options, onChange, isActive }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);
  const displayLabel = selected?.label ?? label;

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "'Sora', system-ui, sans-serif",
          background: isActive ? "rgba(212,175,55,0.10)" : "rgba(255,255,255,0.04)",
          color: isActive ? "#D4AF37" : "rgba(255,255,255,0.45)",
          border: isActive
            ? "1px solid rgba(212,175,55,0.28)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {displayLabel}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.6,
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 50,
            minWidth: "160px",
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "6px",
            boxShadow: "0 20px 48px rgba(0,0,0,0.7)",
          }}
        >
          {options.map((opt) => {
            const isSel = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 12px",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: isSel ? 500 : 400,
                  color: isSel ? "#D4AF37" : "rgba(255,255,255,0.6)",
                  background: isSel ? "rgba(212,175,55,0.08)" : "transparent",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                {opt.label}
                {isSel && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Date picker button ────────────────────────────────────────────────────

function DateFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const today = new Date();
  const selectedDate = value ? new Date(value + "T12:00:00") : today;
  const label = formatDateLabel(selectedDate);
  const isActive = value !== "" && value !== today.toISOString().slice(0, 10);

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => inputRef.current?.showPicker?.()}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "7px 14px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "'Sora', system-ui, sans-serif",
          background: isActive ? "rgba(212,175,55,0.10)" : "rgba(255,255,255,0.04)",
          color: isActive ? "#D4AF37" : "rgba(255,255,255,0.45)",
          border: isActive
            ? "1px solid rgba(212,175,55,0.28)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ opacity: 0.7, flexShrink: 0 }}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {label}
      </button>
      <input
        ref={inputRef}
        type="date"
        value={value || today.toISOString().slice(0, 10)}
        min={today.toISOString().slice(0, 10)}
        onChange={(e) => onChange(e.target.value)}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "1px",
          height: "1px",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export default function HoySection({ places }: HoySectionProps) {
  const [activeCity, setActiveCity] = useState("Todas");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [activeDate, setActiveDate] = useState<string>("");

  const today = new Date();
  const selectedDate = activeDate ? new Date(activeDate + "T12:00:00") : today;

  const filtered = places.filter((p) => {
    if (activeCity !== "Todas" && p.city !== activeCity) return false;
    if (activeCategory !== "Todas" && p.category !== activeCategory) return false;
    return true;
  }).slice(0, 8);

  const cityActive = activeCity !== "Todas";
  const catActive = activeCategory !== "Todas";

  if (places.length === 0) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Descubre</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Hoy en tu ciudad
          </h2>
        </div>
        <a href="#explore" className="link-gold hidden sm:flex">
          Ver todo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      {/* ── Filter bar ── */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <FilterDropdown
          label="Ciudad"
          value={activeCity}
          options={CITIES.map((c) => ({ label: c, value: c }))}
          onChange={setActiveCity}
          isActive={cityActive}
        />
        <FilterDropdown
          label="Actividad"
          value={activeCategory}
          options={CATEGORIES.map((c) => ({ label: c.label, value: c.value }))}
          onChange={setActiveCategory}
          isActive={catActive}
        />
        <DateFilter value={activeDate} onChange={setActiveDate} />

        {/* Clear all — only when filters are active */}
        {(cityActive || catActive || activeDate) && (
          <button
            onClick={() => { setActiveCity("Todas"); setActiveCategory("Todas"); setActiveDate(""); }}
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 500,
              color: "rgba(255,255,255,0.28)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.28)"; }}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* ── Horizontal scroll ── */}
      {filtered.length > 0 ? (
        <div className="scroll-row">
          {filtered.map((place) => (
            <div
              key={place.id}
              className="scroll-row-item"
              style={{ width: "clamp(240px, 30vw, 300px)" }}
            >
              <AtmosphereCard
                place={place}
                momentTag={getMoment(place, selectedDate)}
                heightClass="h-[340px]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "48px 0",
            textAlign: "center",
            color: "rgba(255,255,255,0.22)",
            fontSize: "13px",
            fontWeight: 300,
          }}
        >
          Sin resultados para estos filtros.
        </div>
      )}
    </section>
  );
}
