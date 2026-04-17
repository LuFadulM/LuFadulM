"use client";

import React from "react";
import Link from "next/link";

const CELL: React.CSSProperties = {
  background: "var(--bg)",
  padding: "clamp(2rem, 4vw, 3.5rem)",
  display: "flex",
  flexDirection: "column",
};

const NUM: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "rgba(245,240,232,0.15)",
  marginBottom: "clamp(2.5rem, 5vw, 4rem)",
};

const LABEL: React.CSSProperties = {
  fontSize: "9px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontWeight: 600,
  color: "var(--gold)",
  marginBottom: "0.75rem",
  fontFamily: "var(--font-sans)",
};

const BODY: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-small)",
  color: "var(--text-secondary)",
  lineHeight: 1.8,
};

const DIVIDER = "1px solid rgba(245,240,232,0.04)";

export default function AboutPage() {
  return (
    <div style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <header style={{ borderBottom: DIVIDER }}>
        <div
          className="max-w-7xl mx-auto px-6"
          style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 5rem)" }}
        >
          <p style={{ ...LABEL, marginBottom: "1.5rem" }}>Colombia</p>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              marginBottom: "1.5rem",
            }}
          >
            Hyex
          </h1>
          <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.4)" }} />
        </div>
      </header>

      {/* ── Numbered sections grid ── */}
      <div style={{ background: DIVIDER.replace("1px solid ", "") }}>

        {/* Row 1 — 2 cols */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ background: "rgba(245,240,232,0.04)", borderBottom: DIVIDER }}
        >
          {/* 01 */}
          <li style={{ ...CELL, borderRight: DIVIDER }}>
            <span style={NUM}>01 · El Origen</span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                color: "rgba(245,240,232,0.70)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              No es una guía de viajes.
            </p>
            <p style={BODY}>
              Todo empezó con una frustración simple. Después de vivir en el exterior,
              nos acostumbramos a plataformas que hacían que descubrir una ciudad fuera
              algo sin esfuerzo — dónde ir, qué hacer, qué valía realmente la pena.
            </p>
          </li>

          {/* 02 */}
          <li style={CELL}>
            <span style={NUM}>02 · El Problema</span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                color: "rgba(245,240,232,0.70)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Al volver a Colombia, eso no existía.
            </p>
            <p style={BODY}>
              Encontrar buenos lugares significaba saltar entre Instagram, Google Maps
              y recomendaciones de WhatsApp — dispersas, inconsistentes y fáciles de perder.
              Hyex nació para cambiar eso.
            </p>
          </li>
        </ul>

        {/* Row 2 — full width pull quote */}
        <div
          style={{
            ...CELL,
            background: "var(--surface)",
            borderBottom: DIVIDER,
            alignItems: "center",
            textAlign: "center",
            padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 10vw, 10rem)",
          }}
        >
          <blockquote
            className="font-serif"
            style={{
              fontSize: "clamp(1.375rem, 2.5vw, 2.25rem)",
              fontStyle: "italic",
              color: "var(--text-primary)",
              lineHeight: 1.4,
              letterSpacing: "-0.02em",
              maxWidth: "780px",
              fontWeight: 400,
            }}
          >
            "Esto no se trata de marcar destinos en una lista.
            Se trata de descubrir qué hace que cada lugar sea inolvidable."
          </blockquote>
        </div>

        {/* Row 3 — 2 cols */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ background: "rgba(245,240,232,0.04)", borderBottom: DIVIDER }}
        >
          {/* 03 */}
          <li style={{ ...CELL, borderRight: DIVIDER }}>
            <span style={NUM}>03 · La Misión</span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                color: "rgba(245,240,232,0.70)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Para personas que quieren entender los lugares.
            </p>
            <p style={BODY}>
              Creamos una plataforma para personas que no solo quieren visitar lugares —
              quieren entenderlos. Personas que se preocupan por dónde van, a quién conocen,
              y las historias detrás de cada rincón.
            </p>
          </li>

          {/* 04 */}
          <li style={CELL}>
            <span style={NUM}>04 · La Curaduría</span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                color: "rgba(245,240,232,0.70)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Lo que realmente importa, no los algoritmos.
            </p>
            <p style={BODY}>
              En lugar de abrumarte con opciones, Hyex cura lo que realmente importa:
              experiencias significativas, joyas ocultas y lugares que los locales
              recomendarían genuinamente.
            </p>
          </li>
        </ul>

        {/* Row 4 — 2 cols */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ background: "rgba(245,240,232,0.04)", borderBottom: DIVIDER }}
        >
          {/* 05 */}
          <li style={{ ...CELL, borderRight: DIVIDER }}>
            <span style={NUM}>05 · La Experiencia</span>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                color: "rgba(245,240,232,0.70)",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Conectar con la cultura, no solo pasar por ella.
            </p>
            <p style={BODY}>
              Desde un amanecer en Tayrona hasta una noche en el barrio de Getsemaní,
              cada plan en Hyex está seleccionado para ayudarte a conectar con la cultura,
              no solo a pasar por ella.
            </p>
          </li>

          {/* 06 */}
          <li style={{ ...CELL, justifyContent: "space-between" }}>
            <span style={NUM}>06 · La Visión</span>
            <div>
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(1.375rem, 2vw, 1.875rem)",
                  color: "rgba(245,240,232,0.70)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.5rem",
                  fontWeight: 400,
                }}
              >
                Hoy Colombia.
              </p>
              <p style={{ ...BODY, marginBottom: "1.5rem" }}>
                Hyex está construyendo una nueva forma de explorar — una que conecta personas,
                cultura y lugares.
              </p>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-small)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
              }}>
                Mañana, América Latina →
              </p>
            </div>
          </li>
        </ul>

        {/* Closing row — full width */}
        <div
          style={{
            ...CELL,
            background: "var(--bg)",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3rem)",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(1.125rem, 2vw, 1.625rem)",
              fontStyle: "italic",
              color: "var(--text-primary)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              maxWidth: "600px",
              lineHeight: 1.35,
            }}
          >
            Hyex existe para que la exploración vuelva a sentirse personal.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "var(--gold)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(201,168,76,0.35)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
              transition: "gap 200ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.875rem"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem"; }}
          >
            Explorar ahora <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
