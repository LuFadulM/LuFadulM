"use client";

import React, { useEffect, useRef } from "react";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const navSections = [
    {
      label: t.mobile.discover,
      links: [
        { href: "/",        label: "Explorar" },
        { href: "/reviews", label: "Reviews" },
        { href: "/saved",   label: t.nav.saved },
      ],
    },
    {
      label: "Actividades",
      links: [
        { href: "/?category=Restaurants", label: "Restaurantes" },
        { href: "/?category=Cafés",        label: "Cafés" },
        { href: "/?category=Bars",         label: "Bares" },
        { href: "/?category=Nightlife",    label: "Vida Nocturna" },
        { href: "/?category=Hotels",       label: "Hoteles" },
        { href: "/?category=Attractions",  label: "Atracciones" },
      ],
    },
    {
      label: t.mobile.info,
      links: [
        { href: "/about",    label: "Nosotros" },
        { href: "/magazine", label: "Magazine" },
      ],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Focus the close button when menu opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      {/* Backdrop */}
      <button
        className="absolute inset-0 w-full h-full border-0 cursor-default"
        style={{ background: "rgba(0,0,0,0.7)" }}
        onClick={onClose}
        aria-label="Cerrar menú"
        tabIndex={-1}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 bottom-0 w-72 flex flex-col animate-slide-up"
        style={{ background: "#0A0A0A", borderLeft: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 h-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span
            aria-hidden="true"
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
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 transition-colors duration-200"
            style={{ color: "#888888" }}
            aria-label="Cerrar menú de navegación"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Sections */}
        <nav aria-label="Menú móvil" className="flex-1 px-4 py-6 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p
                className="px-4 mb-2"
                role="presentation"
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#555555",
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
                    color: "#AFAFAF",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#AFAFAF")}
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
                  color: "#000000",
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
