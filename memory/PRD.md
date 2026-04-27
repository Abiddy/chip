# LENS Landing Page — PRD

## Original Problem Statement
Build a landing page for https://lenseda.com/ — LENS is a chip design verification company. Wants clean, startup-themed look. Hero like Ankar reference (image 2), section grid like image 3 (feature cards on dark bg). Subtle electronic chip themes in the background. Modern, cohesive.

## User Choices (verbatim)
1. Sections plan: yes (full)
2. Headline: "Verification, at silicon speed"
3. Accent color: b — Amber / orange (Ankar-style warm)
4. Backend: no (static landing only)
5. Content: pull real content from lenseda.com but make it better

## Architecture
- Frontend-only React + Tailwind + Shadcn (no backend)
- Single-page route `/` rendering `<Landing />`
- Sectioned components under `/app/frontend/src/components/`
- Custom dark theme (CSS variables) in `index.css`
- Playfair Display (serif headlines, italic accents) + Manrope (body) + JetBrains Mono (chip telemetry)

## Sections Implemented
1. **Nav** — Sticky, transparent → blurred on scroll, mobile hamburger, Lens chip-icon logo
2. **Hero** — Ankar-style: amber radial glow, corner frame box, circuit-pattern overlay, grain texture, big serif headline "Verification, at *silicon speed.*", CTA pair, live ticker (150× / 100% / ≤12nm)
3. **TrustedBy** — Marquee strip of 8 fictional silicon partners with edge-fade mask
4. **ProductIntro (ACE)** — Two-col sticky-left meta + right card with animated SVG chip-die visualization (live circuit traces, signal pulses, 12nm chip block)
5. **Features** — 8-card grid (sm:2 / lg:4) on dark with hover amber wash, lucide icons, sequential numbering
6. **HowItWorks** — 3-step workflow (Drop netlist → Run with intelligence → Tape out)
7. **Stats** — 4-stat board: 150× / 100% / 12nm / 0 false alarms
8. **CTA** — Big amber-glow "Stop waiting on *verification.*" with calendly + ROI links
9. **Footer** — 3-col link grid, status indicator, big letterform LENS anchor

## Design Decisions
- Background: `#050505` near-black (no gradients, no purple)
- Accent: `#ff8a3d` amber (Ankar warm) + `#ffb070` lighter italic
- Font sizing per H1 spec, italic accent used to break the line (Ankar pattern)
- Subtle SVG circuit pattern + grain texture for "subtle chip themes"
- Frame corner brackets in hero (Ankar reference detail)
- Reveal-up + reveal-fade staggered animations on hero
- Marquee partner strip with edge-fade mask
- Animated SVG circuit board in ProductIntro
- Hover micro-interactions on every card and button
- All interactive elements have unique `data-testid`

## What's Implemented (2026-04-27)
- All 9 sections rendering, responsive (mobile menu, grid collapses)
- External "Book a demo" → calendly.com/lenseda
- External "Calculate savings" → lenseda.com/ace-roi.html
- Smooth-scroll anchors for in-page nav
- Visual verification across all sections via screenshot

## What's NOT Implemented
- Working "Book a demo" form (user opted for static; calendly link instead)
- Backend API
- CMS / dynamic content
- Real customer logos (placeholders used)

## Prioritized Backlog
- **P1**: Replace fictional partner names with real LENS customer logos (when provided)
- **P1**: Add a real product screenshot/video instead of the SVG chip viz
- **P2**: Add a /pricing or /roi page wired to `lenseda.com/ace-roi.html`
- **P2**: Add testimonials / case-studies section
- **P3**: Lead-capture form with MongoDB persistence (if user changes mind)
- **P3**: Blog / changelog routes

## Next Action Items
- Get real customer logos and product visuals from user
- Decide on /resources or /blog content if needed
- Hook contact form to backend if desired
