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
        background: active ? "rgba(198,168,92,0.10)" : "transparent",
        borderColor: active ? "rgba(198,168,92,0.35)" : "rgba(0,0,0,0.10)",
        color: active ? "#C6A85C" : "#6A6A6A",
      }}
    >
      {label}
    </button>
  );
}
