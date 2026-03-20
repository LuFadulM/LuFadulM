"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-bg/95 backdrop-blur-md border-b border-[rgba(242,237,232,0.07)]"
            : "bg-bg"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-coral text-2xl font-serif font-normal tracking-tight hover:text-coral-hover transition-colors"
          >
            descubre
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors rounded"
            >
              Explorar
            </Link>
            <Link
              href="/city/bogota"
              className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors rounded"
            >
              Ciudades
            </Link>
            <Link
              href="/saved"
              className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors rounded"
            >
              Guardados
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors"
                >
                  {user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "Profile"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2.5 text-sm border border-[rgba(242,237,232,0.14)] text-text-muted rounded-btn hover:text-text hover:bg-bg-card transition-colors font-medium"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm text-text-muted hover:text-text transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2.5 text-sm bg-coral text-white rounded-btn hover:bg-coral-hover transition-colors font-medium"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-text-muted hover:text-text transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} user={user} onSignOut={handleSignOut} />
    </>
  );
}
