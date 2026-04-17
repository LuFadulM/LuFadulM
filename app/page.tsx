"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import AhoraSection from "@/components/discovery/AhoraSection";
import SectionDots from "@/components/layout/SectionDots";
import { useLanguage } from "@/contexts/LanguageContext";
import { rankPlacesWithFeatured } from "@/lib/ranking";

type CategoryFilter = Category | "All";

// ─── Scroll reveal ─────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Section wrapper ────────────────────────────────────────────────────────────

function Section({ children, bg = "var(--bg)", id }: { children: React.ReactNode; bg?: string; id?: string }) {
  return (
    <div style={{ background: bg }} id={id}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">{children}</div>
    </div>
  );
}

// ─── Section label ──────────────────────────────────────────────────────────────

function SLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p style={{
      fontSize: "var(--text-micro)", letterSpacing: "0.14em", textTransform: "uppercase",
      fontWeight: 700, fontFamily: "var(--font-sans)",
      color: dark ? "#8B6914" : "var(--gold)", marginBottom: "12px",
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      <span style={{ display: "inline-block", width: "1.5rem", height: "1px", background: dark ? "#8B6914" : "var(--gold)", opacity: 0.7 }} />
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

  useScrollReveal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setCategory(cat as CategoryFilter);
  }, []);

  const featuredPlaces = useMemo(() => MOCK_PLACES.filter((p) => p.is_featured), []);

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

    if (sort === "Newest") places.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (sort === "Most Reviewed") places.sort((a, b) => b.review_count - a.review_count);

    return places;
  }, [search, category, city, price, sort]);

  const isExploring = !!(search || category !== "All" || city !== "All" || price !== "All");

  return (
    <div style={{ background: "var(--bg)" }}>

      <SectionDots />

      {/* ══════════════════════════════════════════════════════════════════
          HERO — split viewport, 45% content / 55% atmospheric photo
      ══════════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          display: "grid",
          gridTemplateColumns: "45fr 55fr",
          height: "100vh",
          minHeight: "560px",
          maxHeight: "900px",
          background: "var(--bg)",
          overflow: "hidden",
        }}
        aria-label="Bienvenida a Hyex"
      >
        {/* LEFT — editorial content */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(2rem, 4vw, 4rem) 0 clamp(1.5rem, 5vw, 5rem)",
          gap: "1.75rem",
        }}>

          {/* Eyebrow */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.625rem",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-micro)", letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--gold)",
          }}>
            <span style={{ display: "block", width: "1.5rem", height: "1px", background: "var(--gold)", opacity: 0.7 }} />
            Colombia
          </span>

          {/* Headline */}
          <h1 className="font-serif fade-up" style={{
            fontSize: "clamp(2.75rem, 4.5vw, 5.5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            {t.hero.title}{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              {t.hero.titleAccent}.
            </em>
          </h1>

          {/* Subtitle */}
          <p className="fade-up" style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-small)",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            maxWidth: "360px",
            margin: 0,
          }}>
            {t.hero.subtitle}
          </p>

          {/* Stats */}
          <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {[`${MOCK_PLACES.length} lugares`, "6 ciudades", "6 categorías"].map((stat, i) => (
              <React.Fragment key={stat}>
                {i > 0 && (
                  <span style={{ color: "var(--border)", fontFamily: "var(--font-sans)" }}>·</span>
                )}
                <span style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-micro)", letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}>
                  {stat}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* CTA link */}
          <a
            href="/#explore"
            className="fade-up"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "var(--text-micro)", letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--gold)",
              textDecoration: "none",
              borderBottom: "1px solid var(--gold-border)",
              paddingBottom: "0.25rem",
              width: "fit-content",
              transition: "gap 200ms ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.875rem"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "0.5rem"; }}
          >
            Explorar ahora <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* RIGHT — atmospheric photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Photo — replace URL with your best Colombia atmospheric image */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }} />
          {/* Left edge blends into dark bg */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(105deg, var(--bg) 0%, rgba(12,11,9,0.35) 40%, transparent 70%)",
          }} />
          {/* Scrim for overall darkening */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "rgba(12,11,9,0.25)",
          }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DISCOVERY SECTIONS
      ══════════════════════════════════════════════════════════════════ */}
      {!isExploring && (
        <>
          {/* 1 — HOY EN TU CIUDAD */}
          <Section bg="var(--bg)" id="hoy">
            <HoySection places={MOCK_PLACES} />
          </Section>

          {/* 2 — PLANES QUE VALEN EL VIAJE */}
          <Section bg="var(--surface)" id="planes">
            <PlanesSection places={MOCK_PLACES} />
          </Section>

          {/* 3 — JOYAS ESCONDIDAS */}
          <Section bg="var(--bg)" id="joyas">
            <JoyasSection places={MOCK_PLACES} />
          </Section>

          {/* 4 — PEQUEÑOS PLANES */}
          <Section bg="var(--surface-alt)" id="pequeños">
            <div style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              marginBottom: "28px", paddingBottom: "18px",
              borderBottom: "1px solid var(--border)",
            }}>
              <div>
                <SLabel>Experiencias</SLabel>
                <h2 className="font-serif fade-up" style={{
                  fontSize: "clamp(28px, 4vw, 52px)",
                  color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.02em",
                }}>
                  Pequeños planes
                </h2>
                <p className="fade-up" style={{
                  fontSize: "var(--text-small)", color: "var(--text-secondary)",
                  fontFamily: "var(--font-sans)", fontWeight: 400, marginTop: "6px",
                }}>
                  Ideas rápidas para cualquier momento
                </p>
              </div>
            </div>
            <FeaturedSection places={featuredPlaces} />
          </Section>

          {/* 5 — MAGAZINE / STORIES */}
          <Section bg="var(--bg)" id="magazine">
            <MagazineSection places={MOCK_PLACES} />
          </Section>

          {/* 6 — LO QUE PASA AHORA — warm break section */}
          <div id="ahora" style={{ background: "var(--warm-break)" }}>
            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
              <AhoraSection places={MOCK_PLACES} />
            </div>
          </div>

          {/* 7 — ABOUT HYEX — dark emphasis */}
          <section
            id="about"
            style={{ background: "var(--surface-alt)", position: "relative", overflow: "hidden" }}
          >
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 15% 60%, rgba(201,168,76,0.05) 0%, transparent 60%)",
            }} />

            <div className="max-w-4xl mx-auto" style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,5rem)", position: "relative", zIndex: 1 }}>

              <SLabel>Sobre Hyex</SLabel>

              <p className="font-serif fade-up" style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1, letterSpacing: "-0.025em", fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: "2.5rem",
              }}>
                No es una guía de viajes.{" "}
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                  Es una forma distinta de vivir Colombia.
                </em>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "680px" }}>
                {[
                  "Construimos Hyex para personas que no solo quieren visitar lugares — quieren entenderlos. El tipo de personas que se preocupan por dónde van, a quién conocen, y las historias detrás de cada rincón.",
                  "En lugar de abrumarte con opciones, Hyex cura lo que realmente importa: experiencias significativas, joyas ocultas y lugares que los locales genuinamente recomendarían — no los algoritmos.",
                  "Desde un amanecer en Tayrona hasta una noche en el barrio de Getsemaní, cada plan en Hyex está seleccionado para ayudarte a conectar con la cultura, no solo a pasar por ella.",
                ].map((text, i) => (
                  <p key={i} className="fade-up" style={{
                    fontSize: "var(--text-base)", lineHeight: 1.8,
                    color: "var(--text-secondary)",
                    fontFamily: "var(--font-sans)", fontWeight: 400,
                  }}>
                    {text}
                  </p>
                ))}
              </div>

              {/* Pull quote */}
              <blockquote className="font-serif fade-up" style={{
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                color: "var(--text-primary)",
                fontStyle: "italic",
                lineHeight: 1.5, letterSpacing: "-0.01em",
                margin: "3rem 0",
                padding: "1.5rem 0 1.5rem 2rem",
                borderLeft: "2px solid var(--gold)",
              }}>
                "Esto no se trata de marcar destinos en una lista. Se trata de descubrir qué hace que cada lugar sea inolvidable."
              </blockquote>

              <p className="fade-up" style={{
                fontSize: "var(--text-base)", lineHeight: 1.7,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-sans)", fontWeight: 400,
              }}>
                <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  Hyex existe para que la exploración vuelva a sentirse personal.
                </strong>
              </p>
            </div>
          </section>

          {/* Explore header */}
          <div style={{ background: "var(--surface)" }}>
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-4" id="explore">
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "40px" }}>
                <div className="flex items-end justify-between mb-2">
                  <div>
                    <SLabel>Explorar todo</SLabel>
                    <h2 className="font-serif" style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      color: "var(--text-primary)", fontWeight: 400, letterSpacing: "-0.02em",
                    }}>
                      Todos los lugares
                    </h2>
                  </div>
                  <p style={{
                    fontSize: "var(--text-micro)", color: "var(--text-muted)", fontWeight: 400,
                    fontFamily: "var(--font-sans)",
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
      <div style={{ background: "var(--surface)" }}>
        <div className={`max-w-7xl mx-auto px-6 ${isExploring ? "pt-12" : ""} pb-24`} id={isExploring ? "explore" : undefined}>
          {isExploring && (
            <div style={{ marginBottom: "24px" }}>
              <SearchBar placeholder={t.hero.searchPlaceholder} onSearch={setSearch} />
            </div>
          )}
          <div className="mb-8 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <CategoryPills active={category} onChange={setCategory} />
              <p style={{
                fontSize: "var(--text-micro)", letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap",
                fontFamily: "var(--font-sans)",
              }}>
                {filteredPlaces.length}{" "}
                {filteredPlaces.length === 1 ? t.results.place : t.results.places}
              </p>
            </div>
            <FilterBar city={city} price={price} sort={sort} onCityChange={setCity} onPriceChange={setPrice} onSortChange={setSort} />
          </div>

          <PlaceGrid places={filteredPlaces} emptyMessage="Ningún lugar coincide con tus filtros." surface="homepage" />
        </div>
      </div>
    </div>
  );
}
