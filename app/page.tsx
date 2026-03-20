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

type CategoryFilter = Category | "All";

const CITIES = ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "Barranquilla"];

export default function HomePage() {
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

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const filteredPlaces = useMemo(() => {
    let places = [...MOCK_PLACES];

    if (search) {
      const q = search.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
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

    switch (sort) {
      case "Rating":
        places.sort((a, b) => b.avg_rating - a.avg_rating);
        break;
      case "Newest":
        places.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "Most Reviewed":
        places.sort((a, b) => b.review_count - a.review_count);
        break;
    }

    return places;
  }, [search, category, city, price, sort]);

  const showFeatured =
    !search && category === "All" && city === "All" && price === "All";

  return (
    <div>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0A0A09", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Main hero grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 py-20 md:py-28">
            {/* Left — headline */}
            <div className="pr-0 md:pr-16 border-r-0 md:border-r md:border-[rgba(255,255,255,0.04)]">
              {/* Micro label */}
              <p
                className="label-micro mb-8"
                style={{ color: "#C8A44E" }}
              >
                La guía editorial de Colombia
              </p>

              {/* Big serif headline */}
              <h1
                className="font-serif leading-none mb-8"
                style={{ fontSize: "clamp(52px, 7vw, 88px)", color: "#D4D0C8" }}
              >
                Descubre
                <br />
                <span style={{ color: "#C8A44E", fontStyle: "italic" }}>
                  Colombia.
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
                  color: "#706D64",
                  fontSize: "14px",
                  lineHeight: "1.8",
                  fontWeight: 300,
                  maxWidth: "380px",
                  marginBottom: "40px",
                }}
              >
                Restaurantes, cafés, bares, hoteles y experiencias culturales
                en las ciudades más vibrantes del país.
              </p>

              {/* Search */}
              <div className="mb-8">
                <SearchBar
                  large
                  placeholder="Busca lugares, cocinas, ciudades..."
                  onSearch={setSearch}
                />
              </div>

            </div>

            {/* Right — city index */}
            <div className="hidden md:flex flex-col justify-center pl-16">
              <p className="label-micro mb-6">Ciudades destacadas</p>
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
                        style={{ fontSize: "20px", color: "#3A3835" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D0C8")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#3A3835")}
                      >
                        {c}
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#3A3835",
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
                color: "#4A4843",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {filteredPlaces.length}{" "}
              {filteredPlaces.length === 1 ? "lugar" : "lugares"}
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
        />
      </div>
    </div>
  );
}
