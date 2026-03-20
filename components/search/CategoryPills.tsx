"use client";

import React from "react";
import { Category } from "@/lib/types";
import Pill from "@/components/ui/Pill";
import { useLanguage } from "@/contexts/LanguageContext";

type CategoryFilter = Category | "All";

interface CategoryPillsProps {
  active: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export default function CategoryPills({ active, onChange }: CategoryPillsProps) {
  const { t } = useLanguage();

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "All", label: t.categories.all },
    { value: "Restaurants", label: t.categories.Restaurants },
    { value: "Cafés", label: t.categories.Cafés },
    { value: "Attractions", label: t.categories.Attractions },
    { value: "Hotels", label: t.categories.Hotels },
    { value: "Bars", label: t.categories.Bars },
    { value: "Nightlife", label: t.categories.Nightlife },
  ];

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
