"use client";

import { useState, useEffect, useMemo } from "react";
import { Place, PlaceFilters, Category } from "@/lib/types";
import { MOCK_PLACES } from "@/app/data/places";

type CategoryFilter = Category | "All";

const defaultFilters: PlaceFilters = {
  city: "All",
  price: "All",
  sort: "Rating",
  category: "All",
  search: "",
};

export function usePlaces(initialFilters: Partial<PlaceFilters> = {}) {
  const [filters, setFilters] = useState<PlaceFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [isLoading, setIsLoading] = useState(false);

  // In production, this would fetch from Supabase
  const places = useMemo(() => {
    let result = [...MOCK_PLACES];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.city !== "All") {
      result = result.filter((p) => p.city === filters.city);
    }

    if (filters.price !== "All") {
      result = result.filter((p) => p.price_level === filters.price);
    }

    switch (filters.sort) {
      case "Rating":
        result.sort((a, b) => b.avg_rating - a.avg_rating);
        break;
      case "Newest":
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "Most Reviewed":
        result.sort((a, b) => b.review_count - a.review_count);
        break;
    }

    return result;
  }, [filters]);

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const updateFilter = <K extends keyof PlaceFilters>(
    key: K,
    value: PlaceFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  const getPlaceBySlug = (slug: string): Place | undefined =>
    MOCK_PLACES.find((p) => p.slug === slug);

  return {
    places,
    featuredPlaces,
    filters,
    isLoading,
    updateFilter,
    resetFilters,
    getPlaceBySlug,
    totalCount: places.length,
  };
}
