"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Pill({ label, active = false, onClick, className }: PillProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn("transition-all duration-200 whitespace-nowrap", className)}
      style={{
        padding: "0.4375rem 1rem",
        fontSize: "var(--text-micro)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: 500,
        fontFamily: "var(--font-sans)",
        background: active ? "var(--gold)" : "transparent",
        border: active ? "1px solid var(--gold)" : "1px solid var(--border)",
        borderRadius: "var(--radius-pill)",
        color: active ? "var(--bg)" : "var(--text-secondary)",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
