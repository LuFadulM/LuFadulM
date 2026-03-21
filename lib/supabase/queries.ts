/**
 * Supabase query helpers for featured placements.
 * These are used in production when Supabase is connected.
 * During development the app falls back to MOCK_FEATURED_PLACEMENTS in lib/ranking.ts.
 */
import { createClient } from "@/lib/supabase/client";
import { FeaturedPlacement } from "@/lib/types";

interface FeaturedFilter {
  city?: string;
  category?: string;
  placementType?: string;
}

/** Fetch active featured placements, optionally filtered by city/category/type */
export async function getFeaturedPlacements(filter?: FeaturedFilter): Promise<FeaturedPlacement[]> {
  try {
    const supabase = createClient();
    const now = new Date().toISOString();

    let query = supabase
      .from("featured_placements")
      .select("*, place:places(*)")
      .eq("is_active", true)
      .lte("start_at", now)
      .gte("end_at", now);

    if (filter?.city) query = query.eq("city", filter.city);
    if (filter?.category) query = query.eq("category", filter.category);
    if (filter?.placementType) query = query.eq("placement_type", filter.placementType);

    const { data, error } = await query.order("rank_priority", { ascending: false });
    if (error) return [];
    return (data ?? []) as FeaturedPlacement[];
  } catch {
    return [];
  }
}

/** Fetch all placements (active and inactive) for admin panel */
export async function getAllPlacements(): Promise<FeaturedPlacement[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("featured_placements")
      .select("*, place:places(id, name, city, category, slug)")
      .order("created_at", { ascending: false });
    if (error) return [];
    return (data ?? []) as FeaturedPlacement[];
  } catch {
    return [];
  }
}

interface PlacementAnalytics {
  placement_id: string;
  impressions: number;
  clicks: number;
  profile_views: number;
  saves: number;
}

/** Fetch analytics summary per placement */
export async function getPlacementAnalytics(placementIds: string[]): Promise<PlacementAnalytics[]> {
  if (placementIds.length === 0) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("featured_analytics")
      .select("placement_id, event_type")
      .in("placement_id", placementIds);

    if (error || !data) return [];

    // Aggregate client-side
    const map = new Map<string, PlacementAnalytics>();
    for (const row of data) {
      if (!row.placement_id) continue;
      if (!map.has(row.placement_id)) {
        map.set(row.placement_id, { placement_id: row.placement_id, impressions: 0, clicks: 0, profile_views: 0, saves: 0 });
      }
      const agg = map.get(row.placement_id)!;
      if (row.event_type === "impression") agg.impressions++;
      else if (row.event_type === "card_click") agg.clicks++;
      else if (row.event_type === "profile_view") agg.profile_views++;
      else if (row.event_type === "save") agg.saves++;
    }
    return Array.from(map.values());
  } catch {
    return [];
  }
}
