# design.md

## Architecture

- `src/main.js:6` — `sgvc({ targetEl, colors, data })`: single function renders injected `<style>` + form markup into `#app`; bank data (`imgurl` → `portal.bp.nu`, `src/main.js:800`) + self-invoking call at file end.
- `src/index.html:15` — loads `main.js` as ES module.
- `src/result/result.js`, `src/about/about.js` — stub pages rendering into `#sgvc-result` / `#sgvc-about`, then `mountFooter()`.
- `src/accessibility/`, `src/privacy/`, `src/terms/` — plain-HTML legal pages (`<main class="sgvc-legal">`); styles + footer via `src/shared/legal-page.js`.
- `src/shared/footer.js:50` — `mountFooter()` injects footer styles + `<footer>` landmark: Home · Accessibility · Privacy · Terms · GitHub repo (`src/shared/footer.js:3`).
- `vite.config.js` — `root: src`, `outDir: dist`, six `rollupOptions.input` pages.
- `wrangler.jsonc` — Worker `sg-vanilla-component`, `assets.directory: dist`, `not_found_handling: 404-page`, custom domain `sg-vanilla-component.engg.app`, `workers_dev: false`, `preview_urls: false`.

## Data flow

1. User edits amount + picks bank → form submits `POST` (`src/main.js:422`) to `/result/` → static sample page; no backend reads data.
2. `pnpm build` → `dist/` → `wrangler deploy` uploads as Worker static assets.

## Key decisions

- No framework, no runtime deps; CSS-in-JS template strings. WHY: demo of vanilla component. `package.json` (devDependencies only).
- Cloudflare Worker static assets as sole host. WHY: Vercel · Netlify · Railway · Cloudflare Pages · engg.me retired. `wrangler.jsonc`.
- Every page lists in `vite.config.js` input. WHY: multi-page Vite build emits only listed HTML.
- Tests re-import `src/main.js` per case (`vi.resetModules`). WHY: module self-invokes on import.
