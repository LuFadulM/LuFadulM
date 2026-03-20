"use client";

import React from "react";
import Link from "next/link";

const cities = [
  { href: "/city/bogota", label: "Bogotá" },
  { href: "/city/medellin", label: "Medellín" },
  { href: "/city/cartagena", label: "Cartagena" },
  { href: "/city/cali", label: "Cali" },
  { href: "/city/santa-marta", label: "Santa Marta" },
  { href: "/city/barranquilla", label: "Barranquilla" },
];

const categories = [
  { href: "/?category=Restaurants", label: "Gastronomía" },
  { href: "/?category=Cafés", label: "Cafés" },
  { href: "/?category=Bars", label: "Noche" },
  { href: "/?category=Hotels", label: "Hoteles & Viajes" },
  { href: "/?category=Attractions", label: "Cultura" },
  { href: "/?category=Nightlife", label: "Vida Activa" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.04)] mt-24">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand — large editorial */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-gold text-5xl font-serif block mb-6"
              style={{ fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}
            >
              hyex
            </Link>
            <p
              style={{ color: "#706D64", fontSize: "13px", lineHeight: "1.7", fontWeight: 300 }}
            >
              La guía editorial de Colombia. Descubrimos los mejores restaurantes,
              cafés, bares, hoteles y experiencias culturales en las ciudades más
              vibrantes del país.
            </p>
          </div>

          {/* Cities */}
          <div className="md:col-span-3">
            <p className="label-micro mb-6">Ciudades</p>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city.href}>
                  <Link
                    href={city.href}
                    className="transition-colors duration-200"
                    style={{
                      color: "#706D64",
                      fontSize: "13px",
                      fontWeight: 300,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D0C8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#706D64")}
                  >
                    {city.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <p className="label-micro mb-6">Categorías</p>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="transition-colors duration-200"
                    style={{
                      color: "#706D64",
                      fontSize: "13px",
                      fontWeight: 300,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D0C8")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#706D64")}
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t border-[rgba(255,255,255,0.04)] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p style={{ color: "#3A3835", fontSize: "11px", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} hyex. Hecho en Colombia.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: "/auth/signup", label: "Crear cuenta" },
              { href: "/auth/login", label: "Acceder" },
              { href: "/saved", label: "Guardados" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#3A3835",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
                className="transition-colors duration-200"
                onMouseEnter={(e) => (e.currentTarget.style.color = "#706D64")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3A3835")}
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
