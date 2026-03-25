"use client";

import React from "react";
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
    case "Nightlife":
      title = `La noche tiene otro ritmo en ${place.city}`;
      category = "Noches";
      readTime = "5 min";
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
  const teaser =
    firstSentence.length > 20
      ? firstSentence + "."
      : `Una historia sobre ${place.name} y lo que lo hace especial.`;

  return { place, title, category, readTime, teaser, guide };
}

// ─── Large featured story ─────────────────────────────────────────────────────

function FeaturedStory({ story }: { story: Story }) {
  return (
    <Link href={`/places/${story.place.slug}`} className="block group h-full">
      <article
        className="card-rounded-lg relative overflow-hidden h-full"
        style={{ minHeight: "500px", background: "#111" }}
      >
        {story.place.cover_image_url && (
          <Image
            src={story.place.cover_image_url}
            alt={story.place.name}
            fill
            className="object-cover"
            style={{
              transition: "transform 0.9s cubic-bezier(0.23,1,0.32,1)",
              transform: "scale(1)",
            }}
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        )}

        {/* Rich gradient for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.65) 42%, rgba(0,0,0,0.15) 75%, transparent 100%)",
          }}
        />

        {/* Guide label — top left */}
        {story.guide && (
          <div className="absolute top-6 left-6">
            <span
              style={{
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#C8A44E",
                background: "rgba(200,164,78,0.08)",
                border: "1px solid rgba(200,164,78,0.22)",
                padding: "4px 10px",
                display: "inline-block",
                backdropFilter: "blur(4px)",
              }}
            >
              {story.guide}
            </span>
          </div>
        )}

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#D4AF37",
              fontWeight: 600,
              fontFamily: "'Sora', system-ui, sans-serif",
              marginBottom: "14px",
            }}
          >
            {story.category} · {story.readTime} de lectura
          </p>

          <h3
            className="font-serif text-white leading-tight mb-4"
            style={{
              fontSize: "clamp(22px, 3.2vw, 36px)",
              fontWeight: 700,
              textShadow: "0 2px 20px rgba(0,0,0,0.9)",
              letterSpacing: "-0.01em",
            }}
          >
            {story.title}
          </h3>

          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.68)",
              fontWeight: 400,
              maxWidth: "460px",
              marginBottom: "24px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {story.teaser}
          </p>

          <div className="flex items-center gap-2">
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#D4AF37",
                fontFamily: "'Sora', system-ui, sans-serif",
              }}
            >
              Leer historia
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-1.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>

        {/* Image zoom on hover via CSS sibling */}
        <style>{`
          .magazine-featured:hover img { transform: scale(1.05) !important; }
        `}</style>
      </article>
    </Link>
  );
}

// ─── Small story card ─────────────────────────────────────────────────────────

function SmallStory({ story }: { story: Story }) {
  return (
    <Link href={`/places/${story.place.slug}`} className="block group">
      <article
        className="card-rounded-lg overflow-hidden"
        style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.05)",
          height: "240px",
          position: "relative",
        }}
      >
        {story.place.cover_image_url && (
          <Image
            src={story.place.cover_image_url}
            alt={story.place.name}
            fill
            className="object-cover"
            style={{
              transition: "transform 0.75s cubic-bezier(0.23,1,0.32,1)",
            }}
            sizes="(max-width: 768px) 100vw, 38vw"
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 80%, transparent 100%)",
          }}
        />

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p
            style={{
              fontSize: "8px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.80)",
              fontWeight: 600,
              fontFamily: "'Sora', system-ui, sans-serif",
              marginBottom: "8px",
            }}
          >
            {story.category} · {story.readTime}
          </p>
          <h3
            className="font-serif text-white leading-snug"
            style={{
              fontSize: "15px",
              fontWeight: 700,
              textShadow: "0 1px 10px rgba(0,0,0,0.95)",
            }}
          >
            {story.title}
          </h3>
        </div>
      </article>
    </Link>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function MagazineSection({ places }: MagazineSectionProps) {
  const storyPlaces = places
    .filter((p) => p.cover_image_url && p.description)
    .slice(0, 3);

  if (storyPlaces.length < 2) return null;

  const stories = storyPlaces.map(deriveStory);
  const [featured, ...rest] = stories;

  return (
    <section className="mb-32">
      {/* ── Header ── */}
      <div className="discovery-header">
        <div>
          <div className="section-label-bar">
            <span className="label-micro">Editorial</span>
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 3vw, 30px)", color: "#D4D0C8" }}
          >
            Colombia en historias
          </h2>
        </div>
        <p
          className="hidden sm:block font-serif"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.28)",
            fontStyle: "italic",
            maxWidth: "220px",
            textAlign: "right",
            lineHeight: "1.6",
          }}
        >
          Lecturas sobre lugares que vale la pena conocer
        </p>
      </div>

      {/* ── Asymmetric editorial grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
        {/* Featured — 3 columns, full height */}
        <div className="md:col-span-3 magazine-featured">
          <FeaturedStory story={featured} />
        </div>

        {/* Two smaller stories — 2 columns, stacked */}
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
          {rest.slice(0, 2).map((story) => (
            <SmallStory key={story.place.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
