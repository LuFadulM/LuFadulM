/**
 * Analytics query layer for featured placements.
 * Uses mock seed data in development; swap imports for live Supabase RPC in production.
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
  period: { start: string; end: string };
  totals: {
    impressions: number;
    cardClicks: number;
    profileViews: number;
    saves: number;
    shares: number;
    directionsClicks: number;
    websiteClicks: number;
    instagramClicks: number;
    phoneClicks: number;
  };
  /** card_clicks / impressions */
  ctr: number;
  /** (saves + shares + directions + website + instagram + phone) / profileViews */
  engagementRate: number;
  daily: DailyMetric[];
}

export interface FeaturedOverview {
  totalImpressions: number;
  totalClicks: number;
  totalProfileViews: number;
  totalSaves: number;
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

function filterByDate(records: DailyRecord[], startDate: string, endDate: string): DailyRecord[] {
  return records.filter((r) => r.date >= startDate && r.date <= endDate);
}

function buildInsights(placementId: string, records: DailyRecord[], startDate: string, endDate: string): PlaceInsights {
  const placement = MOCK_FEATURED_PLACEMENTS.find((fp) => fp.id === placementId)!;
  const filtered = records.filter((r) => r.placementId === placementId);

  const t = filtered.reduce(
    (acc, r) => ({
      impressions:       acc.impressions       + r.impressions,
      cardClicks:        acc.cardClicks        + r.card_clicks,
      profileViews:      acc.profileViews      + r.profile_views,
      saves:             acc.saves             + r.saves,
      shares:            acc.shares            + r.shares,
      websiteClicks:     acc.websiteClicks     + r.website_clicks,
      instagramClicks:   acc.instagramClicks   + r.instagram_clicks,
      phoneClicks:       acc.phoneClicks       + r.phone_clicks,
      directionsClicks:  acc.directionsClicks  + r.directions_clicks,
    }),
    { impressions: 0, cardClicks: 0, profileViews: 0, saves: 0, shares: 0, websiteClicks: 0, instagramClicks: 0, phoneClicks: 0, directionsClicks: 0 }
  );

  const ctr = t.impressions > 0 ? t.cardClicks / t.impressions : 0;
  const actionTotal = t.saves + t.shares + t.directionsClicks + t.websiteClicks + t.instagramClicks + t.phoneClicks;
  const engagementRate = t.profileViews > 0 ? actionTotal / t.profileViews : 0;

  const daily: DailyMetric[] = filtered.map((r) => ({
    date:          r.date,
    impressions:   r.impressions,
    clicks:        r.card_clicks,
    profile_views: r.profile_views,
  }));

  return {
    placementId,
    placeSlug:    placement.place_slug,
    placeName:    PLACE_NAMES[placement.place_slug] ?? placement.place_slug,
    city:         placement.city ?? "—",
    labelText:    placement.label_text,
    planType:     placement.plan_type,
    rankPriority: placement.rank_priority,
    isActive:     placement.is_active,
    period:       { start: startDate, end: endDate },
    totals:       t,
    ctr,
    engagementRate,
    daily,
  };
}

/**
 * Get insights for a single placement.
 * In production: call Supabase RPC get_place_analytics_summary(p_place_id, p_start, p_end)
 * and a daily breakdown query grouped by date_trunc('day', created_at).
 */
export function getPlaceInsights(placementId: string, startDate: string, endDate: string): PlaceInsights | null {
  const exists = MOCK_FEATURED_PLACEMENTS.find((fp) => fp.id === placementId);
  if (!exists) return null;
  const filtered = filterByDate(ANALYTICS_SEED, startDate, endDate);
  return buildInsights(placementId, filtered, startDate, endDate);
}

/**
 * Get overview across all active featured placements.
 * In production: fan-out to get_place_analytics_summary() per placement, or a single
 * aggregate query joining featured_placements + featured_analytics.
 */
export function getAllFeaturedInsights(startDate: string, endDate: string): FeaturedOverview {
  const filtered = filterByDate(ANALYTICS_SEED, startDate, endDate);
  const placementIds = MOCK_FEATURED_PLACEMENTS.map((fp) => fp.id);
  const placements = placementIds.map((id) => buildInsights(id, filtered, startDate, endDate));

  const totalImpressions  = placements.reduce((s, p) => s + p.totals.impressions, 0);
  const totalClicks       = placements.reduce((s, p) => s + p.totals.cardClicks, 0);
  const totalProfileViews = placements.reduce((s, p) => s + p.totals.profileViews, 0);
  const totalSaves        = placements.reduce((s, p) => s + p.totals.saves, 0);
  const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

  return { totalImpressions, totalClicks, totalProfileViews, totalSaves, avgCtr, placements };
}

/** Compute ISO date N days before endDate */
export function daysAgo(n: number, endDate: string): string {
  const d = new Date(endDate + "T00:00:00");
  d.setDate(d.getDate() - n + 1);
  return d.toISOString().split("T")[0];
}

export const ANALYTICS_END_DATE = "2026-03-21";
export const ANALYTICS_START_DATE = "2026-02-20";
