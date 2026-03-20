"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "@/app/data/places";
import PlaceGrid from "@/components/places/PlaceGrid";
import SearchBar from "@/components/search/SearchBar";

const ACTIVITY_CATEGORIES = ["Attractions", "Nightlife"] as const;

export default function ActividadesPage() {
  const [search, setSearch] = useState("");

  const places = useMemo(() => {
    let results = MOCK_PLACES.filter((p) =>
      ACTIVITY_CATEGORIES.includes(p.category as (typeof ACTIVITY_CATEGORIES)[number])
    );
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return results;
  }, [search]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <p className="label-micro mb-6" style={{ color: "#C8A44E" }}>
        Explorar
      </p>
      <h1
        className="font-serif mb-4"
        style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#D4D0C8" }}
      >
        Actividades
      </h1>
      <div
        style={{ width: "40px", height: "1px", background: "rgba(200,164,78,0.4)", marginBottom: "24px" }}
      />
      <p
        style={{
          color: "#706D64",
          fontSize: "14px",
          lineHeight: "1.8",
          maxWidth: "520px",
          marginBottom: "40px",
        }}
      >
        Cultura, naturaleza, vida nocturna y experiencias únicas en todo Colombia.
      </p>

      <div className="mb-10">
        <SearchBar placeholder="Busca actividades, ciudades..." onSearch={setSearch} />
      </div>

      <PlaceGrid places={places} />
    </main>
  );
}
