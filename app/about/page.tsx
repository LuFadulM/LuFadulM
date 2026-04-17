"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>

      {/* ── Hero ── */}
      <section style={{
        padding: "clamp(5rem, 12vw, 9rem) 0 clamp(4rem, 8vw, 7rem)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div className="max-w-7xl mx-auto px-8">
          <p className="section-label">Sobre Hyex</p>

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "780px",
            marginBottom: "1.5rem",
          }}>
            No somos una guía de viajes.
          </h1>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
            color: "var(--gold)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            marginBottom: "2.5rem",
          }}>
            Somos el criterio.
          </p>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-md)",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: "560px",
          }}>
            Hyex nació de una incomodidad: la sensación de llegar a una ciudad colombiana
            con conexiones locales y no saber cómo usarlas. Listas genéricas. Reseñas sin contexto.
            Opiniones de nadie.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
            className="lg:grid-cols-[1fr_1fr] lg:gap-20"
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}>
                Construimos Hyex para las personas que viajan con intención. Que prefieren
                una mesa en el lugar correcto a una reserva en el lugar obvio. Que saben que
                la mejor experiencia de una ciudad no está en el primer resultado de búsqueda.
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}>
                Colombia tiene una riqueza gastronómica, cultural y social que merece más que
                un rating de cinco estrellas y una foto de comida. Cada lugar en Hyex está
                curado por lo que significa dentro de su contexto: el barrio, la hora del día,
                el tipo de experiencia que ofrece.
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
              }}>
                No estamos construyendo una base de datos. Estamos construyendo un punto de
                vista editorial sobre los mejores rincones del país.
              </p>
            </div>

            {/* Right column — pull quote */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderLeft: "1px solid var(--border)",
              paddingLeft: "clamp(2rem, 4vw, 4rem)",
            }}>
              <blockquote style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: "var(--text-primary)",
                lineHeight: 1.45,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
              }}>
                "Esto no se trata de marcar destinos en una lista. Se trata de saber exactamente
                a dónde ir, cuándo ir, y por qué ese lugar importa."
              </blockquote>

              <div style={{
                width: "32px",
                height: "1px",
                background: "var(--gold)",
                marginBottom: "1rem",
                opacity: 0.6,
              }} />

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-micro)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}>
                Fundadores, Hyex
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What we are not ── */}
      <section style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "clamp(4rem, 8vw, 7rem) 0",
      }}>
        <div className="max-w-7xl mx-auto px-8">
          <p className="section-label">Nuestra postura</p>

          <div style={{
            display: "grid",
            gap: "0",
          }}>
            {[
              {
                num: "01",
                title: "No somos TripAdvisor",
                body: "No acumulamos reseñas anónimas. Curamos lugares con criterio editorial, no con volumen de opiniones.",
              },
              {
                num: "02",
                title: "No somos un directorio",
                body: "Cada lugar que aparece en Hyex está aquí por una razón específica. Si no tiene contexto, no tiene lugar.",
              },
              {
                num: "03",
                title: "No vendemos visibilidad",
                body: "Los lugares destacados lo son porque merecen estarlo, no porque pagaron para aparecer primero.",
              },
              {
                num: "04",
                title: "No traducimos listas globales",
                body: "Colombia merece una mirada construida desde adentro, con conocimiento local real.",
              },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "flex-start",
                  padding: "2rem 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  letterSpacing: "0.16em",
                  color: "var(--gold)",
                  fontWeight: 600,
                  paddingTop: "4px",
                  minWidth: "24px",
                  flexShrink: 0,
                }}>
                  {item.num}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    color: "var(--text-primary)",
                    fontWeight: 400,
                    marginBottom: "0.5rem",
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-base)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    maxWidth: "560px",
                  }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section style={{ padding: "clamp(5rem, 10vw, 9rem) 0" }}>
        <div className="max-w-7xl mx-auto px-8 text-center" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            color: "var(--text-primary)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}>
            Colombia, con criterio.
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            marginBottom: "3rem",
          }}>
            Empieza por explorar lo que Hyex ha encontrado para ti.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-micro)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--text-primary)",
              textDecoration: "none",
              borderBottom: "1px solid var(--gold)",
              paddingBottom: "2px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            Explorar ahora →
          </Link>
        </div>
      </section>

    </div>
  );
}
