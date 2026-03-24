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
      className={cn("transition-all duration-200 whitespace-nowrap border", className)}
      style={{
        padding: "6px 16px",
        fontSize: "10px",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        fontWeight: active ? 600 : 500,
        background: active ? "rgba(200,164,78,0.08)" : "transparent",
        borderColor: active ? "rgba(200,164,78,0.3)" : "rgba(255,255,255,0.06)",
        color: active ? "#C8A44E" : "#706D64",
      }}
    >
      {label}
    </button>
  );
}
