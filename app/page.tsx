"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "./data/places";
import { Category, FilterCity, FilterPrice, SortOption } from "@/lib/types";
import SearchBar from "@/components/search/SearchBar";
import CategoryPills from "@/components/search/CategoryPills";
import FilterBar from "@/components/search/FilterBar";
import PlaceGrid from "@/components/places/PlaceGrid";
import HoySection from "@/components/discovery/HoySection";
import JoyasSection from "@/components/discovery/JoyasSection";
import PlanesSection from "@/components/discovery/PlanesSection";
import MagazineSection from "@/components/discovery/MagazineSection";
import FeaturedSection from "@/components/places/FeaturedSection";
import SectionDots from "@/components/layout/SectionDots";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

// ─── Light section wrapper ────────────────────────────────────────────────────

function Section({ children, bg = "#F7F5F2", id }: { children: React.ReactNode; bg?: string; id?: string }) {
  return (
    <div style={{ background: bg }} id={id}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {children}
      </div>
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
      fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
      color: "#C6A85C", marginBottom: "12px",
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <span style={{ display: "inline-block", width: "20px", height: "1px", background: "rgba(198,168,92,0.6)" }} />
      {children}
    </p>
  );
}

export default function HomePage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [city, setCity] = useState<FilterCity>("All");
  const [price, setPrice] = useState<FilterPrice>("All");
  const [sort, setSort] = useState<SortOption>("Rating");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat as CategoryFilter);
  }, []);

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const filteredPlaces = useMemo(() => {
    let places =
      sort === "Rating"
        ? rankPlacesWithFeatured(MOCK_PLACES, {
            city: city !== "All" ? city : undefined,
            category: category !== "All" ? category : undefined,
          })
        : [...MOCK_PLACES];

    if (search) {
      const q = search.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.neighborhood?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (category !== "All") places = places.filter((p) => p.category === category);
    if (city !== "All") places = places.filter((p) => p.city === city);
    if (price !== "All") places = places.filter((p) => p.price_level === price);

    if (sort === "Newest") {
      places.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sort === "Most Reviewed") {
      places.sort((a, b) => b.review_count - a.review_count);
    }

    return places;
  }, [search, category, city, price, sort]);

  const isExploring = search || category !== "All" || city !== "All" || price !== "All";

  return (
    <div style={{ background: "#F7F5F2" }}>

      <SectionDots />

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO — dark, immersive
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0909",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow top-right */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 80% 15%, rgba(198,168,92,0.09) 0%, transparent 55%)",
        }} />

        {/* Subtle grain texture */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }} />

        <div className="max-w-5xl mx-auto px-8 md:px-12 w-full relative" style={{ zIndex: 10 }}>
          <div style={{ padding: "clamp(72px, 10vh, 120px) 0" }}>

            {/* Eyebrow */}
            <p style={{
              fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
              fontWeight: 600, fontFamily: "'Sora', system-ui, sans-serif",
              color: "rgba(198,168,92,0.70)", marginBottom: "28px",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(198,168,92,0.50)" }} />
              Colombia
            </p>

            {/* Main headline */}
            <h1 className="font-serif" style={{
              fontSize: "clamp(52px, 8vw, 116px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              marginBottom: "32px",
            }}>
              <span style={{ color: "#F0EDE6", display: "block" }}>{t.hero.title}</span>
              <em style={{
                fontStyle: "italic",
                display: "block",
                background: "linear-gradient(135deg, #E0C070 0%, #C6A85C 55%, #A88A3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.hero.titleAccent}
              </em>
            </h1>

            {/* Subtitle */}
            <p style={{
              color: "rgba(240,237,230,0.45)",
              fontSize: "16px",
              lineHeight: "1.75",
              fontWeight: 300,
              maxWidth: "480px",
              marginBottom: "44px",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}>
              {t.hero.subtitle}
            </p>

            {/* Search bar */}
            <div style={{ maxWidth: "580px", marginBottom: "36px" }}>
              <SearchBar large placeholder={t.hero.searchPlaceholder} onSearch={setSearch} />
            </div>

            {/* Stat pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {[
                `${MOCK_PLACES.length} lugares`,
                "6 ciudades",
                "6 categorías",
              ].map((value) => (
                <span
                  key={value}
                  style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "7px 16px",
                    fontSize: "11px",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 400,
                    color: "rgba(240,237,230,0.45)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "100px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: 0.28, animation: "scrollPulse 2.2s ease-in-out infinite",
        }} aria-hidden="true">
          <div style={{
            width: "1px", height: "44px",
            background: "linear-gradient(to bottom, transparent, rgba(198,168,92,0.8))",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS — light editorial rhythm
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <>
          {/* 2 — HOY EN TU CIUDAD */}
          <Section bg="#F7F5F2" id="hoy">
            <HoySection places={MOCK_PLACES} />
          </Section>

          {/* 3 — PLANES QUE VALEN EL VIAJE */}
          <Section bg="#EFEAE4" id="planes">
            <PlanesSection places={MOCK_PLACES} />
          </Section>

          {/* 4 — JOYAS ESCONDIDAS */}
          <Section bg="#F7F5F2" id="joyas">
            <JoyasSection places={MOCK_PLACES} />
          </Section>

          {/* 5 — PEQUEÑOS PLANES */}
          <Section bg="#EFEAE4" id="pequeños">
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              marginBottom: "28px", paddingBottom: "18px",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}>
              <div>
                <SectionLabel>Experiencias</SectionLabel>
                <h2 className="font-serif" style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  color: "#1C1C1C", fontWeight: 600, letterSpacing: "-0.02em",
                }}>
                  Pequeños planes
                </h2>
                <p style={{
                  fontSize: "13px", color: "#6A6A6A",
                  fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 400,
                  marginTop: "6px",
                }}>
                  Ideas rápidas para cualquier momento
                </p>
              </div>
            </div>
            <FeaturedSection places={featuredPlaces} />
          </Section>

          {/* 6 — MAGAZINE / STORIES */}
          <Section bg="#F7F5F2" id="magazine">
            <MagazineSection places={MOCK_PLACES} />
          </Section>

          {/* 7 — ABOUT HYEX — dark emphasis section */}
          <section
            id="about"
            style={{
              background: "#1C1C1C",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle gold glow */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 15% 60%, rgba(198,168,92,0.06) 0%, transparent 60%)",
            }} />

            <div className="max-w-4xl mx-auto px-6 md:px-12" style={{ padding: "100px 48px", position: "relative", zIndex: 1 }}>

              {/* Section label */}
              <p style={{
                fontSize: "9px", letterSpacing: "0.28em", textTransform: "uppercase",
                fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                color: "rgba(198,168,92,0.65)", marginBottom: "40px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <span style={{ display: "inline-block", width: "24px", height: "1px", background: "rgba(198,168,92,0.45)" }} />
                Sobre Hyex
              </p>

              {/* Main statement */}
              <p className="font-serif" style={{
                fontSize: "clamp(28px, 4.5vw, 58px)",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
                fontWeight: 400,
                color: "#F0EDE6",
                marginBottom: "48px",
              }}>
                Hyex is not a travel guide.{" "}
                <em style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #E0C070 0%, #C6A85C 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  It&apos;s a way to experience Colombia differently.
                </em>
              </p>

              {/* Body paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "680px" }}>
                {[
                  "We built Hyex for people who don't just want to visit places — they want to understand them. The kind of people who care about where they go, who they meet, and the stories behind every corner.",
                  "Instead of overwhelming you with options, Hyex curates what actually matters: meaningful experiences, hidden gems, and places that locals would recommend — not algorithms.",
                  "From a sunrise in Tayrona to a neighborhood night in Getsemaní, every plan on Hyex is selected to help you connect with the culture, not just pass through it.",
                ].map((text, i) => (
                  <p key={i} style={{
                    fontSize: "17px",
                    lineHeight: "1.80",
                    color: "rgba(240,237,230,0.62)",
                    fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 300,
                  }}>
                    {text}
                  </p>
                ))}
              </div>

              {/* Closing lines */}
              <div style={{
                marginTop: "48px",
                paddingTop: "40px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
                <p className="font-serif" style={{
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  color: "#F0EDE6",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.4,
                  marginBottom: "12px",
                }}>
                  This is not about checking destinations off a list.
                </p>
                <p className="font-serif" style={{
                  fontSize: "clamp(18px, 2.5vw, 26px)",
                  color: "#F0EDE6",
                  fontWeight: 400,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.4,
                  marginBottom: "40px",
                }}>
                  It&apos;s about{" "}
                  <em style={{ fontStyle: "italic", color: "#C6A85C" }}>
                    discovering what makes each place unforgettable.
                  </em>
                </p>
                <p style={{
                  fontSize: "15px",
                  color: "rgba(240,237,230,0.50)",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  fontWeight: 300,
                  lineHeight: 1.7,
                }}>
                  Hyex exists to make exploration feel personal again.
                </p>
              </div>
            </div>
          </section>

          {/* Explore header */}
          <div style={{ background: "#EFEAE4" }}>
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-4" id="explore">
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "40px" }}>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <SectionLabel>Explorar todo</SectionLabel>
                    <h2 className="font-serif" style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: "#1C1C1C", fontWeight: 600, letterSpacing: "-0.02em",
                    }}>
                      Todos los lugares
                    </h2>
                  </div>
                  <p style={{
                    fontSize: "11px", color: "#9A9A9A", fontWeight: 400,
                    fontFamily: "'Sora', system-ui, sans-serif",
                  }}>
                    {MOCK_PLACES.length} lugares en Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORE — filter + grid
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#EFEAE4" }}>
        <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`} id={isExploring ? "explore" : undefined}>
          <div className="mb-8 pb-6" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <CategoryPills active={category} onChange={setCategory} />
              <p style={{
                fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#9A9A9A", fontWeight: 500, whiteSpace: "nowrap",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}>
                {filteredPlaces.length}{" "}
                {filteredPlaces.length === 1 ? t.results.place : t.results.places}
              </p>
            </div>
            <FilterBar
              city={city}
              price={price}
              sort={sort}
              onCityChange={setCity}
              onPriceChange={setPrice}
              onSortChange={setSort}
            />
          </div>

          <PlaceGrid
            places={filteredPlaces}
            emptyMessage="Ningún lugar coincide con tus filtros."
            surface="homepage"
          />
        </div>
      </div>
    </div>
  );
}
