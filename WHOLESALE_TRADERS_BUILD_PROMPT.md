# Autonomous build prompt — `wholesale-traders`

> Paste everything below the line into a fresh Opus / Claude Code session
> (ideally started on a clone of the OTIUM ecommerce template). It is written
> to be run autonomously end-to-end. Adjust the two assumptions called out in
> **§0** if they don't match your intent, then let it run.

---

## MISSION

Build **Wholesale Traders**, a B2B wholesale storefront that **looks like a
modern, polished B2C/DTC shop but operates like a wholesaler**. Start from the
existing OTIUM ecommerce template (React + Vite + React Router, no backend) and
transform it: new catalog, new visual identity, wholesale trading mechanics, an
admin product-management page, and a CSV/Excel bulk-import layer.

The main lines are **wholesale grocery & household goods** — crates of soft
drinks, toilet paper, cleaning supplies, catering disposables, confectionery,
and similar. Customers buy by the **case / crate / pallet**, not the single
unit.

Work autonomously. Make sensible decisions and keep moving — do **not** stop to
ask questions. Prefer a working, coherent end-to-end result over exhaustive
polish on any one screen. Track your work with a task list and build in phases.

---

## §0. ASSUMPTIONS BAKED IN (change here if wrong)

1. **Currency & tax: British pounds (£ GBP) with UK VAT.** Prices are shown
   **ex-VAT by default** (trade convention) with a site-wide **ex-VAT / inc-VAT
   toggle**; VAT defaults to 20% per product, with support for zero-rated goods
   (e.g. most food/drink is 0%). Put the currency symbol, default VAT rate, and
   default display mode in a single config module so they're trivial to change.
2. **No backend / no secrets / stays a static SPA on Vercel.** Persistence is
   client-side (see §3). Do not add a server, database, real auth, or real
   payments. Do not introduce a CSS framework.

---

## §1. STARTING POINT — what you're inheriting

The OTIUM template is a luxury homewares storefront. Stack and shape:

- **React 18 + Vite 5 + React Router 6**, plain **JS/JSX** (no TypeScript).
- **Single design-system CSS file** at `src/styles/index.css` (~1500 lines):
  design tokens first (`--color-*`, type scale, spacing, radius, shadow,
  motion), then base styles, then reusable component classes
  (`.btn--primary/secondary/ghost`, `.card`, `.tag`, `.input`, etc.). **Extend
  this same token-driven approach** — no one-off inline styles, no Tailwind.
- **State via React Context**: `CartContext` (add / setQuantity / remove /
  clear / subtotal, slide-out drawer), `WishlistContext`, `UserContext` (mock
  auth, orders, addresses — nothing is sent anywhere).
- **Catalog data** in `src/data/products.js`: `collections` + `products`
  arrays and helper selectors (`getProduct`, `getProductsByCollection`,
  `getFeaturedProducts`, `getBestSellers`, `getNewArrivals`, `formatPrice`).
  Product shape today: `{ id, name, price, collection, description, featured,
  inStock, dateAdded, popularity }`.
- **Images are deliberate placeholder blocks** (`PlaceholderImage`) at a fixed
  ratio so real photography can drop in later. **Keep this philosophy** — no
  real image sourcing; use labelled placeholders.
- **Pages**: `HomePage`, `ShopPage` (collection tabs + sort + instant search +
  price/stock filters, all URL-driven), `ProductPage`, `CheckoutPage`
  (shipping → review), `OrderConfirmationPage`, `WishlistPage`, `LoginPage`,
  `AccountPage`, `AccountOrdersPage`, `AccountAddressesPage`, `AboutPage`,
  `FaqPage`, `ContactPage`. Routing lives in `src/App.jsx`.
- **Components**: `Header` (nav from collections + instant search + cart/
  wishlist/account), `Footer`, `CartDrawer`, `ProductCard`, `Button`, `Field`,
  `QuantitySelector`, `HeartIcon`, `AccountNav`, `PlaceholderImage`.
- Deploys as a static SPA (`vercel.json` rewrites all routes to `index.html`).
- `.claude/skills/verify/SKILL.md` drives the storefront in a browser and
  hard-codes the OTIUM brand — update its brand references as part of cleanup.

Read the real files before changing them; match the existing code style,
comment density, and naming.

---

## §2. REPOSITORY SETUP

The project must live in a repo named **`wholesale-traders`**.

- If your working directory is a clone of the OTIUM template and the remote is
  **not** yet `wholesale-traders`: create a new GitHub repository named
  `wholesale-traders` (under my account), copy the full template into it, and
  push there. Otherwise build in place.
- Rename project identifiers: `package.json` `"name"` → `wholesale-traders`;
  update `index.html` `<title>`/meta; refresh `README.md` (see §11).
- Commit in logical phases with clear messages. Do a clean final build and push
  before you finish.

---

## §3. ARCHITECTURE & PERSISTENCE (important)

Keep the stack. Introduce a **catalog store** that makes the admin genuinely
useful without a backend:

- Keep `src/data/products.js` as the **committed seed catalog** (version
  controlled, the shared default everyone sees on first load).
- Add a **`CatalogContext`** (Context + reducer, same pattern as `CartContext`)
  that loads the seed, then **overlays admin changes persisted in
  `localStorage`** (added / edited / deleted products + bulk imports). All
  pages read the catalog through this context, not directly from the seed
  array, so admin edits appear across the site immediately.
- Give the admin an **“Export catalog”** action that downloads the current
  catalog as both `products.js` (drop-in replacement for the seed) and
  `catalog.csv`. This is the “commit it to make it permanent / shared” path —
  it cleanly bridges the no-backend gap. State this caveat plainly in the admin
  UI and README: *admin edits are per-browser until you export and commit the
  file.*
- You may add **`xlsx` (SheetJS)** for Excel parsing and a tiny CSV
  parser/util. No other heavy dependencies.

Add a **`SettingsContext`** (or fold into catalog) for the **ex-VAT / inc-VAT**
display toggle, persisted in `localStorage`, defaulting to ex-VAT.

---

## §4. PRODUCT DATA MODEL (the backbone — get this right first)

Replace the OTIUM product shape with a wholesale one. Target schema per product:

```js
{
  sku: 'SD-COLA-330-24',        // stable unique id / order key
  name: 'Classic Cola 330ml Cans',
  category: 'soft-drinks',       // maps to a wholesale category (see §5)
  brand: 'House',                // optional
  description: 'Full-sugar cola in 330ml cans. Sold by the case.',
  unitLabel: '330ml can',        // what ONE unit is
  unitsPerCase: 24,              // case / crate size
  casePrice: 8.99,               // ex-VAT price per case (the price you buy at)
  rrpPerUnit: 0.79,              // optional — enables a margin/“you make” hint
  vatRate: 0,                    // 0 for zero-rated food/drink, 0.2 otherwise
  moq: 1,                        // minimum cases per order
  orderIncrement: 1,             // must order in multiples of this
  priceBreaks: [                 // volume discounts, by case quantity
    { minQty: 5,  casePrice: 8.49 },
    { minQty: 10, casePrice: 7.99 },
    { minQty: 48, casePrice: 7.49 }   // e.g. full pallet
  ],
  stock: 480,                    // cases available
  palletQty: 48,                 // cases per pallet (optional, for pallet buys)
  barcode: '5000000000000',      // optional EAN
  featured: true,
  dateAdded: '2026-01-15',
  popularity: 90
}
```

Derived values (helpers, mirroring the template’s selectors):
`unitPrice = casePrice / unitsPerCase`; `effectiveCasePrice(qty)` picks the best
applicable price break; VAT amount and inc-VAT price from `vatRate`; keep
`getBySku`, `getByCategory`, `getFeatured`, `getBestSellers`, `getNewArrivals`.
Replace `formatPrice` with a `£`, 2-decimal money formatter (wholesale prices
aren’t round).

**Cart works in cases.** A line quantity is a number of cases; enforce `moq`
and `orderIncrement`; auto-apply the correct price-break tier; show the unit
breakdown (“10 cases × 24 = 240 cans”). Cart/checkout totals show **ex-VAT
subtotal, VAT, and inc-VAT total** separately.

---

## §5. CATALOG CONTENT

Replace the five OTIUM collections with wholesale **categories**. Use roughly:

- **Soft Drinks** (cans & bottles, by the crate)
- **Water & Juices**
- **Toilet Paper & Tissue**
- **Cleaning & Hygiene**
- **Catering & Disposables** (cups, napkins, foil, bags)
- **Confectionery & Snacks**
- **Hot Drinks** (tea, coffee, sugar)
- **Ambient Groceries / Household**

Seed **~30–40 realistic SKUs** spread across these categories, each with a
sensible case structure, price breaks, stock, and VAT rate (drinks/most food
zero-rated; cleaning/disposables at 20%). Write the copy in a plain,
value-forward wholesale voice — not the poetic OTIUM tone. Keep `featured`,
`dateAdded`, and `popularity` populated so Home / Best Sellers / New Arrivals
still work.

---

## §6. VISUAL REDESIGN — B2C polish, wholesale substance

Move off the warm-umber luxury identity to a **confident, trustworthy,
value-forward commercial** look that still feels like a nice consumer store.

- **Palette**: retire the umber/serif luxury scheme. Use a strong primary
  (a deep, trustworthy blue works well) plus a warm high-energy accent (amber/
  orange) reserved for CTAs, prices, and savings/“trade price” badges. Cleaner,
  cooler neutrals than OTIUM. Do it all through the CSS tokens.
- **Type**: keep **Inter** for body/UI (it’s good). Replace the **Fraunces**
  display serif with a strong modern sans / grotesque for headings — wholesale
  is not luxury-serif. Update the Google Fonts link in `index.html` and the
  `--font-display` token.
- **Product cards**: prominently show **case structure** (“Case of 24”), the
  **case price** (big) and **unit price** (small, “≈ £0.37/can”), a
  **price-break hint** (“From £7.49/case at 48+”), stock/lead-time, and VAT
  treatment. Denser, more efficient grids than OTIUM (wholesale = many SKUs)
  while keeping the polish. Keep labelled placeholder images (a squarer ratio
  like 1:1 or 4:3 suits packaged goods).
- **Trust/value furniture**: a slim top bar or hero strip with trade signals —
  “Trade prices”, “Bulk & pallet discounts”, “Next-day pallet delivery”,
  “Min order £X”. A homepage geared to fast reordering and browsing by
  category, not editorial storytelling.
- Preserve the template’s **accessibility** (skip link, aria labels,
  `aria-current`, keyboard support) and **responsiveness**.

---

## §7. WHOLESALE TRADING FEATURES

Add these on top of the B2C shell (build the ones that carry the wholesale
experience; keep each clean and functional):

1. **Case / unit pricing** everywhere (per §4) with derived unit price shown.
2. **Volume price breaks** — a tier table on the product page; the cart
   auto-applies the best tier and shows the per-case saving.
3. **Ex-VAT / inc-VAT toggle** — site-wide, in the header, persisted; every
   price respects it; cart/checkout always itemise VAT regardless.
4. **MOQ & order increments** — enforced in the quantity stepper and cart, with
   clear messaging.
5. **Bulk Order Pad / Quick Order** — a dedicated page where a trade buyer
   types or pastes **SKU + case quantity** across many rows and adds them all
   to the cart at once. This is the headline wholesale time-saver — make it
   good (autocomplete on SKU/name, running ex-VAT total, invalid-SKU flagging).
6. **Trade account** — repurpose the mock auth/account: sign-up captures
   **business name, VAT number, account type**; the account dashboard shows
   (mock) credit terms/limit, **reorder-from-past-order**, and delivery
   addresses. Keep it all client-side mock, like the template.
7. **Saved lists / reorder** — repurpose the Wishlist into **“Saved Lists”**
   (named reorder lists a buyer builds and re-adds to cart), since re-ordering
   the same basket is core to wholesale. (Removing wishlist entirely is
   acceptable if repurposing balloons scope — but reorder is high value.)
8. **Pallet buying** (nice-to-have) — where `palletQty` is set, offer a
   “buy by the pallet” shortcut and show the pallet price.

---

## §8. ADMIN PAGE (`/admin`)

A functional product-management console (client-side, backed by
`CatalogContext` + localStorage per §3). No real auth required, but gate it
behind a simple mock admin flag/route so it’s clearly separate from the
storefront.

- **Product list**: searchable/sortable table of all SKUs with key fields
  (SKU, name, category, case price, stock, VAT).
- **Add / edit product**: a full form covering the §4 schema — including price
  breaks (add/remove tier rows), VAT rate, MOQ, units per case, stock. Validate
  inputs (unique SKU, positive numbers, well-formed breaks). Reuse the
  template’s `Field` component and form patterns.
- **Delete** with confirm.
- **Changes reflect immediately** across the storefront (shop, product pages,
  search).
- **Export catalog** (`products.js` + `catalog.csv`) and **Reset to seed**.
- Link to the bulk-import screen (§9).

---

## §9. CSV / EXCEL BULK INGESTION

Let an admin add/update many products at once by uploading a file.

- **Accept `.csv` and `.xlsx`/`.xls`** (use SheetJS for Excel; a small parser
  or PapaParse-style util for CSV — keep deps minimal).
- **Defined column schema**, documented and matching §4, e.g.:
  `sku, name, category, brand, description, unitLabel, unitsPerCase, casePrice,
  rrpPerUnit, vatRate, moq, orderIncrement, stock, palletQty, barcode,
  featured, priceBreaks`. Define a clear encoding for `priceBreaks` in one cell
  (e.g. `5:8.49|10:7.99|48:7.49`). Document every column.
- **Downloadable template**: a “Download CSV template” button that emits a
  correctly-headed sample file, plus commit a `docs/catalog-template.csv` and a
  short `docs/CATALOG_CSV.md` explaining the columns.
- **Import flow**: upload → parse → **preview table** with per-row validation
  (missing/invalid fields flagged, unknown category flagged, SKU collisions
  shown as “will update” vs “new”) → confirm → merge into the catalog. Report a
  summary (X added, Y updated, Z skipped with reasons). Never silently drop bad
  rows.
- **Round-trip**: export must produce a file that re-imports cleanly.

---

## §10. PAGES — remove / keep / repurpose

- **Keep & rework**: Home, Shop (categories instead of collections; the URL-
  driven tabs/sort/search/price/stock filters are a great base — extend filters
  for wholesale, e.g. category, in-stock, price-per-case, VAT), Product,
  Checkout, Order Confirmation, Login (→ trade sign-in/open-account), Account +
  Orders + Addresses, About (rewrite as a wholesale/trade supplier), FAQ
  (rewrite: minimum orders, delivery/pallets, VAT, payment terms, returns),
  Contact.
- **Add**: `/admin` (§8), bulk-import (§9), Bulk Order Pad (§7.5), and an
  “Open a trade account” entry point.
- **Repurpose**: Wishlist → Saved Lists / reorder (§7.7).
- **Remove** anything OTIUM-specific that has no wholesale analogue (e.g. the
  gift-set collection, “The Slow Letter” newsletter voice, editorial hero copy).
  Update `Header`, `Footer`, and `App.jsx` routes accordingly — no dead links,
  no orphan routes.

---

## §11. DOCUMENTATION & CLEANUP

- **Rewrite `README.md`** for Wholesale Traders: what it is, run commands,
  project structure, the **product/catalog schema**, the **CSV/Excel format**,
  how to use the **admin** and **export-to-commit** flow, the **persistence
  caveat** (per-browser until exported+committed), currency/VAT config, and
  what’s intentionally out of scope (real backend/auth/payments).
- Update `index.html` (title, meta description, fonts), `package.json` name.
- Purge stray **OTIUM / luxury** references in code comments, copy, the footer,
  and `.claude/skills/verify/SKILL.md` (rebrand its checks to Wholesale Traders
  and the new flows).
- Keep code comments in the template’s explanatory style; document any non-
  obvious wholesale logic (price-break selection, VAT handling, CSV parsing).

---

## §12. CONSTRAINTS / GUARDRAILS

- Do **not** add a backend, database, real auth, or real payment processing.
- Do **not** add Tailwind or another CSS framework — extend the token-based
  design system in `src/styles/index.css`.
- Do **not** source real product images — keep labelled placeholders.
- Keep it a **static SPA** that still deploys via the existing `vercel.json`.
- New runtime deps limited to what §3/§9 need (SheetJS + a small CSV util).
- Preserve accessibility and mobile responsiveness throughout.

---

## §13. DEFINITION OF DONE (must all hold)

1. `npm install && npm run build` completes **clean**; `npm run dev` runs with
   **no console errors**; every route resolves and there are no dead links.
2. Catalog is fully wholesale (categories + case/price-break/VAT schema); no
   OTIUM products, collections, or luxury copy remain anywhere.
3. **Ex/inc-VAT toggle** flips every displayed price; cart & checkout itemise
   ex-VAT subtotal, VAT, and inc-VAT total; **price breaks** auto-apply; **MOQ/
   increments** are enforced.
4. **Admin**: add / edit / delete a product and see it reflected instantly in
   the storefront; export + reset-to-seed work.
5. **Bulk import**: uploading the provided sample CSV **and** an `.xlsx` adds/
   updates products, shows a validation preview with flagged bad rows, and
   reports a summary; export round-trips back to a clean import.
6. **Bulk Order Pad** adds multiple SKUs to the cart in one action.
7. Redesign is applied consistently (palette, fonts, product cards, trust
   furniture) and is responsive + accessible.
8. README + `docs/` (CSV template + column doc) are updated; project renamed to
   `wholesale-traders`.

---

## §14. VERIFY & DELIVER

- **Build**, then **drive the app in a browser** (use the repo’s verify/run
  skill pattern if present) through: Home → Shop (filter by category, flip VAT
  toggle) → Product (price-break table, add cases respecting MOQ) → Bulk Order
  Pad (add several SKUs) → Cart/Checkout (VAT itemised) → Admin (add a product,
  bulk-import the sample CSV, export). Fix what breaks.
- Commit in logical phases with clear messages; do a final clean build; then
  **push**. Do **not** open a pull request unless asked.
- End with a short summary: what changed, key files, the persistence model and
  its caveat, how to run it, and any assumptions you made.

Build it. Work through the phases, keep a task list, and don’t stop to ask —
make the reasonable call and keep going.
