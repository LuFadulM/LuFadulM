import React from "react";
import Link from "next/link";

export const metadata = { title: "Nosotros — Descubre Colombia" };

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <p className="label-micro mb-6" style={{ color: "#C8A44E" }}>
        Quiénes somos
      </p>
      <h1
        className="font-serif mb-4"
        style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#D4D0C8" }}
      >
        Nosotros
      </h1>
      <div
        style={{ width: "40px", height: "1px", background: "rgba(200,164,78,0.4)", marginBottom: "24px" }}
      />
      <p style={{ color: "#706D64", fontSize: "14px", lineHeight: "1.8", maxWidth: "600px" }}>
        Descubre es la guía editorial de Colombia. Cubrimos restaurantes, cafés, bares, hoteles,
        atracciones y experiencias culturales en todo el país — desde Bogotá hasta el Amazonas.
        Nuestro equipo selecciona y verifica cada lugar para que solo encuentres lo mejor.
      </p>
      <Link
        href="/"
        className="inline-block mt-10"
        style={{
          fontSize: "11px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          fontWeight: 500,
          color: "#C8A44E",
        }}
      >
        ← Volver a explorar
      </Link>
    </main>
  );
}
