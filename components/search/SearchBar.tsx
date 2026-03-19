"use client";

import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  large?: boolean;
}

export default function SearchBar({
  placeholder = "Search places, cities, cuisines...",
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
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim">
          <svg
            width={large ? 22 : 18}
            height={large ? 22 : 18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
          className={`
            w-full bg-bg-card border border-[rgba(242,237,232,0.07)]
            rounded-btn text-text placeholder-text-dim
            focus:outline-none focus:border-coral transition-colors
            ${large ? "pl-12 pr-5 py-4 text-base" : "pl-10 pr-4 py-2.5 text-sm"}
          `}
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              onSearch?.("");
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors"
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
