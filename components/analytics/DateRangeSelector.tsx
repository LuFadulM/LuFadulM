"use client";

import React from "react";
import { daysAgo, ANALYTICS_END_DATE, ANALYTICS_START_DATE } from "@/lib/supabase/analytics-queries";

const PRESETS = [
  { label: "7 días",  days: 7 },
  { label: "30 días", days: 30 },
  { label: "90 días", days: 90 },
  { label: "Todo",    days: 0 },
] as const;

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}

const INPUT_STYLE: React.CSSProperties = {
  background: "#0F1B15",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#CBD6CE",
  fontSize: "11px",
  fontFamily: "'Sora', system-ui, sans-serif",
  padding: "7px 10px",
  outline: "none",
  width: "120px",
  colorScheme: "dark",
};

export default function DateRangeSelector({ startDate, endDate, onChange }: DateRangeSelectorProps) {
  function applyPreset(days: number) {
    if (days === 0) {
      onChange(ANALYTICS_START_DATE, ANALYTICS_END_DATE);
    } else {
      onChange(daysAgo(days, ANALYTICS_END_DATE), ANALYTICS_END_DATE);
    }
  }

  function activePreset(): number | null {
    for (const p of PRESETS) {
      if (p.days === 0) {
        if (startDate === ANALYTICS_START_DATE && endDate === ANALYTICS_END_DATE) return 0;
      } else {
        if (startDate === daysAgo(p.days, ANALYTICS_END_DATE) && endDate === ANALYTICS_END_DATE) return p.days;
      }
    }
    return null; // custom range
  }

  const active = activePreset();

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Date inputs */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          style={INPUT_STYLE}
        />
        <span style={{ color: "#2A3A31", fontSize: "11px" }}>→</span>
        <input
          type="date"
          value={endDate}
          min={startDate}
          max={ANALYTICS_END_DATE}
          onChange={(e) => onChange(startDate, e.target.value)}
          style={INPUT_STYLE}
        />
      </div>

      {/* Preset pills */}
      <div className="flex gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
        {PRESETS.map((p) => {
          const isActive = active === p.days;
          return (
            <button
              key={p.label}
              onClick={() => applyPreset(p.days)}
              style={{
                fontSize: "9px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "7px 14px",
                border: "none",
                cursor: "pointer",
                background: isActive ? "#3DDC97" : "#0F1B15",
                color: isActive ? "#08130E" : "#3A4A41",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
