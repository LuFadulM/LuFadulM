import React from "react";
import type { DateRange } from "@/lib/supabase/analytics-queries";

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: "7d",  label: "7 días" },
  { value: "30d", label: "30 días" },
  { value: "90d", label: "90 días" },
  { value: "all", label: "Todo" },
];

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export default function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
      {OPTIONS.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              fontSize: "9px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              background: active ? "#C8A44E" : "#111110",
              color: active ? "#0A0A09" : "#4A4843",
              transition: "background 0.15s, color 0.15s",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
