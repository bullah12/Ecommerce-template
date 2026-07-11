// Single source of truth for catalog data in this phase.
// Images are intentionally placeholders — real photography comes later.

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
    id: 'sleep',
    name: 'Sleep',
    tagline: 'End the day well',
    description:
      'Rest is a practice, not an accident. Small objects that mark the boundary between the day and the night.',
  },
];

export const products = [
  {
    id: 'stoneware-pour-over-set',
    name: 'Stoneware Pour-Over Set',
    price: 98,
    collection: 'morning-ritual',
    description:
      'A hand-thrown carafe and dripper in matte oat-glazed stoneware. The wide base keeps coffee warm through a second cup, and the dripper seats flush so nothing rattles at 6 a.m.',
    featured: true,
  },
  {
    id: 'brass-coffee-scoop',
    name: 'Solid Brass Coffee Scoop',
    price: 42,
    collection: 'morning-ritual',
    description:
      'One level scoop, one perfect cup. Machined from a single bar of brass, it develops a soft patina with daily use — a record of every morning it has measured.',
    featured: false,
  },
  {
    id: 'linen-waffle-robe',
    name: 'Linen Waffle Robe',
    price: 148,
    collection: 'morning-ritual',
    description:
      'Midweight European flax in a honeycomb weave that softens with every wash. Cut generously through the shoulders, with a pocket sized for a phone you are trying to ignore.',
    featured: true,
  },
  {
    id: 'walnut-desk-tray',
    name: 'Walnut Desk Tray',
    price: 86,
    collection: 'deep-work',
    description:
      'A shallow, oiled-walnut tray with three carved wells — one for the pen, one for the glasses, one for whatever the day empties out of your pockets. Order you can see.',
    featured: true,
  },
  {
    id: 'weighted-fountain-pen',
    name: 'Weighted Fountain Pen',
    price: 124,
    collection: 'deep-work',
    description:
      'Balanced brass body with a medium steel nib that glides at the speed of thought. Heavy enough to feel deliberate, smooth enough to disappear once the writing starts.',
    featured: true,
  },
  {
    id: 'wool-felt-desk-pad',
    name: 'Wool Felt Desk Pad',
    price: 72,
    collection: 'deep-work',
    description:
      'Five millimeters of pressed merino felt that quiets the clack of a keyboard and warms a cold desk. Naturally stain-resistant, and it lies flat from the day it arrives.',
    featured: false,
  },
  {
    id: 'silk-sleep-mask',
    name: 'Mulberry Silk Sleep Mask',
    price: 58,
    collection: 'sleep',
    description:
      'Double-lined 22-momme mulberry silk with a wide, no-slip band that never catches hair. Blocks the streetlight, the sunrise, and the glow of a charging laptop.',
    featured: true,
  },
  {
    id: 'cedar-lavender-pillow-mist',
    name: 'Cedar & Lavender Pillow Mist',
    price: 36,
    collection: 'sleep',
    description:
      'Two spritzes across the pillow, ten minutes before you lie down. Steam-distilled cedarwood and French lavender in a glass bottle that belongs on the nightstand.',
    featured: true,
  },
];

export const getProduct = (id) => products.find((p) => p.id === id);

export const getCollection = (id) => collections.find((c) => c.id === id);

export const getProductsByCollection = (collectionId) =>
  products.filter((p) => p.collection === collectionId);

export const getFeaturedProducts = () => products.filter((p) => p.featured);

export const formatPrice = (amount) => `$${amount.toFixed(0)}`;
