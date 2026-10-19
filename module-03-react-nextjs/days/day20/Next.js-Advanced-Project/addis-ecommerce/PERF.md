# PERF.md — Performance

> Fill in the numbers yourself. Do not invent them. If a number does not
> improve, write that honestly and explain why.

## How I measure

- Page: `/products` (the biggest page)
- Tool: Chrome Lighthouse, **Mobile**, throttling on
- Build: `npm run build` then `npm start` (never `npm run dev`)
- Run it 3 times and write the middle result

## Budget

| Metric | Budget |
|---|---|
| Performance score | 90 or more |
| LCP (largest paint) | under 2.5 s |
| CLS (layout shift) | under 0.1 |
| First Load JS | under 150 kB (from the build output) |

## Before

| Metric | Value |
|---|---|
| Performance score | |
| LCP | |
| CLS | |
| First Load JS (`/products`) | |
| Largest item on the page | |

Screenshot: `screenshots/lighthouse-before.png`

## What I changed

Pick only what Lighthouse actually points at. Ideas:

1. **`next/font`** — load the font through Next so there is no extra font
   request and no layout jump.
2. **Server components** — most of the pages are already server components, so
   little JavaScript is sent. Only cart, search and status are client code.
3. **`next/image`** — only if I add real product images (now they are emojis,
   so there is nothing to optimise).
4. **Reduce client JS** — keep `'use client'` only where it is needed.

Write one line for each change: what I changed, and why.

## After

| Metric | Before | After |
|---|---|---|
| Performance score | | |
| LCP | | |
| CLS | | |
| First Load JS (`/products`) | | |

Screenshot: `screenshots/lighthouse-after.png`

## Conclusion

One or two sentences: what improved, what did not, and why.