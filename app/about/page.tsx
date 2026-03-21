"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Shared style constants ─────────────────────────────────── */

const BODY: React.CSSProperties = {
  fontSize: "15px",
  color: "#706D64",
  lineHeight: "1.9",
  fontWeight: 300,
};

const GOLD_LINE: React.CSSProperties = {
  width: "40px",
  height: "1px",
  background: "rgba(200,164,78,0.4)",
};

/** Faint decorative section number */
const NUM: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "clamp(48px, 6vw, 72px)",
  color: "rgba(255,255,255,0.035)",
  lineHeight: 1,
  display: "block",
  marginBottom: "10px",
  userSelect: "none",
};

/* ─── Section wrapper ─────────────────────────────────────────── */

interface SectionProps {
  num: string;
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}

function Section({ num, label, dark = false, children }: SectionProps) {
  return (
    <section
      className="border-t border-[rgba(255,255,255,0.04)]"
      style={{ background: dark ? "#111110" : "#0A0A09" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-20">
          {/* Left rail */}
          <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
            <span style={NUM} aria-hidden="true">{num}</span>
            <p className="label-micro" style={{ color: "#C8A44E" }}>{label}</p>
          </div>
          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function AboutPage() {
  const { t } = useLanguage();
  const p = t.pages.about;

  return (
    <div>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{ background: "#0A0A09" }}>
        <div className="max-w-7xl mx-auto px-6 pt-20 sm:pt-28 pb-20 sm:pb-24">
          <p className="label-micro mb-8" style={{ color: "#C8A44E" }}>
            {p.hero.eyebrow}
          </p>

          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(38px, 6vw, 80px)",
              color: "#D4D0C8",
              lineHeight: 1.05,
              maxWidth: "880px",
              marginBottom: "32px",
            }}
          >
            {p.hero.headline}{" "}
            <em style={{ color: "#C8A44E", fontStyle: "italic" }}>
              {p.hero.headlineAccent}
            </em>
          </h1>

          <div style={{ ...GOLD_LINE, marginBottom: "28px" }} />

          <p
            style={{
              ...BODY,
              fontSize: "16px",
              color: "#706D64",
              maxWidth: "460px",
              lineHeight: "1.8",
            }}
          >
            {p.hero.tagline}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          01 · ORIGIN STORY
      ═══════════════════════════════════════════════ */}
      <Section num="01" label={p.origin.sectionLabel} dark>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(24px, 3.5vw, 44px)",
            color: "#D4D0C8",
            lineHeight: 1.15,
            maxWidth: "560px",
            marginBottom: "36px",
          }}
        >
          {p.origin.headline}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "600px" }}>
          <p style={BODY}>{p.origin.p1}</p>
          <p style={BODY}>{p.origin.p2}</p>
          <p style={BODY}>{p.origin.p3}</p>
        </div>

        <p
          className="font-serif"
          style={{
            marginTop: "40px",
            fontSize: "18px",
            color: "#C8A44E",
            fontStyle: "italic",
            letterSpacing: "0.01em",
          }}
        >
          {p.origin.coda}
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════
          02 · WHAT HYEX IS
      ═══════════════════════════════════════════════ */}
      <Section num="02" label={p.what.sectionLabel}>
        <p
          className="font-serif"
          style={{
            fontSize: "clamp(20px, 2.8vw, 34px)",
            color: "#D4D0C8",
            lineHeight: 1.35,
            maxWidth: "680px",
            marginBottom: "32px",
            fontStyle: "italic",
          }}
        >
          "{p.what.statement}"
        </p>

        <div style={{ ...GOLD_LINE, marginBottom: "28px" }} />

        <p style={{ ...BODY, maxWidth: "520px" }}>{p.what.detail}</p>
      </Section>

      {/* ═══════════════════════════════════════════════
          03 · VISION
      ═══════════════════════════════════════════════ */}
      <Section num="03" label={p.vision.sectionLabel} dark>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(26px, 4vw, 52px)",
            color: "#D4D0C8",
            lineHeight: 1.1,
            maxWidth: "640px",
            marginBottom: "28px",
          }}
        >
          {p.vision.headline}
        </h2>

        <p style={{ ...BODY, maxWidth: "560px", marginBottom: "40px" }}>
          {p.vision.body}
        </p>

        <p
          className="label-micro"
          style={{ color: "#4A4843", letterSpacing: "0.18em" }}
        >
          {p.vision.cities}
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════
          04 · AUDIENCE
      ═══════════════════════════════════════════════ */}
      <Section num="04" label={p.audience.sectionLabel}>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(22px, 3vw, 38px)",
            color: "#D4D0C8",
            lineHeight: 1.2,
            maxWidth: "560px",
            marginBottom: "40px",
          }}
        >
          {p.audience.headline}
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {[
            { title: p.audience.card1Title, body: p.audience.card1Body },
            { title: p.audience.card2Title, body: p.audience.card2Body },
            { title: p.audience.card3Title, body: p.audience.card3Body },
          ].map((card) => (
            <div
              key={card.title}
              className="card-hover"
              style={{
                background: "#0A0A09",
                padding: "28px 24px",
                borderTop: "2px solid rgba(200,164,78,0)",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "rgba(200,164,78,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderTopColor = "rgba(200,164,78,0)";
              }}
            >
              <p
                className="font-serif"
                style={{ fontSize: "20px", color: "#D4D0C8", marginBottom: "12px" }}
              >
                {card.title}
              </p>
              <p style={{ ...BODY, fontSize: "14px" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          05 · WHAT MAKES US DIFFERENT
      ═══════════════════════════════════════════════ */}
      <Section num="05" label={p.difference.sectionLabel} dark>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(22px, 3vw, 38px)",
            color: "#D4D0C8",
            lineHeight: 1.2,
            maxWidth: "560px",
            marginBottom: "40px",
          }}
        >
          {p.difference.headline}
        </h2>

        <div>
          {[
            { n: "01", text: p.difference.item1 },
            { n: "02", text: p.difference.item2 },
            { n: "03", text: p.difference.item3 },
            { n: "04", text: p.difference.item4 },
          ].map((item) => (
            <div
              key={item.n}
              className="flex items-start gap-6 py-5 border-t border-[rgba(255,255,255,0.04)] group"
            >
              <span
                style={{
                  fontSize: "9px",
                  color: "#C8A44E",
                  letterSpacing: "0.16em",
                  paddingTop: "5px",
                  minWidth: "22px",
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {item.n}
              </span>
              <span
                style={{
                  fontSize: "clamp(17px, 2vw, 24px)",
                  color: "#D4D0C8",
                  fontWeight: 300,
                  lineHeight: 1.35,
                  transition: "color 0.2s",
                }}
                className="group-hover:text-[#E8E4DC]"
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════
          06 · FUTURE AMBITION
      ═══════════════════════════════════════════════ */}
      <Section num="06" label={p.future.sectionLabel}>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(26px, 3.5vw, 48px)",
            color: "#D4D0C8",
            lineHeight: 1.1,
            marginBottom: "28px",
          }}
        >
          {p.future.headline}
        </h2>

        <p style={{ ...BODY, maxWidth: "600px", fontSize: "16px", lineHeight: "1.85" }}>
          {p.future.body}
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════
          CLOSING
      ═══════════════════════════════════════════════ */}
      <section
        className="border-t border-[rgba(255,255,255,0.04)]"
        style={{ background: "#111110" }}
      >
        <div
          className="max-w-7xl mx-auto px-6 py-24 sm:py-32 flex flex-col items-center text-center"
        >
          {/* Setup line */}
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(14px, 1.5vw, 17px)",
              color: "#4A4843",
              fontStyle: "italic",
              letterSpacing: "0.02em",
              marginBottom: "20px",
            }}
          >
            {p.closing.eyebrow}
          </p>

          {/* Main headline */}
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(28px, 4.5vw, 60px)",
              color: "#D4D0C8",
              lineHeight: 1.1,
              maxWidth: "700px",
              marginBottom: "32px",
            }}
          >
            {p.closing.headline}
          </h2>

          <div style={{ ...GOLD_LINE, marginBottom: "28px" }} />

          {/* The kicker */}
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 3.5vw, 48px)",
              color: "#C8A44E",
              fontStyle: "italic",
              marginBottom: "44px",
              lineHeight: 1,
            }}
          >
            {p.closing.coda}
          </p>

          {/* Founder attribution */}
          <p
            style={{
              fontSize: "11px",
              color: "#4A4843",
              letterSpacing: "0.1em",
              fontWeight: 300,
              marginBottom: "40px",
              lineHeight: "1.7",
            }}
          >
            {p.closing.founder}
          </p>

          {/* CTA */}
          <Link
            href="/"
            style={{
              display: "inline-block",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#0A0A09",
              background: "#C8A44E",
              padding: "13px 32px",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#D4B05A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#C8A44E";
            }}
          >
            {p.closing.cta}
          </Link>
        </div>
      </section>

    </div>
  );
}
