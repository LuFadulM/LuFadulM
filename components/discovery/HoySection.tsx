"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Place, Category } from "@/lib/types";
import DiscoverCard from "./DiscoverCard";

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

function getMoment(place: Place, date: Date): string {
  const day = date.getDay();
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

// ─── Light dropdown ───────────────────────────────────────────────────────────

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
          gap: "5px",
          padding: "7px 14px",
          fontSize: "10px",
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "'Sora', system-ui, sans-serif",
          background: isActive ? "#C6A85C" : "#FFFFFF",
          color: isActive ? "#FFFFFF" : "#4A4642",
          border: isActive ? "1px solid #C6A85C" : "1px solid rgba(28,28,28,0.14)",
          borderRadius: "100px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {displayLabel}
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }}
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
            background: "#FFFFFF",
            border: "1px solid rgba(28,28,28,0.10)",
            borderRadius: "12px",
            padding: "6px",
            boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          {options.map((opt) => {
            const isSel = opt.value === value;
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "8px 12px",
                  fontSize: "11px", letterSpacing: "0.06em",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: isSel ? 600 : 400,
                  color: isSel ? "#C6A85C" : "#3C3C3C",
                  background: isSel ? "rgba(198,168,92,0.08)" : "transparent",
                  border: "none", borderRadius: "7px", cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.04)"; }}
                onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                {opt.label}
                {isSel && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C6A85C" strokeWidth="2.5">
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

// ─── Light arrow button ───────────────────────────────────────────────────────

function ArrowBtn({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Ver anteriores" : "Ver más"}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px",
        background: disabled ? "rgba(0,0,0,0.03)" : "#FFFFFF",
        border: `1px solid ${disabled ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.12)"}`,
        borderRadius: "50%",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.2s ease",
        color: disabled ? "rgba(0,0,0,0.20)" : "#3C3C3C",
        boxShadow: disabled ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "#C6A85C";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#C6A85C";
          (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "#FFFFFF";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.12)";
          (e.currentTarget as HTMLButtonElement).style.color = "#3C3C3C";
        }
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
        style={{ transform: direction === "left" ? "rotate(180deg)" : "rotate(0deg)" }}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const HOY_CARD_WIDTH = 280;
const HOY_CARD_GAP = 16;
const HOY_SCROLL_STEP = (HOY_CARD_WIDTH + HOY_CARD_GAP) * 2;

export default function HoySection({ places }: HoySectionProps) {
  const [activeCity, setActiveCity] = useState("Todas");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const today = new Date();

  const filtered = places.filter((p) => {
    if (activeCity !== "Todas" && p.city !== activeCity) return false;
    if (activeCategory !== "Todas" && p.category !== activeCategory) return false;
    return true;
  }).slice(0, 10);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateScrollState); ro.disconnect(); };
  }, [updateScrollState, filtered.length]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -HOY_SCROLL_STEP, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: HOY_SCROLL_STEP, behavior: "smooth" });

  if (places.length === 0) return null;

  const cityActive = activeCity !== "Todas";
  const catActive = activeCategory !== "Todas";

  return (
    <section>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "24px", paddingBottom: "20px",
          borderBottom: "1px solid rgba(28,28,28,0.08)",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
              fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
              color: "#C6A85C", marginBottom: "8px",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <span
              style={{
                display: "inline-block", width: "18px", height: "1px",
                background: "#C6A85C", verticalAlign: "middle",
              }}
            />
            Descubre
          </p>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 32px)", color: "#1C1C1C", fontWeight: 400, letterSpacing: "-0.02em" }}
          >
            Hoy en tu ciudad
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <ArrowBtn direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
          <ArrowBtn direction="right" onClick={scrollRight} disabled={!canScrollRight} />
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
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
        {(cityActive || catActive) && (
          <button
            onClick={() => { setActiveCity("Todas"); setActiveCategory("Todas"); }}
            style={{
              fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 500,
              color: "#9A9087", background: "transparent", border: "none",
              cursor: "pointer", padding: "4px 8px", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#1C1C1C"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#9A9087"; }}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* ── Scroll row ── */}
      {filtered.length > 0 ? (
        <div style={{ position: "relative" }}>
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: `${HOY_CARD_GAP}px`,
              paddingBottom: "12px",
              paddingRight: "40px",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: "grab",
            }}
            onMouseDown={(e) => {
              const el = scrollRef.current;
              if (!el) return;
              el.style.cursor = "grabbing";
              const startX = e.pageX - el.offsetLeft;
              const startScroll = el.scrollLeft;
              const onMove = (ev: MouseEvent) => { el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX); };
              const onUp = () => {
                el.style.cursor = "grab";
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
              };
              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", onUp);
            }}
          >
            {filtered.map((place) => (
              <div
                key={place.id}
                style={{ width: `${HOY_CARD_WIDTH}px`, flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <DiscoverCard
                  place={place}
                  momentTag={getMoment(place, today)}
                />
              </div>
            ))}
          </div>
          {/* Right fade — uses light bg color */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, right: 0,
            width: "90px", height: "calc(100% - 12px)",
            background: "linear-gradient(to right, transparent, #F7F5F2 90%)",
            pointerEvents: "none",
            opacity: canScrollRight ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0,
            width: "60px", height: "calc(100% - 12px)",
            background: "linear-gradient(to left, transparent, #F7F5F2 90%)",
            pointerEvents: "none",
            opacity: canScrollLeft ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
        </div>
      ) : (
        <div style={{ padding: "48px 0", textAlign: "center", color: "#9A9087", fontSize: "13px", fontWeight: 300 }}>
          Sin resultados para estos filtros.
        </div>
      )}
    </section>
  );
}
