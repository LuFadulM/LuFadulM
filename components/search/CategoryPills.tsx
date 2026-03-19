"use client";

import React from "react";
import { Category } from "@/lib/types";
import Pill from "@/components/ui/Pill";

type CategoryFilter = Category | "All";

const categories: CategoryFilter[] = [
  "All",
  "Restaurants",
  "Cafés",
  "Bars",
  "Hotels",
  "Attractions",
  "Nightlife",
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
          key={cat}
          label={cat}
          active={active === cat}
          onClick={() => onChange(cat)}
        />
      ))}
    </div>
  );
}
