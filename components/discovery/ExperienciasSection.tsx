"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { HyexEvent } from "@/lib/types";
import CardBadge from "@/components/ui/CardBadge";

// ─── Scroll arrow button (shared) ───────────────────────────────────────────

function ArrowButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Ver anteriores" : "Ver más"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "6px",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.2s ease",
        flexShrink: 0,
        color: disabled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.7)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.10)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.28)";
          (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
        }
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
        style={{ transform: direction === "left" ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

interface ExperienciasSectionProps {
  events: HyexEvent[];
}

const CITIES = ["Todas", "Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "Salento", "San Andrés", "San Gil", "Barranquilla"];

// ─── City dropdown ──────────────────────────────────────────────────────────

interface CityDropdownProps {
  value: string;
  onChange: (v: string) => void;
}

function CityDropdown({ value, onChange }: CityDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = value !== "Todas";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
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
        {value === "Todas" ? "Ciudad" : value}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
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
          role="listbox"
          aria-label="Seleccionar ciudad"
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
          {CITIES.map((city) => {
            const isSel = city === value;
            return (
              <button
                key={city}
                role="option"
                aria-selected={isSel}
                onClick={() => { onChange(city); setOpen(false); }}
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
                {city}
                {isSel && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" aria-hidden="true">
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

// ─── Event card ─────────────────────────────────────────────────────────────

function EventCard({ event }: { event: HyexEvent }) {
  return (
    <Link href={`/experiences/${event.slug}`} className="block group">
      <article
        className="atmo-card card-rounded-lg overflow-hidden"
        style={{
          background: "#111111",
          border: "1px solid rgba(255,255,255,0.05)",
          width: "clamp(240px, 28vw, 300px)",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: "210px" }}>
          {event.cover_image_url ? (
            <Image
              src={event.cover_image_url}
              alt={event.title}
              fill
              className="object-cover atmo-image"
              sizes="(max-width: 640px) 70vw, 28vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #151512 0%, #1A1A16 50%, #111110 100%)",
              }}
            />
          )}
          {/* Bottom gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
            }}
          />
          {/* Timing badge — overlaid on image */}
          <div className="absolute bottom-0 left-0 p-3">
            <CardBadge label={event.timing_label} variant="moment" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category + city */}
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 500,
              marginBottom: "8px",
            }}
          >
            {event.category}
            <span style={{ color: "rgba(255,255,255,0.14)", margin: "0 6px" }}>·</span>
            {event.city}
          </p>

          {/* Title */}
          <p
            className="font-serif leading-snug"
            style={{
              fontSize: "15px",
              color: "#D8D4CC",
              fontWeight: 400,
              marginBottom: "8px",
            }}
          >
            {event.title}
          </p>

          {/* Editorial angle — italic, subtle */}
          <p
            style={{
              fontSize: "11px",
              lineHeight: "1.6",
              color: "rgba(242,237,232,0.38)",
              fontStyle: "italic",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
            }}
          >
            {event.editorial_angle}
          </p>

          {/* Footer: duration + price */}
          {(event.duration_label || event.price_level) && (
            <div
              className="flex items-center gap-3 mt-4 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              {event.duration_label && (
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    style={{ opacity: 0.5, flexShrink: 0 }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {event.duration_label}
                </span>
              )}
              {event.price_level && (
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.28)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {event.price_level}
                </span>
              )}
              {/* CTA arrow */}
              <div
                className="atmo-cta ml-auto flex items-center gap-1"
                style={{ color: "#D4AF37" }}
                aria-hidden="true"
              >
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontFamily: "'Sora', system-ui, sans-serif",
                  }}
                >
                  Ver más
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

// ─── Recurrentes row ─────────────────────────────────────────────────────────

function RecurrenteRow({ event }: { event: HyexEvent }) {
  return (
    <Link href={`/experiences/${event.slug}`} className="block group">
      <div
        className="flex items-center gap-4 transition-all duration-200 group-hover:pl-1"
        style={{
          padding: "14px 0",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Icon / placeholder */}
        <div
          className="card-rounded-sm shrink-0 flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            background: "rgba(212,175,55,0.05)",
            border: "1px solid rgba(212,175,55,0.12)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C8A44E"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="font-serif leading-snug transition-colors duration-200 group-hover:text-white"
            style={{ fontSize: "14px", color: "#C8C4BC" }}
          >
            {event.title}
          </p>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 500,
              marginTop: "3px",
            }}
          >
            {event.timing_label}
            <span style={{ color: "rgba(255,255,255,0.1)", margin: "0 6px" }}>·</span>
            {event.city}
          </p>
        </div>

        {/* Arrow */}
        <div
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
          style={{ color: "#D4AF37" }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────

const EXP_CARD_WIDTH = 300;
const EXP_CARD_GAP = 16;
const EXP_SCROLL_STEP = (EXP_CARD_WIDTH + EXP_CARD_GAP) * 2;

export default function ExperienciasSection({ events }: ExperienciasSectionProps) {
  const [activeCity, setActiveCity] = useState("Todas");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const main = events.filter(
    (e) => (e.bucket === "experiencias" || e.bucket === "planes") &&
    (activeCity === "Todas" || e.city === activeCity)
  );

  const recurrentes = events.filter(
    (e) => e.bucket === "recurrentes" &&
    (activeCity === "Todas" || e.city === activeCity)
  );

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
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, main.length]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -EXP_SCROLL_STEP, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: EXP_SCROLL_STEP, behavior: "smooth" });

  if (events.length === 0) return null;

  return (
    <section className="mb-24">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Experiencias</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Planes que valen el viaje
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CityDropdown value={activeCity} onChange={setActiveCity} />
          </div>
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
            <ArrowButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
          </div>
        </div>
      </div>

      {/* Mobile city filter */}
      <div className="flex sm:hidden mb-6">
        <CityDropdown value={activeCity} onChange={setActiveCity} />
      </div>

      {/* ── Main horizontal scroll ── */}
      {main.length > 0 ? (
        <div style={{ position: "relative", marginBottom: "40px" }}>
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              overflowX: "auto",
              gap: `${EXP_CARD_GAP}px`,
              paddingBottom: "8px",
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
              const onMove = (ev: MouseEvent) => {
                el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
              };
              const onUp = () => {
                el.style.cursor = "grab";
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
              };
              document.addEventListener("mousemove", onMove);
              document.addEventListener("mouseup", onUp);
            }}
          >
            {main.map((event) => (
              <div
                key={event.id}
                style={{ width: `${EXP_CARD_WIDTH}px`, flexShrink: 0, scrollSnapAlign: "start" }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
          {/* Right-edge fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, right: 0,
              width: "80px", height: "calc(100% - 8px)",
              background: "linear-gradient(to right, transparent, #0A0A09 90%)",
              pointerEvents: "none",
              opacity: canScrollRight ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
          {/* Left-edge fade */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", top: 0, left: 0,
              width: "60px", height: "calc(100% - 8px)",
              background: "linear-gradient(to left, transparent, #0A0A09 90%)",
              pointerEvents: "none",
              opacity: canScrollLeft ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            padding: "40px 0",
            textAlign: "center",
            color: "rgba(255,255,255,0.22)",
            fontSize: "13px",
            fontWeight: 300,
            marginBottom: "40px",
          }}
        >
          Sin experiencias para esta ciudad aún.
        </div>
      )}

      {/* ── Recurrentes sub-section ── */}
      {recurrentes.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="label-micro" style={{ color: "#555555" }}>
              Pasa cada semana
            </span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.04)" }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {recurrentes.map((event) => (
              <RecurrenteRow key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
