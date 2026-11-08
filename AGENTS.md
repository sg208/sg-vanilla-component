# AGENTS.md

- LEARNINGS: `.enggflo/learning.md` · append: `/enggflo-init "<mistake>"`

## Project

- PURPOSE: demo payment-option picker (Dutch bank list, amount editor) in plain JS with CSS-in-JS; no framework, no backend.
- STACK: vanilla JS (ES modules) · Vite 8 (multi-page, `root: src`) · Vitest 5 + jsdom · pnpm 10 · Node 24 (`.node-version`) · static output `dist/` · deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`, `pnpm run deploy`) at https://sg-vanilla-component.engg.app.
- CURRENT: version `0.2.1` (`package.json` `version`)
- BRANCHES: `develop` = work branch; `main` = default + release; `master` absent on origin (`git ls-remote --heads origin` → develop, main)
- BRANCH/PR: `feat/<slug>` · `chore/<slug>` merged into `develop` (`git log --merges`); release = `chore(release): vX` + `Merge branch 'develop' for vX`; no PR convention observed

## Commands

- `source ~/.nvm/nvm.sh && nvm use 24` — before any pnpm command
- `pnpm install` — install (lockfile `pnpm-lock.yaml`) · unverified (not run)
- `pnpm dev` — Vite dev server · unverified (not run)
- `pnpm build` — static build to `dist/` · unverified (not run)
- `pnpm preview` — serve `dist/` · unverified (not run)
- `pnpm format:check` — Prettier check (`pnpm format` rewrites; config `.prettierrc.json`, `.prettierignore`)
- `pnpm test` — Vitest suite (`tests/*.test.js`, jsdom) · verified 2026-11-08 (38 passed)
- `pnpm run deploy` — `pnpm build && wrangler deploy` → Cloudflare Worker (static assets from `dist/`) at https://sg-vanilla-component.engg.app; needs `wrangler` v4 (devDependency) + env `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (names only) <!-- enggflo -->

## Task routing

| task | read first | verify with |
|---|---|---|
| component markup / behaviour (`src/main.js`, `src/templates.js`) | `design.md` § Architecture, § Visual design | `pnpm test` |
| component styles / colour tokens (`src/component-styles.js`, `src/shared/theme.js`) | `design.md` § Visual design | `pnpm test` |
| page add/remove | `vite.config.js` `rollupOptions.input`, § Rules | `pnpm build` (unverified) |
| footer / legal pages (`src/shared/footer.js`, `src/shared/legal-page.js`) | `tests/footer.test.js`, `tests/pages.test.js` | `pnpm test` |
| deploy | § Commands `pnpm run deploy` | unverified (side effect) |
| human docs | `readme.md` (human-facing; enggflo edits facts only) | none |

- SKILLS/AGENTS/COMMANDS: none generated (`.enggflo/` holds learning + brain only)

## Rules

- No framework, no runtime dependencies; pnpm only (no npm/yarn lockfiles); component lives in `src/main.js` (+ `src/templates.js`, `src/component-styles.js`) (enforced_by: unverified).
- Fonts self-hosted only (`@fontsource-variable/manrope`, bundled by Vite); NEVER a font CDN. Every page script calls `mountTheme()` (`src/shared/theme.js`); every page has skip link → `<header>` → `<main id="main">` with one `h1` (`tests/pages.test.js`).
- Pages: `src/index.html` → `src/main.js` (`#app`), `src/result/` (`#sgvc-result`), `src/about/` (`#sgvc-about`), plain-HTML `src/accessibility/`, `src/privacy/`, `src/terms/` (→ `src/shared/legal-page.js`); each listed in `vite.config.js` `rollupOptions.input`.
- Footer: `src/shared/footer.js:72` `mountFooter()`, called by every page script; links Home · Accessibility · Privacy · Terms + one GitHub icon link to the repo (`REPO_URL`, `src/shared/footer.js:4`).
- Hosting: Cloudflare Worker only (`wrangler.jsonc`, custom domain `sg-vanilla-component.engg.app`, `workers_dev: false`). Vercel · Netlify · Railway · Cloudflare Pages · engg.me = retired; NEVER reintroduce config for them. <!-- enggflo -->
- Docs: `design.md` (architecture) · `conventions.md` (implicit style). <!-- enggflo -->

## Architecture

- `src/main.js:8` — `sgvc({ targetEl, colors, data, enableCloseOutsideElement, formMethod })` renders markup + scoped styles into `targetEl`; demo bank data in `src/demo-data.js`; the calls sit at the file end. Visual design: `design.md` § Visual design.
- `vite.config.js` — `root: src`, `outDir: dist`, six HTML inputs.
- `vitest.config.js` — jsdom env, `tests/**/*.test.js`; tests re-import `src/main.js` per case (`vi.resetModules`) since it self-invokes on import (`src/main.js`, end of file).
- CI/CD: none (`.github/`, `.husky/` absent); merges ungated; deploy is manual `pnpm run deploy`.
- Layout map:

| concept | path |
|---|---|
| component | `src/main.js`, `src/templates.js`, `src/component-styles.js`, `src/summary.js` |
| shared (theme, footer, legal) | `src/shared/` |
| pages | `src/index.html`, `src/result/`, `src/about/`, `src/accessibility/`, `src/privacy/`, `src/terms/` |
| static assets | `src/public/` → `dist/` |
| tests | `tests/*.test.js` |
| build / test / deploy config | `vite.config.js`, `vitest.config.js`, `wrangler.jsonc` |
| enggflo local state | `.enggflo/` (gitignored, `.gitignore:31`) |

## Test profile

| field | value |
|---|---|
| runner | Vitest 5 + jsdom (`vitest.config.js`) |
| command | `pnpm test` |
| levels | unit ✓ (DOM, `tests/main.test.js`, `tests/footer.test.js`, `tests/pages.test.js`) · integration ✗ · e2e ✗ |
| enforced_by | unverified — no CI workflows (`.github/` absent) and no git hook (`.husky/` absent); `pnpm test` gates nothing |

## Gotchas

- `src/main.js:279` — module calls `sgvc(...)` on import; tests re-import per case (`tests/main.test.js:4` `vi.resetModules`)
- `src/main.js:13` — component default `formMethod = "POST"`; demo passes `"GET"` (`src/main.js:279`); POST → 405 on static assets (`src/main.js:276`)
- `vite.config.js` `rollupOptions.input` — a page missing here is not emitted to `dist/`
- `wrangler.jsonc` `assets.not_found_handling: "none"` — no 404 page is built
- `src/shared/footer.js:4` — `REPO_URL` hardcoded to `sg208/sg-vanilla-component`
- `.gitignore:31` — `.enggflo/` ignored; `.enggflo/brain.md` expected committed → NEEDS_DECISION (see `.enggflo/brain.md` Open threads)

## License

- MIT · `LICENSE` · `package.json` `license`

## References <!-- enggflo -->

- vite — https://vite.dev/llms.txt (llms.txt)
- vitest — https://vitest.dev/llms.txt (llms.txt)
- @fontsource-variable/manrope — https://fontsource.org/llms.txt (llms.txt)
