import React from "react";
import Image from "next/image";
import { Place, Review } from "@/lib/types";
import { formatRating } from "@/lib/utils";
import StarRating from "@/components/reviews/StarRating";
import Badge from "@/components/ui/Badge";
import ReviewList from "@/components/reviews/ReviewList";
import WriteReview from "@/components/reviews/WriteReview";

interface PlaceDetailProps {
  place: Place;
  reviews?: Review[];
  isAuthenticated?: boolean;
}

export default function PlaceDetail({
  place,
  reviews = [],
  isAuthenticated = false,
}: PlaceDetailProps) {
  return (
    <div>
      {/* Cover Image */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-bg-surface">
        {place.cover_image_url ? (
          <Image
            src={place.cover_image_url}
            alt={place.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-bg-surface" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        {/* Header card */}
        <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-6 mb-6">
          <div className="flex flex-wrap items-start gap-3 mb-3">
            <Badge label={place.category} color="coral" />
            {place.price_level && (
              <Badge label={place.price_level} color="neutral" />
            )}
            {place.is_featured && (
              <Badge label="Featured" color="gold" />
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-text mb-1">
            {place.name}
          </h1>

          <p className="text-text-muted mb-4">
            {place.neighborhood ? `${place.neighborhood}, ` : ""}
            {place.city}
          </p>

          {/* Rating summary */}
          <div className="flex items-center gap-3">
            <span className="text-4xl font-serif text-text">
              {formatRating(place.avg_rating)}
            </span>
            <div>
              <StarRating rating={place.avg_rating} size="lg" />
              <p className="text-xs text-text-muted mt-0.5">
                {place.review_count} {place.review_count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* Tags */}
          {place.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {place.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-pill text-xs text-text-muted border border-[rgba(242,237,232,0.07)] bg-bg-surface"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Description */}
          <div className="md:col-span-2 space-y-6">
            {place.description && (
              <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-6">
                <h2 className="text-lg font-serif text-text mb-3">About</h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  {place.description}
                </p>
              </div>
            )}

            {/* Reviews */}
            <div>
              <ReviewList reviews={reviews} />
            </div>

            {/* Write Review */}
            {isAuthenticated ? (
              <WriteReview placeId={place.id} />
            ) : (
              <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-5 text-center">
                <p className="text-text-muted text-sm mb-3">
                  Sign in to write a review
                </p>
                <a
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 bg-coral text-white text-sm rounded-btn hover:bg-coral-hover transition-colors"
                >
                  Sign In
                </a>
              </div>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-4">
            {/* Contact info */}
            <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-5 space-y-4">
              <h3 className="text-base font-serif text-text">Info</h3>

              {place.hours && (
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-text-dim flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">Hours</p>
                    <p className="text-sm text-text-muted">{place.hours}</p>
                  </div>
                </div>
              )}

              {place.address && (
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-text-dim flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">Address</p>
                    <p className="text-sm text-text-muted">{place.address}</p>
                  </div>
                </div>
              )}

              {place.phone && (
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-text-dim flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 1.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">Phone</p>
                    <a href={`tel:${place.phone}`} className="text-sm text-text-muted hover:text-coral transition-colors">
                      {place.phone}
                    </a>
                  </div>
                </div>
              )}

              {place.website && (
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-text-dim flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">Website</p>
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-coral hover:text-coral-hover transition-colors break-all"
                    >
                      {place.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}

              {place.instagram && (
                <div className="flex gap-3">
                  <svg className="w-4 h-4 text-text-dim flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                  <div>
                    <p className="text-xs text-text-dim mb-0.5">Instagram</p>
                    <a
                      href={`https://instagram.com/${place.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-coral hover:text-coral-hover transition-colors"
                    >
                      {place.instagram}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
