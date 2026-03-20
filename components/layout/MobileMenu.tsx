"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => void;
}

export default function MobileMenu({ isOpen, onClose, user, onSignOut }: MobileMenuProps) {
  const { t } = useLanguage();

  const navSections = [
    {
      label: t.mobile.discover,
      links: [
        { href: "/", label: t.nav.explore },
        { href: "/actividades", label: t.nav.activities },
        { href: "/mapa", label: t.nav.map },
        { href: "/saved", label: t.nav.saved },
      ],
    },
    {
      label: t.mobile.cities,
      links: [
        { href: "/ciudades", label: t.mobile.allCities },
        { href: "/city/bogota", label: "Bogotá" },
        { href: "/city/medellin", label: "Medellín" },
        { href: "/city/cartagena", label: "Cartagena" },
        { href: "/city/cali", label: "Cali" },
        { href: "/city/santa-marta", label: "Santa Marta" },
        { href: "/city/barranquilla", label: "Barranquilla" },
      ],
    },
    {
      label: t.mobile.info,
      links: [
        { href: "/blog", label: t.nav.blog },
        { href: "/about", label: t.nav.about },
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 bottom-0 w-72 flex flex-col animate-slide-up"
        style={{ background: "#111110", borderLeft: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 h-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span
            style={{
              color: "#C8A44E",
              fontSize: "20px",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
            }}
          >
            hyex
          </span>
          <button
            onClick={onClose}
            className="p-2 transition-colors duration-200"
            style={{ color: "#4A4843" }}
            aria-label="Cerrar menú"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Sections */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p
                className="px-4 mb-2"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#3A3835",
                }}
              >
                {section.label}
              </p>
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block px-4 py-3 transition-colors duration-200"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "#706D64",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D0C8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#706D64")}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        {/* Auth */}
        <div
          className="px-4 pb-8 pt-4 space-y-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={onClose}
                className="block w-full text-center py-3 border border-[rgba(255,255,255,0.06)] transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#D4D0C8",
                }}
              >
                {user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "Perfil"}
              </Link>
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="block w-full text-center py-3 border border-[rgba(255,255,255,0.04)] transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#706D64",
                }}
              >
                {t.nav.signout}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full text-center py-3 border border-[rgba(255,255,255,0.06)] transition-all duration-200"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#D4D0C8",
                }}
              >
                {t.nav.login}
              </Link>
              <Link
                href="/auth/signup"
                onClick={onClose}
                className="block w-full text-center py-3 bg-gold transition-all duration-200 hover:bg-gold-hover"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#0A0A09",
                }}
              >
                {t.nav.signup}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
