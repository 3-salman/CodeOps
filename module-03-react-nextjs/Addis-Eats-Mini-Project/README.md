# Addis Eats 🍽️

A React-based food ordering web app for Ethiopian cuisine — browse the menu, filter by category, save favorites, manage a cart, and sign in to a profile.

## Features

- **Menu browsing** — full dish grid loaded from `menu.json`, filterable by category (Stews, Meat, Vegan, Bakery, Drinks, Desserts) and a Favorites view
- **Favorites** — heart-toggle on any dish card to save it for later
- **Cart** — add items, adjust quantity, remove items, view subtotal/delivery fee/total
- **Auth pages** — Login and Signup screens
- **Profile page** — account details and recent order history
- **Shared design system** — a single `index.css` stylesheet driven by CSS custom properties (colors, spacing) so every page looks consistent

## Tech Stack

- **React** (function components + hooks)
- **Vite** (dev server / build tool)
- **React Context API** for shared state (cart, favorites)
- Plain CSS — no CSS framework, one shared stylesheet

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── CategoryBar.jsx
│   ├── SpecialsGrid.jsx
│   ├── HowItWorks.jsx
│   └── DishCard.jsx
├── context/
│   └── CartContext.jsx
├── data/
│   └── dishes.js
├── pages/
│   ├── Home.jsx
│   ├── MenuPage.jsx
│   ├── FavoritesPage.jsx
│   ├── CartPage.jsx
│   ├── ProfilePage.jsx
│   ├── LoginPage.jsx
│   └── SignupPage.jsx
├── App.jsx
├── Layout.jsx
├── index.css        # shared design system / stylesheet
└── main.jsx
```

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Installation

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Data

The app reads menu data from a `menu.json` file (expected in `public/` so it can be fetched at runtime via `fetch('/menu.json')`).

**Menu item shape:**

```json
{
  "id": "doro-wot",
  "title": "Doro Wot",
  "price": 320,
  "category": "stews",
  "emoji": "🥘",
  "description": "Slow-stewed chicken drumstick in a berbere-spiced sauce with hard-boiled egg and injera."
}
```

Valid `category` values currently used in the data: `stews`, `meat`, `vegan`, `bakery`, `drinks`, `desserts`. Category filter buttons in `MenuPage.jsx` should match these values (case-insensitive compare recommended).

**User shape** (`users.json`):

```json
{
  "id": "u001",
  "name": "Sara Bekele",
  "email": "sara.bekele@example.com",
  "phone": "+251 91 234 5678",
  "address": "Bole Road, Addis Ababa",
  "memberSince": "2024-03-12",
  "role": "customer"
}
```

## Design System

All colors and shared UI values live as CSS custom properties at the top of `index.css`:

```css
--bg, --bg-soft, --surface, --ink, --ink-soft, --line,
--primary, --primary-dark, --primary-soft,
--accent, --accent-soft, --leaf, --leaf-soft
```

Every page (Login, Cart, Profile, Menu, Favorites) reuses these variables so a palette change in one place updates the whole app.

## Known Issues / To-Do

- Ensure `MenuPage.jsx` category button labels match `menu.json` category values exactly (case-insensitive)
- Favorites are currently local to a component/session — not yet persisted or shared globally via context in all pages
- Forms (Login, Signup) are not yet wired to a real auth backend

## License

Private project — not licensed for redistribution.
