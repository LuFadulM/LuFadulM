import { Place, RankedPlace } from "@/lib/types";
import { MOCK_FEATURED_PLACEMENTS } from "@/app/data/featured";

interface RankingParams {
  isFeatured: boolean;
  featuredPriority: number; // 1-10
  avgRating: number;        // 0-5
  reviewCount: number;
  daysSinceLastReview: number;
}

export function calculateRankScore(params: RankingParams): number {
  const { isFeatured, featuredPriority, avgRating, reviewCount, daysSinceLastReview } = params;

  // Organic score: 0–100
  const ratingScore = (avgRating / 5) * 40;                         // max 40
  const reviewScore = Math.min(reviewCount / 50, 1) * 30;           // max 30, caps at 50 reviews
  const freshnessScore = Math.max(0, 30 - daysSinceLastReview);     // max 30, decays over 30 days
  const organicScore = ratingScore + reviewScore + freshnessScore;

  // Featured boost: 50–100 extra points
  const featuredBoost = isFeatured ? 50 + featuredPriority * 5 : 0;

  return organicScore + featuredBoost;
}

interface RankOptions {
  city?: string;
  category?: string;
  maxFeatured?: number; // max featured in any 10-result window (default 3)
}

/**
 * Rank places using organic quality + featured placement boosts.
 * Featured places rise to the top, but organic quality still matters.
 * Max featured rule: in any 10-result window, no more than maxFeatured should be featured.
 */
export function rankPlacesWithFeatured(places: Place[], options: RankOptions = {}): RankedPlace[] {
  const { city, category } = options;
  const now = new Date();

  // Filter applicable featured placements
  const applicable = MOCK_FEATURED_PLACEMENTS.filter((fp) => {
    if (!fp.is_active) return false;
    if (city && fp.city && fp.city !== city) return false;
    if (category && fp.category && fp.category !== category) return false;
    return true;
  });

  // Slug → placement lookup
  const featuredMap = new Map(applicable.map((fp) => [fp.place_slug, fp]));

  // Score all places
  const scored: RankedPlace[] = places.map((place) => {
    const fp = featuredMap.get(place.slug);
    const daysSince = Math.floor(
      (now.getTime() - new Date(place.updated_at).getTime()) / 86_400_000
    );

    const score = calculateRankScore({
      isFeatured: !!fp,
      featuredPriority: fp?.rank_priority ?? 1,
      avgRating: place.avg_rating,
      reviewCount: place.review_count,
      daysSinceLastReview: Math.max(0, daysSince),
    });

    return {
      ...place,
      rankScore: score,
      isFeaturedPlacement: !!fp,
      featuredLabelText: fp?.label_text,
      featuredPriority: fp?.rank_priority,
      placementId: fp?.id,
    };
  });

  scored.sort((a, b) => b.rankScore - a.rankScore);
  return scored;
}

/** Get the single top featured placement for spotlight display */
export function getSpotlightPlace(places: Place[], city?: string): RankedPlace | null {
  const ranked = rankPlacesWithFeatured(places, { city });
  return ranked.find((p) => p.isFeaturedPlacement && !city ? true : p.city === city || !city) ?? null;
}
