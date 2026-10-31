# Upgrade vite 2.9 to 8.x

- **Date**: 2026-10-31 13:49
- **Type**: chore
- **Effort**: medium
- **Status**: ready
- **Source**: /enggflo-maintenance (`npm view vite version` → 8.3.5)

## Goal
- Build runs on current Vite; multi-page output unchanged.

## Context
- `package.json` — `vite: ^2.9.5` · category: upgrade · distance: major (2 → 8)
- `vite.config.js:1` — CJS-style `__dirname` in ESM config; Vite 8 needs `"type": "module"` + `import.meta.dirname` or `fileURLToPath`
- `vite.config.js:12` — three HTML inputs (main, result, about)

## Proposed approach
1. Bump vite, set `"type": "module"`, replace `__dirname` · files: `package.json`, `vite.config.js` · satisfies: D-1, D-2
- Cheaper option: none

## Done when
| id | check | expect |
|---|---|---|
| D-1 | `pnpm build` | exit 0 |
| D-2 | `ls dist/index.html dist/result/index.html dist/about/index.html` | 3 files |

## Open questions
