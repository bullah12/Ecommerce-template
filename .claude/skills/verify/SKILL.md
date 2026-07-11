---
name: verify
description: Build, run, and drive the OTIUM storefront to verify changes at the browser surface.
---

# Verifying the OTIUM storefront

Vite + React SPA, no backend. All state is in-memory (cart, wishlist, mock
forms), so every flow can be driven headlessly with no fixtures.

## Build & serve

```bash
npm install
npm run build
npm run preview -- --port 4173 --strictPort   # serves dist/ at http://localhost:4173
```

`npm run dev` also works but preview against `dist/` matches production.

## Drive

Use the pre-installed Chromium via playwright-core (install it in the
scratchpad, not the repo):

```js
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
```

Flows worth driving: home → footer links, /shop filters + product-card
navigation, PDP add-to-cart (button flips to "Added ✓", drawer slides open,
header count updates), cart drawer Escape/focus behavior, /checkout mock
flow, /faq disclosures, /contact mock submit (invalid first, then valid),
footer newsletter mock signup.

## Gotchas

- Product cards use a stretched link (`.product-card__link::after` covers
  the card). Playwright's `locator.click()` on card text reports
  "subtree intercepts pointer events" — that is correct behavior; use
  `page.mouse.click()` on the element's (scrolled-into-view) bounding box
  to confirm navigation.
- Client-side routing: after link clicks use `waitForURL`, not load events.
- Google Fonts is blocked in the sandbox → serif renders as Georgia
  fallback and 2–3 `ERR_CONNECTION_RESET` console errors appear on every
  page. Pre-existing/environmental, not a regression. Same for the
  favicon 404.
