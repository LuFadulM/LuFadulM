"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const cityLinks = [
  { href: "/city/bogota", label: "Bogotá" },
  { href: "/city/medellin", label: "Medellín" },
  { href: "/city/cartagena", label: "Cartagena" },
  { href: "/city/cali", label: "Cali" },
  { href: "/city/santa-marta", label: "Santa Marta" },
  { href: "/city/barranquilla", label: "Barranquilla" },
];

const categoryKeys = [
  { href: "/?category=Restaurants", key: "Restaurants" },
  { href: "/?category=Cafés", key: "Cafés" },
  { href: "/?category=Bars", key: "Bars" },
  { href: "/?category=Hotels", key: "Hotels" },
  { href: "/?category=Attractions", key: "Attractions" },
  { href: "/?category=Nightlife", key: "Nightlife" },
] as const;

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: "0" }}>

      {/* ── Editorial manifesto strip ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          padding: "80px 0",
          textAlign: "center",
          background: "radial-gradient(ellipse at 50% 100%, rgba(177,152,124,0.04) 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "rgba(177,152,124,0.35)",
            margin: "0 auto 36px",
          }}
        />
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(18px, 2.8vw, 28px)",
            color: "rgba(242,237,232,0.55)",
            fontStyle: "italic",
            fontWeight: 400,
            maxWidth: "580px",
            margin: "0 auto 0",
            lineHeight: "1.5",
            letterSpacing: "0.005em",
            padding: "0 24px",
          }}
        >
          Descubrir Colombia, un lugar a la vez
        </p>
        <div
          style={{
            width: "32px",
            height: "1px",
            background: "rgba(177,152,124,0.35)",
            margin: "36px auto 0",
          }}
        />
      </div>

      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 mb-16">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <Link
              href="/"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "48px",
                color: "#B1987C",
                display: "block",
                marginBottom: "20px",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              hyex
            </Link>

            <p
              style={{
                color: "rgba(200,196,188,0.55)",
                fontSize: "13px",
                lineHeight: "1.75",
                fontWeight: 300,
                maxWidth: "300px",
                marginBottom: "28px",
              }}
            >
              {t.footer.tagline}
            </p>

            {/* Gold rule */}
            <div
              style={{
                width: "24px",
                height: "1px",
                background: "rgba(177,152,124,0.30)",
              }}
            />
          </div>

          {/* Cities */}
          <nav className="md:col-span-3" aria-label={t.footer.cities}>
            <h2
              className="label-micro"
              style={{ color: "rgba(255,255,255,0.28)", marginBottom: "20px" }}
            >
              {t.footer.cities}
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cityLinks.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="transition-colors duration-200"
                    style={{
                      color: "rgba(200,196,188,0.55)",
                      fontSize: "13px",
                      fontWeight: 300,
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F2EDE8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,196,188,0.55)")}
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav className="md:col-span-4" aria-label={t.footer.categories}>
            <h2
              className="label-micro"
              style={{ color: "rgba(255,255,255,0.28)", marginBottom: "20px" }}
            >
              {t.footer.categories}
            </h2>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {categoryKeys.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="transition-colors duration-200"
                    style={{
                      color: "rgba(200,196,188,0.55)",
                      fontSize: "13px",
                      fontWeight: 300,
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#F2EDE8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,196,188,0.55)")}
                  >
                    {t.footer.categoryLabels[cat.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          className="sm:flex-row sm:items-center sm:justify-between"
        >
          <p
            style={{
              color: "rgba(255,255,255,0.18)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              fontWeight: 300,
            }}
          >
            © {new Date().getFullYear()} hyex. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { href: "/auth/signup", label: t.footer.createAccount },
              { href: "/auth/login", label: t.footer.login },
              { href: "/saved", label: t.footer.saved },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: 500,
                }}
                className="transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(177,152,124,0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
