# AUTH.md — How sign-in and protection work

## Sign in and out

- **Sign in:** `POST /api/signin` checks the email and password (`lib/password.js`).
  If correct, `createSession()` in `lib/session.js` saves a session row in
  `data/sessions.json` and sets a cookie called `session`.
- **Cookie flags:** `httpOnly` (JavaScript cannot read it), `sameSite: lax`
  (not sent on cross-site posts), `path: /`.
  When deployed over HTTPS I will also add `secure: true`.
- **Sign out:** `POST /api/signout` deletes the session row and the cookie.
- **Redirect after sign in:** `safeNext()` only allows paths like `/orders`.
  Anything like `https://evil.com` or `//evil.com` becomes `/`.

## The protection layers

| Layer | File | What it proves | What it does NOT prove |
|---|---|---|---|
| 1. Middleware | `middleware.js` | A `session` cookie exists | That the cookie is real |
| 2. Page check | `app/orders/page.jsx`, `app/checkout/page.jsx`, `app/orders/[id]/page.jsx` | The session is real (found in `sessions.json`) | That the order is yours |
| 3. Action check | `app/api/orders/route.js`, `app/api/orders/[id]/cancel/route.js` | Signed in, then owner, then right status | — |
| 4. Scoped query | `lib/db.js` (`getOrdersFor`, `getOrderFor`) | The data returned belongs to this user | — |

Why so many? Middleware is only a quick door check. Anyone can type a fake
cookie. So every page and every action checks again on the server.

## Ownership

The browser sends an order id (`ord_812`). The server never trusts it alone.
It compares `order.userId` with the signed-in user's id from the session.
Pages use `getOrderFor(session.id, id)`, which only finds orders of that user.

## Three attacks and what stopped them

| # | Attack | Result | Stopped by |
|---|---|---|---|
| 1 | Signed out, send `POST /api/orders/ord_812/cancel` | 401 "Please sign in" | Action check 1 in `cancel/route.js` (`getSession()` is null) |
| 2 | Signed in as Sara, cancel Abel's order `ord_812` | 403 "This is not your order" | Action check 2 in `cancel/route.js` (`order.userId !== session.id`) |
| 3 | Open `/signin?next=https://example.com` and sign in | Lands on `/`, not example.com | `safeNext()` in `lib/session.js` |

Extra checks:
- Open `/orders` signed out → middleware redirects to `/signin?next=/orders`.
- Sara opens Abel's order page in the address bar → "not found" (scoped query).
- Cancelling an order that is already shipped → 409 (status check).

## Decisions

- **No admin or roles.** The project sheet does not require them and they add
  a lot of extra code. Every user is a normal customer.
- **Prices come from the server.** The browser only sends product ids and
  quantities. The server reads real prices and checks stock.
- **Sessions are stored on the server**, so signing out really ends the session.