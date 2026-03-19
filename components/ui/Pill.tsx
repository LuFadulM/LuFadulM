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
      className={cn(
        "inline-flex items-center px-4 py-1.5 rounded-pill text-sm font-medium transition-all duration-200 whitespace-nowrap border",
        active
          ? "bg-coral text-white border-coral"
          : "bg-transparent text-text-muted border-[rgba(242,237,232,0.14)] hover:border-[rgba(242,237,232,0.3)] hover:text-text",
        className
      )}
    >
      {label}
    </button>
  );
}
