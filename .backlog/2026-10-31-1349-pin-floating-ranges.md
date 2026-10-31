# Lock dev dependency ranges with a committed lockfile

- **Date**: 2026-10-31 13:49
- **Type**: chore
- **Effort**: easy
- **Status**: open
- **Source**: /enggflo-maintenance (manifest read)

## Goal
- Installs are reproducible.

## Context
- `package.json` — both devDependencies use `^` ranges · category: pin
- Lockfile committed (`package-lock.json`) → ranges already resolved; risk low

## Proposed approach
1. Keep `^` ranges, rely on committed `pnpm-lock.yaml` + `--frozen-lockfile` · satisfies: D-1
- Cheaper option: none

## Done when
| id | check | expect |
|---|---|---|
| D-1 | `pnpm install --frozen-lockfile` | exit 0 |

## Open questions
- Exact pins vs `^` + lockfile: owner preference?
