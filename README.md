# StockReclaim — marketing site, help center & changelog

The public-facing site for StockReclaim: landing page, pricing, help center,
public changelog ("What's new"), feature-request board, and support/contact.

**This is NOT the embedded Shopify app.** The admin app (in `../restock-radar`)
is Polaris-only and lives on Fly. This site is where the brand applies *in full*
(see `../brand/BRAND-GUIDELINES.md`). The two never share chrome.

Built with [Astro](https://astro.build) — static output, no server, cheap to
host anywhere.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site → dist/
npm run preview    # serve the built dist/
```

Node 20+.

## What's here

```
src/
  site.config.ts        Links, contact emails, feature-board config (edit this first)
  styles/global.css     Brand tokens + full type/layout system
  layouts/
    Base.astro          HTML shell, header, footer, SEO/OG meta
    Doc.astro           Help-article layout
  components/           Header, Footer (brand lockup, nav)
  content/
    config.ts           Content-collection schemas (help, changelog)
    help/*.md            Help articles — add a file to publish one
    changelog/*.md       Release notes — add a file to publish an entry
  pages/
    index.astro         Landing
    pricing.astro       Full plan comparison
    help/               Help center index + [...slug] article route
    changelog/          "What's new" + feed.json (machine-readable)
    feature-requests.astro
    support.astro
    404.astro
```

## Before launch — the checklist

1. **`src/site.config.ts`** — set the real values:
   - `appStoreUrl` once the app is listed (install CTAs switch from waitlist to install automatically).
   - `supportEmail` / `helloEmail`.
   - `featureBoard` — see below.
2. **Feature-request board.** Hybrid decision: use a proven tool, don't build one.
   - **Featurebase** (recommended, free tier): set `featureBoard.featurebaseOrg`
     to your slug → the board embeds inline on `/feature-requests/`.
   - Or set `featureBoard.portalUrl` to link out to any board (Canny, Fider, etc.).
   - With neither set, the page falls back to an email CTA so it still works.
3. **Support form.** `src/pages/support.astro` has a static contact form. Point its
   `action` at a no-backend form service (Formspree / Web3Forms / Basin), or drop
   in a helpdesk widget (Crisp / Chatwoot). Until then it falls back to `mailto:`.
4. **Domain + deploy.** Set `SITE_URL` and deploy `dist/` (see below).

## Adding content

**A help article** — create `src/content/help/<slug>.md`:

```yaml
---
title: Your title
summary: One line for the index and meta description.
category: Getting started      # or How the audit works / Plans & billing / Data & privacy
order: 5                        # position within the category
updated: 2026-09-01
---
Markdown body…
```

**A changelog entry** — create `src/content/changelog/<date>-<slug>.md`:

```yaml
---
title: What shipped
date: 2026-09-01
tag: New                        # New | Improved | Fixed
plan: Growth                    # optional: All plans | Starter | Growth
banner: "Short merchant-facing line — reused by the in-app banner + email."
---
Longer note…
```

## Notifications — one release, three surfaces

A release is announced in three places. Keep them in sync:

| Surface | Where | Source |
| --- | --- | --- |
| **Public changelog** | this site, `/changelog/` | `src/content/changelog/*.md` |
| **Machine feed** | `/changelog/feed.json` | same markdown, as JSON |
| **In-app banner** | the embedded admin (Polaris `s-banner`) | `../restock-radar/app/lib/announcements.ts` |
| **Email** | Resend broadcast | same `announcements.ts`, via `npm run announce` in the app |

When you ship: add the changelog markdown here, then mirror the newest `banner:`
line into the app's `announcements.ts` (newest first — its `id` **must** equal
this site's changelog slug so deep links and dismissals line up). To email it:

```bash
# in ../restock-radar, on the machine with the secrets (Fly)
npm run announce -- <announcement-id>              # dry run: who would get it
npm run announce -- <announcement-id> --send       # send to opted-in shops
```

(Upgrade path for zero drift: have the app's worker fetch this site's
`/changelog/feed.json` on a schedule and cache the latest banner, instead of the
hand-mirrored list.)

## Deploy

Static output, so any static host works:

- **Cloudflare Pages / Netlify:** build `npm run build`, publish `dist/`.
- **Fly (static):** serve `dist/` behind any static server image.

Set `SITE_URL` (e.g. `https://getstockreclaim.com`) at build time — it feeds the
sitemap, canonical URLs and the changelog feed's absolute links.
