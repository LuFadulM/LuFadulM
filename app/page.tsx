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
import SectionDots from "@/components/layout/SectionDots";
import { MOCK_EVENTS } from "./data/events";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

// ─── Section wrappers ─────────────────────────────────────────────────────────

function Section({ children, bg = "#2A2925", id }: { children: React.ReactNode; bg?: string; id?: string }) {
  return (
    <div style={{ background: bg }} id={id}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
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
    <div style={{ background: "#0A0909" }}>

      <SectionDots />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Clean, editorial, black + gold
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0909",
          position: "relative",
        }}
      >
        {/* Subtle gold glow top-right */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 85% 10%, rgba(201,168,76,0.07) 0%, transparent 55%)",
        }} />

        <div className="max-w-5xl mx-auto px-8 md:px-12 w-full relative" style={{ zIndex: 10 }}>
          <div style={{ padding: "clamp(64px,9vh,100px) 0" }}>

            {/* Main headline — "Descubre Colombia" inline */}
            <h1 className="font-serif" style={{
              fontSize: "clamp(52px, 8vw, 112px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              marginBottom: "28px",
            }}>
              <span style={{ color: "#F0EDE6" }}>{t.hero.title} </span>
              <em style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #E0C070 0%, #C9A84C 55%, #A88A35 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.hero.titleAccent}
              </em>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: "rgba(240,237,230,0.50)",
              fontSize: "16px",
              lineHeight: "1.75",
              fontWeight: 300,
              maxWidth: "520px",
              marginBottom: "40px",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}>
              {t.hero.subtitle}
            </p>

            {/* Search bar */}
            <div style={{ maxWidth: "600px", marginBottom: "32px" }}>
              <SearchBar large placeholder={t.hero.searchPlaceholder} onSearch={setSearch} />
            </div>

            {/* Stat pills — like descubre screenshot */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {[
                { value: `${MOCK_PLACES.length} lugares`, action: null },
                { value: "6 ciudades", action: () => {} },
                { value: "6 categorías", action: () => {} },
              ].map(({ value }) => (
                <span
                  key={value}
                  style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "7px 16px",
                    fontSize: "12px",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 400,
                    color: "rgba(240,237,230,0.55)",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "100px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {value}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: 0.25, animation: "scrollPulse 2.2s ease-in-out infinite",
        }} aria-hidden="true">
          <div style={{
            width: "1px", height: "40px",
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.8))",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS — all dark, slight bg variation for rhythm
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <>
          {/* 1 — HOY EN TU CIUDAD */}
          <Section bg="#0A0909" id="hoy">
            <HoySection places={MOCK_PLACES} />
          </Section>

          {/* 2 — LUGARES DESTACADOS */}
          <Section bg="#111110" id="featured">
            <FeaturedSection places={featuredPlaces} />
          </Section>

          {/* 3 — EN FOCO */}
          {spotlightPlace && (
            <Section bg="#0D0D0C" id="spotlight">
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
                  <h2 className="font-serif" style={{ fontSize: "clamp(32px,4.5vw,58px)", color: "#EAE9E3", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                    Lugares que valen la pena
                  </h2>
                </div>
              </div>
              <SpotlightSection place={spotlightPlace} />
            </Section>
          )}

          {/* 4 — EXPERIENCIAS Y EVENTOS */}
          <Section bg="#111110" id="experiencias">
            <ExperienciasSection events={MOCK_EVENTS} />
          </Section>

          {/* 5 — JOYAS ESCONDIDAS */}
          <Section bg="#0A0909" id="joyas">
            <JoyasSection places={MOCK_PLACES} />
          </Section>

          {/* 6 — PEQUEÑOS PLANES */}
          <Section bg="#111110" id="planes">
            <PlanesSection places={MOCK_PLACES} />
          </Section>

          {/* 7 — MAGAZINE EDITORIAL */}
          <Section bg="#0D0D0C" id="magazine">
            <MagazineSection places={MOCK_PLACES} />
          </Section>

          {/* 8 — LO QUE ESTÁ PASANDO AHORA */}
          <Section bg="#111110">
            <AhoraSection places={MOCK_PLACES} />
          </Section>

          {/* 9 — OPINIONES */}
          <Section bg="#0A0909">
            <ReviewsSection />
          </Section>

          {/* 10 — EXPLORAR HEADER */}
          <div style={{ background: "#0D0D0C" }}>
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-4" id="explore">
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "40px" }}>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p style={{
                      fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
                      fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                      color: "rgba(177,152,124,0.65)", marginBottom: "14px",
                      display: "flex", alignItems: "center", gap: "12px",
                    }}>
                      <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#B1987C" }} />
                      Explorar todo
                    </p>
                    <h2 className="font-serif" style={{ fontSize: "clamp(32px,4.5vw,58px)", color: "#EAE9E3", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
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
      <div style={{ background: "#0D0D0C" }}>
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
