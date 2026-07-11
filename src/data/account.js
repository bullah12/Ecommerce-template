// Sample account data for the mock-auth phase — no backend yet.
// Orders reference real product ids so history pages render live data.

export const sampleAddresses = [
  {
    id: 'addr-1',
    label: 'Home',
    name: 'Avery Lindqvist',
    address1: '14 Rowan Mews',
    city: 'Brooklyn',
    postal: '11201',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Studio',
    name: 'Avery Lindqvist',
    address1: '210 Fount Street, Floor 3',
    city: 'Brooklyn',
    postal: '11205',
    country: 'United States',
    isDefault: false,
  },
];

export const sampleOrders = [
  {
    id: 'OT-2496',
    date: '2026-07-03',
    status: 'Shipped',
    items: [
      { productId: 'hinoki-bath-salts', quantity: 1 },
      { productId: 'beeswax-taper-candles', quantity: 1 },
    ],
    subtotal: 70,
    shippingCost: 12,
    total: 82,
  },
  {
    id: 'OT-2471',
    date: '2026-06-14',
    status: 'Delivered',
    items: [
      { productId: 'walnut-desk-tray', quantity: 1 },
      { productId: 'linen-bound-notebook', quantity: 2 },
    ],
    subtotal: 154,
    shippingCost: 0,
    total: 154,
  },
  {
    id: 'OT-2417',
    date: '2026-05-28',
    status: 'Delivered',
    items: [
      { productId: 'silk-sleep-mask', quantity: 1 },
      { productId: 'cedar-lavender-pillow-mist', quantity: 2 },
    ],
    subtotal: 130,
    shippingCost: 12,
    total: 142,
  },
];
