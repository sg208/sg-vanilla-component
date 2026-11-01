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
- Deploy env (names only): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; `wrangler` v4 (devDependency).
- Demo only: banks show lettered marks (`portal.bp.nu` logo host is dead); demo form submits with GET (`formMethod`) to `/result/`, a static sample page, because static assets answer POST with 405. Component default stays POST.

## Open threads

- `master` branch still exists on origin; delete once `main` is confirmed.
- Pin policy (exact vs `^` + lockfile) → `.backlog/2026-10-31-1349-pin-floating-ranges.md`.
- Deferred lows (release v0.2.0 review, 2026-11-01): wrangler devDependency tree incl. beta `miniflare` + install scripts (`package.json`, sec); fontsource pin/advisory check (sec); listbox has no type-ahead (`src/main.js`); px type sizes ignore browser font size (`src/shared/theme.js`); Continue appears without announcement (`src/main.js`); empty `#sgvc-bill` section with dangling `aria-labelledby` when `isError` (`src/index.html`); `summary.js` re-defaults locale/currency apart from `main.js`.
