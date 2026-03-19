import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import StarRating from "@/components/reviews/StarRating";

interface PlaceCardProps {
  place: Place;
}

const categoryColors: Record<string, string> = {
  Restaurants: "bg-coral/20 text-coral border-coral/30",
  Cafés: "bg-teal/20 text-teal border-teal/30",
  Bars: "bg-gold/20 text-gold border-gold/30",
  Hotels: "bg-[rgba(100,120,200,0.2)] text-[#8090E8] border-[rgba(100,120,200,0.3)]",
  Attractions: "bg-teal/20 text-teal border-teal/30",
  Nightlife: "bg-[rgba(160,80,200,0.2)] text-[#C090E8] border-[rgba(160,80,200,0.3)]",
};

export default function PlaceCard({ place }: PlaceCardProps) {
  const categoryColorClass =
    categoryColors[place.category] ?? categoryColors.Restaurants;

  return (
    <Link href={`/places/${place.slug}`} className="block group">
      <article className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card overflow-hidden card-hover h-full">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-bg-surface">
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 540px) 100vw, (max-width: 900px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-bg-surface flex items-center justify-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-text-dim"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {place.is_featured && (
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-coral text-white border border-coral/50">
                  Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 justify-end">
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium border backdrop-blur-sm ${categoryColorClass}`}
              >
                {place.category}
              </span>
              {place.price_level && (
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/40 text-text border border-white/10 backdrop-blur-sm">
                  {place.price_level}
                </span>
              )}
            </div>
          </div>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-serif text-white text-lg leading-tight mb-1">
              {place.name}
            </h3>
            <p className="text-white/70 text-xs mb-2">
              {place.neighborhood ? `${place.neighborhood}, ` : ""}
              {place.city}
            </p>
            <div className="flex items-center gap-2">
              <StarRating rating={place.avg_rating} size="sm" />
              <span className="text-white/90 text-xs font-semibold">
                {formatRating(place.avg_rating)}
              </span>
              <span className="text-white/50 text-xs">
                ({place.review_count})
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {place.tags.length > 0 && (
          <div className="px-4 py-3 flex flex-wrap gap-1.5">
            {place.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-xs text-text-dim border border-[rgba(242,237,232,0.07)] bg-bg-surface"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
