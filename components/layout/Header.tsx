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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
            ? "bg-bg/95 backdrop-blur-sm border-b border-[rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        {/* Top bar — thin editorial stripe */}
        {!scrolled && (
          <div className="border-b border-[rgba(255,255,255,0.04)]">
            <div className="max-w-7xl mx-auto px-6 h-7 flex items-center justify-between">
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#4A4843",
                  fontWeight: 600,
                }}
              >
                Colombia · Gastronomía · Cultura · Experiencias
              </span>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#4A4843",
                  fontWeight: 600,
                }}
              >
                Bogotá · Medellín · Cartagena · Cali
              </span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-gold text-2xl font-serif tracking-tight hover:text-gold-hover transition-colors duration-200"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            hyex
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0">
            {[
              { href: "/", label: "Explorar" },
              { href: "/city/bogota", label: "Ciudades" },
              { href: "/saved", label: "Guardados" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 transition-colors duration-200"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#706D64",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#D4D0C8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#706D64")
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="transition-colors duration-200"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#706D64",
                  }}
                >
                  {user.user_metadata?.display_name ??
                    user.email?.split("@")[0] ??
                    "Perfil"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 border border-[rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[rgba(200,164,78,0.3)]"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#706D64",
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="transition-colors duration-200"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#706D64",
                  }}
                >
                  Acceder
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2.5 bg-gold text-bg transition-all duration-200 hover:bg-gold-hover"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#0A0A09",
                  }}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors duration-200"
            style={{ color: "#706D64" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h18M3 16h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        onSignOut={handleSignOut}
      />
    </>
  );
}
