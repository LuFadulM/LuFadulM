"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "1.25rem",
        }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "32px",
              letterSpacing: "-0.03em",
              color: "var(--gold)",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            hyex
          </Link>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-micro)",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
          }}>
            Descubrir Colombia, un lugar a la vez
          </p>

          <div style={{ width: "32px", height: "1px", background: "var(--border)" }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
            className="sm:flex-row sm:gap-8"
          >
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              color: "var(--text-muted)",
              letterSpacing: "0.06em",
            }}>
              © {new Date().getFullYear()} hyex
            </p>

            <nav style={{ display: "flex", gap: "1.5rem" }} aria-label="Footer">
              {[
                { href: "/", label: "Explorar" },
                { href: "/about", label: "Nosotros" },
                { href: "/auth/signup", label: "Registrarse" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
