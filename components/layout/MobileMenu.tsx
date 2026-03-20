"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSignOut: () => void;
}

const navLinks = [
  { href: "/", label: "Explorar" },
  { href: "/city/bogota", label: "Bogotá" },
  { href: "/city/medellin", label: "Medellín" },
  { href: "/city/cartagena", label: "Cartagena" },
  { href: "/city/cali", label: "Cali" },
  { href: "/city/santa-marta", label: "Santa Marta" },
  { href: "/saved", label: "Guardados" },
];

export default function MobileMenu({ isOpen, onClose, user, onSignOut }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 bottom-0 w-72 bg-bg-surface border-l border-[rgba(242,237,232,0.07)] flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[rgba(242,237,232,0.07)]">
          <span className="text-coral text-xl font-serif">descubre</span>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text transition-colors"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-4 py-3 text-text-muted hover:text-text hover:bg-bg-card rounded transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="px-4 pb-8 pt-4 border-t border-[rgba(242,237,232,0.07)] space-y-3">
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={onClose}
                className="block w-full text-center px-4 py-2.5 text-sm text-text border border-[rgba(242,237,232,0.14)] rounded-btn hover:bg-bg-card transition-colors"
              >
                {user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "Profile"}
              </Link>
              <button
                onClick={() => { onClose(); onSignOut(); }}
                className="block w-full text-center px-4 py-2.5 text-sm text-text-muted border border-[rgba(242,237,232,0.07)] rounded-btn hover:bg-bg-card transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={onClose}
                className="block w-full text-center px-4 py-2.5 text-sm text-text border border-[rgba(242,237,232,0.14)] rounded-btn hover:bg-bg-card transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/signup"
                onClick={onClose}
                className="block w-full text-center px-4 py-2.5 text-sm bg-coral text-white rounded-btn hover:bg-coral-hover transition-colors font-medium"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
