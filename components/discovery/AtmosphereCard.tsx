"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Place } from "@/lib/types";
import CardBadge from "@/components/ui/CardBadge";

interface AtmosphereCardProps {
  place: Place;
  editorialCopy?: string;
  momentTag?: string;
  heightClass?: string;
  isGem?: boolean;
}

function getEditorialCopy(description: string | null | undefined): string {
  if (!description) return "";
  const sentences = description.split(/\.\s+/);
  const first = sentences[0]?.trim() ?? "";
  return first.length > 110 ? first.slice(0, 107) + "…" : first;
}

export default function AtmosphereCard({
  place,
  editorialCopy,
  momentTag,
  heightClass = "h-[380px]",
  isGem = false,
}: AtmosphereCardProps) {
  const copy = editorialCopy ?? getEditorialCopy(place.description);
  const location = [place.neighborhood, place.city].filter(Boolean).join(" · ");

  // ── 3D tilt state ──────────────────────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);   // −1 → +1
      const dy = (e.clientY - cy) / (rect.height / 2);  // −1 → +1
      setTilt({ x: -dy * 8, y: dx * 8 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <Link href={`/places/${place.slug}`} className="block">
      {/* Tilt wrapper — perspective lives here */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          perspective: "900px",
          perspectiveOrigin: "center center",
          willChange: "transform",
        }}
      >
        <article
          className={`atmo-card card-rounded-lg relative overflow-hidden ${heightClass}`}
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.05)",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.025 : 1})`,
            transition: isHovered
              ? "transform 0.08s ease-out, box-shadow 0.3s ease"
              : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease",
            boxShadow: isHovered
              ? "0 24px 60px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4)"
              : "0 4px 20px rgba(0,0,0,0.3)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Image ── */}
          <div className="absolute inset-0 overflow-hidden card-rounded-lg">
            {place.cover_image_url ? (
              <Image
                src={place.cover_image_url}
                alt={place.name}
                fill
                className="object-cover"
                style={{
                  transform: isHovered
                    ? `scale(1.08) translate(${tilt.y * 0.4}px, ${-tilt.x * 0.4}px)`
                    : "scale(1) translate(0,0)",
                  transition: isHovered
                    ? "transform 0.12s ease-out"
                    : "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "#181818" }} />
            )}
          </div>

          {/* ── Overlay gradient — strong bottom for readability ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.28) 65%, transparent 100%)",
            }}
          />

          {/* ── Top row ── */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
            {location && (
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.70)",
                  fontWeight: 600,
                  fontFamily: "'Sora', system-ui, sans-serif",
                  textShadow: "0 1px 8px rgba(0,0,0,0.9)",
                }}
              >
                {location}
              </span>
            )}

            {isGem ? (
              <CardBadge
                label="Joya"
                variant="editorial"
                icon={
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                }
              />
            ) : momentTag ? (
              <CardBadge label={momentTag} variant="moment" />
            ) : null}
          </div>

          {/* ── Bottom content ── */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5"
            style={{
              padding: "20px 20px 18px",
            }}
          >
            {/* Name */}
            <h3
              className="font-serif text-white leading-tight"
              style={{
                fontSize: "clamp(17px, 2.2vw, 22px)",
                fontWeight: 700,
                textShadow: "0 1px 12px rgba(0,0,0,0.95), 0 2px 24px rgba(0,0,0,0.8)",
                letterSpacing: "-0.01em",
              }}
            >
              {place.name}
            </h3>

            {/* Editorial copy */}
            {copy && (
              <p
                style={{
                  fontSize: "12.5px",
                  lineHeight: "1.55",
                  color: "rgba(255,255,255,0.88)",
                  fontWeight: 400,
                  fontFamily: "'Sora', system-ui, sans-serif",
                  textShadow: "0 1px 10px rgba(0,0,0,0.95)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {copy}
              </p>
            )}

            {/* Metadata row */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                {place.price_level && (
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.12em",
                      color: "rgba(212,175,55,0.75)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      fontWeight: 600,
                      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                    }}
                  >
                    {place.price_level}
                  </span>
                )}
                {place.cuisine && (
                  <span
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.08em",
                      color: "rgba(255,255,255,0.52)",
                      fontFamily: "'Sora', system-ui, sans-serif",
                      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                    }}
                  >
                    {place.cuisine}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "#D4AF37",
                  fontFamily: "'Sora', system-ui, sans-serif",
                  textShadow: "0 1px 8px rgba(0,0,0,0.8)",
                }}
              >
                Quiero ir <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}
