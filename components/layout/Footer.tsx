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
    <footer className="border-t border-[rgba(255,255,255,0.04)] mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-12 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-5">
            <Link
              href="/"
              className="text-gold text-5xl font-serif block mb-6"
              style={{ fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}
            >
              hyex
            </Link>
            <p style={{ color: "#AFAFAF", fontSize: "13px", lineHeight: "1.7", fontWeight: 300 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Cities */}
          <nav className="md:col-span-3" aria-label={t.footer.cities}>
            <h2 className="label-micro mb-6">{t.footer.cities}</h2>
            <ul className="space-y-3">
              {cityLinks.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="transition-colors duration-200"
                    style={{ color: "#AFAFAF", fontSize: "13px", fontWeight: 300 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#AFAFAF")}
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav className="md:col-span-4" aria-label={t.footer.categories}>
            <h2 className="label-micro mb-6">{t.footer.categories}</h2>
            <ul className="space-y-3">
              {categoryKeys.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="transition-colors duration-200"
                    style={{ color: "#AFAFAF", fontSize: "13px", fontWeight: 300 }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#AFAFAF")}
                  >
                    {t.footer.categoryLabels[cat.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p style={{ color: "#555555", fontSize: "11px", letterSpacing: "0.1em" }}>
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
                  color: "#555555",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                className="transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#AFAFAF")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
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
