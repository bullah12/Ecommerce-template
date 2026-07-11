// Single source of truth for catalog data in this phase.
// Images are intentionally placeholders — real photography comes later.
//
// Phase 2 adds per-product `inStock`, `dateAdded`, and `popularity` fields.
// "Best Sellers" and "New Arrivals" are derived collections (see helpers
// at the bottom) rather than hand-maintained flags.

export const collections = [
  {
    id: 'morning-ritual',
    name: 'Morning Ritual',
    tagline: 'Begin slowly',
    description:
      'The first hour sets the tone for the rest. These pieces ask you to pour, steep, and wake at your own pace.',
  },
  {
    id: 'deep-work',
    name: 'Deep Work',
    tagline: 'Clear the desk, clear the mind',
    description:
      'Focus is a room you furnish. Everything here earns its place on the desk — nothing blinks, buzzes, or begs for attention.',
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    tagline: 'Permission to do nothing',
    description:
      'The unscheduled hours are the point, not the leftover. Baths, blankets, and candlelight for evenings with no plans worth keeping.',
  },
  {
    id: 'sleep',
    name: 'Sleep',
    tagline: 'End the day well',
    description:
      'Rest is a practice, not an accident. Small objects that mark the boundary between the day and the night.',
  },
  {
    id: 'gifts',
    name: 'Gifts',
    tagline: 'Give someone an hour back',
    description:
      'The best gifts are excuses — to sleep in, to take the long bath, to sit with a pot of tea. Ready-boxed sets and small certainties for people you like.',
  },
];

export const products = [
  /* ---- Morning Ritual ---- */
  {
    id: 'stoneware-pour-over-set',
    name: 'Stoneware Pour-Over Set',
    price: 98,
    collection: 'morning-ritual',
    description:
      'A hand-thrown carafe and dripper in matte oat-glazed stoneware. The wide base keeps coffee warm through a second cup, and the dripper seats flush so nothing rattles at 6 a.m.',
    featured: true,
    inStock: true,
    dateAdded: '2025-11-04',
    popularity: 86,
  },
  {
    id: 'brass-coffee-scoop',
    name: 'Solid Brass Coffee Scoop',
    price: 42,
    collection: 'morning-ritual',
    description:
      'One level scoop, one perfect cup. Machined from a single bar of brass, it develops a soft patina with daily use — a record of every morning it has measured.',
    featured: false,
    inStock: true,
    dateAdded: '2025-11-04',
    popularity: 74,
  },
  {
    id: 'linen-waffle-robe',
    name: 'Linen Waffle Robe',
    price: 148,
    collection: 'morning-ritual',
    description:
      'Midweight European flax in a honeycomb weave that softens with every wash. Cut generously through the shoulders, with a pocket sized for a phone you are trying to ignore.',
    featured: true,
    inStock: true,
    dateAdded: '2025-12-01',
    popularity: 91,
  },
  {
    id: 'ivory-ceramic-teapot',
    name: 'Ivory Ceramic Teapot',
    price: 118,
    collection: 'morning-ritual',
    description:
      'A two-cup teapot glazed in soft ivory, with a generous handle and a spout that pours clean to the last drop. Sized for one person taking their time, or two people sharing it.',
    featured: false,
    inStock: true,
    dateAdded: '2026-01-15',
    popularity: 62,
  },
  {
    id: 'oak-breakfast-board',
    name: 'Oak Breakfast Board',
    price: 64,
    collection: 'morning-ritual',
    description:
      'Solid white oak, shaped to live on the counter and finished with food-safe oil. One side scored for the morning toast, the other kept smooth for serving.',
    featured: false,
    inStock: true,
    dateAdded: '2026-02-02',
    popularity: 55,
  },
  {
    id: 'double-walled-glass-cups',
    name: 'Double-Walled Glass Cups (Set of 2)',
    price: 54,
    collection: 'morning-ritual',
    description:
      'Hand-blown borosilicate cups that keep the coffee hot and the fingers cool. The double wall makes every pour look like it is floating — a small daily spectacle.',
    featured: false,
    inStock: true,
    dateAdded: '2026-06-18',
    popularity: 48,
  },

  /* ---- Deep Work ---- */
  {
    id: 'walnut-desk-tray',
    name: 'Walnut Desk Tray',
    price: 86,
    collection: 'deep-work',
    description:
      'A shallow, oiled-walnut tray with three carved wells — one for the pen, one for the glasses, one for whatever the day empties out of your pockets. Order you can see.',
    featured: true,
    inStock: true,
    dateAdded: '2025-11-12',
    popularity: 88,
  },
  {
    id: 'weighted-fountain-pen',
    name: 'Weighted Fountain Pen',
    price: 124,
    collection: 'deep-work',
    description:
      'Balanced brass body with a medium steel nib that glides at the speed of thought. Heavy enough to feel deliberate, smooth enough to disappear once the writing starts.',
    featured: true,
    inStock: true,
    dateAdded: '2025-11-12',
    popularity: 79,
  },
  {
    id: 'wool-felt-desk-pad',
    name: 'Wool Felt Desk Pad',
    price: 72,
    collection: 'deep-work',
    description:
      'Five millimeters of pressed merino felt that quiets the clack of a keyboard and warms a cold desk. Naturally stain-resistant, and it lies flat from the day it arrives.',
    featured: false,
    inStock: true,
    dateAdded: '2025-12-05',
    popularity: 68,
  },
  {
    id: 'brass-library-task-lamp',
    name: 'Brass Library Task Lamp',
    price: 189,
    collection: 'deep-work',
    description:
      'A low, warm pool of light for the late shift. Solid brass with a felt-lined base, an analog dimmer, and not a single blue LED anywhere on it.',
    featured: false,
    inStock: false,
    dateAdded: '2026-01-20',
    popularity: 58,
  },
  {
    id: 'linen-bound-notebook',
    name: 'Linen-Bound Notebook',
    price: 34,
    collection: 'deep-work',
    description:
      'Ninety-six pages of thick, fountain-pen-friendly paper stitched into a washed linen cover. Lies flat from the first page, which is where most notebooks lose their nerve.',
    featured: false,
    inStock: true,
    dateAdded: '2026-02-10',
    popularity: 83,
  },
  {
    id: 'cork-monitor-stand',
    name: 'Solid Cork Monitor Stand',
    price: 79,
    collection: 'deep-work',
    description:
      'Raises the screen to eye level and swallows the clutter beneath it. Pressed Portuguese cork, warm to the touch and quietly forgiving of a set-down mug.',
    featured: false,
    inStock: true,
    dateAdded: '2026-06-25',
    popularity: 41,
  },

  /* ---- Relaxation ---- */
  {
    id: 'waffle-bath-sheet',
    name: 'Waffle Bath Sheet',
    price: 68,
    collection: 'relaxation',
    description:
      'An oversized waffle-weave sheet in long-staple cotton that drinks water fast and dries before the mirror clears. Lighter than terry, twice as quick.',
    featured: false,
    inStock: true,
    dateAdded: '2026-03-10',
    popularity: 66,
  },
  {
    id: 'hinoki-bath-salts',
    name: 'Hinoki Bath Salts',
    price: 38,
    collection: 'relaxation',
    description:
      'Dead Sea salt scented with Japanese cypress — the smell of a wooden bathhouse in the rain. One scoop turns an ordinary Tuesday bath into an occasion.',
    featured: false,
    inStock: true,
    dateAdded: '2026-03-10',
    popularity: 72,
  },
  {
    id: 'beeswax-taper-candles',
    name: 'Beeswax Taper Candles (Set of 6)',
    price: 32,
    collection: 'relaxation',
    description:
      'Hand-dipped pure beeswax tapers that burn slow, smokeless, and faintly of honey. Dinner light, bath light, power-cut light.',
    featured: false,
    inStock: true,
    dateAdded: '2026-04-01',
    popularity: 81,
  },
  {
    id: 'linen-reading-pillow',
    name: 'Linen Reading Pillow',
    price: 89,
    collection: 'relaxation',
    description:
      'A firm, wedge-backed pillow that turns any bed into a reading chair. The flax cover unzips for washing; the chapter count is up to you.',
    featured: false,
    inStock: true,
    dateAdded: '2026-04-15',
    popularity: 44,
  },
  {
    id: 'cashmere-lounge-throw',
    name: 'Cashmere Lounge Throw',
    price: 248,
    collection: 'relaxation',
    description:
      'Four-ply Mongolian cashmere in a generous drape, for the sofa hours when nothing else is scheduled. The most persuasive argument for staying in.',
    featured: false,
    inStock: false,
    dateAdded: '2026-04-20',
    popularity: 49,
  },
  {
    id: 'ceramic-incense-dish',
    name: 'Ceramic Incense Dish & Cedar Sticks',
    price: 44,
    collection: 'relaxation',
    description:
      'A shallow, sand-glazed dish with twenty slow-burning cedar sticks. Ten quiet minutes, marked in smoke.',
    featured: false,
    inStock: true,
    dateAdded: '2026-07-02',
    popularity: 57,
  },

  /* ---- Sleep ---- */
  {
    id: 'silk-sleep-mask',
    name: 'Mulberry Silk Sleep Mask',
    price: 58,
    collection: 'sleep',
    description:
      'Double-lined 22-momme mulberry silk with a wide, no-slip band that never catches hair. Blocks the streetlight, the sunrise, and the glow of a charging laptop.',
    featured: true,
    inStock: true,
    dateAdded: '2025-11-20',
    popularity: 95,
  },
  {
    id: 'cedar-lavender-pillow-mist',
    name: 'Cedar & Lavender Pillow Mist',
    price: 36,
    collection: 'sleep',
    description:
      'Two spritzes across the pillow, ten minutes before you lie down. Steam-distilled cedarwood and French lavender in a glass bottle that belongs on the nightstand.',
    featured: true,
    inStock: true,
    dateAdded: '2025-11-20',
    popularity: 90,
  },
  {
    id: 'washed-linen-sleep-throw',
    name: 'Washed Linen Sleep Throw',
    price: 132,
    collection: 'sleep',
    description:
      'A midweight throw in stonewashed flax for the foot of the bed. Heavy enough to signal the day is over, light enough to sleep under in July.',
    featured: false,
    inStock: true,
    dateAdded: '2026-01-08',
    popularity: 52,
  },
  {
    id: 'nightstand-carafe-set',
    name: 'Nightstand Carafe & Cup',
    price: 46,
    collection: 'sleep',
    description:
      'A hand-blown carafe with a cup that doubles as its lid. Water within reach at 3 a.m., and no screen lit up to find it.',
    featured: false,
    inStock: true,
    dateAdded: '2026-02-14',
    popularity: 71,
  },
  {
    id: 'merino-bed-socks',
    name: 'Merino Bed Socks',
    price: 28,
    collection: 'sleep',
    description:
      'Loosely knit merino with no elastic bite at the cuff. Warm feet fall asleep faster — this is the entire product philosophy.',
    featured: false,
    inStock: true,
    dateAdded: '2026-03-01',
    popularity: 77,
  },
  {
    id: 'chamomile-night-tea',
    name: 'Chamomile Night Tea',
    price: 24,
    collection: 'sleep',
    description:
      'Whole chamomile flowers with lemon balm and a little lavender, in twenty compostable sachets. The kettle going on is the first step of the wind-down.',
    featured: false,
    inStock: true,
    dateAdded: '2026-06-30',
    popularity: 63,
  },

  /* ---- Gifts ---- */
  {
    id: 'slow-morning-gift-set',
    name: 'The Slow Morning Set',
    price: 135,
    collection: 'gifts',
    description:
      'The pour-over carafe, the brass scoop, and a half-kilo of our house-roast beans, boxed and ready to give. A whole morning routine in one parcel.',
    featured: false,
    inStock: true,
    dateAdded: '2026-05-05',
    popularity: 76,
  },
  {
    id: 'considered-desk-gift-set',
    name: 'The Considered Desk Set',
    price: 180,
    collection: 'gifts',
    description:
      'The walnut tray, the linen notebook, and the weighted pen together — everything a desk needs and nothing it doesn’t. Arrives gift-wrapped in plain kraft.',
    featured: false,
    inStock: false,
    dateAdded: '2026-05-05',
    popularity: 60,
  },
  {
    id: 'wind-down-gift-set',
    name: 'The Wind-Down Set',
    price: 98,
    collection: 'gifts',
    description:
      'The silk sleep mask, the pillow mist, and the chamomile night tea in one quiet box. The gift equivalent of telling someone to go to bed early — kindly.',
    featured: false,
    inStock: true,
    dateAdded: '2026-05-12',
    popularity: 84,
  },
  {
    id: 'honed-marble-catchall',
    name: 'Honed Marble Catchall',
    price: 58,
    collection: 'gifts',
    description:
      'A palm-sized dish in honed Carrara for the entryway ritual: keys, ring, the day itself, set down at the door.',
    featured: false,
    inStock: false,
    dateAdded: '2026-05-20',
    popularity: 47,
  },
  {
    id: 'brass-page-anchor',
    name: 'Brass Page Anchor',
    price: 36,
    collection: 'gifts',
    description:
      'A weighted brass bar that holds a book open to the recipe, the sheet music, or the page you swore you would come back to. Small, heavy, endlessly borrowed.',
    featured: false,
    inStock: true,
    dateAdded: '2026-06-08',
    popularity: 53,
  },
  {
    id: 'vegetable-tanned-luggage-tag',
    name: 'Vegetable-Tanned Luggage Tag',
    price: 42,
    collection: 'gifts',
    description:
      'Thick bridle leather that ages into a travel diary of its own. Stamped, stitched, and buckled — the opposite of a barcode sticker.',
    featured: false,
    inStock: true,
    dateAdded: '2026-07-05',
    popularity: 59,
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const getCollection = (id) => collections.find((c) => c.id === id);

export const getProductsByCollection = (collectionId) =>
  products.filter((p) => p.collection === collectionId);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

// Derived merchandising groups: the 8 most popular / most recent pieces.
export const getBestSellers = (limit = 8) =>
  [...products].sort((a, b) => b.popularity - a.popularity).slice(0, limit);

export const getNewArrivals = (limit = 8) =>
  [...products]
    .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
    .slice(0, limit);

export const formatPrice = (amount) => `$${amount.toFixed(0)}`;
