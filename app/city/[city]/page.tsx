"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "@/app/data/places";
import PlaceGrid from "@/components/places/PlaceGrid";
import CategoryPills from "@/components/search/CategoryPills";
import SearchBar from "@/components/search/SearchBar";
import { Category } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import Link from "next/link";

type CategoryFilter = Category | "All";

const citySlugMap: Record<string, string> = {
  bogota: "Bogotá",
  medellin: "Medellín",
  cartagena: "Cartagena",
  cali: "Cali",
  "santa-marta": "Santa Marta",
  barranquilla: "Barranquilla",
  chia: "Chía",
  salento: "Salento",
  "villa-de-leyva": "Villa de Leyva",
  popayan: "Popayán",
  "san-andres": "San Andrés",
  barichara: "Barichara",
  "san-gil": "San Gil",
  manizales: "Manizales",
  pereira: "Pereira",
  bucaramanga: "Bucaramanga",
  leticia: "Leticia",
};

interface CityPageProps {
  params: { city: string };
}

export default function CityPage({ params }: CityPageProps) {
  const { t } = useLanguage();
  const cityName = citySlugMap[params.city.toLowerCase()];
  const displayName = cityName ?? params.city;
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");

  const places = useMemo(() => {
    let ranked = rankPlacesWithFeatured(MOCK_PLACES, { city: cityName });

    ranked = ranked.filter((p) =>
      cityName
        ? p.city === cityName
        : p.city.toLowerCase().replace(/\s+/g, "-") === params.city.toLowerCase()
    );

    if (category !== "All") ranked = ranked.filter((p) => p.category === category);

    if (search) {
      const q = search.toLowerCase();
      ranked = ranked.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return ranked;
  }, [cityName, params.city, category, search]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "#4A4843" }}
          className="transition-colors duration-200 hover:text-[#706D64]">
          {t.nav.explore}
        </Link>
        <span style={{ fontSize: "10px", color: "#3A3835" }}>·</span>
        <Link href="/ciudades" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "#4A4843" }}
          className="transition-colors duration-200 hover:text-[#706D64]">
          {t.nav.cities}
        </Link>
        <span style={{ fontSize: "10px", color: "#3A3835" }}>·</span>
        <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, color: "#706D64" }}>
          {displayName}
        </span>
      </div>

      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[rgba(255,255,255,0.04)]">
        <p className="label-micro mb-4" style={{ color: "#C8A44E" }}>Colombia</p>
        <h1 className="font-serif mb-3" style={{ fontSize: "clamp(40px, 6vw, 72px)", color: "#D4D0C8", lineHeight: 1 }}>
          {displayName}
        </h1>
        <p style={{ color: "#706D64", fontSize: "13px", fontWeight: 300 }}>
          {places.length} {places.length === 1 ? t.results.place : t.results.places}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          placeholder={`${t.hero.searchPlaceholder.split(",")[0]}, ${displayName}...`}
          onSearch={setSearch}
        />
      </div>

      <div className="mb-8">
        <CategoryPills active={category} onChange={setCategory} />
      </div>

      <PlaceGrid places={places} surface="city_page" />
    </div>
  );
}
