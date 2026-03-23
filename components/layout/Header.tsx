"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/lib/i18n";

const ACTIVIDADES_ITEMS = [
  { label: "Restaurantes",   href: "/?category=Restaurants" },
  { label: "Cafés",          href: "/?category=Cafés" },
  { label: "Bares",          href: "/?category=Bars" },
  { label: "Vida Nocturna",  href: "/?category=Nightlife" },
  { label: "Hoteles",        href: "/?category=Hotels" },
  { label: "Atracciones",    href: "/?category=Attractions" },
];

const NAV_LINK_STYLE: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 500,
  color: "#AFAFAF",
};

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 xl:px-4 py-2 transition-colors duration-200 whitespace-nowrap"
      style={NAV_LINK_STYLE}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#AFAFAF")}
    >
      {label}
    </Link>
  );
}

function ActividadesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button
        className="px-3 xl:px-4 py-2 flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
        style={{
          ...NAV_LINK_STYLE,
          color: open ? "#FFFFFF" : "#AFAFAF",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Actividades
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            marginTop: "1px",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-1/2 pt-3"
          style={{ transform: "translateX(-50%)", minWidth: "180px", zIndex: 50 }}
        >
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              top: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "6px solid rgba(255,255,255,0.06)",
            }}
          />
          <div
            style={{
              background: "#0E0E0E",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.04)",
              overflow: "hidden",
              marginTop: "6px",
            }}
          >
            {ACTIVIDADES_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-3 transition-all duration-150 group"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#888888",
                  borderBottom:
                    i < ACTIVIDADES_ITEMS.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#F5F5F5";
                  e.currentTarget.style.background = "rgba(212,175,55,0.04)";
                  e.currentTarget.style.paddingLeft = "22px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#888888";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "20px";
                }}
              >
                {item.label}
                <span
                  style={{
                    color: "rgba(212,175,55,0.4)",
                    fontSize: "11px",
                    opacity: 0,
                    transition: "opacity 0.15s ease",
                  }}
                  className="group-hover:opacity-100"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { t, locale, setLocale } = useLanguage();

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
        {/* Top bar */}
        {!scrolled && (
          <div className="border-b border-[rgba(255,255,255,0.04)]">
            <div className="max-w-7xl mx-auto px-6 h-7 flex items-center justify-between">
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#666666",
                  fontWeight: 600,
                }}
              >
                {t.topbar.tagline}
              </span>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#666666",
                  fontWeight: 600,
                }}
              >
                {t.topbar.cities}
              </span>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-gold text-2xl font-serif tracking-tight hover:text-gold-hover transition-colors duration-200 shrink-0"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            hyex
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
            <NavLink href="/"           label="Explorar" />
            <NavLink href="/ciudades"   label="Ciudades" />
            <ActividadesDropdown />
            <NavLink href="/mapa"       label="Mapa" />
            <NavLink href="/about"      label="Nosotros" />
            <NavLink href="/magazine"   label="Magazine" />
          </nav>

          {/* Right — lang switcher + auth */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {/* Language toggle */}
            <div className="flex items-center" style={{ gap: "1px" }}>
              {(["es", "en"] as Locale[]).map((l, i) => (
                <React.Fragment key={l}>
                  <button
                    onClick={() => setLocale(l)}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: locale === l ? 600 : 400,
                      color: locale === l ? "#D4AF37" : "#666666",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px 4px",
                      transition: "color 0.2s",
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                  {i === 0 && (
                    <span style={{ color: "#3A3A3A", fontSize: "10px" }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

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
                    color: "#AFAFAF",
                  }}
                >
                  {user.user_metadata?.display_name ??
                    user.email?.split("@")[0] ??
                    t.nav.explore}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 border border-[rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[rgba(212,175,55,0.3)]"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#AFAFAF",
                  }}
                >
                  {t.nav.signout}
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
                    color: "#AFAFAF",
                  }}
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2.5 bg-gold transition-all duration-200 hover:bg-gold-hover"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#000000",
                  }}
                >
                  {t.nav.signup}
                </Link>
              </>
            )}
          </div>

          {/* Mobile right — lang + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center" style={{ gap: "1px" }}>
              {(["es", "en"] as Locale[]).map((l, i) => (
                <React.Fragment key={l}>
                  <button
                    onClick={() => setLocale(l)}
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: locale === l ? 600 : 400,
                      color: locale === l ? "#D4AF37" : "#666666",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px 3px",
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                  {i === 0 && (
                    <span style={{ color: "#3A3A3A", fontSize: "10px" }}>·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <button
              className="p-2 transition-colors duration-200"
              style={{ color: "#AFAFAF" }}
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
