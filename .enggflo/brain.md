# Brain

PURPOSE: decisions · context · open threads not derivable from code.
UPDATE: per `brain.md` in the enggflo skill; NEVER delete Decisions.

## Decisions

- 2026-10-31 — `main` created from `master` and set as default; `develop` created from `main`. WHY: main/develop branch model. REJECTED: delete `master` — kept for safety. SOURCE: public repo sweep

- 2026-10-31 — Switch npm → pnpm 10; upgrade Vite 2 → 8, Node 16 → 24; add Vitest + jsdom suite; MIT license. WHY: 5 high advisories in Vite 2 chain (`npm audit`). REJECTED: `npm audit fix` — leaves rollup/esbuild advisories. SOURCE: `.done/`

## Context

- Demo only: bank logos load from `portal.bp.nu`; form posts to `<page>/result`, a static sample page.

## Open threads

- `master` branch still exists on origin; delete once `main` is confirmed.
- Cloudflare Pages project build settings live in the dashboard: build command must change from `npm run build` to `pnpm build`, Node `24` (not verifiable from repo).
- Pin policy (exact vs `^` + lockfile) → `.backlog/2026-10-31-1349-pin-floating-ranges.md`.
