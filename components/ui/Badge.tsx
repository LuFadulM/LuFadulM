import React from "react";
import { cn } from "@/lib/utils";

type BadgeColor = "coral" | "teal" | "gold" | "neutral";

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  className?: string;
}

const colorClasses: Record<BadgeColor, string> = {
  coral: "bg-coral/20 text-coral border-coral/30",
  teal: "bg-teal/20 text-teal border-teal/30",
  gold: "bg-gold/20 text-gold border-gold/30",
  neutral: "bg-bg-surface text-text-muted border-[rgba(242,237,232,0.14)]",
};

export default function Badge({ label, color = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        colorClasses[color],
        className
      )}
    >
      {label}
    </span>
  );
}
