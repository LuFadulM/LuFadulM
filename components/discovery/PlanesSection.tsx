"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";

interface PlanesSectionProps {
  places: Place[];
}

interface PlanCard {
  place: Place;
  planTitle: string;
  planMoment: string;
  momentColor: string;
  momentBg: string;
  emoji: string;
}

function derivePlan(place: Place): { planTitle: string; planMoment: string; momentColor: string; momentBg: string; emoji: string } {
  const loc = place.neighborhood ?? place.city;
  if (place.category === "Cafés") return {
    planTitle: `El café de la mañana en ${loc}`,
    planMoment: "Mañana", momentColor: "#D4A03C",
    momentBg: "rgba(212,160,60,0.18)", emoji: "☕",
  };
  if (place.category === "Bars") return {
    planTitle: `Tragos con vista en ${loc}`,
    planMoment: "Tarde", momentColor: "#E2725B",
    momentBg: "rgba(226,114,91,0.18)", emoji: "🍻",
  };
  if (place.category === "Nightlife") return {
    planTitle: `La noche empieza en ${loc}`,
    planMoment: "Noche", momentColor: "#9B7BDE",
    momentBg: "rgba(155,123,222,0.18)", emoji: "🌙",
  };
  if (place.category === "Attractions") return {
    planTitle: `Explorar ${place.name} con tiempo`,
    planMoment: "Fin de semana", momentColor: "#8A9E6A",
    momentBg: "rgba(138,158,106,0.18)", emoji: "🧭",
  };
  if (place.category === "Hotels") return {
    planTitle: `Quedarse en ${place.city} sin apuros`,
    planMoment: "Escapada", momentColor: "#8A9E6A",
    momentBg: "rgba(138,158,106,0.18)", emoji: "🌙",
  };
  const isLunch = place.tags.some((t) => t.includes("lunch") || t.includes("almuerzo"));
  return {
    planTitle: `${isLunch ? "Un buen almuerzo" : "Cena de altura"} en ${loc}`,
    planMoment: isLunch ? "Mediodía" : "Noche",
    momentColor: "#E2725B", momentBg: "rgba(226,114,91,0.18)", emoji: "🍽",
  };
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
        background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${disabled ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "50%",
        cursor: disabled ? "default" : "pointer",
        transition: "all 0.2s ease",
        color: disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.65)",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "#B1987C";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#B1987C";
          (e.currentTarget as HTMLButtonElement).style.color = "#2A2925";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)";
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

function PlanCardItem({ plan }: { plan: PlanCard }) {
  const [hovered, setHovered] = useState(false);
  const { place, planTitle, planMoment, momentColor, momentBg, emoji } = plan;

  return (
    <Link href={`/places/${place.slug}`} className="block">
      <article
        style={{
          width: "250px",
          height: "300px",
          position: "relative",
          overflow: "hidden",
          borderRadius: "14px",
          background: "#302C26",
          border: "1px solid rgba(255,255,255,0.06)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 50px rgba(0,0,0,0.6), 0 6px 20px rgba(0,0,0,0.4)"
            : "0 4px 20px rgba(0,0,0,0.35)",
          transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        {place.cover_image_url && (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
            sizes="250px"
          />
        )}

        {/* Overlay gradient — darker at top and bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0.80) 100%)",
        }} />

        {/* Moment pill — top */}
        <div style={{ position: "absolute", top: "14px", left: "14px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "4px",
            padding: "4px 10px",
            fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase",
            fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
            color: momentColor,
            background: momentBg,
            border: `1px solid ${momentColor}40`,
            borderRadius: "100px",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}>
            {emoji} {planMoment}
          </span>
        </div>

        {/* Content — bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 16px 18px" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "#F0EBE4",
            lineHeight: "1.35",
            marginBottom: "6px",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 12px rgba(0,0,0,0.9)",
          }}>
            {planTitle}
          </h3>
          <p style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.52)",
            fontFamily: "'Sora', system-ui, sans-serif",
            letterSpacing: "0.06em",
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}>
            {place.city}
          </p>
        </div>
      </article>
    </Link>
  );
}

const CARD_WIDTH = 250;
const CARD_GAP = 16;
const SCROLL_STEP = (CARD_WIDTH + CARD_GAP) * 2;

export default function PlanesSection({ places }: PlanesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const plans: PlanCard[] = places.slice(0, 10).map((p) => ({ place: p, ...derivePlan(p) }));

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
  }, [updateScrollState]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });

  if (plans.length === 0) return null;

  return (
    <section>
      {/* ── Header ── */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "24px", paddingBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div>
          <p style={{
            fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
            color: "#B1987C", marginBottom: "8px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#B1987C" }} />
            Para ti
          </p>
          <h2 className="font-serif" style={{
            fontSize: "clamp(36px, 5vw, 62px)",
            color: "#E8E4DC", fontWeight: 400, letterSpacing: "-0.02em",
          }}>
            Pequeños planes
          </h2>
          <p style={{
            fontSize: "13px", color: "rgba(220,215,207,0.52)",
            fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 300, marginTop: "6px",
          }}>
            Momentos que vale la pena vivir
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ArrowBtn direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
          <ArrowBtn direction="right" onClick={scrollRight} disabled={!canScrollRight} />
        </div>
      </div>

      {/* ── Scroll row ── */}
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
          {plans.map((plan) => (
            <div key={plan.place.id} style={{ flexShrink: 0, scrollSnapAlign: "start" }}>
              <PlanCardItem plan={plan} />
            </div>
          ))}
        </div>
        {/* Dark edge fades */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, right: 0,
          width: "100px", height: "calc(100% - 12px)",
          background: "linear-gradient(to right, transparent, #2D2922 90%)",
          pointerEvents: "none",
          opacity: canScrollRight ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: 0,
          width: "60px", height: "calc(100% - 12px)",
          background: "linear-gradient(to left, transparent, #2D2922 90%)",
          pointerEvents: "none",
          opacity: canScrollLeft ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />
      </div>
    </section>
  );
}
