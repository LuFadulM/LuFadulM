"use client";

import { useState, useCallback } from "react";
import { Review } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface UseReviewsReturn {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
  submitReview: (placeId: string, rating: number, text: string) => Promise<void>;
  voteHelpful: (reviewId: string) => Promise<void>;
  refetch: (placeId: string) => Promise<void>;
}

export function useReviews(initialReviews: Review[] = []): UseReviewsReturn {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (placeId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("reviews")
        .select("*, profile:profiles(*)")
        .eq("place_id", placeId)
        .order("created_at", { ascending: false });
      if (fetchError) throw fetchError;
      setReviews(data ?? []);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitReview = useCallback(
    async (placeId: string, rating: number, text: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("You must be signed in to leave a review.");

        const { data, error: insertError } = await supabase
          .from("reviews")
          .insert({ place_id: placeId, rating, text, user_id: user.id })
          .select("*, profile:profiles(*)")
          .single();
        if (insertError) throw insertError;
        setReviews((prev) => [data, ...prev]);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to submit review. Please try again.";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const voteHelpful = useCallback(async (reviewId: string) => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("helpful_votes")
        .insert({ review_id: reviewId, user_id: user.id });

      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId ? { ...r, helpful_count: r.helpful_count + 1 } : r
        )
      );
    } catch (err) {
      console.error("Failed to vote helpful:", err);
    }
  }, []);

  return { reviews, isLoading, error, submitReview, voteHelpful, refetch };
}
