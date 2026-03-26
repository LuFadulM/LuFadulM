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
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <div className="relative">
        {/* Search icon — decorative */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#888888" }}
          aria-hidden="true"
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

        <label htmlFor="site-search" className="sr-only">
          Buscar lugares en Colombia
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full text-text placeholder-text-tertiary focus:outline-none transition-all duration-200"
          style={{
            paddingLeft: large ? "52px" : "44px",
            paddingRight: "20px",
            paddingTop: large ? "18px" : "12px",
            paddingBottom: large ? "18px" : "12px",
            fontSize: large ? "15px" : "13px",
            fontWeight: 300,
            letterSpacing: "0.02em",
            background: "#141413",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: large ? "8px" : "6px",
            color: "#F0EDE6",
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
            style={{ color: "#888888" }}
            aria-label="Limpiar búsqueda"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
