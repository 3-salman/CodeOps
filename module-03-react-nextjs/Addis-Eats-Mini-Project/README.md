# Addis Eats

A food-ordering website for Addis Ababa. Browse the menu, filter by category,
open a dish, build an order and check out through a validated form.

## How to run

```
git clone <your repository link>
cd <your project folder>
npm install
npm run dev
```

Then open the address that the terminal shows (usually http://localhost:5173).

## Sign in

Use one of the accounts in `public/user.json`, or create one on the Sign up page.

## Pages

| Path | What it shows | Notes |
|---|---|---|
| `/` | Home with today's specials | |
| `/menu` | Menu fetched from `menu.json` | Category filter is in the address, e.g. `/menu?category=Stews` |
| `/menu/:id` | One dish with add to cart | Dynamic |
| `/cart` | Order lines and ETB total | |
| `/checkout` | Validated checkout form | Guarded (sign in first), lazy loaded |
| `/login` | Sign in | |
| `/signup` | Create account | |
| `/profile` | Your profile | Guarded |
| `*` | Page not found | |

## Features

- Loading, error and empty states on the menu and dish pages
- Cart and favourites are saved in the browser
- Checkout form with validation and touched fields
- Error boundary around every page

## Made by

salman g/medhin