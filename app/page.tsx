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
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";


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
          <div className="py-20 md:py-28 max-w-2xl">
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
                maxWidth: "440px",
                marginBottom: "40px",
              }}
            >
              {t.hero.subtitle}
            </p>

            <div className="mb-8" style={{ maxWidth: "480px" }}>
              <SearchBar
                large
                placeholder={t.hero.searchPlaceholder}
                onSearch={setSearch}
              />
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

          {/* ── REVIEWS ──────────────────────────────────────────────── */}
          <ReviewsSection />

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
