"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const CITIES = [
  { slug: "bogota", name: "Bogotá", region: "Cundinamarca" },
  { slug: "medellin", name: "Medellín", region: "Antioquia" },
  { slug: "cartagena", name: "Cartagena", region: "Bolívar" },
  { slug: "cali", name: "Cali", region: "Valle del Cauca" },
  { slug: "santa-marta", name: "Santa Marta", region: "Magdalena" },
  { slug: "barranquilla", name: "Barranquilla", region: "Atlántico" },
];

export default function CiudadesPage() {
  const { t } = useLanguage();
  const p = t.pages.ciudades;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
      <p className="label-micro mb-6" style={{ color: "#3DDC97" }}>{p.label}</p>
      <h1 className="font-serif mb-4" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#CBD6CE" }}>
        {p.title}
      </h1>
      <div style={{ width: "40px", height: "1px", background: "rgba(61,220,151,0.4)", marginBottom: "40px" }} />

      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {CITIES.map((city, i) => (
          <li key={city.slug} style={{ background: "#0A0A0A" }}>
            <Link
              href={`/city/${city.slug}`}
              className="group flex flex-col justify-between p-8 h-full transition-colors duration-200 hover:bg-[#141414]"
            >
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#2A3A31",
                }}
              >
                0{i + 1} · {city.region}
              </span>
              <div className="mt-12">
                <p
                  className="font-serif mb-1 transition-colors duration-200 group-hover:text-[#CBD6CE]"
                  style={{ fontSize: "28px", color: "#64756B" }}
                >
                  {city.name}
                </p>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#3DDC97",
                  }}
                >
                  {p.explore}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
