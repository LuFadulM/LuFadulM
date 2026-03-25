"use client";

import React from "react";

interface EditorialBreakProps {
  quote: string;
  sub?: string;
}

export default function EditorialBreak({ quote, sub }: EditorialBreakProps) {
  return (
    <div
      className="mb-32"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.04)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        padding: "72px 0",
        textAlign: "center",
      }}
    >
      {/* Gold rule */}
      <div
        style={{
          width: "32px",
          height: "1px",
          background: "rgba(212,175,55,0.40)",
          margin: "0 auto 36px",
        }}
      />

      {/* Quote */}
      <p
        className="font-serif"
        style={{
          fontSize: "clamp(18px, 2.8vw, 26px)",
          color: "rgba(242,237,232,0.68)",
          fontStyle: "italic",
          fontWeight: 400,
          maxWidth: "560px",
          margin: "0 auto",
          lineHeight: "1.5",
          letterSpacing: "0.005em",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      {sub && (
        <p
          style={{
            fontSize: "8px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(212,175,55,0.50)",
            fontFamily: "'Sora', system-ui, sans-serif",
            fontWeight: 600,
            marginTop: "20px",
          }}
        >
          {sub}
        </p>
      )}

      {/* Gold rule */}
      <div
        style={{
          width: "32px",
          height: "1px",
          background: "rgba(212,175,55,0.40)",
          margin: "36px auto 0",
        }}
      />
    </div>
  );
}
