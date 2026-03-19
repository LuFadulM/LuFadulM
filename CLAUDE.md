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

## Design Tokens
- Background: `#0A0A0A`
- Cards: `#141414`
- Coral (brand): `#E2725B`
- Teal: `#3CC9AD`
- Gold: `#D4A03C`
- Text: `#F2EDE8`, Muted: `#908B83`

## Commands
- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — lint code
