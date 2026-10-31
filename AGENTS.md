# AGENTS.md

- LEARNINGS: `.enggflo/learning.md` · append: `/enggflo-init "<mistake>"`

## Project

- PURPOSE: demo payment-option picker (Dutch bank list, amount editor) in plain JS with CSS-in-JS; no framework, no backend.
- STACK: vanilla JS (ES modules) · Vite (multi-page, `root: src`) · static output `dist/` · deployed to Cloudflare Pages (`readme.md`).
- Branches: `develop` = work branch; `main` = default + release; `master` = legacy, kept.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — static build to `dist/`
- `npm run preview` — serve `dist/`
- Tests: none

## Rules

- No framework, no runtime dependencies; component lives in `src/main.js` (enforced_by: unverified).
- Pages: `src/index.html` → `src/main.js` (`#app`), `src/result/` (`#sgvc-result`), `src/about/` (`#sgvc-about`); each listed in `vite.config.js` `rollupOptions.input`.

## Architecture

- `src/main.js:4` — `sgvc({ targetEl, colors, data })` renders styles + markup into `targetEl`; `data` (bank list + `options`) and the call sit at the file end.
- `vite.config.js` — `root: src`, `outDir: dist`, three HTML inputs.
- `form-result.html` (repo root) — unused sample, not in the build.

## Test profile

| field | value |
|---|---|
| runner | none |
| levels | unit ✗ · integration ✗ · e2e ✗ |
| enforced_by | no CI workflows (`.github/` absent) |

## References <!-- enggflo -->

- vite — https://vite.dev/llms.txt (llms.txt)
