"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "./data/places";
import { Category, FilterCity, FilterPrice, SortOption } from "@/lib/types";
import SearchBar from "@/components/search/SearchBar";
import CategoryPills from "@/components/search/CategoryPills";
import FilterBar from "@/components/search/FilterBar";
import PlaceGrid from "@/components/places/PlaceGrid";
import FeaturedSection from "@/components/places/FeaturedSection";
import SpotlightSection from "@/components/places/SpotlightSection";
import HoySection from "@/components/discovery/HoySection";
import JoyasSection from "@/components/discovery/JoyasSection";
import PlanesSection from "@/components/discovery/PlanesSection";
import AhoraSection from "@/components/discovery/AhoraSection";
import ExperienciasSection from "@/components/discovery/ExperienciasSection";
import MagazineSection from "@/components/discovery/MagazineSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { MOCK_EVENTS } from "./data/events";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

// ─── Section wrappers ─────────────────────────────────────────────────────────

function Section({ children, bg = "#2A2925" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {children}
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [city, setCity] = useState<FilterCity>("All");
  const [price, setPrice] = useState<FilterPrice>("All");
  const [sort, setSort] = useState<SortOption>("Rating");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat as CategoryFilter);
  }, []);

  const allRanked = useMemo(() => rankPlacesWithFeatured(MOCK_PLACES), []);

  const spotlightPlace = useMemo(
    () => allRanked.find((p) => p.isFeaturedPlacement) ?? null,
    [allRanked]
  );

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const filteredPlaces = useMemo(() => {
    let places =
      sort === "Rating"
        ? rankPlacesWithFeatured(MOCK_PLACES, {
            city: city !== "All" ? city : undefined,
            category: category !== "All" ? category : undefined,
          })
        : [...MOCK_PLACES];

    if (search) {
      const q = search.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (category !== "All") places = places.filter((p) => p.category === category);
    if (city !== "All") places = places.filter((p) => p.city === city);
    if (price !== "All") places = places.filter((p) => p.price_level === price);

    if (sort === "Newest") {
      places.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sort === "Most Reviewed") {
      places.sort((a, b) => b.review_count - a.review_count);
    }

    return places;
  }, [search, category, city, price, sort, allRanked]);

  const isExploring = search || category !== "All" || city !== "All" || price !== "All";

  return (
    <div style={{ background: "#2A2925" }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Full-screen, cinematic, dark
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: "#2A2925",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Abstract editorial background ──────────────────────── */}

        {/* 1. Deep warm gradient — adds cinematic depth */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 22% 52%, #38342E 0%, #2E2B26 30%, #252219 65%, #1A1916 100%)",
        }} />

        {/* 2. Grain / noise texture — cinematic film feel */}
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <defs>
            <filter id="hero-grain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.68" numOctaves="4" seed="12" stitchTiles="stitch" result="noise" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#hero-grain)" opacity="0.055" />
        </svg>

        {/* 3. Monuma vertical grid lines */}
        <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          {[16.66, 33.33, 50, 66.66, 83.33].map((pct) => (
            <line key={pct}
              x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%"
              stroke="rgba(177,152,124,0.09)" strokeWidth="0.5"
            />
          ))}
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(177,152,124,0.06)" strokeWidth="0.5" />
        </svg>

        {/* 4. Topographic rings — right side, suggests exploration / cartography */}
        <svg aria-hidden="true" style={{
          position: "absolute", right: "-60px", top: "50%",
          transform: "translateY(-50%)",
          width: "580px", height: "580px", pointerEvents: "none",
        }}>
          {[60, 120, 180, 240, 300, 360, 420, 480].map((r, i) => (
            <circle key={r} cx="480" cy="290" r={r} fill="none"
              stroke="rgba(177,152,124,1)" strokeWidth="0.5"
              opacity={Math.max(0.03, 0.22 - i * 0.025)}
            />
          ))}
        </svg>

        {/* 5. Subtle diagonal scan lines — adds editorial texture */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.018,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(223,220,213,1) 3px, rgba(223,220,213,1) 4px)",
        }} />

        {/* 6. Bronze ambient glow — upper right warm light */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 15%, rgba(177,152,124,0.11) 0%, transparent 52%)",
        }} />

        {/* 7. Olive glow — lower left, grounds the composition */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 5% 90%, rgba(54,58,40,0.5) 0%, transparent 42%)",
        }} />

        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(42,41,37,0.6))",
          pointerEvents: "none",
        }} />


        <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: "680px", padding: "clamp(60px,8vh,100px) 0" }}>

            <p style={{
              fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
              fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
              color: "#B1987C", marginBottom: "28px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ display: "inline-block", width: "22px", height: "1px", background: "#B1987C" }} />
              {t.hero.label}
            </p>

            <h1 className="font-serif" style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              color: "#F0EBE4",
              marginBottom: "20px",
              letterSpacing: "-0.03em",
              lineHeight: "1.05",
              fontWeight: 400,
            }}>
              {t.hero.title}
              <br />
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #CEAD95 0%, #B1987C 60%, #9A7D65 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.hero.titleAccent}
              </em>
            </h1>

            <p style={{
              color: "rgba(220,215,207,0.72)",
              fontSize: "16px", lineHeight: "1.8",
              fontWeight: 300, maxWidth: "440px",
              marginBottom: "40px",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ maxWidth: "520px" }}>
              <SearchBar large placeholder={t.hero.searchPlaceholder} onSearch={setSearch} />
            </div>

            {/* Category quick-access pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {[
                { label: "Restaurantes", emoji: "🍽", hoverBg: "rgba(177,152,124,0.14)", hoverBorder: "rgba(177,152,124,0.35)", hoverColor: "#B1987C" },
                { label: "Cafés", emoji: "☕", hoverBg: "rgba(177,152,124,0.14)", hoverBorder: "rgba(177,152,124,0.35)", hoverColor: "#B1987C" },
                { label: "Aventuras", emoji: "🧗", hoverBg: "rgba(138,158,106,0.18)", hoverBorder: "rgba(138,158,106,0.4)", hoverColor: "#8A9E6A" },
                { label: "Cultura", emoji: "🎭", hoverBg: "rgba(177,152,124,0.14)", hoverBorder: "rgba(177,152,124,0.35)", hoverColor: "#B1987C" },
                { label: "Naturaleza", emoji: "🌿", hoverBg: "rgba(100,122,72,0.22)", hoverBorder: "rgba(100,122,72,0.45)", hoverColor: "#8A9E6A" },
                { label: "Estadías", emoji: "🏨", hoverBg: "rgba(177,152,124,0.14)", hoverBorder: "rgba(177,152,124,0.35)", hoverColor: "#B1987C" },
              ].map(({ label, emoji, hoverBg, hoverBorder, hoverColor }) => (
                <button
                  key={label}
                  onClick={() => {
                    const map: Record<string, CategoryFilter> = {
                      Restaurantes: "Restaurants",
                      Cafés: "Cafés",
                      Estadías: "Hotels",
                      Cultura: "Attractions",
                      Aventuras: "Attractions",
                      Naturaleza: "Attractions",
                    };
                    setCategory(map[label] ?? "All");
                    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    padding: "6px 13px",
                    fontSize: "10px", letterSpacing: "0.08em",
                    fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 500,
                    color: "rgba(223,220,213,0.62)",
                    background: "rgba(255,255,255,0.055)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "100px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = hoverBg;
                    (e.currentTarget as HTMLButtonElement).style.borderColor = hoverBorder;
                    (e.currentTarget as HTMLButtonElement).style.color = hoverColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.055)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLButtonElement).style.color = "rgba(223,220,213,0.62)";
                  }}
                >
                  <span>{emoji}</span> {label}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 mt-10">
              {[
                { value: `${MOCK_PLACES.length}+`, label: "Lugares curados" },
                { value: "6", label: "Ciudades" },
                { value: "100%", label: "Sin patrocinios" },
              ].map(({ value, label }, i) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: i < 2 ? "0" : "0" }}>
                  <div>
                    <p className="font-serif" style={{ fontSize: "26px", color: "#DFDCD5", fontWeight: 400, lineHeight: 1 }}>
                      {value}
                    </p>
                    <p style={{
                      fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase",
                      color: "rgba(223,220,213,0.38)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      fontWeight: 500, marginTop: "7px",
                    }}>
                      {label}
                    </p>
                  </div>
                  {i < 2 && (
                    <span style={{ display: "inline-block", width: "1px", height: "28px", background: "rgba(177,152,124,0.2)", marginLeft: "40px" }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: 0.4, animation: "scrollPulse 2.2s ease-in-out infinite",
        }} aria-hidden="true">
          <div style={{
            width: "1px", height: "44px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS — all dark, slight bg variation for rhythm
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <>
          {/* 1 — HOY EN TU CIUDAD */}
          <Section bg="#2A2925">
            <HoySection places={MOCK_PLACES} />
          </Section>

          {/* 2 — LUGARES DESTACADOS */}
          <Section bg="#363A28">
            <FeaturedSection places={featuredPlaces} />
          </Section>

          {/* 3 — EN FOCO */}
          {spotlightPlace && (
            <Section bg="#2A2925">
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: "28px", paddingBottom: "18px",
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
                    En foco
                  </p>
                  <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#E8E4DC", fontWeight: 400, letterSpacing: "-0.02em" }}>
                    Lugares que valen la pena
                  </h2>
                </div>
              </div>
              <SpotlightSection place={spotlightPlace} />
            </Section>
          )}

          {/* 4 — EXPERIENCIAS Y EVENTOS */}
          <Section bg="#363A28">
            <ExperienciasSection events={MOCK_EVENTS} />
          </Section>

          {/* 5 — JOYAS ESCONDIDAS */}
          <Section bg="#2A2925">
            <JoyasSection places={MOCK_PLACES} />
          </Section>

          {/* 6 — PEQUEÑOS PLANES */}
          <Section bg="#3A3E2C">
            <PlanesSection places={MOCK_PLACES} />
          </Section>

          {/* 7 — MAGAZINE EDITORIAL */}
          <Section bg="#252219">
            <MagazineSection places={MOCK_PLACES} />
          </Section>

          {/* 8 — LO QUE ESTÁ PASANDO AHORA */}
          <Section bg="#363A28">
            <AhoraSection places={MOCK_PLACES} />
          </Section>

          {/* 9 — OPINIONES */}
          <Section bg="#2A2925">
            <ReviewsSection />
          </Section>

          {/* 10 — EXPLORAR HEADER */}
          <div style={{ background: "#252219" }}>
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-4" id="explore">
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "40px" }}>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p style={{
                      fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
                      fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                      color: "#B1987C", marginBottom: "8px",
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#B1987C" }} />
                      Explorar todo
                    </p>
                    <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#E8E4DC", fontWeight: 400, letterSpacing: "-0.02em" }}>
                      Todos los lugares
                    </h2>
                  </div>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.32)", fontWeight: 300, fontFamily: "'Sora', system-ui, sans-serif" }}>
                    {MOCK_PLACES.length} lugares en Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORE — filter + grid
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#252219" }}>
        <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`} id={isExploring ? "explore" : undefined}>
          <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <CategoryPills active={category} onChange={setCategory} />
              <p style={{
                fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)", fontWeight: 500, whiteSpace: "nowrap",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}>
                {filteredPlaces.length}{" "}
                {filteredPlaces.length === 1 ? t.results.place : t.results.places}
              </p>
            </div>
            <FilterBar
              city={city}
              price={price}
              sort={sort}
              onCityChange={setCity}
              onPriceChange={setPrice}
              onSortChange={setSort}
            />
          </div>

          <PlaceGrid
            places={filteredPlaces}
            emptyMessage="Ningún lugar coincide con tus filtros."
            surface="homepage"
          />
        </div>
      </div>
    </div>
  );
}
