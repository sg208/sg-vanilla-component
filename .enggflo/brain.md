# Brain

PURPOSE: decisions · context · open threads not derivable from code.
UPDATE: per `brain.md` in the enggflo skill; NEVER delete Decisions.

## Decisions

- 2026-10-31 — `main` created from `master` and set as default; `develop` created from `main`. WHY: main/develop branch model. REJECTED: delete `master` — kept for safety. SOURCE: public repo sweep

- 2026-10-31 — Switch npm → pnpm 10; upgrade Vite 2 → 8, Node 16 → 24; add Vitest + jsdom suite; MIT license. WHY: 5 high advisories in Vite 2 chain (`npm audit`). REJECTED: `npm audit fix` — leaves rollup/esbuild advisories. SOURCE: `.done/`
- 2026-11-01 — Host on a Cloudflare Worker with static assets at sg-vanilla-component.engg.app (`wrangler.jsonc`, `pnpm run deploy`). WHY: single host for public demos. REJECTED: Vercel · Netlify · Railway · Cloudflare Pages · engg.me — retired. SOURCE: `wrangler.jsonc`

- 2026-11-01 — Add Accessibility, Privacy, Terms pages + shared footer linking them and the GitHub repo. WHY: public site needs legal pages. SOURCE: `src/shared/footer.js:3`

## Context

- Hosting: Cloudflare Worker with static assets (`wrangler.jsonc`) at sg-vanilla-component.engg.app; deploy `pnpm run deploy`.
- Retired hosts (any claim the site runs there = wrong): Vercel · Netlify · Railway · Cloudflare Pages · engg.me.
- Deploy env (names only): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; global `wrangler` v4.
- Demo only: bank logos load from `portal.bp.nu`; form posts to `<page>/result`, a static sample page.

## Open threads

- `master` branch still exists on origin; delete once `main` is confirmed.
- Pin policy (exact vs `^` + lockfile) → `.backlog/2026-10-31-1349-pin-floating-ranges.md`.
