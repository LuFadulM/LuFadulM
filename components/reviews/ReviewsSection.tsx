"use client";

import React, { useState } from "react";
import Link from "next/link";
import RatingDisplay from "@/components/ui/RatingDisplay";

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
          onMouseEnter={(e) => (e.currentTarget.style.color = "#B1987C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#666666")}
        >
          Ver todas →
        </Link>
      </div>

      {/* Review grid — 3 cols, gap-4, matching card language */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_REVIEWS.map((review) => (
          <article
            key={review.id}
            className="atmo-card card-rounded-lg flex flex-col gap-4"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: "20px",
            }}
          >
            {/* Place + rating */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className="font-serif leading-snug"
                  style={{ color: "#D4D0C8", fontSize: "15px" }}
                >
                  {review.place}
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#4A4845",
                    fontWeight: 500,
                    marginTop: "3px",
                  }}
                >
                  {review.category} · {review.city}
                </p>
              </div>
              <RatingDisplay rating={review.rating} mode="starsvg" />
            </div>

            {/* Thin rule */}
            <div style={{ height: "1px", background: "rgba(255,255,255,0.04)" }} />

            {/* Review text — italic serif quote */}
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.75",
                color: "rgba(242,237,232,0.52)",
                fontStyle: "italic",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                flexGrow: 1,
              }}
            >
              "{review.text}"
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="card-rounded-sm"
                  style={{
                    width: "28px",
                    height: "28px",
                    background: "rgba(177,152,124,0.08)",
                    border: "1px solid rgba(177,152,124,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#C8A44E",
                    flexShrink: 0,
                  }}
                >
                  {review.avatar}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.40)",
                      fontWeight: 500,
                      fontFamily: "'Sora', system-ui, sans-serif",
                    }}
                  >
                    {review.author}
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.18)",
                      letterSpacing: "0.08em",
                      fontFamily: "'Sora', system-ui, sans-serif",
                    }}
                  >
                    {review.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleLike(review.id)}
                aria-label={liked.has(review.id) ? "Quitar útil" : "Marcar como útil"}
                aria-pressed={liked.has(review.id)}
                className="flex items-center gap-1.5 transition-colors duration-200"
                style={{ color: liked.has(review.id) ? "#C8A44E" : "rgba(255,255,255,0.20)" }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                    fontFamily: "'Sora', system-ui, sans-serif",
                  }}
                >
                  {review.helpful + (liked.has(review.id) ? 1 : 0)}
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* CTA row */}
      <div
        className="flex items-center justify-between mt-6 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.02em",
            fontFamily: "'Sora', system-ui, sans-serif",
            fontWeight: 300,
          }}
        >
          ¿Visitaste un lugar? Comparte tu experiencia.
        </p>
        <Link
          href="/reviews/new"
          className="flex items-center gap-1.5 transition-colors duration-200"
          style={{
            fontSize: "9px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#C8A44E",
            fontFamily: "'Sora', system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#B1987C")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#C8A44E")
          }
        >
          Escribir review
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
