"use client";

import React from "react";
import { FilterCity, FilterPrice, SortOption } from "@/lib/types";

interface FilterBarProps {
  city: FilterCity;
  price: FilterPrice;
  sort: SortOption;
  onCityChange: (city: FilterCity) => void;
  onPriceChange: (price: FilterPrice) => void;
  onSortChange: (sort: SortOption) => void;
}

const cities: FilterCity[] = [
  "All",
  "Bogotá",
  "Medellín",
  "Cartagena",
  "Cali",
  "Santa Marta",
  "Barranquilla",
  "Bucaramanga",
  "Manizales",
  "Pereira",
  "Salento",
  "Villa de Leyva",
  "Popayán",
  "San Andrés",
  "Barichara",
  "San Gil",
  "Leticia",
];

const prices: FilterPrice[] = ["All", "$", "$$", "$$$", "$$$$"];
const sorts: SortOption[] = ["Rating", "Newest", "Most Reviewed"];

const selectClass =
  "bg-bg-card border border-[rgba(242,237,232,0.07)] text-text-muted text-sm rounded-btn px-3 py-2 focus:outline-none focus:border-coral transition-colors cursor-pointer hover:border-[rgba(242,237,232,0.14)]";

export default function FilterBar({
  city,
  price,
  sort,
  onCityChange,
  onPriceChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs text-text-dim uppercase tracking-wider">Filter:</span>

      {/* City */}
      <select
        value={city}
        onChange={(e) => onCityChange(e.target.value as FilterCity)}
        className={selectClass}
        aria-label="Filter by city"
      >
        {cities.map((c) => (
          <option key={c} value={c} className="bg-bg-card">
            {c === "All" ? "All Cities" : c}
          </option>
        ))}
      </select>

      {/* Price */}
      <select
        value={price}
        onChange={(e) => onPriceChange(e.target.value as FilterPrice)}
        className={selectClass}
        aria-label="Filter by price"
      >
        {prices.map((p) => (
          <option key={p} value={p} className="bg-bg-card">
            {p === "All" ? "All Prices" : p}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className={selectClass}
        aria-label="Sort by"
      >
        {sorts.map((s) => (
          <option key={s} value={s} className="bg-bg-card">
            Sort: {s}
          </option>
        ))}
      </select>
    </div>
  );
}
