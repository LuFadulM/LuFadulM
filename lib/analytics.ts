import { AnalyticsEventType, AnalyticsSurface } from "@/lib/types";

interface TrackEventParams {
  placementId?: string;
  placeId: string;
  eventType: AnalyticsEventType;
  surface: AnalyticsSurface;
  userId?: string;
}

/**
 * Fire-and-forget analytics event for featured placements.
 * Only tracks places with active featured placements — keeps the table lean.
 * Never throws, never blocks UI.
 */
export async function trackFeaturedEvent(params: TrackEventParams): Promise<void> {
  if (!params.placementId) return; // only track featured places

  try {
    // Dynamic import keeps Supabase client out of the SSR bundle
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    await supabase.from("featured_analytics").insert({
      placement_id: params.placementId,
      place_id: params.placeId,
      event_type: params.eventType,
      surface: params.surface,
      user_id: params.userId ?? null,
    });
  } catch {
    // Silently fail — analytics must never break the UX
  }
}
