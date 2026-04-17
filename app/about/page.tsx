"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>

      {/* ── Hero ── */}
      <section style={{
        padding: "clamp(5rem, 12vw, 9rem) 0 clamp(3rem, 6vw, 5rem)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--container-pad)" }}>
          <p className="section-label">Sobre Hyex</p>

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "820px",
            marginBottom: "1.25rem",
          }}>
            Hyex no es una guía de viajes.
          </h1>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
            color: "var(--gold)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>
            Es una forma de vivir Colombia de manera diferente.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 var(--container-pad)" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
          }}
            className="lg:grid-cols-[1fr_420px] lg:gap-24"
          >
            {/* Main copy */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.625rem", maxWidth: "640px" }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}>
                Todo empezó con una frustración simple. Después de vivir en el exterior, nos acostumbramos
                a plataformas que hacían que descubrir una ciudad fuera algo sin esfuerzo — dónde ir, qué
                hacer, qué valía realmente la pena. Al volver a Colombia, eso no existía. Encontrar buenos
                lugares significaba saltar entre Instagram, Google Maps y recomendaciones de WhatsApp —
                dispersas, inconsistentes y fáciles de perder.
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}>
                <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>Hyex nació para cambiar eso.</strong>
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}>
                Creamos una plataforma para personas que no solo quieren visitar lugares — quieren entenderlos.
                Personas que se preocupan por dónde van, a quién conocen, y las historias detrás de cada rincón.
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}>
                En lugar de abrumarte con opciones, Hyex cura lo que realmente importa: experiencias
                significativas, joyas ocultas y lugares que los locales recomendarían genuinamente —
                no los algoritmos.
              </p>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.1vw, 1.125rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.85,
              }}>
                Desde un amanecer en Tayrona hasta una noche en el barrio de Getsemaní, cada plan en
                Hyex está seleccionado para ayudarte a conectar con la cultura, no solo a pasar por ella.
              </p>
            </div>

            {/* Pull quote + closing */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem",
            }}>
              <blockquote style={{
                borderLeft: "2px solid var(--gold)",
                paddingLeft: "1.75rem",
              }}>
                <p style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                  color: "var(--text-primary)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}>
                  "Esto no se trata de marcar destinos en una lista. Se trata de descubrir qué hace que cada lugar sea inolvidable."
                </p>
              </blockquote>

              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "2rem",
              }}>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-small)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "1rem",
                }}>
                  Hyex está construyendo una nueva forma de explorar — una que conecta personas, cultura y lugares.
                </p>
                <p style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-small)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.75,
                }}>
                  Hoy empezamos con Colombia.{" "}
                  <span style={{ color: "var(--gold)" }}>Mañana, expandimos por toda América Latina.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing ── */}
      <section style={{
        background: "var(--surface-alt)",
        borderTop: "1px solid var(--border)",
        padding: "clamp(4rem, 8vw, 7rem) 0",
      }}>
        <div style={{
          maxWidth: "var(--container)", margin: "0 auto",
          padding: "0 var(--container-pad)",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "var(--text-primary)",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
          }}>
            Hyex existe para que la exploración vuelva a sentirse personal.
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
              color: "var(--gold)",
              textDecoration: "none",
              borderBottom: "1px solid var(--gold-border)",
              paddingBottom: "2px",
              transition: "gap 200ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.875rem"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem"; }}
          >
            Explorar ahora <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
