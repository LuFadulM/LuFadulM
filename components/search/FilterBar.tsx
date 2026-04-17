"use client";

import React from "react";
import { FilterCity, FilterPrice, SortOption } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

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
  "Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta",
  "Barranquilla", "Bucaramanga", "Manizales", "Pereira",
  "Salento", "Villa de Leyva", "Popayán", "San Andrés",
  "Barichara", "San Gil", "Leticia",
];

const prices: FilterPrice[] = ["All", "$", "$$", "$$$", "$$$$"];

const selectStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  color: "var(--text-secondary)",
  fontSize: "var(--text-micro)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: "var(--font-sans)",
  padding: "8px 12px",
  cursor: "pointer",
  outline: "none",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: "28px",
};

export default function FilterBar({ city, price, sort, onCityChange, onPriceChange, onSortChange }: FilterBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span style={{
        fontSize: "9px", letterSpacing: "0.2em",
        color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600,
        fontFamily: "var(--font-sans)",
        marginRight: "4px",
      }}>
        {t.filter.label}
      </span>

      <select value={city} onChange={(e) => onCityChange(e.target.value as FilterCity)} style={selectStyle} aria-label="Filtrar por ciudad">
        {cities.map((c) => (
          <option key={c} value={c}>{c === "All" ? t.filter.allCities : c}</option>
        ))}
      </select>

      <select value={price} onChange={(e) => onPriceChange(e.target.value as FilterPrice)} style={selectStyle} aria-label="Filtrar por precio">
        {prices.map((p) => (
          <option key={p} value={p}>{p === "All" ? t.filter.allPrices : p}</option>
        ))}
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)} style={selectStyle} aria-label="Ordenar por">
        <option value="Rating">{t.filter.sortRating}</option>
        <option value="Newest">{t.filter.sortNewest}</option>
        <option value="Most Reviewed">{t.filter.sortReviewed}</option>
      </select>
    </div>
  );
}
