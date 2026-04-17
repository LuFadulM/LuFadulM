"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Place, Category } from "@/lib/types";
import AtmosphereCard from "./AtmosphereCard";

interface HoySectionProps {
  places: Place[];
}

const CITIES = ["Todas", "Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta"];

const CATEGORIES: { label: string; value: Category | "Todas" }[] = [
  { label: "Todos",    value: "Todas" },
  { label: "Comer",    value: "Restaurants" },
  { label: "Cafés",    value: "Cafés" },
  { label: "Beber",    value: "Bars" },
  { label: "Noche",    value: "Nightlife" },
  { label: "Cultura",  value: "Attractions" },
  { label: "Estadías", value: "Hotels" },
];

function getMoment(place: Place, date: Date): string {
  const h = date.getHours();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;
  const isMorning = h >= 6 && h < 12;
  const isAfternoon = h >= 12 && h < 18;

  if (place.category === "Cafés") return isMorning ? "Ahora" : isWeekend ? "Este fin" : "Esta mañana";
  if (place.category === "Nightlife") return "Esta noche";
  if (place.category === "Bars") return isAfternoon ? "Esta tarde" : "Esta noche";
  if (place.category === "Hotels") return "Este fin";
  if (place.category === "Attractions") return isWeekend ? "Plan del fin" : "Para hoy";
  if (place.tags.some((t) => t.includes("brunch") || t.includes("breakfast"))) return "Esta mañana";
  if (place.tags.some((t) => t.includes("rooftop") || t.includes("cocktail"))) return "Esta noche";
  return isWeekend ? "Este fin" : "Para hoy";
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "0.4375rem 1rem",
        fontSize: "var(--text-micro)", letterSpacing: "0.08em", textTransform: "uppercase",
        fontWeight: 500, fontFamily: "var(--font-sans)",
        background: active ? "var(--gold)" : "transparent",
        color: active ? "var(--bg)" : "var(--text-secondary)",
        border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,232,0.20)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
        }
      }}
    >
      {label}
    </button>
  );
}

function CitySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = value !== "Todas";

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          padding: "0.4375rem 1rem",
          fontSize: "var(--text-micro)", letterSpacing: "0.08em", textTransform: "uppercase",
          fontWeight: 500, fontFamily: "var(--font-sans)",
          background: isActive ? "var(--gold-muted)" : "transparent",
          color: isActive ? "var(--gold)" : "var(--text-secondary)",
          border: isActive ? "1px solid var(--gold-border)" : "1px solid var(--border)",
          borderRadius: "var(--radius-pill)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {value === "Todas" ? "Ciudad" : value}
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", opacity: 0.7 }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 50,
          minWidth: "160px",
          background: "var(--surface-alt)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "6px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.40), 0 4px 12px rgba(0,0,0,0.20)",
        }}>
          {CITIES.map((city) => {
            const sel = city === value;
            return (
              <button
                key={city}
                onClick={() => { onChange(city); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "8px 12px",
                  fontSize: "11px", letterSpacing: "0.06em",
                  fontFamily: "var(--font-sans)",
                  fontWeight: sel ? 600 : 400,
                  color: sel ? "var(--gold)" : "var(--text-secondary)",
                  background: sel ? "var(--gold-muted)" : "transparent",
                  border: "none", cursor: "pointer", textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,240,232,0.04)"; }}
                onMouseLeave={(e) => { if (!sel) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                {city}
                {sel && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--gold)" }}><polyline points="20 6 9 17 4 12" /></svg>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ArrowBtn({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Ver anteriores" : "Ver más"}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "34px", height: "34px",
        background: "transparent",
        border: `1px solid ${disabled ? "var(--border)" : "rgba(245,240,232,0.14)"}`,
        borderRadius: "50%",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.2s ease",
        color: disabled ? "var(--text-muted)" : "var(--text-secondary)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,232,0.14)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
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

const CARD_WIDTH = 280;
const CARD_GAP   = 16;
const SCROLL_STEP = (CARD_WIDTH + CARD_GAP) * 2;

export default function HoySection({ places }: HoySectionProps) {
  const [activeCity, setActiveCity]         = useState("Todas");
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft]   = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const today = new Date();

  const filtered = places.filter((p) => {
    if (activeCity !== "Todas" && p.city !== activeCity) return false;
    if (activeCategory !== "Todas" && p.category !== activeCategory) return false;
    return true;
  }).slice(0, 12);

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

  const scrollLeft  = () => scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: SCROLL_STEP,  behavior: "smooth" });

  if (places.length === 0) return null;

  return (
    <section>
      {/* ── Header ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "24px", paddingBottom: "20px",
        borderBottom: "1px solid var(--border)",
      }}>
        <div>
          <p className="section-label">Descubre</p>
          <h2 className="font-serif" style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.02em",
          }}>
            Hoy en tu ciudad
          </h2>
          <p style={{
            fontSize: "var(--text-small)", color: "var(--text-secondary)",
            fontFamily: "var(--font-sans)", fontWeight: 400,
            marginTop: "6px",
          }}>
            Lugares para cada momento del día
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowBtn direction="left"  onClick={scrollLeft}  disabled={!canScrollLeft}  />
          <ArrowBtn direction="right" onClick={scrollRight} disabled={!canScrollRight} />
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-2 flex-wrap mb-8">
        <CitySelect value={activeCity} onChange={setActiveCity} />
        <div style={{ width: "1px", height: "16px", background: "var(--border)" }} />
        {CATEGORIES.map((cat) => (
          <FilterPill
            key={cat.value}
            label={cat.label}
            active={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
          />
        ))}
        {(activeCity !== "Todas" || activeCategory !== "Todas") && (
          <button
            onClick={() => { setActiveCity("Todas"); setActiveCategory("Todas"); }}
            style={{
              fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
              fontFamily: "var(--font-sans)", fontWeight: 500,
              color: "var(--text-muted)", background: "transparent", border: "none",
              cursor: "pointer", padding: "4px 8px", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}
          >
            Limpiar ×
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
              gap: `${CARD_GAP}px`,
              paddingBottom: "12px",
              paddingRight: "48px",
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
              <div key={place.id} style={{ width: `${CARD_WIDTH}px`, flexShrink: 0, scrollSnapAlign: "start" }}>
                <AtmosphereCard
                  place={place}
                  momentTag={getMoment(place, today)}
                  heightClass="h-[310px]"
                />
              </div>
            ))}
          </div>
          {/* Edge fades — dark bg */}
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, right: 0,
            width: "100px", height: "calc(100% - 12px)",
            background: "linear-gradient(to right, transparent, var(--bg) 90%)",
            pointerEvents: "none",
            opacity: canScrollRight ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
          <div aria-hidden="true" style={{
            position: "absolute", top: 0, left: 0,
            width: "60px", height: "calc(100% - 12px)",
            background: "linear-gradient(to left, transparent, var(--bg) 90%)",
            pointerEvents: "none",
            opacity: canScrollLeft ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
        </div>
      ) : (
        <div style={{
          padding: "64px 0", textAlign: "center",
          color: "var(--text-muted)", fontSize: "var(--text-small)",
          fontFamily: "var(--font-sans)",
        }}>
          Sin resultados para estos filtros.
        </div>
      )}
    </section>
  );
}
