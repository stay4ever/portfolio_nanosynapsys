# CLAUDE.md — Nano Synapsys Portfolio Site

## What this project is

**nano-synapsys.com** is the company portfolio site for Nano Synapsys — the mother company / product studio behind all products. It is a marketing + identity site, not an application.

- **Production URL**: https://www.nano-synapsys.com
- **GitHub**: https://github.com/stay4ever/nanoplasticity (repo reused, content replaced)
- **Production host**: Railway (GoDaddy DNS → Railway)
- **CI/CD**: Push to `main` → Railway auto-deploys

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (SSR mode) |
| Adapter | @astrojs/node (standalone) |
| CSS | Tailwind CSS v4 via @tailwindcss/vite |
| Fonts | Space Grotesk + Inter (Google Fonts) |
| Deploy | Railway (Nixpacks, Node 20+) |

---

## Common commands

```bash
npm install          # install deps
npm run dev          # dev server at localhost:4321
npm run build        # production build → dist/
npm start            # run prod server (Railway uses this)
```

---

## Project structure

```
src/
  content/
    config.ts                  # Blog collection schema (Astro Content Collections)
    blog/                      # Markdown blog posts
  layouts/
    Base.astro                 # HTML shell, nav, footer, meta
    BlogPost.astro             # Blog post layout
    LegalPage.astro            # KickWiz legal pages layout
  components/
    Nav.astro                  # Fixed top nav with scroll effect
    Footer.astro               # 4-col footer + social links
  pages/
    index.astro                # Homepage (Hero, Products, About, Blog, Contact)
    blog/
      index.astro              # Blog list
      [slug].astro             # Dynamic blog post (SSR, getCollection)
    kickwiz/
      terms.astro              # KickWiz Terms & Conditions (placeholder)
      privacy.astro            # KickWiz Privacy Policy (placeholder)
    api/
      contact.ts               # POST /api/contact — form handler
  styles/
    global.css                 # Full design system: tokens, components, animations
public/
  favicon.svg                  # NS gradient logo mark
  robots.txt
```

---

## Products showcased

| Product | URL | Accent colour |
|---|---|---|
| AI Evolution | ai-evolution.com.au | Cyan |
| AI Academy | ai-evolution.com.au/academy | Green |
| KickWiz | App Store (AFL prediction) | Amber |
| DeservePetGo | deservepetgo.com.au | Rose |
| Activ365 | iOS (Health & Fitness) | Emerald |

---

## KickWiz legal pages

- `/kickwiz/terms` — Terms & Conditions (placeholder, awaiting real text)
- `/kickwiz/privacy` — Privacy Policy (placeholder, awaiting real text)

Both pages are used for Apple App Store submission. Replace placeholder content inside each `.astro` file's `<slot>` with the actual policy text when ready.

---

## Contact form

`src/pages/api/contact.ts` — logs submissions to console. To wire up email:
- **Recommended**: [Resend](https://resend.com) — add `RESEND_API_KEY` env var to Railway
- See the TODO comments in `contact.ts` for exact code to uncomment

---

## Design system

All tokens and component styles in `src/styles/global.css`:
- `--violet` / `--cyan` / `--amber` — product accent colours
- `.gradient-text` — violet→cyan gradient on text
- `.fade-up` + `.visible` — Intersection Observer entrance animation
- `.btn-primary` / `.btn-secondary` — CTA buttons

---

## Railway deployment

- Builder: Nixpacks (auto-detects Node/npm)
- Build: `npm run build`
- Start: `npm start` → `HOST=0.0.0.0 node dist/server/entry.mjs`
- Healthcheck: `GET /`
- Env vars: none required (add `RESEND_API_KEY` when email is wired)

## GoDaddy DNS → Railway

1. In Railway: Projects → Add custom domain `www.nano-synapsys.com` → copy the CNAME target
2. In GoDaddy DNS: add `CNAME` record — Name: `www`, Value: `<railway>.railway.app`
3. Apex domain (`nano-synapsys.com`): use GoDaddy Domain Forwarding → forward to `www.nano-synapsys.com`

---

## Known decisions / gotchas

- `output: 'server'` — full SSR so the contact API endpoint works
- Blog slugs come from filenames automatically (Astro Content Collections v5)
- LinkedIn `href="#"` placeholder in `Footer.astro` and `index.astro` — update when profile is ready
- Email `hello@nano-synapsys.com` is a placeholder — update throughout when domain email is set up
