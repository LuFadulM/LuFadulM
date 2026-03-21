"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MOCK_PLACES } from "./data/places";
import { Category, FilterCity, FilterPrice, SortOption } from "@/lib/types";
import SearchBar from "@/components/search/SearchBar";
import CategoryPills from "@/components/search/CategoryPills";
import FilterBar from "@/components/search/FilterBar";
import PlaceGrid from "@/components/places/PlaceGrid";
import FeaturedSection from "@/components/places/FeaturedSection";
import CategoryGrid from "@/components/categories/CategoryGrid";
import SpotlightSection from "@/components/places/SpotlightSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";

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

  // Ranked places with featured placement boosts
  const allRanked = useMemo(() => rankPlacesWithFeatured(MOCK_PLACES), []);

  // Spotlight: top homepage_featured placement
  const spotlightPlace = useMemo(
    () => allRanked.find((p) => p.isFeaturedPlacement) ?? null,
    [allRanked]
  );

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const filteredPlaces = useMemo(() => {
    // Use ranked list as base when sort=Rating, raw list otherwise
    let places = sort === "Rating"
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

    if (category !== "All") {
      places = places.filter((p) => p.category === category);
    }

    if (city !== "All") {
      places = places.filter((p) => p.city === city);
    }

    if (price !== "All") {
      places = places.filter((p) => p.price_level === price);
    }

    if (sort === "Newest") {
      places.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sort === "Most Reviewed") {
      places.sort((a, b) => b.review_count - a.review_count);
    }

    return places;
  }, [search, category, city, price, sort, allRanked]);

  const showFeatured =
    !search && category === "All" && city === "All" && price === "All";

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 20% 60%, rgba(212,175,55,0.06) 0%, transparent 55%), #0A0A09",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main hero grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 md:py-28">
            {/* Left — headline */}
            <div className="pr-0 md:pr-16 border-r-0 md:border-r md:border-[rgba(255,255,255,0.04)]">
              {/* Micro label */}
              <p
                className="label-micro mb-8"
                style={{ color: "#D4AF37" }}
              >
                {t.hero.label}
              </p>

              {/* Big serif headline */}
              <h1
                className="font-serif leading-none mb-8"
                style={{ fontSize: "clamp(52px, 7vw, 88px)", color: "#F5F5F5" }}
              >
                {t.hero.title}
                <br />
                <span style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #D4AF37 0%, #C8A44E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {t.hero.titleAccent}
                </span>
              </h1>

              {/* Thin rule */}
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

              {/* Search */}
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
                      className="w-full text-left py-4 border-b border-[rgba(255,255,255,0.04)] group transition-all duration-200"
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                    >
                      <span
                        className="font-serif transition-colors duration-200"
                        style={{ fontSize: "20px", color: "#555555" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
                      >
                        {c}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#555555",
                          fontWeight: 600,
                        }}
                      >
                        0{i + 1}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category grid — homepage only */}
        {showFeatured && (
          <CategoryGrid
            places={MOCK_PLACES}
            onCategorySelect={(cat) => setCategory(cat)}
          />
        )}

        {/* Spotlight — top featured placement */}
        {showFeatured && spotlightPlace && <SpotlightSection place={spotlightPlace} />}

        {/* Featured editorial section */}
        {showFeatured && <FeaturedSection places={featuredPlaces} />}

        {/* Filter + pills bar */}
        <div
          className="mb-8 pb-6 border-b border-[rgba(255,255,255,0.04)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <CategoryPills active={category} onChange={setCategory} />
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#888888",
                fontWeight: 500,
                whiteSpace: "nowrap",
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
