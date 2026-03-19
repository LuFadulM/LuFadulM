import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Your descubre profile",
};

export default function ProfilePage() {
  // In production this would check Supabase auth and load profile
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h1 className="text-3xl font-serif text-text mb-3">Your Profile</h1>
          <p className="text-text-muted mb-8">
            Sign in to manage your profile, reviews, and saved places.
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
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile Header */}
      <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-6 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-bg-surface border border-[rgba(242,237,232,0.14)] flex items-center justify-center text-xl font-serif text-text-muted flex-shrink-0">
            U
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-serif text-text mb-1">Username</h1>
            <p className="text-text-muted text-sm mb-3">Member since January 2024</p>
            <div className="flex flex-wrap gap-4 text-sm text-text-dim">
              <span>0 reviews</span>
              <span>0 saved places</span>
            </div>
          </div>
          <Link
            href="/profile/edit"
            className="flex-shrink-0 px-4 py-2 text-sm border border-[rgba(242,237,232,0.14)] rounded-btn text-text-muted hover:text-text hover:bg-bg-surface transition-colors"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-6">
        <h2 className="text-xl font-serif text-text mb-4">Your Reviews</h2>
        <p className="text-text-muted text-sm">
          You haven&apos;t written any reviews yet.{" "}
          <Link href="/" className="text-coral hover:text-coral-hover transition-colors">
            Explore places →
          </Link>
        </p>
      </div>
    </div>
  );
}
