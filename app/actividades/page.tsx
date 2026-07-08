"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "@/app/data/places";
import PlaceGrid from "@/components/places/PlaceGrid";
import SearchBar from "@/components/search/SearchBar";
import { useLanguage } from "@/contexts/LanguageContext";

const ACTIVITY_CATEGORIES = ["Attractions", "Nightlife"] as const;

export default function ActividadesPage() {
  const { t } = useLanguage();
  const p = t.pages.actividades;
  const [search, setSearch] = useState("");

  const places = useMemo(() => {
    let results = MOCK_PLACES.filter((pl) =>
      ACTIVITY_CATEGORIES.includes(pl.category as (typeof ACTIVITY_CATEGORIES)[number])
    );
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (pl) =>
          pl.name.toLowerCase().includes(q) ||
          pl.city.toLowerCase().includes(q) ||
          pl.description?.toLowerCase().includes(q) ||
          pl.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
      <p className="label-micro mb-6" style={{ color: "#3DDC97" }}>{p.label}</p>
      <h1 className="font-serif mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#CBD6CE" }}>
        {p.title}
      </h1>
      <div style={{ width: "40px", height: "1px", background: "rgba(61,220,151,0.4)", marginBottom: "24px" }} />
      <p
        style={{
          color: "#64756B",
          fontSize: "14px",
          lineHeight: "1.8",
          maxWidth: "520px",
          marginBottom: "40px",
        }}
      >
        {p.subtitle}
      </p>

      <div className="mb-10">
        <SearchBar placeholder={p.searchPlaceholder} onSearch={setSearch} />
      </div>

      <PlaceGrid places={places} />
    </main>
  );
}
