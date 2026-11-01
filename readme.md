# sg-vanilla-component

A payment-option picker built with plain JavaScript and CSS written in JS, no framework. You pick an amount, choose a Dutch bank from a dropdown and submit. There is no backend: the form posts to a static sample result page.

Live demo: https://sg-vanilla-component.engg.app

## Stack

- Vanilla JS (ES modules), with the component and its styles in `src/main.js`
- Vite 8, multi-page build with `src/` as the root
- Vitest + jsdom for tests
- pnpm 10, Node 24

The site also has accessibility, privacy and terms pages (`src/accessibility/`, `src/privacy/`, `src/terms/`) and a shared footer in `src/shared/footer.js`.

## Run it locally

```bash
pnpm install
pnpm dev       # dev server
pnpm test      # Vitest suite
pnpm build     # static build to dist/
pnpm preview   # serve dist/
```

## Deploy

The site is a Cloudflare Worker that serves `dist/` as static assets, set up in `wrangler.jsonc`. `pnpm run deploy` builds and runs `wrangler deploy`. You need `wrangler` v4 installed globally and `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` set in the environment.

## License

MIT, see [LICENSE](LICENSE).
