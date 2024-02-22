# Numazu Gomi

Stack:

- Hono
- JSX (Hono middleware)
- htmx
- Cloudflare Workers
- Cloudflare D1

## Usage

Install:

```
bun install
```

Setup:

```
wrangler d1 create gomi
wrangler d1 execute gomi --local --file=gomi.sql
```

Dev:

```
npm run dev
```

Deploy:

```
npm run deploy
```
