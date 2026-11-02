# sg-vanilla-component

A payment step built with plain JavaScript and CSS written in JS, no framework. You keep or edit the amount, pick a Dutch bank from a list and continue. There is no backend: the form sends you to a static sample result page.

Live demo: https://sg-vanilla-component.engg.app

## Stack

- Vanilla JS (ES modules): the component in `src/main.js`, its markup in `src/templates.js` and its styles in `src/component-styles.js`
- Manrope, self-hosted through `@fontsource-variable/manrope` (no font CDN)
- Vite 8, multi-page build with `src/` as the root
- Vitest + jsdom for tests
- pnpm 10, Node 24

## Design

The home page is a two-column payment screen on a pale grey ground: the page title and a "Your bill" card on the left, the payment card on the right. On a phone the payment card comes straight after the title. White cards have 20px corners, the one accent is a cobalt blue used for the selected bank, focus outlines and the Continue button, and banks show as lettered marks on a pale blue tile. Light and dark colours follow the system setting. Shared tokens, the skip link and the header styles live in `src/shared/theme.js`; `design.md` has the details.

The site also has accessibility, privacy and terms pages (`src/accessibility/`, `src/privacy/`, `src/terms/`) and a shared footer in `src/shared/footer.js` that links to those pages, plus a small GitHub icon that links to this repo.

## Run it locally

```bash
pnpm install
pnpm dev       # dev server
pnpm test      # Vitest suite
pnpm build     # static build to dist/
pnpm preview   # serve dist/
```

## Deploy

The site is a Cloudflare Worker that serves `dist/` as static assets, set up in `wrangler.jsonc`. `pnpm run deploy` builds and runs `wrangler deploy`. Wrangler 4 is a dev dependency, so you only need `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set in the environment.

## License

MIT, see [LICENSE](LICENSE).
