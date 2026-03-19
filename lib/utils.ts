import { PriceLevel } from "./types";

export function formatPrice(priceLevel: PriceLevel | null | undefined): string {
  if (!priceLevel) return "";
  return priceLevel;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getPriceLabel(priceLevel: PriceLevel | null | undefined): string {
  const labels: Record<PriceLevel, string> = {
    $: "Budget",
    $$: "Moderate",
    $$$: "Upscale",
    $$$$: "Fine Dining",
  };
  if (!priceLevel) return "";
  return labels[priceLevel] || priceLevel;
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
