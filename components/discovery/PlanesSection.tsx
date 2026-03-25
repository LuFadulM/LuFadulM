"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import CardBadge from "@/components/ui/CardBadge";

interface PlanesSectionProps {
  places: Place[];
}

interface PlanCard {
  place: Place;
  planTitle: string;
  planMoment: string;
}

function derivePlan(place: Place): { planTitle: string; planMoment: string } {
  const loc = place.neighborhood ?? place.city;
  if (place.category === "Cafés") {
    return { planTitle: `El café de la mañana en ${loc}`, planMoment: "Mañana" };
  }
  if (place.category === "Bars") {
    return { planTitle: `Tragos con vista en ${loc}`, planMoment: "Tarde" };
  }
  if (place.category === "Nightlife") {
    return { planTitle: `La noche empieza en ${loc}`, planMoment: "Noche" };
  }
  if (place.category === "Attractions") {
    return { planTitle: `Explorar ${place.name} con tiempo`, planMoment: "Fin de semana" };
  }
  if (place.category === "Hotels") {
    return { planTitle: `Quedarse en ${place.city} sin apuros`, planMoment: "Fin de semana" };
  }
  const isLunch = place.tags.some((t) => t.includes("lunch") || t.includes("almuerzo"));
  return {
    planTitle: `${isLunch ? "Un buen almuerzo" : "Cena de altura"} en ${loc}`,
    planMoment: isLunch ? "Tarde" : "Noche",
  };
}

// ─── Scroll arrow ─────────────────────────────────────────────────────────────

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

// ─── Plan card — full-overlay cinematic ───────────────────────────────────────

function PlanCard({ plan }: { plan: PlanCard }) {
  const { place, planTitle, planMoment } = plan;
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/places/${place.slug}`} className="block">
      <article
        className="card-rounded-lg relative overflow-hidden"
        style={{
          width: "260px",
          height: "340px",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.05)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 24px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,175,55,0.10)"
            : "0 4px 20px rgba(0,0,0,0.3)",
          transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1), box-shadow 0.45s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Full image */}
        {place.cover_image_url && (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.75s cubic-bezier(0.23,1,0.32,1)",
            }}
            sizes="(max-width: 640px) 70vw, 22vw"
            draggable={false}
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.60) 42%, rgba(0,0,0,0.10) 75%, transparent 100%)",
          }}
        />

        {/* Moment badge — top right */}
        <div className="absolute top-4 right-4">
          <CardBadge label={planMoment} variant="moment" />
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-serif text-white leading-tight mb-2"
            style={{
              fontSize: "16px",
              fontWeight: 700,
              textShadow: "0 1px 12px rgba(0,0,0,0.95), 0 2px 24px rgba(0,0,0,0.8)",
              letterSpacing: "-0.01em",
            }}
          >
            {planTitle}
          </h3>
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.48)",
              fontFamily: "'Sora', system-ui, sans-serif",
              fontWeight: 500,
              textShadow: "0 1px 8px rgba(0,0,0,0.9)",
            }}
          >
            {place.name}
          </p>
        </div>
      </article>
    </Link>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const CARD_WIDTH = 260;
const CARD_GAP = 14;
const SCROLL_STEP = (CARD_WIDTH + CARD_GAP) * 2;

export default function PlanesSection({ places }: PlanesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const plans: PlanCard[] = places.slice(0, 10).map((place) => {
    const { planTitle, planMoment } = derivePlan(place);
    return { place, planTitle, planMoment };
  });

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
  }, [updateScrollState]);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });

  if (plans.length === 0) return null;

  return (
    <section className="mb-32">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Inspiración</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Pequeños planes
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p
            className="hidden sm:block font-serif"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.22)",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            ¿Qué hacer hoy?
          </p>
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
            <ArrowButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
          </div>
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
          {plans.map((plan) => (
            <div
              key={plan.place.id}
              style={{ flexShrink: 0, scrollSnapAlign: "start" }}
            >
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Right fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, right: 0,
            width: "100px", height: "calc(100% - 8px)",
            background: "linear-gradient(to right, transparent, #0A0A09 90%)",
            pointerEvents: "none",
            opacity: canScrollRight ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        {/* Left fade */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, left: 0,
            width: "70px", height: "calc(100% - 8px)",
            background: "linear-gradient(to left, transparent, #0A0A09 90%)",
            pointerEvents: "none",
            opacity: canScrollLeft ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      </div>
    </section>
  );
}
