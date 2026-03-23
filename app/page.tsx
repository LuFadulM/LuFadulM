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
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

const CITIES = ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "Barranquilla"];

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
    <div>
      {/* ══════════════════════════════════════════════════════════════════
          HERO — Keep exactly as-is: dark editorial, Descubre Colombia
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(212,175,55,0.06) 0%, transparent 55%), #0A0A09",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 md:py-28">
            {/* Left — headline */}
            <div className="pr-0 md:pr-16 border-r-0 md:border-r md:border-[rgba(255,255,255,0.04)]">
              <p className="label-micro mb-8" style={{ color: "#D4AF37" }}>
                {t.hero.label}
              </p>

              <h1
                className="font-serif leading-none mb-8"
                style={{ fontSize: "clamp(52px, 7vw, 88px)", color: "#F5F5F5" }}
              >
                {t.hero.title}
                <br />
                <span
                  style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #D4AF37 0%, #C8A44E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.hero.titleAccent}
                </span>
              </h1>

              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "rgba(200,164,78,0.4)",
                  marginBottom: "24px",
                }}
              />

              <p
                style={{
                  color: "#AFAFAF",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  fontWeight: 300,
                  maxWidth: "380px",
                  marginBottom: "40px",
                }}
              >
                {t.hero.subtitle}
              </p>

              <div className="mb-8">
                <SearchBar
                  large
                  placeholder={t.hero.searchPlaceholder}
                  onSearch={setSearch}
                />
              </div>
            </div>

            {/* Right — city index */}
            <div className="hidden md:flex flex-col justify-center pl-16">
              <p className="label-micro mb-6">{t.hero.featuredCities}</p>
              <ul>
                {CITIES.map((c, i) => (
                  <li key={c}>
                    <button
                      onClick={() => setCity(c as FilterCity)}
                      className="w-full text-left group relative border-b border-[rgba(255,255,255,0.04)] transition-all duration-200"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 0 18px 16px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-250 group-hover:opacity-100"
                        style={{ background: "#D4AF37", opacity: 0.1 }}
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(212,175,55,0.04) 0%, rgba(212,175,55,0.01) 40%, transparent 70%)",
                        }}
                      />
                      <span
                        className="font-serif transition-colors duration-200 group-hover:text-white relative"
                        style={{ fontSize: "20px", color: "#686868" }}
                      >
                        {c}
                      </span>
                      <div className="flex items-center gap-3 relative">
                        <span
                          style={{
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            color: "#333333",
                            fontWeight: 600,
                          }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className="transition-all duration-200 group-hover:text-[#D4AF37] group-hover:translate-x-1 opacity-0 group-hover:opacity-100"
                          style={{
                            color: "#D4AF37",
                            fontSize: "12px",
                            display: "inline-block",
                          }}
                        >
                          →
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY PLATFORM — shown when not actively searching/filtering
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <div className="max-w-7xl mx-auto px-6 pt-20">

          {/* ── HOY EN TU CIUDAD ─────────────────────────────────────── */}
          <HoySection places={MOCK_PLACES} />

          {/* ── JOYAS ESCONDIDAS ─────────────────────────────────────── */}
          <JoyasSection places={MOCK_PLACES} />

          {/* ── PEQUEÑOS PLANES ──────────────────────────────────────── */}
          <PlanesSection places={MOCK_PLACES} />

          {/* ── SPOTLIGHT — top featured placement ───────────────────── */}
          {spotlightPlace && (
            <section className="mb-24">
              <div className="discovery-header">
                <div>
                  <div className="section-label-bar">
                    <span className="label-micro">En foco</span>
                  </div>
                  <h2
                    className="font-serif"
                    style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
                  >
                    Lugares que valen la pena
                  </h2>
                </div>
              </div>
              <SpotlightSection place={spotlightPlace} />
            </section>
          )}

          {/* ── FEATURED EDITORIAL ───────────────────────────────────── */}
          <FeaturedSection places={featuredPlaces} />

          {/* ── LO QUE ESTÁ PASANDO ──────────────────────────────────── */}
          <AhoraSection places={MOCK_PLACES} />

          {/* ── DIVIDER before explore ────────────────────────────────── */}
          <div
            id="explore"
            className="mb-12 pt-4"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-end justify-between pt-8 mb-2">
              <div>
                <div className="section-label-bar">
                  <span className="label-micro">Explorar todo</span>
                </div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
                >
                  Todos los lugares
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORE — filter bar + place grid
      ══════════════════════════════════════════════════════════════════ */}
      <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`}>

        {/* Filter + pills bar */}
        <div className="mb-8 pb-6 border-b border-[rgba(255,255,255,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <CategoryPills active={category} onChange={setCategory} />
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#555555",
                fontWeight: 500,
                whiteSpace: "nowrap",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
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

        {/* Places grid */}
        <PlaceGrid
          places={filteredPlaces}
          emptyMessage="Ningún lugar coincide con tus filtros."
          surface="homepage"
        />
      </div>
    </div>
  );
}
