"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StarRating from "./StarRating";
import Button from "@/components/ui/Button";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  text: z.string().min(10, "Review must be at least 10 characters").max(1000),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface WriteReviewProps {
  placeId: string;
  onSuccess?: () => void;
}

export default function WriteReview({ placeId, onSuccess }: WriteReviewProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, text: "" },
  });

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating, { shouldValidate: true });
  };

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    try {
      // In production, this would call Supabase
      console.log("Review submitted:", { placeId, ...data });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      setSelectedRating(0);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-card border border-[rgba(234,241,236,0.07)] rounded-card p-5">
      <h3 className="text-lg font-serif text-text mb-4">Write a Review</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Star Rating Picker */}
        <div>
          <label className="block text-sm text-text-muted mb-2">Your Rating</label>
          <StarRating
            rating={selectedRating}
            interactive
            onChange={handleRatingChange}
            size="lg"
          />
          {errors.rating && (
            <p className="mt-1 text-xs text-coral">{errors.rating.message}</p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm text-text-muted mb-2">
            Your Review
          </label>
          <textarea
            {...register("text")}
            rows={4}
            placeholder="Share your experience..."
            className="w-full bg-bg-surface border border-[rgba(234,241,236,0.07)] rounded-btn px-4 py-3 text-sm text-text placeholder-text-dim focus:outline-none focus:border-coral resize-none transition-colors"
          />
          {errors.text && (
            <p className="mt-1 text-xs text-coral">{errors.text.message}</p>
          )}
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
          Submit Review
        </Button>
      </form>
    </div>
  );
}
