# sg-vanilla-component

This is a simple payment option sample with Vanilla JS and simple CSS in JS, no front end frameworks. The only missing part is the backend.

## Stacks

- Vanilla JS
- CSS in JS (single file component)
- Vite (bundler)
- Vitest + jsdom (tests)
- Deployed to Cloudflare Pages

## Demo

- https://sg-vanilla-component.engg.me

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
