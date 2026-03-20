import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import StarRating from "@/components/reviews/StarRating";

interface FeaturedSectionProps {
  places: Place[];
}

function FeaturedCard({ place }: { place: Place }) {
  return (
    <Link href={`/places/${place.slug}`} className="block group flex-shrink-0 w-72 sm:w-80">
      <article className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card overflow-hidden card-hover h-full">
        <div className="relative h-48 bg-bg-surface overflow-hidden">
          {place.cover_image_url ? (
            <Image
              src={place.cover_image_url}
              alt={place.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="320px"
            />
          ) : (
            <div className="w-full h-full bg-bg-surface" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded text-xs font-semibold bg-coral text-white">
              Destacado
            </span>
          </div>

          {/* Price badge */}
          {place.price_level && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/40 text-text border border-white/10 backdrop-blur-sm">
                {place.price_level}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-serif text-text text-base leading-snug">{place.name}</h3>
          </div>
          <p className="text-text-dim text-xs mb-2">
            {place.neighborhood ? `${place.neighborhood} · ` : ""}
            {place.city}
          </p>
          <div className="flex items-center gap-2">
            <StarRating rating={place.avg_rating} size="sm" />
            <span className="text-text-muted text-xs font-semibold">
              {formatRating(place.avg_rating)}
            </span>
            <span className="text-text-dim text-xs">({place.review_count})</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedSection({ places }: FeaturedSectionProps) {
  if (places.length === 0) return null;

  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-text">Lugares Destacados</h2>
        <Link
          href="/?featured=true"
          className="text-sm text-coral hover:text-coral-hover transition-colors"
        >
          Ver todos
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {places.map((place) => (
          <FeaturedCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
