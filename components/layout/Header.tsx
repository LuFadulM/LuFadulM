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

const NAV_BASE  = "rgba(245,240,232,0.45)";
const NAV_HOVER = "#F5F0E8";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 xl:px-4 py-2 transition-colors duration-200 whitespace-nowrap"
      style={{
        fontSize: "9.5px", letterSpacing: "0.18em",
        textTransform: "uppercase", fontWeight: 500,
        color: NAV_BASE,
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = NAV_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.color = NAV_BASE)}
    >
      {label}
    </Link>
  );
}

function ActividadesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="actividades-menu"
        className="px-3 xl:px-4 py-2 flex items-center gap-1.5 transition-colors duration-200 whitespace-nowrap"
        style={{
          fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
          fontWeight: 500, color: open ? NAV_HOVER : NAV_BASE,
          background: "none", border: "none", cursor: "pointer",
        }}
        onClick={() => setOpen((v) => !v)}
      >
        Actividades
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          aria-hidden="true"
          style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", marginTop: "1px" }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div id="actividades-menu" role="menu"
          className="absolute top-full left-1/2 pt-3"
          style={{ transform: "translateX(-50%)", minWidth: "180px", zIndex: 50 }}
        >
          <div aria-hidden="true" style={{
            position: "absolute", top: "8px", left: "50%",
            transform: "translateX(-50%)", width: 0, height: 0,
            borderLeft: "6px solid transparent", borderRight: "6px solid transparent",
            borderBottom: "6px solid rgba(0,0,0,0.05)",
          }} />
          <div style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
            overflow: "hidden", marginTop: "6px",
          }}>
            {ACTIVIDADES_ITEMS.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-5 py-3 transition-all duration-150 group"
                style={{
                  fontSize: "10px", letterSpacing: "0.13em",
                  textTransform: "uppercase", fontWeight: 500,
                  color: "rgba(28,28,28,0.55)",
                  borderBottom: i < ACTIVIDADES_ITEMS.length - 1
                    ? "1px solid rgba(0,0,0,0.05)" : "none",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#1C1C1C";
                  e.currentTarget.style.background = "rgba(198,168,92,0.06)";
                  e.currentTarget.style.paddingLeft = "22px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(28,28,28,0.55)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "20px";
                }}
              >
                {item.label}
                <span aria-hidden="true" style={{
                  color: "#C6A85C", fontSize: "11px",
                  opacity: 0, transition: "opacity 0.15s ease",
                }} className="group-hover:opacity-100">
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
        className="sticky top-0 z-40 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(12,11,9,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(245,240,232,0.07)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 transition-opacity duration-300"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.5vw, 30px)",
              letterSpacing: "-0.03em",
              color: "#C6A85C",
              textDecoration: "none",
              lineHeight: 1,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            hyex
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <NavLink href="/"          label="Explorar" />
            <NavLink href="/ciudades"  label="Ciudades" />
            <NavLink href="/saved"     label="Guardados" />
            <NavLink href="/about"     label="Nosotros" />
          </nav>

          {/* Right — auth */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {user ? (
              <>
                <Link
                  href="/profile"
                  style={{
                    fontSize: "14px", fontFamily: "var(--font-sans)",
                    fontWeight: 400, color: NAV_BASE, textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = NAV_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = NAV_BASE)}
                >
                  {user.user_metadata?.display_name ?? user.email?.split("@")[0]}
                </Link>
                <button
                  onClick={handleSignOut}
                  style={{
                    fontSize: "14px", fontFamily: "var(--font-sans)",
                    fontWeight: 400, color: NAV_BASE, background: "none",
                    border: "none", cursor: "pointer", transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = NAV_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = NAV_BASE)}
                >
                  {t.nav.signout}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  style={{
                    fontSize: "13px", fontFamily: "var(--font-sans)",
                    fontWeight: 400, color: NAV_BASE, textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = NAV_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = NAV_BASE)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/auth/signup"
                  style={{
                    fontSize: "11px", fontFamily: "var(--font-sans)",
                    fontWeight: 500, color: "var(--gold)",
                    background: "transparent",
                    border: "1.5px solid rgba(201,168,76,0.35)",
                    borderRadius: "var(--radius-pill)",
                    padding: "0.5rem 1.375rem",
                    textDecoration: "none",
                    display: "inline-block",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--gold)";
                    e.currentTarget.style.color = "var(--bg)";
                    e.currentTarget.style.borderColor = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--gold)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                  }}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile — hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 transition-colors duration-200"
              style={{ color: NAV_BASE }}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
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
