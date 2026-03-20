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

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [city, setCity] = useState<FilterCity>("All");
  const [price, setPrice] = useState<FilterPrice>("All");
  const [sort, setSort] = useState<SortOption>("Rating");

  // Read ?category= from URL on mount
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

  const uniqueCities = useMemo(
    () => new Set(MOCK_PLACES.map((p) => p.city)).size,
    []
  );
  const uniqueCategories = useMemo(
    () => new Set(MOCK_PLACES.map((p) => p.category)).size,
    []
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-bg overflow-hidden">
        {/* Background gradient texture */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #E2725B 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3CC9AD 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-14">
          <div className="max-w-2xl">
            <p className="text-text-dim text-sm font-medium tracking-widest uppercase mb-4">
              Colombia · Gastronomía · Experiencias
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-text leading-tight mb-4">
              Descubre{" "}
              <span className="text-coral italic">Colombia</span>
            </h1>
            <p className="text-text-muted text-lg sm:text-xl mb-8 leading-relaxed">
              Los mejores restaurantes, cafés, bares, hoteles y atracciones
              en las ciudades más vibrantes de Colombia.
            </p>

            <SearchBar
              large
              placeholder="Busca lugares, ciudades, cocinas..."
              onSearch={setSearch}
            />
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="px-3 py-1.5 rounded-pill text-sm text-text-muted border border-[rgba(242,237,232,0.07)] bg-bg-card">
              {MOCK_PLACES.length} lugares
            </span>
            <span className="px-3 py-1.5 rounded-pill text-sm text-text-muted border border-[rgba(242,237,232,0.07)] bg-bg-card">
              {uniqueCities} ciudades
            </span>
            <span className="px-3 py-1.5 rounded-pill text-sm text-text-muted border border-[rgba(242,237,232,0.07)] bg-bg-card">
              {uniqueCategories} categorías
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Category grid — shown only on unfiltered homepage */}
        {showFeatured && (
          <CategoryGrid
            places={MOCK_PLACES}
            onCategorySelect={(cat) => setCategory(cat)}
          />
        )}

        {/* Featured section */}
        {showFeatured && <FeaturedSection places={featuredPlaces} />}

        {/* Category Pills */}
        <div className="mb-5">
          <CategoryPills active={category} onChange={setCategory} />
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <FilterBar
            city={city}
            price={price}
            sort={sort}
            onCityChange={setCity}
            onPriceChange={setPrice}
            onSortChange={setSort}
          />
          <p className="text-text-dim text-sm">
            {filteredPlaces.length}{" "}
            {filteredPlaces.length === 1 ? "lugar" : "lugares"} encontrados
          </p>
        </div>

        {/* Places Grid */}
        <PlaceGrid
          places={filteredPlaces}
          emptyMessage="Ningún lugar coincide con tus filtros. Intenta ajustar tu búsqueda."
        />
      </div>
    </div>
  );
}
