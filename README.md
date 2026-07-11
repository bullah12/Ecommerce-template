# OTIUM — luxury e-commerce template

A responsive React storefront with a minimal, luxury aesthetic. Phase 1:
design system, catalog data, homepage, product detail page, and a slide-out
cart driven by React Context — no backend yet. Phase 2: full 30-product
catalog across five collections, a shop page with collection tabs, sorting,
instant search, and price/stock filters, all wired into the header. Phase 3:
mock checkout (shipping form → review → confirmation), a wishlist, and mock
account pages (sign in/up, dashboard, order history, saved addresses).

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
  data/products.js      Single source of catalog data: 5 collections,
                        30 products, helper selectors. Best Sellers and
                        New Arrivals are derived from popularity/dateAdded
  data/account.js       Sample orders and addresses for the mock account
  context/CartContext.jsx  Cart state (add, set quantity, remove, clear,
                           subtotal) via Context + useReducer
  context/WishlistContext.jsx  Saved product ids, same reducer pattern
  context/UserContext.jsx  Mock auth, orders (sample + session), addresses
  components/           Button, ProductCard, PlaceholderImage,
                        QuantitySelector, Header, Footer, CartDrawer,
                        Field (labeled input/select with validation),
                        HeartIcon, AccountNav
  pages/                HomePage (hero, featured grid, collection row),
                        ShopPage (collection tabs, sort, instant search,
                        price/stock filters — all URL-driven),
                        ProductPage (media, details, add-to-cart, save),
                        CheckoutPage (shipping → review, client-side
                        validation) + OrderConfirmationPage,
                        WishlistPage, LoginPage (sign in / create account),
                        AccountPage, AccountOrdersPage, AccountAddressesPage
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

Real payment integration, real auth, databases/backends, static pages, and
real images — planned for later phases. Checkout, sign-in, orders, and
addresses are client-side mocks: nothing is stored or sent anywhere.
