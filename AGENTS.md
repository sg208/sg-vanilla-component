# AGENTS.md

- LEARNINGS: `.enggflo/learning.md` · append: `/enggflo-init "<mistake>"`

## Project

- PURPOSE: demo payment-option picker (Dutch bank list, amount editor) in plain JS with CSS-in-JS; no framework, no backend.
- STACK: vanilla JS (ES modules) · Vite 8 (multi-page, `root: src`) · Vitest 5 + jsdom · pnpm 10 · Node 24 (`.node-version`) · static output `dist/` · deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`, `pnpm run deploy`) at https://sg-vanilla-component.engg.app.
- Branches: `develop` = work branch; `main` = default + release; `master` = legacy, kept.

## Commands

- `source ~/.nvm/nvm.sh && nvm use 24` — before any pnpm command
- `pnpm install` — install (lockfile `pnpm-lock.yaml`)
- `pnpm dev` — Vite dev server
- `pnpm build` — static build to `dist/`
- `pnpm preview` — serve `dist/`
- `pnpm test` — Vitest suite (`tests/*.test.js`, jsdom)
- `pnpm run deploy` — `pnpm build && wrangler deploy` → Cloudflare Worker (static assets from `dist/`) at https://sg-vanilla-component.engg.app; needs `wrangler` v4 (devDependency) + env `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (names only) <!-- enggflo -->

## Rules

- No framework, no runtime dependencies; pnpm only (no npm/yarn lockfiles); component lives in `src/main.js` (+ `src/templates.js`, `src/component-styles.js`) (enforced_by: unverified).
- Fonts self-hosted only (`@fontsource-variable/manrope`, bundled by Vite); NEVER a font CDN. Every page script calls `mountTheme()` (`src/shared/theme.js`); every page has skip link → `<header>` → `<main id="main">` with one `h1` (`tests/pages.test.js`).
- Pages: `src/index.html` → `src/main.js` (`#app`), `src/result/` (`#sgvc-result`), `src/about/` (`#sgvc-about`), plain-HTML `src/accessibility/`, `src/privacy/`, `src/terms/` (→ `src/shared/legal-page.js`); each listed in `vite.config.js` `rollupOptions.input`.
- Footer: `src/shared/footer.js:65` `mountFooter()`, called by every page script; links Home · Accessibility · Privacy · Terms + GitHub repo (`REPO_URL`, `src/shared/footer.js:3`).
- Hosting: Cloudflare Worker only (`wrangler.jsonc`, custom domain `sg-vanilla-component.engg.app`, `workers_dev: false`). Vercel · Netlify · Railway · Cloudflare Pages · engg.me = retired; NEVER reintroduce config for them. <!-- enggflo -->
- Docs: `design.md` (architecture) · `conventions.md` (implicit style). <!-- enggflo -->

## Architecture

- `src/main.js:10` — `sgvc({ targetEl, colors, data, enableCloseOutsideElement, formMethod })` renders markup + scoped styles into `targetEl`; `data` (bank list + `options`) and the calls sit at the file end. Visual design: `design.md` § Visual design.
- `vite.config.js` — `root: src`, `outDir: dist`, six HTML inputs.
- `vitest.config.js` — jsdom env, `tests/**/*.test.js`; tests re-import `src/main.js` per case (`vi.resetModules`) since it self-invokes on import (`src/main.js`, end of file).
- `form-result.html` (repo root) — unused sample, not in the build.

## Test profile

| field | value |
|---|---|
| runner | Vitest 5 + jsdom (`vitest.config.js`) |
| command | `pnpm test` |
| levels | unit ✓ (DOM, `tests/main.test.js`, `tests/footer.test.js`, `tests/pages.test.js`) · integration ✗ · e2e ✗ |
| enforced_by | no CI workflows (`.github/` absent) |

## License

- MIT · `LICENSE` · `package.json` `license`

## References <!-- enggflo -->

- vite — https://vite.dev/llms.txt (llms.txt)
- vitest — https://vitest.dev/llms.txt (llms.txt)
