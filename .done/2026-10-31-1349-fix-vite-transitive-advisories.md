# Fix high advisories in Vite 2 dependency chain

- **Date**: 2026-10-31 13:49
- **Type**: chore
- **Effort**: medium
- **Status**: ready
- **Source**: /enggflo-maintenance (`npm audit`, npm 11.19.1)

## Goal
- `audit` reports 0 high/critical advisories.

## Context
- `npm audit` → 6 vulnerabilities (1 moderate, 5 high): esbuild <=0.24.2, nanoid <=3.3.17, postcss <=8.5.22, rollup <=2.79.2, source-map-js 1.0.0-1.2.1
- All transitive via `vite@^2.9.5` (`package.json` devDependencies)
- Category: security · fix available via Vite major upgrade (see vite upgrade item)

## Proposed approach
1. Upgrade vite to latest major · files: `package.json`, lockfile · satisfies: D-1
- Cheaper option: `npm audit fix` only (does not clear rollup/esbuild without vite major)

## Done when
| id | check | expect |
|---|---|---|
| D-1 | `pnpm audit --audit-level high` | exit 0 |

## Open questions
