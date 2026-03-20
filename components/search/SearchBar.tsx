"use client";

import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  large?: boolean;
}

export default function SearchBar({
  placeholder = "Busca lugares, cocinas, experiencias...",
  onSearch,
  defaultValue = "",
  large = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        {/* Search icon */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#4A4843" }}
        >
          <svg
            width={large ? 18 : 16}
            height={large ? 18 : 16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-bg-card border border-[rgba(255,255,255,0.06)] text-text placeholder-text-tertiary focus:outline-none focus-gold transition-all duration-200"
          style={{
            paddingLeft: large ? "52px" : "44px",
            paddingRight: "20px",
            paddingTop: large ? "18px" : "12px",
            paddingBottom: large ? "18px" : "12px",
            fontSize: large ? "15px" : "13px",
            fontWeight: 300,
            letterSpacing: "0.02em",
          }}
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch?.("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
            style={{ color: "#4A4843" }}
            aria-label="Limpiar búsqueda"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
