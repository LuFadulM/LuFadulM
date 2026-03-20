"use client";

import React from "react";
import { Category } from "@/lib/types";
import Pill from "@/components/ui/Pill";

type CategoryFilter = Category | "All";

const categories: { value: CategoryFilter; label: string }[] = [
  { value: "All", label: "Todos" },
  { value: "Restaurants", label: "Restaurantes" },
  { value: "Cafés", label: "Cafés" },
  { value: "Attractions", label: "Atracciones" },
  { value: "Hotels", label: "Hoteles" },
  { value: "Bars", label: "Bares" },
  { value: "Nightlife", label: "Vida Nocturna" },
];

interface CategoryPillsProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export default function CategoryPills({ active, onChange }: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      {categories.map((cat) => (
        <Pill
          key={cat.value}
          label={cat.label}
          active={active === cat.value}
          onClick={() => onChange(cat.value)}
        />
      ))}
    </div>
  );
}
