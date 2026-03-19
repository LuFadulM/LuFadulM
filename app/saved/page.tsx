import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Places",
  description: "Your saved places on descubre",
};

export default function SavedPage() {
  // In production this would check Supabase auth and load saved places
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-card border border-[rgba(242,237,232,0.07)] flex items-center justify-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-text-muted"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <h1 className="text-3xl font-serif text-text mb-3">Saved Places</h1>
          <p className="text-text-muted mb-8">
            Sign in to save your favorite places and access them from anywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-coral text-white rounded-btn text-sm font-medium hover:bg-coral-hover transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-3 border border-[rgba(242,237,232,0.14)] text-text rounded-btn text-sm hover:bg-bg-card transition-colors"
            >
              Create Account
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-[rgba(242,237,232,0.07)]">
            <p className="text-text-dim text-sm mb-4">
              Or explore places without an account
            </p>
            <Link
              href="/"
              className="text-coral text-sm hover:text-coral-hover transition-colors"
            >
              Browse all places →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view would show saved places grid
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-serif text-text mb-8">Saved Places</h1>
      <p className="text-text-muted">You haven&apos;t saved any places yet.</p>
    </div>
  );
}
