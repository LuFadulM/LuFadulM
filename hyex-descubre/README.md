# hyex — Descubre Colombia

A dark editorial static website for discovering Colombia's best places: restaurants, cafés, bars, hotels, and attractions across 6 cities.

## Structure

```
hyex-descubre/
├── index.html          — Landing page (hero, featured, cities, magazine)
├── about.html          — Manifesto and how-it-works
├── explorar.html       — Search + filter + full place grid
├── ciudad.html         — City template (Bogotá example)
├── lugar.html          — Place detail (Café Velvet example)
└── assets/
    ├── css/
    │   ├── globals.css     — Design tokens, CSS variables, base resets
    │   ├── nav.css         — Navigation bar + mobile menu
    │   ├── hero.css        — Hero sections, stat pills, scroll indicator
    │   ├── cards.css       — Place cards, city cards, magazine cards
    │   ├── about.css       — Manifesto layout, team section, process steps
    │   └── animations.css  — Scroll reveals, parallax, magnetic buttons
    └── js/
        ├── nav.js          — Scroll-aware nav, mobile menu toggle
        ├── parallax.js     — rAF parallax + magnetic button effect
        ├── scroll-fx.js    — IntersectionObserver reveal + stagger + counters
        └── search.js       — Live search, category filter, city filter
```

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0a0909` | Page background |
| `--bg-muted` | `#141210` | Alternate section bg |
| `--gold` | `#c9a84c` | Brand accent, CTAs |
| `--gold-dim` | `#b1987c` | Labels, secondary accents |
| `--cream` | `#f0ede6` | Primary text |
| `--cream-50` | `rgba(240,237,230,0.5)` | Muted text |
| `--card-bg` | `#2a2925` | Card backgrounds |

Fonts: **Playfair Display** (serif, headings) + **Sora** (sans, body)

## Running Locally

No build step required — open any `.html` file directly in a browser, or serve with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# VS Code
# Use the Live Server extension
```

Then open `http://localhost:8080` in your browser.

## Design Decisions

- **Zero frameworks** — vanilla HTML5, CSS3, JS (ES2020). No dependencies.
- **CSS custom properties** for all colors — no hardcoded hex values in component CSS.
- **`border-radius: 0`** globally — sharp edges are core to the editorial aesthetic.
- **`data-reveal` + IntersectionObserver** — scroll animations without libraries.
- **`data-parallax`** — performant parallax via `requestAnimationFrame` + `transform: translateY`.
- **Magnetic buttons** — subtle cursor-tracking effect on `.magnetic` elements using `mousemove`.
- **`prefers-reduced-motion`** — all animations disabled automatically for accessibility.
- **No images** — placeholder divs with `--card-bg` background. Replace with real `<img>` tags.

## Extending

To add a real place, copy a card in `explorar.html` and update:
- `data-category` → one of: `restaurantes`, `cafes`, `bares`, `hoteles`, `atracciones`
- `data-city` → one of: `bogota`, `medellin`, `cartagena`, `cali`, `barranquilla`, `santa-marta`
- Card content: name, city, description, rating

The JS search/filter reads these `data-*` attributes automatically.
