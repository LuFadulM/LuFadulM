"use client";

import React from "react";
import Link from "next/link";
import { Place, Category } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

const CATEGORY_KEYS: Category[] = ["Restaurants", "Cafés", "Attractions", "Hotels", "Bars", "Nightlife"];

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  Restaurants: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 3v4a2 2 0 0 0 4 0V3" /><line x1="10" y1="7" x2="10" y2="21" />
      <path d="M16 3v12h2a2 2 0 0 1 0 4h-2v2" />
    </svg>
  ),
  Cafés: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  ),
  Attractions: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polygon points="3 21 12 3 21 21" /><path d="M7 21l5-8 5 8" />
    </svg>
  ),
  Hotels: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M2 10v-2a2 2 0 0 1 2-2h6" /><path d="M22 10v-2a2 2 0 0 0-2-2h-6" />
      <line x1="2" y1="16" x2="22" y2="16" />
    </svg>
  ),
  Bars: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polyline points="21 2 3 2 10 12.5 10 20" /><line x1="6" y1="20" x2="14" y2="20" />
    </svg>
  ),
  Nightlife: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="18" r="3" /><circle cx="19" cy="15" r="3" />
      <polyline points="11 18 11 5 22 2 22 15" />
    </svg>
  ),
};

interface CategoryGridProps {
  places: Place[];
  onCategorySelect?: (category: Category) => void;
}

export default function CategoryGrid({ places, onCategorySelect }: CategoryGridProps) {
  const { t } = useLanguage();

  const countByCategory = React.useMemo(() => {
    const counts: Record<string, number> = {};
    places.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return counts;
  }, [places]);

  return (
    <section className="mb-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-0 pb-4 border-b border-[rgba(255,255,255,0.06)]">
        <div>
          <p className="label-micro mb-3">{t.categoryGrid.sectionLabel}</p>
          <h2 className="text-3xl font-serif" style={{ color: "#D4D0C8" }}>
            {t.categoryGrid.sectionTitle}
          </h2>
        </div>
      </div>

      {/* Editorial list */}
      <div>
        {CATEGORY_KEYS.map((catKey, i) => {
          const count = countByCategory[catKey] || 0;
          const catT = t.categoryGrid[catKey];
          const index = String(i + 1).padStart(2, "0");

          const inner = (
            <div
              className="flex items-center gap-6 border-b border-[rgba(255,255,255,0.04)] relative cursor-pointer transition-all duration-200"
              style={{ paddingTop: "22px", paddingBottom: "22px", paddingLeft: "0" }}
            >
              {/* Row hover glow — left-origin gold wash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(212,175,55,0.05) 0%, rgba(212,175,55,0.01) 40%, transparent 70%)",
                }}
              />

              {/* Left accent line — subtle default, full gold on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-250 group-hover:opacity-100"
                style={{ background: "#D4AF37", opacity: 0.1 }}
              />

              {/* Index */}
              <span
                className="font-serif shrink-0 relative"
                style={{
                  fontSize: "26px",
                  color: "#252523",
                  lineHeight: 1,
                  minWidth: "44px",
                  paddingLeft: "16px",
                }}
              >
                {index}
              </span>

              {/* Icon */}
              <div
                className="shrink-0 flex items-center justify-center transition-colors duration-200 group-hover:text-[#D4AF37] relative"
                style={{ width: 32, height: 32, color: "#666660" }}
              >
                {CATEGORY_ICONS[catKey]}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 relative">
                <h3
                  className="font-serif transition-colors duration-200 group-hover:text-[#EBEBEB]"
                  style={{ fontSize: "20px", color: "#888882", lineHeight: 1.2 }}
                >
                  {catT.label}
                </h3>
                <p
                  className="mt-1.5 transition-colors duration-200 group-hover:text-[#A0A0A0]"
                  style={{
                    fontSize: "12px",
                    color: "#555550",
                    fontWeight: 300,
                    letterSpacing: "0.02em",
                  }}
                >
                  {catT.description}
                </p>
              </div>

              {/* Right: count + arrow */}
              <div className="shrink-0 flex items-center gap-4 pr-4 relative">
                <span
                  className="transition-colors duration-200 group-hover:text-[#909090]"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#555550",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {count} {count === 1 ? t.categoryGrid.place : t.categoryGrid.places}
                </span>
                <span
                  className="transition-all duration-200 group-hover:text-[#D4AF37] group-hover:translate-x-1"
                  style={{ color: "#444440", fontSize: "14px", display: "inline-block" }}
                >
                  →
                </span>
              </div>
            </div>
          );

          if (onCategorySelect) {
            return (
              <button key={catKey} onClick={() => onCategorySelect(catKey)} className="w-full text-left group">
                {inner}
              </button>
            );
          }
          return (
            <Link key={catKey} href={`/?category=${catKey}`} className="block group">
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
