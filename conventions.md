# conventions.md

## Naming

- CSS classes + element ids prefixed `sgvc-` (`src/main.js`, `src/shared/footer.js`, `src/shared/legal-page.js`).
- Pages: `src/<page>/index.html` (+ optional `<page>.js`); shared modules in `src/shared/`.
- Tests: `tests/<module>.test.js`.

## Style

- Prettier (`.prettierrc.json`: no semicolons, 100 columns) owns formatting; run `pnpm format`. No ESLint yet.
- Styles = template strings injected via `<style>` from JS; NEVER separate `.css` files (the only CSS import is the fontsource font in `src/shared/theme.js`). Colours via tokens in `src/shared/theme.js`.
- ES modules only (`package.json` `"type": "module"`).

## Git

- Commit subjects: Conventional Commits (`feat:` · `fix:` · `chore:` · `docs:` · `test:`).
- Work on `develop`; feature branches `<type>/<slug>` merged into `develop`; `main` = release.
