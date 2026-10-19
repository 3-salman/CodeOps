# Addis Eats (Next.js)

Ethiopian food-ordering app built with Next.js 15 (App Router) and React 19.

## Setup
1. Copy your real `public/` content (`menu.json`, `user.json`, `images/`) over this project's `public/` folder.
2. `npm install`
3. `npm run dev` → http://localhost:3000
4. Production: `npm run build && npm start`

## Routes
| Route | Notes |
|---|---|
| `/` | Home |
| `/menu` | Menu; filter in the URL: `?category=stews`, search `?q=kitfo` |
| `/menu/[id]` | Dish detail |
| `/cart` | Cart |
| `/checkout` | Guarded (redirects to `/login?next=/checkout`), lazy-loaded form, validation |
| `/login`, `/signup` | Auth pages (no navbar) |
| `/profile` | Guarded |
| `/favorites` | Saved dishes |
| anything else | `not-found.jsx` |

## Structure
- `src/app` – routes, layouts, `error.jsx` (error boundary), `not-found.jsx`
- `src/screens` – client screens used by the thin `page.jsx` files
- `src/components`, `src/context`, `src/hooks/useFetch.js`, `src/lib`

## Demo login
Users come from `public/user.json` (sample: `sara` / `demo123`) plus accounts created on `/signup`, stored in the browser's localStorage in plain text. Demo only — use a real backend before shipping.

## Notes
- Prices are in ETB; delivery fee is `DELIVERY_FEE` in `src/lib/pricing.js`.
- Cart, favourites and the session persist in localStorage.
