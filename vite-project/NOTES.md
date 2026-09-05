# Frontend integration notes — FarmShare Marketplace + Surplus Exchange

This documents the React frontend added under `src/` for the FarmShare
marketplace and Surplus Exchange features. **No file under `backend/` was
changed.** Everything here is additive frontend work that calls the backend
you already built where it can, and falls back to a local mock data layer
where the backend doesn't have an endpoint yet.

## Why a mock layer exists at all

The existing backend (`backend/models/Seller.js`, `backend/routes/*`) only
supports two things: user auth, and creating one seller listing. There's no
concept yet of browsing all listings, reserving a quantity, grouping
reservations into a pickup run, or recording a completed transaction — and
the brief for this pass was explicitly "don't change the existing backend."
So `src/lib/mockStore.js` is a small localStorage-backed store that
implements those missing pieces on the client, with the same business rule
your team cares about for Surplus Exchange: **a reservation can never exceed
available quantity, and cancelling one restores stock exactly.** See the
`reserve()` and `cancelReservation()` functions in that file — the whole
rule is about 15 lines.

## What's real (hits `backend/` today)

| Action | Calls | File |
|---|---|---|
| Sign up | `POST /auth/register` then `POST /auth/login` (register doesn't return a token, so we log in immediately after) | `src/lib/api.js` → `src/lib/AppContext.jsx` (`signup`) |
| Log in | `POST /auth/login` | `src/lib/api.js` → `AppContext.jsx` (`logIn`) |
| Publish a surplus listing | `POST /seller` with `{ name, item, quantity, price, location, expire_info, pickup_info }` mapped from the form | `src/lib/mockStore.js` (`addSurplusListing`) → `src/pages/SurplusList.jsx` |
| Look up a seller's listing by exact name | `GET /seller/seller_info` (via `XMLHttpRequest`, since that route reads `req.body.name` on a GET and `fetch()` can't send a GET body) | `src/lib/api.js` (`findSellerListingsByName`) — wired but not on a page yet, since it can only look up one listing you already know the name of |

If the real `POST /seller` call fails (backend not running, validation
error, etc.), `addSurplusListing` still saves the listing locally so the UI
keeps working, and returns a `backendWarning` string that the page shows as
an error toast instead of the success toast — so a broken backend call is
never silently swallowed.

`vite.config.js` proxies `/auth` and `/seller` to `http://localhost:6000`
(where `backend/server.js` listens) so the frontend can call `fetch('/auth/login')`
etc. from the Vite dev server without hitting CORS — the backend sets no
CORS headers today, and since it isn't being modified, the proxy avoids the
problem entirely instead of requiring a `cors()` middleware change.

**Known mismatch to be aware of:** `backend/models/user.js` has no `role`
field, and `authRoutes.js` doesn't return a username. So the frontend keeps
`username`/`role` client-side only (derived from the email locally, and
switchable via the Home screen's role picker) — they aren't persisted on the
User document. If the team wants real per-user roles later, that's a
one-line schema addition (`role: { type: String, default: 'buyer' }`) plus
returning it from `/auth/login`.

## What's simulated (localStorage, `src/lib/mockStore.js`)

Everything else: browsing all surplus listings, reserving a quantity,
cancelling a reservation, the core marketplace catalog/cart/checkout,
coordinator pickup-plan grouping, and transaction receipts. These are
seeded with demo data on first load (`seed()` in `mockStore.js`) so the app
isn't empty on a fresh browser.

## What a teammate would add next to make this fully server-backed

In rough priority order:
1. A `Surplus` collection with a real `qtyAvailable` field and an atomic
   decrement (Mongoose's `findOneAndUpdate` with a `qtyAvailable: { $gte: qty }`
   filter is the equivalent of the transaction this mock store does locally)
   — this is the one rule that actually matters for correctness, so it's
   worth porting exactly.
2. A `Reservation` collection + `POST /surplus/:id/reserve` and
   `POST /reservations/:id/cancel` routes.
3. `GET /surplus` (list all active listings) instead of only being able to
   look one up by exact seller name.
4. A `PickupPlan` collection + routes for the coordinator grouping flow.
5. A `Transaction` collection, written when a pickup plan is completed.
6. A `role` field on the `User` model, returned from `/auth/login`.

Once any of those exist, the matching function in `mockStore.js` can be
swapped for a real `fetch()` call (the page components already call through
`mockStore`'s exported functions, so the page code itself wouldn't need to
change — only the implementation behind that one function).

## Frontend architecture notes

- No new npm dependencies were added (not even `react-router-dom`) — the
  sandbox this frontend was built in has its npm registry blocked, so
  nothing that isn't already in `package.json` could be verified as
  installable. `src/lib/router.jsx` is a ~40-line hash router used instead.
- `src/lib/AppContext.jsx` holds auth, cart, and toast state in a single
  React Context, persisted to `localStorage` (`nos_auth_v1`, `nos_cart_v1`).
- `src/index.css` carries the whole design system (colors, typography,
  component classes). `src/App.css` (the default Vite template's styles)
  was removed since nothing imports it anymore.
- Every page under `src/pages/` is a plain function component reading from
  `useApp()` (`src/lib/AppContext.jsx`) and `src/lib/mockStore.js`; there's
  no separate state-management library.

## How this was tested

`npm install` can't run in the sandbox this frontend was written in (the npm
registry is unreachable there), so a real `npm run dev` / Vite build was not
possible from that environment. Every route was instead smoke-tested with
`react-dom/server`'s `renderToStaticMarkup`, rendering each page with a
mocked `localStorage` and a seeded auth session for every role (buyer,
seller, coordinator) to confirm the JSX is valid and nothing throws during
render. **Please still run `npm run dev` yourself once and click through the
flows** — a static-render smoke test catches syntax/runtime errors, not
layout issues or interaction bugs.
