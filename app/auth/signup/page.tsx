"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

const signupSchema = z
  .object({
    display_name: z.string().min(2, "Name must be at least 2 characters").max(60),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { display_name: data.display_name },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) throw authError;
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-btn px-4 py-3 text-sm text-text placeholder-text-dim focus:outline-none focus:border-coral transition-colors";

  if (success) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif text-text mb-2">Check your email</h2>
          <p className="text-text-muted text-sm mb-6">
            We&apos;ve sent you a confirmation link. Please check your inbox to verify your account.
          </p>
          <Link href="/auth/login" className="text-coral text-sm hover:text-coral-hover transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-coral text-3xl font-serif">
            descubre
          </Link>
          <h1 className="mt-3 text-2xl font-serif text-text">Únete a descubre</h1>
          <p className="text-text-muted text-sm mt-1">Create your free account</p>
        </div>

        {/* Card */}
        <div className="bg-bg-card border border-[rgba(242,237,232,0.07)] rounded-card p-7">
          {error && (
            <div className="mb-5 px-4 py-3 rounded bg-coral/10 border border-coral/20 text-coral text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Display Name */}
            <div>
              <label className="block text-sm text-text-muted mb-1.5" htmlFor="display_name">
                Your Name
              </label>
              <input
                id="display_name"
                type="text"
                placeholder="María García"
                className={inputClass}
                {...register("display_name")}
              />
              {errors.display_name && (
                <p className="mt-1 text-xs text-coral">{errors.display_name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-text-muted mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-coral">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-text-muted mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={inputClass}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-coral">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-text-muted mb-1.5" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                type="password"
                placeholder="••••••••"
                className={inputClass}
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="mt-1 text-xs text-coral">{errors.confirm_password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-coral text-white rounded-btn text-sm font-medium hover:bg-coral-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                "Crear cuenta"
              )}
            </button>

            <p className="text-xs text-text-dim text-center">
              By creating an account you agree to our{" "}
              <a href="#" className="text-coral hover:text-coral-hover transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-coral hover:text-coral-hover transition-colors">
                Privacy Policy
              </a>
              .
            </p>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(242,237,232,0.07)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-bg-card px-3 text-xs text-text-dim">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-coral hover:text-coral-hover transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
