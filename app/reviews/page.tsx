"use client";

import React, { useState } from "react";
import Link from "next/link";

const ALL_REVIEWS = [
  {
    id: "1",
    author: "Valentina M.",
    avatar: "V",
    place: "El Cielo",
    city: "Medellín",
    category: "Restaurante",
    rating: 5,
    date: "Mar 2026",
    text: "Una experiencia gastronómica sin igual. Cada plato cuenta una historia y los sabores son absolutamente únicos. El maridaje de vinos fue impecable. No dudamos en reservar de nuevo para la próxima visita a Medellín.",
    helpful: 24,
  },
  {
    id: "2",
    author: "Sebastián R.",
    avatar: "S",
    place: "Café Velvet",
    city: "Bogotá",
    category: "Café",
    rating: 4,
    date: "Feb 2026",
    text: "El mejor café de specialty que he probado en Colombia. Ambiente tranquilo, baristas con mucho conocimiento. El cold brew de Huila es extraordinario.",
    helpful: 18,
  },
  {
    id: "3",
    author: "Mariana T.",
    avatar: "M",
    place: "La Mulata",
    city: "Cartagena",
    category: "Restaurante",
    rating: 5,
    date: "Mar 2026",
    text: "Cocina costeña en su máxima expresión. Los ceviches y el arroz con coco son imperdibles. Vista al mar espectacular al atardecer. Reservar con anticipación.",
    helpful: 31,
  },
  {
    id: "4",
    author: "Andrés C.",
    avatar: "A",
    place: "Pergamino",
    city: "Medellín",
    category: "Café",
    rating: 5,
    date: "Ene 2026",
    text: "Referente mundial del café de origen colombiano. Las catas del domingo son una experiencia educativa y deliciosa a la vez. Imprescindible.",
    helpful: 42,
  },
  {
    id: "5",
    author: "Sofía L.",
    avatar: "S",
    place: "Celele",
    city: "Cartagena",
    category: "Restaurante",
    rating: 4,
    date: "Feb 2026",
    text: "Una propuesta creativa que reinterpreta la gastronomía del Caribe colombiano de manera brillante. Los postres con frutas tropicales son una revelación.",
    helpful: 15,
  },
  {
    id: "6",
    author: "Camilo P.",
    avatar: "C",
    place: "Armando Records",
    city: "Bogotá",
    category: "Bar",
    rating: 5,
    date: "Mar 2026",
    text: "El mejor bar de Bogotá sin dudarlo. La selección musical es perfecta, los cócteles creativos y el ambiente es incomparable. Llegar temprano.",
    helpful: 29,
  },
  {
    id: "7",
    author: "Lucía F.",
    avatar: "L",
    place: "Harry Sasson",
    city: "Bogotá",
    category: "Restaurante",
    rating: 5,
    date: "Mar 2026",
    text: "Clásico bogotano que nunca decepciona. La carne es excepcional y el servicio de primer nivel. Imprescindible para una cena especial en la capital.",
    helpful: 37,
  },
  {
    id: "8",
    author: "Diego A.",
    avatar: "D",
    place: "Ábaco Libros",
    city: "Cartagena",
    category: "Café",
    rating: 4,
    date: "Ene 2026",
    text: "El lugar perfecto para perderse entre libros y buen café. Ambiente colonial precioso, personal amable. El mejor lugar para trabajar en Cartagena.",
    helpful: 21,
  },
  {
    id: "9",
    author: "Isabella G.",
    avatar: "I",
    place: "Quiebra Canto",
    city: "Cali",
    category: "Bar",
    rating: 5,
    date: "Feb 2026",
    text: "La salsa caleña en su mejor escenario. Músicos en vivo todas las noches, piso de baile siempre lleno de energía. Una noche aquí y entiendes por qué Cali es la capital de la salsa.",
    helpful: 45,
  },
];

const CITIES = ["Todas", "Bogotá", "Medellín", "Cartagena", "Cali"];
const CATEGORIES = ["Todas", "Restaurante", "Café", "Bar"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i < rating ? "#3DDC97" : "rgba(255,255,255,0.1)"}
            stroke={i < rating ? "#3DDC97" : "rgba(255,255,255,0.08)"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [city, setCity] = useState("Todas");
  const [category, setCategory] = useState("Todas");
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const filtered = ALL_REVIEWS.filter(
    (r) =>
      (city === "Todas" || r.city === city) &&
      (category === "Todas" || r.category === category)
  );

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Page header */}
      <div className="mb-12 border-b border-[rgba(255,255,255,0.04)] pb-12">
        <p
          className="label-micro mb-4"
          style={{ color: "#3DDC97" }}
        >
          Comunidad
        </p>
        <div className="flex items-end justify-between gap-6">
          <h1
            className="font-serif"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", color: "#F5F5F5", lineHeight: 1 }}
          >
            Reviews
          </h1>
          <Link
            href="/reviews/new"
            className="px-5 py-2.5 shrink-0 transition-all duration-200"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#3DDC97",
              border: "1px solid rgba(61,220,151,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(61,220,151,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,220,151,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(61,220,151,0.25)";
            }}
          >
            Escribir review
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex gap-1">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              style={{
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                padding: "6px 12px",
                border: "1px solid",
                borderColor: city === c ? "rgba(61,220,151,0.35)" : "rgba(255,255,255,0.07)",
                color: city === c ? "#3DDC97" : "#555555",
                background: city === c ? "rgba(61,220,151,0.05)" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
                padding: "6px 12px",
                border: "1px solid",
                borderColor: category === c ? "rgba(61,220,151,0.35)" : "rgba(255,255,255,0.07)",
                color: category === c ? "#3DDC97" : "#555555",
                background: category === c ? "rgba(61,220,151,0.05)" : "transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <span
          style={{
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#333330",
            alignSelf: "center",
          }}
        >
          {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p style={{ color: "#444440", fontSize: "13px" }}>
            No hay reviews para esta combinación de filtros.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mb-24"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {filtered.map((review) => (
            <article
              key={review.id}
              style={{ background: "#08130E" }}
              className="p-6 flex flex-col gap-4 hover:bg-[#0E0E0D] transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif" style={{ color: "#CBD6CE", fontSize: "15px", lineHeight: 1.3 }}>
                    {review.place}
                  </p>
                  <p style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#555555", fontWeight: 500, marginTop: "3px" }}>
                    {review.category} · {review.city}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />

              <p style={{ color: "#8A8580", fontSize: "13px", lineHeight: "1.75", fontWeight: 300, flexGrow: 1 }}>
                "{review.text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div style={{
                    width: "26px", height: "26px", borderRadius: "50%",
                    background: "rgba(61,220,151,0.08)", border: "1px solid rgba(61,220,151,0.14)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: 600, color: "#3DDC97", flexShrink: 0,
                  }}>
                    {review.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "11px", color: "#5A5550", fontWeight: 500 }}>{review.author}</p>
                    <p style={{ fontSize: "9px", color: "#3A3A38", letterSpacing: "0.1em" }}>{review.date}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(review.id)}
                  className="flex items-center gap-1.5 transition-all duration-200"
                  style={{ color: liked.has(review.id) ? "#3DDC97" : "#3A3A38" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span style={{ fontSize: "9px", letterSpacing: "0.1em", fontWeight: 500 }}>
                    {review.helpful + (liked.has(review.id) ? 1 : 0)}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
