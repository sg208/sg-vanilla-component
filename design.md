# design.md

## Architecture

- `src/main.js:10` — `sgvc({ targetEl, colors, data, enableCloseOutsideElement, formMethod })`: renders form markup (`src/templates.js`) into `#app`, injects scoped styles (`src/component-styles.js`) into `<head>`; bank data (`imgurl` optional, none in mock data) + calls at file end.
- `src/summary.js` — `renderBillSummary()` fills `#sgvc-bill` ("Your bill") from the same `data`.
- `src/shared/theme.js` — `mountTheme()`: Manrope import (`@fontsource-variable/manrope/wght.css`), colour tokens light + dark (`prefers-color-scheme`), reset, skip link, header, `.sgvc-shell` / `.sgvc-pay` / `.sgvc-card` layout. Called by every page script.
- `src/index.html` — skip link → `<header>` brand → `<main id="main">` with `h1` "Pay your bill", `#app` (payment section) and `#sgvc-bill`.
- `src/result/result.js`, `src/about/about.js` — stub pages rendering an `h1` card into `#sgvc-result` / `#sgvc-about`, then `mountFooter()`.
- `src/accessibility/`, `src/privacy/`, `src/terms/` — plain-HTML legal pages (`<main id="main" class="sgvc-legal">`); theme, styles + footer via `src/shared/legal-page.js`.
- `src/public/favicon.svg` — "sg" mark, copied to `dist/`.
- `src/shared/footer.js:65` — `mountFooter()` injects footer styles + `<footer>` landmark: Home · Accessibility · Privacy · Terms · GitHub repo (`src/shared/footer.js:3`).
- `vite.config.js` — `root: src`, `outDir: dist`, six `rollupOptions.input` pages.
- `wrangler.jsonc` — Worker `sg-vanilla-component`, `assets.directory: dist`, `not_found_handling: none` (no 404 page is built), custom domain `sg-vanilla-component.engg.app`, `workers_dev: false`, `preview_urls: false`.

## Data flow

1. User edits amount + picks bank → form submits `GET` (demo passes `formMethod: "GET"`; component default `POST`) to `/result/` → static sample page; no backend reads data. WHY GET: Cloudflare static assets answer `POST` with 405.
2. `pnpm build` → `dist/` → `wrangler deploy` uploads as Worker static assets.

## Key decisions

- No framework, no runtime deps; CSS-in-JS template strings. WHY: demo of vanilla component. `package.json` (devDependencies only).
- Cloudflare Worker static assets as sole host. WHY: Vercel · Netlify · Railway · Cloudflare Pages · engg.me retired. `wrangler.jsonc`.
- Every page lists in `vite.config.js` input. WHY: multi-page Vite build emits only listed HTML.
- Tests re-import `src/main.js` per case (`vi.resetModules`). WHY: module self-invokes on import.

## Visual design

- Taste-skill app style "Pastel consumer" (seed 682607210, `.taste-skill/direction.json`, gitignored): one cobalt accent, pale tiles with dark ink of the same hue, 20px card radius (10px controls, 8px tiles), no shadows at rest (the open bank list floats with one).
- Type: Manrope Variable only, weights 400–700. Sizes 14 / 16 / 20 / 28 / 32 / 40px; amount + bill figures use tabular numbers.
- Tokens (`src/shared/theme.js`): light ground `#f3f5f7`, surface `#fff`, text `#1b1d1f`, muted `#5c6064`, control `#8a9096`, accent `#1d5fd6`; dark ground `#0f1113`, surface `#181b1f`, text `#f1f3f5`, muted `#a8adb3`, accent `#7eb0ff`. Component `colors` defaults read these with light fallbacks.
- Layout: centred 1100px column, 16px gutters on phones, 32px from 640px; home grid one column → `5fr / 7fr` from 900px.
- Bank picker: `<button aria-haspopup="listbox">` + `<ul role="listbox">` options (`aria-controls` while open); Arrow/Home/End move, Enter/Space pick, Escape/Tab/outside click close and refocus the button; amount fields select (not clear) on focus; out-of-range amount → `role="alert"` message, `aria-invalid` fields, picker disabled.
- Motion: 120ms colour/transform feedback only; off under `prefers-reduced-motion`.
