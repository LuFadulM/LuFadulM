"use client";

import React, { useState, useMemo } from "react";
import { notFound } from "next/navigation";
import { MOCK_PLACES } from "@/app/data/places";
import PlaceGrid from "@/components/places/PlaceGrid";
import CategoryPills from "@/components/search/CategoryPills";
import SearchBar from "@/components/search/SearchBar";
import { Category } from "@/lib/types";

type CategoryFilter = Category | "All";

const citySlugMap: Record<string, string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cartagena: "Cartagena",
  cali: "Cali",
  "santa-marta": "Santa Marta",
  barranquilla: "Barranquilla",
  chia: "Chía",
};

interface CityPageProps {
  params: { city: string };
}

export default function CityPage({ params }: CityPageProps) {
  const cityName = citySlugMap[params.city.toLowerCase()];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const places = useMemo(() => {
    let filtered = MOCK_PLACES.filter((p) => {
      if (cityName) {
        return p.city === cityName;
      }
      // Fallback: try to match by slug
      return p.city.toLowerCase().replace(/\s+/g, "-") === params.city.toLowerCase();
    });

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return filtered.sort((a, b) => b.avg_rating - a.avg_rating);
  }, [cityName, params.city, category, search]);

  const displayName = cityName ?? params.city;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-text-dim text-sm mb-3">
          <a href="/" className="hover:text-text transition-colors">
            Home
          </a>
          <span>/</span>
          <span className="text-text-muted">{displayName}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif text-text mb-2">
          {displayName}
        </h1>
        <p className="text-text-muted">
          Discover the best places in {displayName}, Colombia
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          placeholder={`Search in ${displayName}...`}
          onSearch={setSearch}
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <CategoryPills active={category} onChange={setCategory} />
      </div>

      {/* Count */}
      <div className="mb-5">
        <p className="text-text-dim text-sm">
          {places.length} {places.length === 1 ? "place" : "places"} in {displayName}
        </p>
      </div>

      {/* Grid */}
      <PlaceGrid
        places={places}
        emptyMessage={`No places found in ${displayName} matching your filters.`}
      />
    </div>
  );
}
