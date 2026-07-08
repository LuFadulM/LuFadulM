"use client";

import React, { useEffect, useState, useCallback } from "react";

interface SectionConfig {
  id: string;
  label: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero",         label: "Inicio" },
  { id: "hoy",          label: "Hoy" },
  { id: "featured",     label: "Destacados" },
  { id: "spotlight",    label: "En Foco" },
  { id: "experiencias", label: "Experiencias" },
  { id: "joyas",        label: "Joyas" },
  { id: "planes",       label: "Planes" },
  { id: "magazine",     label: "Magazine" },
  { id: "explore",      label: "Explorar" },
];

export default function SectionDots() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setVisible(scrollY > 80);

    // Find which section is most in view
    let currentActive = "hero";
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5) {
        currentActive = id;
      }
    }
    setActive(currentActive);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        right: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            style={{
              width: isActive ? "6px" : "4px",
              height: isActive ? "24px" : "4px",
              borderRadius: "3px",
              background: isActive
                ? "#D98D72"
                : "rgba(223,220,213,0.28)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.35s cubic-bezier(0.2,0,0.2,1)",
              flexShrink: 0,
            }}
          />
        );
      })}
    </div>
  );
}
