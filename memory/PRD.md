# Yousuf Hakim — Premium Portfolio (PRD)

## Original Problem Statement
Premium portfolio site for freelance Video Editor & Motion Designer "Yousuf Hakim". Cinematic G1-Visuals feel + Wise-Design SaaS precision. Single-page scroll + separate Contact page. Dark theme default with light toggle (accents: dark=#163300, light=#9FE870). Headline: "Turning raw clips into mini masterpieces." No fake metrics/testimonials.

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + Lenis smooth scroll, Shadcn UI accordion/sonner.
- Backend: FastAPI + MongoDB (Motor), `/api`-prefixed routes.
- Routing: `/` (Home single-page) and `/contact` (separate page) with AnimatePresence transitions.

## Personas
- Creators, businesses, personal brands evaluating a long-form editor.

## Core Requirements (Static)
- Premium minimalist aesthetic, no clutter, no fake social proof.
- Dark/Light theme toggle (default dark).
- Hero, About, Hall of Fame, Process, Pricing (custom), FAQ, Contact form.
- Magnetic CTAs, smooth scroll, fade reveals, hover video previews.

## Implemented (2026-05-14)
- Hero with split-word entrance animation, sticky nav CTA, scroll indicator, grid+noise bg, soft accent glow.
- About, 4-card Portfolio with hover video previews, 3-step Process, single Custom Pricing card with includes, 6-item FAQ accordion, Footer.
- Theme toggle (Sun/Moon), persisted in localStorage.
- Lenis smooth scrolling.
- Separate `/contact` page with form (name, email, project type, budget, message) and direct channels (Email, WhatsApp, Discord, Instagram) using placeholder values.
- Backend: `POST /api/contact`, `GET /api/contact`, persists to `contact_submissions` collection. No email sending.
- Verified by testing agent: 100% backend, 100% frontend.

## Backlog (Prioritized)
- P0: Replace placeholder contact details (email/WhatsApp/Discord/Instagram) with real values once user provides them.
- P0: Swap placeholder portfolio videos/posters with real Yousuf Hakim work.
- P1: Add email-notification service (Resend/SendGrid) once a key is available.
- P1: Add basic SEO (title, meta, OpenGraph image).
- P1: Add `prefers-reduced-motion` guards on Lenis and reveal animations.
- P2: Optional admin route to list submissions behind a token.
- P2: Add a "Now / Currently editing" status strip.

## Next Tasks
- Collect real contact info + portfolio assets from user and swap in.
