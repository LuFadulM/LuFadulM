# descubre

**Discover Colombia's best places.**

A dark editorial platform for exploring restaurants, cafés, bars, hotels, and attractions across Colombia's major cities and tourist destinations. Built with Next.js 14, Supabase, and Tailwind CSS.

---

## Features

- **Browse & filter** places by city, category, price, and rating
- **33 curated places** across 16 Colombian cities — from Bogotá and Medellín to Salento, Barichara, and the Amazon
- **Place detail pages** with descriptions, hours, contact info, and reviews
- **User auth** — sign up, log in, and log out via Supabase Auth with email confirmation
- **Save places** — authenticated users can bookmark favorites
- **Write reviews** — leave star ratings and text reviews on any place
- **City pages** — dedicated pages for each city with search and category filters
- **Responsive design** — works on mobile, tablet, and desktop
- **Dark editorial aesthetic** — coral, teal, and gold accents on a near-black background

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Backend / Auth | Supabase |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd descubre
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

In the Supabase SQL editor, run the following files **in order**:

```
supabase/schema.sql   — creates tables, RLS policies, and triggers
supabase/seed.sql     — inserts 16 sample places
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
descubre/
├── app/
│   ├── auth/
│   │   ├── callback/        # Supabase email confirmation handler
│   │   ├── login/           # Login page
│   │   └── signup/          # Sign up page
│   ├── city/[city]/         # City filter pages
│   ├── data/places.ts       # Mock data (16 places, used as fallback)
│   ├── places/[slug]/       # Place detail pages
│   ├── profile/             # User profile (auth-gated)
│   ├── saved/               # Saved places (auth-gated)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx             # Homepage
├── components/
│   ├── layout/              # Header, Footer, MobileMenu
│   ├── places/              # PlaceCard, PlaceGrid, FeaturedSection, PlaceDetail
│   ├── reviews/             # StarRating, ReviewCard, ReviewList, WriteReview
│   ├── search/              # SearchBar, FilterBar, CategoryPills
│   └── ui/                  # Button, Badge, Pill, Modal
├── hooks/
│   ├── usePlaces.ts         # Place filtering logic
│   ├── useReviews.ts        # Reviews CRUD (Supabase)
│   └── useSavedPlaces.ts    # Save/unsave places (Supabase)
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser Supabase client
│   │   ├── server.ts        # Server Component Supabase client
│   │   └── middleware.ts    # Session refresh middleware
│   ├── types.ts             # Shared TypeScript types
│   └── utils.ts             # Formatting helpers
├── middleware.ts             # Auth session middleware
└── supabase/
    ├── schema.sql
    └── seed.sql
```

---

## Cities Covered

**Principal cities**
Bogotá · Medellín · Cali · Barranquilla · Bucaramanga · Manizales · Pereira

**Caribbean coast**
Cartagena · Santa Marta · San Andrés

**Tourist destinations**
Salento · Villa de Leyva · Popayán · Barichara · San Gil · Leticia

---

## Database Schema

| Table | Description |
|---|---|
| `profiles` | User profiles, auto-created on signup |
| `places` | Places with location, category, and rating fields |
| `reviews` | Star ratings and text reviews per place |
| `helpful_votes` | One vote per user per review |
| `saved_places` | Bookmarked places per user |

Row Level Security is enabled on all tables. Users can only modify their own data.

---

## Design Tokens

| Token | Value | Use |
|---|---|---|
| Background | `#0A0A0A` | Page background |
| Card | `#141414` | Card backgrounds |
| Coral | `#E2725B` | Brand / primary accent |
| Teal | `#3CC9AD` | Secondary accent |
| Gold | `#D4A03C` | Star ratings |
| Text | `#F2EDE8` | Body text |
| Muted | `#908B83` | Secondary text |

Fonts: **Instrument Serif** (headings) · **Outfit** (body)

---

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Deployment

The app is deployed on **Vercel** with Supabase connected via the Vercel integration. Environment variables are injected automatically.

To deploy your own instance:

1. Push to GitHub
2. Import the repo in Vercel
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel environment variables
4. Set the Supabase Auth redirect URL to `https://your-domain.vercel.app/auth/callback`

---

## Contributing

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and commit with a clear message
3. Push and open a pull request
