# conventions.md

## Naming

- CSS classes + element ids prefixed `sgvc-` (`src/main.js`, `src/shared/footer.js`, `src/shared/legal-page.js`).
- Pages: `src/<page>/index.html` (+ optional `<page>.js`); shared modules in `src/shared/`.
- Tests: `tests/<module>.test.js`.

## Style

- No lint/format config present; follow existing files: double quotes, no semicolons (`src/shared/*.js`, `vite.config.js`).
- Styles = template strings injected via `<style>` from JS; NEVER separate `.css` files.
- ES modules only (`package.json` `"type": "module"`).

## Git

- Commit subjects: Conventional Commits (`feat:` · `fix:` · `chore:` · `docs:` · `test:`).
- Work on `develop`; feature branches `<type>/<slug>` merged into `develop`; `main` = release.
