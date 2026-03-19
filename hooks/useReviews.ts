"use client";

import { useState, useCallback } from "react";
import { Review } from "@/lib/types";

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
      // In production: fetch from Supabase
      // const { data } = await supabase
      //   .from('reviews')
      //   .select('*, profile:profiles(*)')
      //   .eq('place_id', placeId)
      //   .order('created_at', { ascending: false });
      // setReviews(data ?? []);
      console.log("Fetching reviews for place:", placeId);
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
        // In production: insert to Supabase
        // const { data } = await supabase.from('reviews').insert({
        //   place_id: placeId, rating, text, user_id: user.id
        // }).select('*, profile:profiles(*)').single();
        // setReviews(prev => [data, ...prev]);

        // Mock optimistic update
        const mockReview: Review = {
          id: `temp-${Date.now()}`,
          place_id: placeId,
          user_id: "current-user",
          rating,
          text,
          helpful_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setReviews((prev) => [mockReview, ...prev]);
      } catch (err) {
        setError("Failed to submit review. Please try again.");
        console.error(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const voteHelpful = useCallback(async (reviewId: string) => {
    try {
      // In production: insert helpful_vote to Supabase
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, helpful_count: r.helpful_count + 1 }
            : r
        )
      );
    } catch (err) {
      console.error("Failed to vote helpful:", err);
    }
  }, []);

  return { reviews, isLoading, error, submitReview, voteHelpful, refetch };
}
