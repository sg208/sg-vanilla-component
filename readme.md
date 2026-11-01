# sg-vanilla-component

This is a simple payment option sample with Vanilla JS and simple CSS in JS, no front end frameworks. The only missing part is the backend.

## Stacks

- Vanilla JS
- CSS in JS (single file component)
- Vite (bundler)
- Vitest + jsdom (tests)
- Deployed as a Cloudflare Worker (static assets)

## Demo

- https://sg-vanilla-component.engg.app

The Worker runs on the sg208 account and serves `dist/` as configured in `wrangler.jsonc`. `pnpm run deploy` builds and runs `wrangler deploy`; it needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the environment.

## Development

```bash
pnpm install
pnpm dev       # dev server
pnpm build     # static build to dist/
pnpm test      # Vitest suite
```

## Deployment Notes

- Node version: `24`
- Build command: `pnpm build`
- Public folder: `dist`

## License

MIT, see [LICENSE](LICENSE).
