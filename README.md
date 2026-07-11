# OTIUM — luxury e-commerce template

A responsive React storefront with a minimal, luxury aesthetic. Phase 1:
design system, catalog data, homepage, product detail page, and a slide-out
cart driven by React Context — no backend yet.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
npm run preview  # serve the production build
```

## Structure

```
src/
  styles/index.css      Design tokens (color, type, spacing, radius,
                        shadow, motion) + reusable component classes
  data/products.js      Single source of catalog data: 3 collections,
                        8 products, helper selectors
  context/CartContext.jsx  Cart state (add, set quantity, remove,
                           subtotal) via Context + useReducer
  components/           Button, ProductCard, PlaceholderImage,
                        QuantitySelector, Header, Footer, CartDrawer
  pages/                HomePage (hero, featured grid, collection row),
                        ProductPage (media, details, add-to-cart)
```

## Design system

- **Color**: one warm-umber accent (`--color-accent`) over warm neutrals;
  soft shadows and subtle linear gradients only.
- **Type**: Fraunces (display serif) + Inter (body), 1.25 major-third scale
  from `--text-xs` to `--text-4xl`.
- **Spacing**: 4px-base scale, `--space-1` through `--space-12`.
- Buttons (`.btn--primary/secondary/ghost`), cards, inputs, tags, and the
  quantity stepper are reusable classes — no one-off styles.

Product images are intentionally placeholder blocks at a fixed 4:5 ratio so
real photography can drop in later without layout shifts.

## Out of scope in this phase

Checkout, accounts, wishlist, search, filters, static pages, real images,
and any backend — planned for later phases.
