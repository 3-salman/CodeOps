# VoltMart

An online shop for laptops and computers, built with Next.js (App Router).
Prices are in ETB. Payment is on delivery.

**Live site:** _add your Vercel link here_
**Code:** _add your GitHub link here_

## Screenshots

| | |
|---|---|
| ![Home](screenshots/home.png) Home | ![Products](screenshots/products.png) Products with search and categories |
| ![Detail](screenshots/detail.png) Product detail | ![Orders](screenshots/orders.png) My orders with live status |

## What it does

- Browse products by category and search them (debounced)
- Product pages with specs
- Cart saved in the browser
- Sign in and out with a cookie
- Checkout (needs sign in) and "My orders" (only your own)
- Cancel an order while it is still processing
- Order status updates by itself every 5 seconds

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

Demo users:

| Email | Password |
|---|---|
| abel@shop.test | demo1234 |
| sara@shop.test | demo1234 |

## Folders

```
app/            pages and API routes
  api/          signin, signout, orders, products
  products/     list and [slug] detail
  orders/       list and [id] detail
components/     Header, Footer, cart, forms
lib/            db.js, session.js, password.js, pricing.js, site.js
data/           products, users, orders, sessions (JSON)
middleware.js   first door check for /checkout and /orders
```

## Documents

- [AUTH.md](AUTH.md) — sign in, the protection layers, three attacks
- [DATA.md](DATA.md) — every query, where it runs and why
- [PERF.md](PERF.md) — measured before and after

## Discovery (search engines and sharing)

- Page titles and descriptions with `generateMetadata`
- Share cards (Open Graph) for home and each product
- `sitemap.xml` (public pages only) and `robots.txt` (private pages blocked)
- Product JSON-LD for search results

## Notes

- Data is stored in JSON files, so it works locally. Hosting needs a database
  instead (only `lib/db.js` would change).
- There is no admin role on purpose. See AUTH.md.