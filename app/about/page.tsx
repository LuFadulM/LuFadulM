"use client";

import React from "react";
import Link from "next/link";

/* ── Shared light-editorial tokens ─────────────────────────────── */
const BG        = "#EFF4EE";
const INK       = "#0D1B14";
const INK_60    = "rgba(13,27,20,0.60)";
const INK_45    = "rgba(13,27,20,0.45)";
const GOLD      = "#0E7A5C";           /* gold-warm — on light bg */
const GOLD_35   = "rgba(14,122,92,0.35)";
const RULE      = "rgba(13,27,20,0.10)";

const PROSE: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
  color: INK_60,
  lineHeight: 1.8,
  margin: 0,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      display: "inline-flex", alignItems: "center", gap: "0.625rem",
      fontFamily: "var(--font-sans)", fontSize: "var(--text-micro)",
      fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase",
      color: GOLD, marginBottom: "1.75rem",
    }}>
      <span style={{ display: "block", width: "1.5rem", height: "1px", background: GOLD, opacity: 0.7, flexShrink: 0 }} />
      {children}
    </p>
  );
}

function SmallBreak({ label }: { label: string }) {
  return (
    <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "4rem 0 2.25rem" }}>
      <span style={{ width: "32px", height: "1px", background: GOLD, opacity: 0.5, flexShrink: 0 }} />
      <span style={{
        fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600,
        letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD,
      }}>{label}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ background: BG, color: INK, fontFamily: "var(--font-sans)" }}>

      {/* ── Hero ── */}
      <section style={{
        borderBottom: `1px solid ${RULE}`,
        padding: "clamp(5rem, 12vw, 9rem) 0 clamp(3rem, 6vw, 5rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Very subtle texture */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: 0.05,
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover", backgroundPosition: "center 30%",
          mixBlendMode: "multiply",
        }} />

        <div style={{
          maxWidth: "var(--container)", margin: "0 auto",
          padding: "0 var(--container-pad)",
          position: "relative", zIndex: 1,
        }}>
          <Eyebrow>Sobre Hyex</Eyebrow>

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 400, color: INK,
            lineHeight: 1.05, letterSpacing: "-0.02em",
            maxWidth: "820px", margin: "0 0 1.25rem",
          }}>
            Hyex no es una guía de viajes.
          </h1>

          <p style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
            color: GOLD, fontWeight: 400,
            letterSpacing: "-0.01em", margin: 0,
          }}>
            Es una forma de vivir Colombia de manera diferente.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: "clamp(5rem, 10vw, 8rem) 0" }}>
        <div style={{
          maxWidth: "820px", margin: "0 auto",
          padding: "0 var(--container-pad)",
        }}>

          {/* Gold divider */}
          <div className="fade-up" style={{
            width: "32px", height: "1px",
            background: GOLD, opacity: 0.5,
            marginBottom: "3rem",
          }} />

          {/* Origin */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "680px" }}>
            <p className="fade-up" style={PROSE}>
              Todo empezó con una frustración simple. Después de vivir en el exterior, nos acostumbramos
              a plataformas que hacían que descubrir una ciudad fuera algo sin esfuerzo — dónde ir, qué
              hacer, qué valía realmente la pena. Al volver a Colombia, eso no existía. Encontrar buenos
              lugares significaba saltar entre Instagram, Google Maps y recomendaciones de WhatsApp —
              dispersas, inconsistentes y fáciles de perder.
            </p>
            <p className="fade-up" data-delay="1" style={{ ...PROSE, color: INK, fontWeight: 500 }}>
              Hyex nació para cambiar eso.
            </p>
          </div>

          <SmallBreak label="Propósito" />

          {/* Purpose */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "680px" }}>
            <p className="fade-up" style={PROSE}>
              Creamos una plataforma para personas que no solo quieren visitar lugares — quieren entenderlos.
              Personas que se preocupan por dónde van, a quién conocen, y las historias detrás de cada rincón.
            </p>
            <p className="fade-up" data-delay="1" style={PROSE}>
              En lugar de abrumarte con opciones, Hyex cura lo que realmente importa:{" "}
              <strong style={{ color: INK, fontWeight: 500 }}>
                experiencias significativas, joyas ocultas y lugares que los locales recomendarían genuinamente
              </strong>
              {" "}— no los algoritmos.
            </p>
            <p className="fade-up" data-delay="2" style={PROSE}>
              Desde un amanecer en Tayrona hasta una noche en el barrio de Getsemaní, cada plan en Hyex
              está seleccionado para ayudarte a conectar con la cultura, no solo a pasar por ella.
            </p>
          </div>

          {/* Filosofía — pull quote */}
          <div className="fade-up" style={{ margin: "4rem 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
              <span style={{ width: "32px", height: "1px", background: GOLD, opacity: 0.5, flexShrink: 0 }} />
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD,
              }}>Filosofía</span>
            </div>
            <blockquote style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              color: INK,
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
              borderLeft: `2px solid ${GOLD}`,
              paddingLeft: "2rem",
              margin: 0,
              maxWidth: "720px",
            }}>
              Esto no se trata de marcar destinos en una lista. Se trata de descubrir qué hace que cada lugar sea{" "}
              <span style={{ color: GOLD }}>inolvidable.</span>
            </blockquote>
          </div>

          <SmallBreak label="Visión" />

          {/* Vision */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "680px" }}>
            <p className="fade-up" style={PROSE}>
              Hyex está construyendo una nueva forma de explorar — una que conecta personas, cultura y lugares.
            </p>
            <p className="fade-up" data-delay="1" style={PROSE}>
              Hoy empezamos con Colombia.{" "}
              <span style={{ color: GOLD, fontWeight: 500 }}>
                Mañana, expandimos por toda América Latina.
              </span>
            </p>
          </div>

          {/* Closing */}
          <div className="fade-up" data-delay="2" style={{
            marginTop: "clamp(4rem, 8vw, 6rem)",
            paddingTop: "3rem",
            borderTop: `1px solid ${RULE}`,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "flex-start",
          }}>
            <p style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              color: INK,
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: "640px",
            }}>
              Hyex existe para que la exploración vuelva a sentirse personal.
            </p>

            <Link
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-micro)", letterSpacing: "0.14em", textTransform: "uppercase",
                fontWeight: 500, color: GOLD, textDecoration: "none",
                borderBottom: `1px solid ${GOLD_35}`, paddingBottom: "0.375rem",
                transition: "gap 200ms ease, border-color 200ms ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.gap = "0.875rem";
                el.style.borderBottomColor = GOLD;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.gap = "0.5rem";
                el.style.borderBottomColor = GOLD_35;
              }}
            >
              Explorar ahora <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stance ── */}
      <section style={{ background: "rgba(13,27,20,0.04)", borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, padding: "clamp(4rem, 8vw, 6rem) 0" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 var(--container-pad)" }}>
          <Eyebrow>Nuestra postura</Eyebrow>

          {[
            { num: "01", title: "No somos TripAdvisor", body: "No acumulamos reseñas anónimas. Curamos lugares con criterio editorial, no con volumen de opiniones." },
            { num: "02", title: "No somos un directorio", body: "Cada lugar que aparece en Hyex está aquí por una razón específica. Si no tiene contexto, no tiene lugar." },
            { num: "03", title: "No vendemos visibilidad", body: "Los lugares destacados lo son porque merecen estarlo, no porque pagaron para aparecer primero." },
            { num: "04", title: "No traducimos listas globales", body: "Colombia merece una mirada construida desde adentro, con conocimiento local real." },
          ].map((item) => (
            <div key={item.num} style={{
              display: "flex", gap: "2rem", alignItems: "flex-start",
              padding: "2rem 0", borderBottom: `1px solid ${RULE}`,
            }}>
              <span style={{
                fontFamily: "var(--font-sans)", fontSize: "9px", letterSpacing: "0.16em",
                color: INK_45, fontWeight: 600, paddingTop: "4px",
                minWidth: "24px", flexShrink: 0,
              }}>{item.num}</span>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-serif)", fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                  color: INK, fontWeight: 400, marginBottom: "0.5rem",
                }}>{item.title}</h3>
                <p style={{ ...PROSE, fontSize: "var(--text-base)" }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
