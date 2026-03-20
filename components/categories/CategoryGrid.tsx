"use client";

import React from "react";
import Link from "next/link";
import { Place, Category } from "@/lib/types";

interface CategoryConfig {
  name: Category;
  label: string;
  description: string;
  icon: string;
  color: string;
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    name: "Restaurants",
    label: "Restaurantes",
    description: "Desde la alta cocina hasta los favoritos del barrio",
    icon: "🍽️",
    color: "#E2725B",
  },
  {
    name: "Cafés",
    label: "Cafés",
    description: "La mejor cultura del café colombiano",
    icon: "☕",
    color: "#3CC9AD",
  },
  {
    name: "Attractions",
    label: "Atracciones",
    description: "Naturaleza, historia y patrimonio cultural",
    icon: "🌿",
    color: "#4CAF7D",
  },
  {
    name: "Hotels",
    label: "Hoteles",
    description: "Alojamientos boutique y escapadas de lujo",
    icon: "🏨",
    color: "#6B8FD4",
  },
  {
    name: "Bars",
    label: "Bares",
    description: "Coctelerías, cerveza artesanal y tragos locales",
    icon: "🍸",
    color: "#D4A03C",
  },
  {
    name: "Nightlife",
    label: "Vida Nocturna",
    description: "Música en vivo, rumba y los mejores spots nocturnos",
    icon: "🎵",
    color: "#A855F7",
  },
];

interface CategoryGridProps {
  places: Place[];
  onCategorySelect?: (category: Category) => void;
}

export default function CategoryGrid({
  places,
  onCategorySelect,
}: CategoryGridProps) {
  const countByCategory = React.useMemo(() => {
    const counts: Record<string, number> = {};
    places.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [places]);

  return (
    <section className="mb-14">
      <h2 className="text-2xl font-serif text-text mb-6">
        Explorar por categoría
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {CATEGORY_CONFIG.map((cat) => {
          const count = countByCategory[cat.name] || 0;

          if (onCategorySelect) {
            return (
              <button
                key={cat.name}
                onClick={() => onCategorySelect(cat.name)}
                className="group text-left"
              >
                <CategoryCard cat={cat} count={count} />
              </button>
            );
          }

          return (
            <Link
              key={cat.name}
              href={`/?category=${cat.name}`}
              className="group"
            >
              <CategoryCard cat={cat} count={count} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function CategoryCard({
  cat,
  count,
}: {
  cat: CategoryConfig;
  count: number;
}) {
  return (
    <div
      className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-5 h-full transition-all duration-200 group-hover:border-[rgba(242,237,232,0.2)]"
      style={{ borderTop: `3px solid ${cat.color}` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-2xl">{cat.icon}</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-text-dim group-hover:text-text-muted transition-colors mt-0.5"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      <h3 className="font-serif text-lg text-text mb-0.5">{cat.label}</h3>
      <p className="text-text-dim text-xs mb-3">
        {count} {count === 1 ? "lugar" : "lugares"}
      </p>
      <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
        {cat.description}
      </p>
    </div>
  );
}
