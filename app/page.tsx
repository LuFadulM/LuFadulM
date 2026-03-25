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
import EditorialBreak from "@/components/discovery/EditorialBreak";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import { MOCK_EVENTS } from "./data/events";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";
import { useEffect } from "react";

type CategoryFilter = Category | "All";

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

  // Top featured place used as hero background
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
    <div>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — Full-screen, immersive, editorial
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          background: "#0A0A09",
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
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
                opacity: 0.28,
                filter: "saturate(0.7) brightness(0.85)",
              }}
            />
            {/* Edge vignette */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,9,0.85) 100%)",
              }}
            />
          </>
        )}

        {/* Ambient gold glow — bottom left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 15% 75%, rgba(212,175,55,0.07) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 w-full relative" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: "600px", paddingTop: "clamp(60px, 8vh, 100px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}>

            {/* Label */}
            <p
              className="label-micro"
              style={{ color: "#D4AF37", marginBottom: "28px" }}
            >
              {t.hero.label}
            </p>

            {/* Title */}
            <h1
              className="font-serif leading-none"
              style={{
                fontSize: "clamp(52px, 7.5vw, 96px)",
                color: "#F5F5F5",
                marginBottom: "20px",
                letterSpacing: "-0.02em",
              }}
            >
              {t.hero.title}
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #D4AF37 0%, #C8A44E 60%, #B8903E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.hero.titleAccent}
              </span>
            </h1>

            {/* Gold rule */}
            <div
              style={{
                width: "48px",
                height: "1px",
                background: "rgba(200,164,78,0.45)",
                marginBottom: "28px",
              }}
            />

            {/* Subtitle */}
            <p
              style={{
                color: "rgba(200,196,188,0.72)",
                fontSize: "15px",
                lineHeight: "1.75",
                fontWeight: 300,
                maxWidth: "420px",
                marginBottom: "44px",
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Search */}
            <div style={{ maxWidth: "500px" }}>
              <SearchBar
                large
                placeholder={t.hero.searchPlaceholder}
                onSearch={setSearch}
              />
            </div>

            {/* Quick stats — editorial detail */}
            <div
              className="flex items-center gap-6 mt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px" }}
            >
              {[
                { value: `${MOCK_PLACES.length}+`, label: "Lugares curados" },
                { value: "6", label: "Ciudades" },
                { value: "100%", label: "Selección editorial" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="font-serif"
                    style={{ fontSize: "20px", color: "#D4AF37", fontWeight: 400, lineHeight: 1 }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.30)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      fontWeight: 500,
                      marginTop: "5px",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute"
          style={{
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: 0.35,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.6))",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <div className="max-w-7xl mx-auto px-6 pt-24">

          {/* 1 — HOY EN TU CIUDAD */}
          <HoySection places={MOCK_PLACES} />

          {/* 2 — LUGARES DESTACADOS (editorial grid) */}
          <FeaturedSection places={featuredPlaces} />

          {/* 3 — EN FOCO (spotlight) */}
          {spotlightPlace && (
            <section className="mb-32">
              <div className="discovery-header">
                <div>
                  <div className="section-label-bar">
                    <span className="label-micro">En foco</span>
                  </div>
                  <h2
                    className="font-serif"
                    style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
                  >
                    Lugares que valen la pena
                  </h2>
                </div>
              </div>
              <SpotlightSection place={spotlightPlace} />
            </section>
          )}

          {/* ── Editorial breathing space ── */}
          <EditorialBreak
            quote="Cada rincón de Colombia tiene una historia que merece ser contada"
            sub="Descubre · Curaduría editorial"
          />

          {/* 4 — PLANES QUE VALEN EL VIAJE (experiences) */}
          <ExperienciasSection events={MOCK_EVENTS} />

          {/* 5 — JOYAS ESCONDIDAS */}
          <JoyasSection places={MOCK_PLACES} />

          {/* 6 — PEQUEÑOS PLANES */}
          <PlanesSection places={MOCK_PLACES} />

          {/* ── Second editorial break ── */}
          <EditorialBreak
            quote="El mejor restaurante de Bogotá es el que descubriste tú primero"
            sub="Colombia · Gastronomía local"
          />

          {/* 7 — MAGAZINE / HISTORIAS */}
          <MagazineSection places={MOCK_PLACES} />

          {/* 8 — LO QUE ESTÁ PASANDO */}
          <AhoraSection places={MOCK_PLACES} />

          {/* 9 — REVIEWS */}
          <ReviewsSection />

          {/* ── Divider before explore ── */}
          <div
            id="explore"
            className="mb-10 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="flex items-end justify-between pt-10 mb-2">
              <div>
                <div className="section-label-bar">
                  <span className="label-micro">Explorar todo</span>
                </div>
                <h2
                  className="font-serif"
                  style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
                >
                  Todos los lugares
                </h2>
              </div>
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.18)",
                  fontWeight: 300,
                  paddingBottom: "4px",
                }}
              >
                {MOCK_PLACES.length} lugares en Colombia
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          EXPLORE — filter bar + place grid
      ══════════════════════════════════════════════════════════════════ */}
      <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`}>
        <div className="mb-8 pb-6 border-b border-[rgba(255,255,255,0.04)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <CategoryPills active={category} onChange={setCategory} />
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#555555",
                fontWeight: 500,
                whiteSpace: "nowrap",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
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
  );
}
