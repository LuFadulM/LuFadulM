"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";

interface MagazineSectionProps {
  places: Place[];
}

interface Story {
  place: Place;
  title: string;
  category: string;
  readTime: string;
  teaser: string;
  guide?: string;
}

function deriveStory(place: Place): Story {
  const loc = place.neighborhood ?? place.city;
  let title = "";
  let category = "";
  let readTime = "4 min";
  let guide: string | undefined;

  switch (place.category) {
    case "Restaurants":
      title = `La cocina que define a ${loc}`;
      category = "Gastronomía";
      readTime = "5 min";
      guide = `Guía · ${place.city}`;
      break;
    case "Cafés":
      title = `El ritual del café en ${place.city}`;
      category = "Cultura del café";
      readTime = "3 min";
      break;
    case "Hotels":
      title = `Una noche perfecta en ${loc}`;
      category = "Escapadas";
      readTime = "4 min";
      guide = `Guía · ${place.city}`;
      break;
    case "Bars":
      title = `Después de las ocho en ${loc}`;
      category = "Vida nocturna";
      readTime = "4 min";
      break;
    case "Attractions":
      title = `El rincón que ${place.city} guarda para los curiosos`;
      category = "Cultura";
      readTime = "6 min";
      guide = `Guía · ${place.city}`;
      break;
    default:
      title = `Lo que hace único a ${place.name}`;
      category = "Colombia";
      readTime = "4 min";
  }

  const fullDesc = place.description ?? "";
  const firstSentence = fullDesc.split(".")[0];
  const teaser = firstSentence.length > 20
    ? firstSentence + "."
    : `Una historia sobre ${place.name} y lo que lo hace especial.`;

  return { place, title, category, readTime, teaser, guide };
}

// ─── Large featured story ─────────────────────────────────────────────────────

function FeaturedStory({ story }: { story: Story }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/places/${story.place.slug}`} className="block group h-full">
      <article
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          height: "100%",
          minHeight: "460px",
          background: "#1C1C1C",
          position: "relative",
          boxShadow: hovered
            ? "0 24px 56px rgba(0,0,0,0.20)"
            : "0 8px 32px rgba(0,0,0,0.12)",
          transition: "box-shadow 0.4s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {story.place.cover_image_url && (
          <Image
            src={story.place.cover_image_url}
            alt={story.place.name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1)",
            }}
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        )}

        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.60) 42%, rgba(0,0,0,0.12) 78%, transparent 100%)",
          }}
        />

        {/* Guide label */}
        {story.guide && (
          <div style={{ position: "absolute", top: 24, left: 24 }}>
            <span style={{
              fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase",
              fontWeight: 700, color: "#C6A85C",
              background: "rgba(198,168,92,0.12)",
              border: "1px solid rgba(198,168,92,0.30)",
              padding: "4px 10px", backdropFilter: "blur(4px)",
            }}>
              {story.guide}
            </span>
          </div>
        )}

        {/* Bottom content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px" }}>
          <p style={{
            fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#C6A85C", fontWeight: 700,
            fontFamily: "'Sora', system-ui, sans-serif", marginBottom: "12px",
          }}>
            {story.category} · {story.readTime} de lectura
          </p>

          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700,
            color: "#FFFFFF", lineHeight: "1.2",
            marginBottom: "14px", letterSpacing: "-0.01em",
            textShadow: "0 2px 16px rgba(0,0,0,0.8)",
          }}>
            {story.title}
          </h3>

          <p style={{
            fontSize: "13px", lineHeight: "1.65",
            color: "rgba(255,255,255,0.72)", marginBottom: "20px",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {story.teaser}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase",
              fontWeight: 700, color: "#C6A85C",
              fontFamily: "'Sora', system-ui, sans-serif",
            }}>
              Leer historia
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C6A85C" strokeWidth="2"
              style={{ transition: "transform 0.3s ease", transform: hovered ? "translateX(4px)" : "translateX(0)" }} aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Small story — dark cinematic overlay ────────────────────────────────────

function SmallStory({ story }: { story: Story }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/places/${story.place.slug}`} className="block group h-full">
      <article
        style={{
          background: "#FFFFFF",
          borderRadius: "14px",
          overflow: "hidden",
          height: "100%",
          minHeight: "200px",
          position: "relative",
          border: "1px solid rgba(0,0,0,0.08)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 18px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)"
            : "0 4px 20px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {story.place.cover_image_url ? (
          <Image
            src={story.place.cover_image_url}
            alt={story.place.name}
            fill
            className="object-cover"
            style={{
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
            }}
            sizes="(max-width: 768px) 100vw, 38vw"
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#EFEAE4" }} />
        )}

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.10) 100%)",
        }} />

        {/* Content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px 20px" }}>
          <p style={{
            fontSize: "8px", letterSpacing: "0.20em", textTransform: "uppercase",
            color: "#C6A85C", fontWeight: 700,
            fontFamily: "'Sora', system-ui, sans-serif", marginBottom: "7px",
            textShadow: "0 1px 8px rgba(0,0,0,0.9)",
          }}>
            {story.category} · {story.readTime}
          </p>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "17px", fontWeight: 600,
            color: hovered ? "#C6A85C" : "#F0EBE4",
            lineHeight: "1.28", letterSpacing: "-0.01em",
            transition: "color 0.25s ease",
            textShadow: "0 1px 12px rgba(0,0,0,0.9)",
          }}>
            {story.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function MagazineSection({ places }: MagazineSectionProps) {
  const storyPlaces = places.filter((p) => p.cover_image_url && p.description).slice(0, 3);
  if (storyPlaces.length < 2) return null;

  const stories = storyPlaces.map(deriveStory);
  const [featured, ...rest] = stories;

  return (
    <section>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        marginBottom: "28px", paddingBottom: "20px",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}>
        <div>
          <p style={{
            fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
            fontWeight: 700, fontFamily: "'Sora', system-ui, sans-serif",
            color: "#C6A85C", marginBottom: "8px",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "#C6A85C" }} />
            Editorial
          </p>
          <h2 className="font-serif" style={{ fontSize: "clamp(36px, 5vw, 62px)", color: "#1C1C1C", fontWeight: 300, letterSpacing: "-0.03em", lineHeight: "1.05" }}>
            Colombia en historias
          </h2>
          <p style={{ fontSize: "13px", color: "#6A6A6A", fontFamily: "'Sora', system-ui, sans-serif", fontWeight: 300, marginTop: "6px" }}>
            Lecturas sobre lugares que vale la pena conocer
          </p>
        </div>
      </div>

      {/* Asymmetric grid: large left (dark overlay) + 2 light cards right */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="md:col-span-3 magazine-featured">
          <FeaturedStory story={featured} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-5">
          {rest.slice(0, 2).map((story) => (
            <SmallStory key={story.place.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
