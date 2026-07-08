# descubre — Colombia Discovery Platform

## Overview
Descubre is a dark editorial platform for discovering Colombia's best places: restaurants, cafés, bars, hotels, and attractions across all major cities.

## Tech Stack
- **Next.js 14** App Router
- **TypeScript** (strict mode)
- **Tailwind CSS** with custom design tokens
- **Supabase** for auth, database, and storage
- **React Hook Form + Zod** for form validation

## Getting Started
1. Copy `.env.local.example` to `.env.local` and fill in Supabase credentials
2. Run `npm install`
3. Run the SQL in `supabase/schema.sql` against your Supabase project
4. Run the SQL in `supabase/seed.sql` to populate sample data
5. Run `npm run dev`

## Design Tokens — "Esmeralda" theme
The palette is defined as CSS custom properties in `app/globals.css` (mirrored in `tailwind.config.ts`). Always use the variables, never raw hex.
- Background: `--bg: #07120D` (jungle green-black); surfaces `#0C1912` / `#12241B`
- Primary accent (emerald): `--gold: #3DDC97` — the variable is named `--gold` for historical reasons
- Accent on light backgrounds: `--accent-deep: #0E7A5C`
- Secondary accent (coral, Cartagena): `--coral: #E8785A`
- Light break sections: `--warm-break: #EAF1E9`, paper `#EFF4EE`, ink `#0D1B14`
- Text: `--text-primary: #EFF4EE`, secondary/muted are rgba(236,243,238,…)
- Radii: 0 everywhere except pills (`--radius-pill: 100px`) — enforced globally

## Commands
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — lint code
