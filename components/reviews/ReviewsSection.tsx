"use client";

import React, { useState } from "react";
import Link from "next/link";

const MOCK_REVIEWS = [
  {
    id: "1",
    author: "Valentina M.",
    avatar: "V",
    place: "El Cielo",
    city: "Medellín",
    category: "Restaurante",
    rating: 5,
    date: "Mar 2026",
    text: "Una experiencia gastronómica sin igual. Cada plato cuenta una historia y los sabores son absolutamente únicos. El maridaje de vinos fue impecable.",
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
    text: "Cocina costeña en su máxima expresión. Los ceviches y el arroz con coco son imperdibles. Vista al mar espectacular al atardecer.",
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
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="none">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i < rating ? "#D4AF37" : "rgba(255,255,255,0.1)"}
            stroke={i < rating ? "#D4AF37" : "rgba(255,255,255,0.08)"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section className="mb-24">
      {/* Header */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Comunidad</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Lo que dice la gente
          </h2>
        </div>
        <Link
          href="/reviews"
          className="label-micro transition-colors duration-200 hidden sm:block"
          style={{ color: "#666666" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
        >
          Ver todas →
        </Link>
      </div>

      {/* Review grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {MOCK_REVIEWS.map((review) => (
          <article
            key={review.id}
            style={{ background: "#0A0A09" }}
            className="p-6 flex flex-col gap-4 group hover:bg-[#0E0E0D] transition-colors duration-200"
          >
            {/* Place + category */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className="font-serif"
                  style={{ color: "#D4D0C8", fontSize: "15px", lineHeight: 1.3 }}
                >
                  {review.place}
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#555555",
                    fontWeight: 500,
                    marginTop: "3px",
                  }}
                >
                  {review.category} · {review.city}
                </p>
              </div>
              <StarRating rating={review.rating} />
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />

            {/* Review text */}
            <p
              style={{
                color: "#8A8580",
                fontSize: "13px",
                lineHeight: "1.75",
                fontWeight: 300,
                flexGrow: 1,
              }}
            >
              "{review.text}"
            </p>

            {/* Footer — author + helpful */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Avatar */}
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.1)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#D4AF37",
                    flexShrink: 0,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#5A5550", fontWeight: 500 }}>
                    {review.author}
                  </p>
                  <p style={{ fontSize: "9px", color: "#3A3A38", letterSpacing: "0.1em" }}>
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Helpful */}
              <button
                onClick={() => toggleLike(review.id)}
                className="flex items-center gap-1.5 transition-all duration-200"
                style={{ color: liked.has(review.id) ? "#D4AF37" : "#3A3A38" }}
                onMouseEnter={(e) => {
                  if (!liked.has(review.id))
                    (e.currentTarget as HTMLElement).style.color = "#666666";
                }}
                onMouseLeave={(e) => {
                  if (!liked.has(review.id))
                    (e.currentTarget as HTMLElement).style.color = "#3A3A38";
                }}
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

      {/* CTA */}
      <div className="mt-px" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "#0A0A09" }}
        >
          <p style={{ fontSize: "11px", color: "#444440", letterSpacing: "0.1em" }}>
            ¿Visitaste un lugar? Comparte tu experiencia.
          </p>
          <Link
            href="/reviews/new"
            className="px-5 py-2 transition-all duration-200"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.2)";
            }}
          >
            Escribir review
          </Link>
        </div>
      </div>
    </section>
  );
}
