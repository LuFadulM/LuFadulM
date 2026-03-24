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
  if (place.category === "Cafés") {
    return {
      planTitle: `Café de especialidad en ${place.neighborhood ?? place.city}`,
      planMoment: "Mañana",
    };
  }
  if (place.category === "Bars") {
    return {
      planTitle: `Tragos y conversación en ${place.neighborhood ?? place.city}`,
      planMoment: "Tarde",
    };
  }
  if (place.category === "Nightlife") {
    return {
      planTitle: `La noche empieza en ${place.neighborhood ?? place.city}`,
      planMoment: "Noche",
    };
  }
  if (place.category === "Attractions") {
    return {
      planTitle: `Explorar ${place.name} con tiempo`,
      planMoment: "Fin de semana",
    };
  }
  if (place.category === "Hotels") {
    return {
      planTitle: `Quedarse en ${place.city} sin apuros`,
      planMoment: "Fin de semana",
    };
  }
  const isLunch = place.tags.some((t) => t.includes("lunch") || t.includes("almuerzo"));
  return {
    planTitle: `${isLunch ? "Almuerzo" : "Cena"} en ${place.neighborhood ?? place.city}`,
    planMoment: isLunch ? "Tarde" : "Noche",
  };
}

// ─── Scroll arrow button ─────────────────────────────────────────────────────

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
        style={{
          transform: direction === "left" ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </button>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

const CARD_WIDTH = 260; // px — used for scroll step
const CARD_GAP = 16;
const SCROLL_STEP = (CARD_WIDTH + CARD_GAP) * 2; // scroll 2 cards at a time

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

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
  };

  if (plans.length === 0) return null;

  return (
    <section className="mb-24">
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
            className="hidden sm:block"
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 300,
            }}
          >
            ¿Qué hacer hoy?
          </p>
          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={scrollLeft} disabled={!canScrollLeft} />
            <ArrowButton direction="right" onClick={scrollRight} disabled={!canScrollRight} />
          </div>
        </div>
      </div>

      {/* ── Scroll container with right-edge fade ── */}
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
          {plans.map(({ place, planTitle, planMoment }) => (
            <div
              key={place.id}
              style={{
                width: `${CARD_WIDTH}px`,
                flexShrink: 0,
                scrollSnapAlign: "start",
              }}
            >
              <Link href={`/places/${place.slug}`} className="block group">
                <article
                  className="atmo-card card-rounded-lg overflow-hidden"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "196px" }}>
                    {place.cover_image_url ? (
                      <Image
                        src={place.cover_image_url}
                        alt={place.name}
                        fill
                        className="object-cover atmo-image"
                        sizes="(max-width: 640px) 70vw, 25vw"
                        draggable={false}
                      />
                    ) : (
                      <div className="absolute inset-0" style={{ background: "#1A1A18" }} />
                    )}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <CardBadge label={planMoment} variant="moment" />
                    </div>
                    <p
                      className="font-serif"
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.5",
                        color: "#D8D4CC",
                        fontWeight: 400,
                        marginBottom: "8px",
                      }}
                    >
                      {planTitle}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.3)",
                        fontFamily: "'Sora', system-ui, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {place.name}
                    </p>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>

        {/* Right-edge fade — signals more content */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "80px",
            height: "calc(100% - 8px)",
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
            position: "absolute",
            top: 0,
            left: 0,
            width: "60px",
            height: "calc(100% - 8px)",
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
