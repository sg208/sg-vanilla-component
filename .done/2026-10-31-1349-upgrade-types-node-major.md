# Upgrade @types/node 17 to 26

- **Date**: 2026-10-31 13:49
- **Type**: chore
- **Effort**: easy
- **Status**: ready
- **Source**: /enggflo-maintenance (`npm view @types/node version` → 26.6.6)

## Goal
- Node typings match the Node 24 runtime.

## Context
- `package.json` — `@types/node: ^17.0.36` · category: upgrade · distance: major
- `.node-version` — pins 16.15.0 (EOL); move to 24

## Proposed approach
1. Bump `@types/node`, set `.node-version` to 24 · files: `package.json`, `.node-version` · satisfies: D-1
- Cheaper option: none

## Done when
| id | check | expect |
|---|---|---|
| D-1 | `grep -c '"@types/node": "^26' package.json` | 1 |

## Open questions
