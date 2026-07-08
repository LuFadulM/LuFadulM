"use client";

import React from "react";
import Link from "next/link";

export default function MagazinePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16 sm:py-20">
      <p className="label-micro mb-6" style={{ color: "#3DDC97" }}>Editorial</p>
      <h1
        className="font-serif mb-4"
        style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#CBD6CE" }}
      >
        Magazine
      </h1>
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "rgba(61,220,151,0.4)",
          marginBottom: "24px",
        }}
      />
      <p
        style={{
          color: "#64756B",
          fontSize: "14px",
          lineHeight: "1.8",
          maxWidth: "520px",
        }}
      >
        Historias, guías y ensayos sobre Colombia — escritos para quienes quieren ir más allá de lo obvio.
        Próximamente.
      </p>
      <Link
        href="/"
        className="inline-block mt-10"
        style={{
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "#3DDC97",
        }}
      >
        ← Volver a explorar
      </Link>
    </main>
  );
}
