"use client";

import React, { useState, useMemo } from "react";
import { MOCK_PLACES } from "./data/places";
import { Category, FilterCity, FilterPrice, SortOption } from "@/lib/types";
import SearchBar from "@/components/search/SearchBar";
import CategoryPills from "@/components/search/CategoryPills";
import FilterBar from "@/components/search/FilterBar";
import PlaceGrid from "@/components/places/PlaceGrid";
import FeaturedSection from "@/components/places/FeaturedSection";
import SpotlightSection from "@/components/places/SpotlightSection";
import HoySection from "@/components/discovery/HoySection";
import JoyasSection from "@/components/discovery/JoyasSection";
import PlanesSection from "@/components/discovery/PlanesSection";
import AhoraSection from "@/components/discovery/AhoraSection";
import ExperienciasSection from "@/components/discovery/ExperienciasSection";
import MagazineSection from "@/components/discovery/MagazineSection";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { MOCK_EVENTS } from "./data/events";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

// ─── Section wrapper helpers ──────────────────────────────────────────────────

function LightSection({ children, bg = "#F7F5F2" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {children}
      </div>
    </div>
  );
}

function DarkSection({ children, bg = "#0E0E0C" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{ background: bg }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {children}
      </div>
    </div>
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

  const allRanked = useMemo(() => rankPlacesWithFeatured(MOCK_PLACES), []);

  const spotlightPlace = useMemo(
    () => allRanked.find((p) => p.isFeaturedPlacement) ?? null,
    [allRanked]
  );

  const featuredPlaces = useMemo(
    () => MOCK_PLACES.filter((p) => p.is_featured),
    []
  );

  const heroImage = useMemo(
    () => featuredPlaces.find((p) => p.cover_image_url)?.cover_image_url ?? null,
    [featuredPlaces]
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
  }, [search, category, city, price, sort, allRanked]);

  const isExploring = search || category !== "All" || city !== "All" || price !== "All";

  return (
    <div style={{ background: "#F7F5F2" }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Full-screen dark, cinematic, minimal
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0A09",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hero background image */}
        {heroImage && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center 35%",
                opacity: 0.32,
                filter: "saturate(0.75) brightness(0.8)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at center, transparent 25%, rgba(10,10,9,0.88) 100%)",
              }}
            />
          </>
        )}

        {/* Bottom fade into light section */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "120px",
            background: "linear-gradient(to bottom, transparent, rgba(10,10,9,0.7))",
            pointerEvents: "none",
          }}
        />

        {/* Ambient gold glow */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 15% 75%, rgba(198,168,92,0.07) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: "640px", padding: "clamp(60px,8vh,100px) 0" }}>

            <p className="label-micro" style={{ color: "#C6A85C", marginBottom: "24px" }}>
              {t.hero.label}
            </p>

            <h1
              className="font-serif leading-none"
              style={{
                fontSize: "clamp(52px, 7.5vw, 96px)",
                color: "#F5F5F5",
                marginBottom: "18px",
                letterSpacing: "-0.025em",
              }}
            >
              {t.hero.title}
              <br />
              <span style={{
                fontStyle: "italic",
                background: "linear-gradient(135deg, #D4AF37 0%, #C8A44E 60%, #B8903E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.hero.titleAccent}
              </span>
            </h1>

            <div style={{ width: "48px", height: "1px", background: "rgba(198,168,92,0.45)", marginBottom: "24px" }} />

            <p style={{
              color: "rgba(200,196,188,0.70)",
              fontSize: "15px", lineHeight: "1.75",
              fontWeight: 300, maxWidth: "400px",
              marginBottom: "40px",
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ maxWidth: "500px" }}>
              <SearchBar large placeholder={t.hero.searchPlaceholder} onSearch={setSearch} />
            </div>

            {/* Stats */}
            <div
              className="flex items-center gap-8 mt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "24px" }}
            >
              {[
                { value: `${MOCK_PLACES.length}+`, label: "Lugares curados" },
                { value: "6", label: "Ciudades" },
                { value: "100%", label: "Editorial" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif" style={{ fontSize: "22px", color: "#C6A85C", fontWeight: 400, lineHeight: 1 }}>
                    {value}
                  </p>
                  <p style={{
                    fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)", fontFamily: "'Sora', system-ui, sans-serif",
                    fontWeight: 500, marginTop: "5px",
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          opacity: 0.4, animation: "scrollPulse 2.2s ease-in-out infinite",
        }} aria-hidden="true">
          <div style={{
            width: "1px", height: "40px",
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS (light + dark alternating)
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <>
          {/* 1 — HOY EN TU CIUDAD — warm light */}
          <LightSection bg="#F7F5F2">
            <HoySection places={MOCK_PLACES} />
          </LightSection>

          {/* 2 — LUGARES DESTACADOS — white */}
          <LightSection bg="#FFFFFF">
            <FeaturedSection places={featuredPlaces} />
          </LightSection>

          {/* 3 — EN FOCO (spotlight) — dark cinematic */}
          {spotlightPlace && (
            <DarkSection>
              <div style={{
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                marginBottom: "28px", paddingBottom: "18px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div>
                  <p style={{
                    fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
                    fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                    color: "#C6A85C", marginBottom: "8px",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}>
                    <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#C6A85C" }} />
                    En foco
                  </p>
                  <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#E8E4DC" }}>
                    Lugares que valen la pena
                  </h2>
                </div>
              </div>
              <SpotlightSection place={spotlightPlace} />
            </DarkSection>
          )}

          {/* 4 — EXPERIENCIAS — dark cinematic */}
          <DarkSection bg="#111110">
            <ExperienciasSection events={MOCK_EVENTS} />
          </DarkSection>

          {/* 5 — JOYAS ESCONDIDAS — warm editorial */}
          <LightSection bg="#EFEAE4">
            <JoyasSection places={MOCK_PLACES} />
          </LightSection>

          {/* 6 — PEQUEÑOS PLANES — white */}
          <LightSection bg="#FFFFFF">
            <PlanesSection places={MOCK_PLACES} />
          </LightSection>

          {/* 7 — MAGAZINE — light editorial */}
          <LightSection bg="#F7F5F2">
            <MagazineSection places={MOCK_PLACES} />
          </LightSection>

          {/* 8 — LO QUE ESTÁ PASANDO — dark */}
          <DarkSection>
            <AhoraSection places={MOCK_PLACES} />
          </DarkSection>

          {/* 9 — REVIEWS — warm light */}
          <LightSection bg="#FAFAF8">
            <ReviewsSection />
          </LightSection>

          {/* 10 — EXPLORE HEADER — white */}
          <div style={{ background: "#FFFFFF" }}>
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-4" id="explore">
              <div style={{ borderTop: "1px solid rgba(28,28,28,0.06)", paddingTop: "40px" }}>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <p style={{
                      fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
                      fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
                      color: "#C6A85C", marginBottom: "8px",
                      display: "flex", alignItems: "center", gap: "8px",
                    }}>
                      <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#C6A85C" }} />
                      Explorar todo
                    </p>
                    <h2 className="font-serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "#1C1C1C", letterSpacing: "-0.02em" }}>
                      Todos los lugares
                    </h2>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9A9087", fontWeight: 300 }}>
                    {MOCK_PLACES.length} lugares en Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORE — filter + grid on white
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#FFFFFF" }}>
        <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`}>
          <div
            className="mb-8 pb-6"
            style={{ borderBottom: "1px solid rgba(28,28,28,0.08)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <CategoryPills active={category} onChange={setCategory} />
              <p style={{
                fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#9A9087", fontWeight: 500, whiteSpace: "nowrap",
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
