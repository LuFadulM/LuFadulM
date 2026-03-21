/**
 * Analytics query layer for featured placements.
 * Uses mock seed data in development; falls back to Supabase in production.
 * Future: expose /negocio/[placeId]/insights for claimed business owners.
 */

import { MOCK_FEATURED_PLACEMENTS } from "@/app/data/featured";
import { ANALYTICS_SEED, DailyRecord } from "@/app/data/analytics-seed";

export interface DailyMetric {
  date: string;
  impressions: number;
  clicks: number;
  profile_views: number;
}

export interface PlaceInsights {
  placementId: string;
  placeSlug: string;
  placeName: string;
  city: string;
  labelText: string;
  planType: string;
  rankPriority: number;
  isActive: boolean;
  // totals
  totalImpressions: number;
  totalClicks: number;
  totalProfileViews: number;
  totalSaves: number;
  totalWebsiteClicks: number;
  totalInstagramClicks: number;
  totalPhoneClicks: number;
  totalDirectionsClicks: number;
  // derived
  ctr: number;           // card_clicks / impressions
  engagementRate: number; // (clicks + profile_views) / impressions
  // time series
  daily: DailyMetric[];
}

export interface FeaturedOverview {
  totalImpressions: number;
  totalClicks: number;
  totalProfileViews: number;
  avgCtr: number;
  placements: PlaceInsights[];
}

const PLACE_NAMES: Record<string, string> = {
  "el-cielo":                "El Cielo",
  "la-pepita-burger-bar":    "La Pepita Burger Bar",
  "cafe-velvet":             "Café Velvet",
  "alambique":               "Alambique",
  "parque-nacional-tayrona": "Parque Nacional Tayrona",
};

export type DateRange = "7d" | "30d" | "90d" | "all";

function filterByRange(records: DailyRecord[], range: DateRange): DailyRecord[] {
  if (range === "all") return records;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date("2026-03-21");
  cutoff.setDate(cutoff.getDate() - days + 1);
  const cutoffStr = cutoff.toISOString().split("T")[0];
  return records.filter((r) => r.date >= cutoffStr);
}

function buildInsights(placementId: string, records: DailyRecord[]): PlaceInsights {
  const placement = MOCK_FEATURED_PLACEMENTS.find((fp) => fp.id === placementId)!;
  const filtered = records.filter((r) => r.placementId === placementId);

  const totals = filtered.reduce(
    (acc, r) => ({
      impressions:       acc.impressions       + r.impressions,
      clicks:            acc.clicks            + r.card_clicks,
      profile_views:     acc.profile_views     + r.profile_views,
      saves:             acc.saves             + r.saves,
      website_clicks:    acc.website_clicks    + r.website_clicks,
      instagram_clicks:  acc.instagram_clicks  + r.instagram_clicks,
      phone_clicks:      acc.phone_clicks      + r.phone_clicks,
      directions_clicks: acc.directions_clicks + r.directions_clicks,
    }),
    { impressions: 0, clicks: 0, profile_views: 0, saves: 0, website_clicks: 0, instagram_clicks: 0, phone_clicks: 0, directions_clicks: 0 }
  );

  const daily: DailyMetric[] = filtered.map((r) => ({
    date:          r.date,
    impressions:   r.impressions,
    clicks:        r.card_clicks,
    profile_views: r.profile_views,
  }));

  const ctr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0;
  const engagementRate = totals.impressions > 0
    ? (totals.clicks + totals.profile_views) / totals.impressions
    : 0;

  return {
    placementId,
    placeSlug:    placement.place_slug,
    placeName:    PLACE_NAMES[placement.place_slug] ?? placement.place_slug,
    city:         placement.city ?? "—",
    labelText:    placement.label_text,
    planType:     placement.plan_type,
    rankPriority: placement.rank_priority,
    isActive:     placement.is_active,
    totalImpressions:    totals.impressions,
    totalClicks:         totals.clicks,
    totalProfileViews:   totals.profile_views,
    totalSaves:          totals.saves,
    totalWebsiteClicks:  totals.website_clicks,
    totalInstagramClicks: totals.instagram_clicks,
    totalPhoneClicks:    totals.phone_clicks,
    totalDirectionsClicks: totals.directions_clicks,
    ctr,
    engagementRate,
    daily,
  };
}

/**
 * Get insights for a single placement (by placementId).
 * In production: query featured_analytics WHERE placement_id = $1
 * grouped by date_trunc('day', created_at).
 */
export function getPlaceInsights(placementId: string, range: DateRange = "30d"): PlaceInsights | null {
  const filtered = filterByRange(ANALYTICS_SEED, range);
  const exists = MOCK_FEATURED_PLACEMENTS.find((fp) => fp.id === placementId);
  if (!exists) return null;
  return buildInsights(placementId, filtered);
}

/**
 * Get overview across all featured placements.
 * In production: call get_place_analytics_summary() RPC or aggregate in the app.
 */
export function getAllFeaturedInsights(range: DateRange = "30d"): FeaturedOverview {
  const filtered = filterByRange(ANALYTICS_SEED, range);
  const placementIds = MOCK_FEATURED_PLACEMENTS.map((fp) => fp.id);

  const placements = placementIds.map((id) => buildInsights(id, filtered));

  const totalImpressions  = placements.reduce((s, p) => s + p.totalImpressions, 0);
  const totalClicks       = placements.reduce((s, p) => s + p.totalClicks, 0);
  const totalProfileViews = placements.reduce((s, p) => s + p.totalProfileViews, 0);
  const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

  return { totalImpressions, totalClicks, totalProfileViews, avgCtr, placements };
}
