"use client";

import React from "react";
import Link from "next/link";
import { Place, Category } from "@/lib/types";

interface CategoryConfig {
  name: Category;
  label: string;
  description: string;
  index: string;
  icon: React.ReactNode;
}

function IconFork() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M8 3v4a2 2 0 0 0 4 0V3" />
      <line x1="10" y1="7" x2="10" y2="21" />
      <path d="M16 3v12h2a2 2 0 0 1 0 4h-2v2" />
    </svg>
  );
}

function IconCoffee() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function IconMountain() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polygon points="3 21 12 3 21 21" />
      <path d="M7 21l5-8 5 8" />
    </svg>
  );
}

function IconBed() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
      <path d="M2 10v-2a2 2 0 0 1 2-2h6" />
      <path d="M22 10v-2a2 2 0 0 0-2-2h-6" />
      <line x1="2" y1="16" x2="22" y2="16" />
    </svg>
  );
}

function IconGlass() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <polyline points="21 2 3 2 10 12.5 10 20" />
      <line x1="6" y1="20" x2="14" y2="20" />
    </svg>
  );
}

function IconMusic() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="18" r="3" />
      <circle cx="19" cy="15" r="3" />
      <polyline points="11 18 11 5 22 2 22 15" />
    </svg>
  );
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  {
    name: "Restaurants",
    label: "Gastronomía",
    description: "Desde la alta cocina hasta los favoritos del barrio",
    index: "01",
    icon: <IconFork />,
  },
  {
    name: "Cafés",
    label: "Cafés",
    description: "La mejor cultura del café colombiano",
    index: "02",
    icon: <IconCoffee />,
  },
  {
    name: "Attractions",
    label: "Cultura",
    description: "Museos, galerías, festivales y patrimonio",
    index: "03",
    icon: <IconMountain />,
  },
  {
    name: "Hotels",
    label: "Hoteles & Viajes",
    description: "Alojamientos boutique y escapadas de lujo",
    index: "04",
    icon: <IconBed />,
  },
  {
    name: "Bars",
    label: "Noche",
    description: "Coctelerías, rooftops y bares de autor",
    index: "05",
    icon: <IconGlass />,
  },
  {
    name: "Nightlife",
    label: "Vida Activa",
    description: "Música en vivo, rumba y los mejores spots",
    index: "06",
    icon: <IconMusic />,
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
    <section className="mb-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.04)]">
        <div>
          <p className="label-micro mb-3">Explorar</p>
          <h2
            className="text-3xl font-serif"
            style={{ color: "#D4D0C8" }}
          >
            Por categoría
          </h2>
        </div>
        <span
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "#4A4843",
            textTransform: "uppercase",
          }}
        >
          {CATEGORY_CONFIG.length} secciones
        </span>
      </div>

      {/* Category grid — 2px gaps, contact-sheet feel */}
      <div
        className="grid grid-cols-2 md:grid-cols-3"
        style={{ gap: "2px" }}
      >
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
            <Link key={cat.name} href={`/?category=${cat.name}`} className="group">
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
      className="card-hover bg-bg-card border border-[rgba(255,255,255,0.04)] p-6 h-full"
      style={{ minHeight: "160px" }}
    >
      <div className="flex items-start justify-between mb-6">
        {/* Icon in gold circle */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 36,
            height: 36,
            background: "rgba(200,164,78,0.08)",
            border: "1px solid rgba(200,164,78,0.15)",
            color: "#C8A44E",
          }}
        >
          {cat.icon}
        </div>
        {/* Index */}
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "#3A3835",
            fontWeight: 600,
          }}
        >
          {cat.index}
        </span>
      </div>

      <h3
        className="font-serif text-lg mb-1"
        style={{ color: "#D4D0C8" }}
      >
        {cat.label}
      </h3>
      <p
        style={{
          fontSize: "10px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#4A4843",
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        {count} {count === 1 ? "lugar" : "lugares"}
      </p>
      <p
        style={{
          color: "#706D64",
          fontSize: "12px",
          lineHeight: "1.6",
          fontWeight: 300,
        }}
      >
        {cat.description}
      </p>
    </div>
  );
}
