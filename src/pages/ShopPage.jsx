import { useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import {
  collections,
  getBestSellers,
  getCollection,
  getNewArrivals,
  products,
} from '../data/products';

// Merchandising views layered over the real collections. Membership is
// derived from catalog data, so these never go stale.
const VIRTUAL_COLLECTIONS = {
  'best-sellers': {
    name: 'Best Sellers',
    tagline: 'Proven in daily use',
    description:
      'The pieces that sell through fastest and come back as gifts for someone else. If you are starting somewhere, start here.',
  },
  'new-arrivals': {
    name: 'New Arrivals',
    tagline: 'Just landed',
    description:
      'The newest additions to the line, fresh from the workshop and the kiln. Small first batches — when they sell through, they are gone for a while.',
  },
};

const ALL_META = {
  name: 'Shop all',
  tagline: 'The full line',
  description:
    'Every piece we make, across all five collections. Filter by collection, price, or availability — or search for the thing you half-remember.',
};

const PRICE_RANGES = [
  { id: 'any', label: 'Any price' },
  { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 – $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 – $150', min: 100, max: 150 },
  { id: '150-up', label: '$150 and up', min: 150, max: Infinity },
];

const DEFAULT_SORT = 'best-selling';

const SORT_OPTIONS = [
  { id: 'best-selling', label: 'Best selling' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

const SORTERS = {
  'best-selling': (a, b) => b.popularity - a.popularity,
  newest: (a, b) => b.dateAdded.localeCompare(a.dateAdded),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('collection') ?? 'all';
  const query = searchParams.get('q') ?? '';
  const sortParam = searchParams.get('sort');
  const sort = SORTERS[sortParam] ? sortParam : DEFAULT_SORT;
  const priceRange =
    PRICE_RANGES.find((r) => r.id === searchParams.get('price')) ??
    PRICE_RANGES[0];
  const inStockOnly = searchParams.get('stock') === 'in';

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    const next = new URLSearchParams();
    if (activeTab !== 'all') next.set('collection', activeTab);
    setSearchParams(next, { replace: true });
  };

  const bestSellerIds = new Set(getBestSellers().map((p) => p.id));
  const newArrivalIds = new Set(getNewArrivals().map((p) => p.id));
  const q = query.trim().toLowerCase();

  const results = products
    .filter((p) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'best-sellers') return bestSellerIds.has(p.id);
      if (activeTab === 'new-arrivals') return newArrivalIds.has(p.id);
      return p.collection === activeTab;
    })
    .filter(
      (p) =>
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
    .filter(
      (p) =>
        priceRange.min === undefined ||
        (p.price >= priceRange.min && p.price < priceRange.max)
    )
    .filter((p) => !inStockOnly || p.inStock)
    .sort(SORTERS[sort]);

  const meta =
    activeTab === 'all'
      ? ALL_META
      : VIRTUAL_COLLECTIONS[activeTab] ?? getCollection(activeTab) ?? ALL_META;

  const tabs = [
    { id: 'all', name: 'All' },
    ...collections.map((c) => ({ id: c.id, name: c.name })),
    { id: 'best-sellers', name: 'Best Sellers' },
    { id: 'new-arrivals', name: 'New Arrivals' },
  ];

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">{meta.tagline}</span>
        <h1 className="section__title">{meta.name}</h1>
        <p className="section__sub">{meta.description}</p>
      </div>

      <nav className="shop-tabs" aria-label="Filter by collection">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`shop-tab${tab.id === activeTab ? ' shop-tab--active' : ''}`}
            aria-pressed={tab.id === activeTab}
            onClick={() =>
              setParam('collection', tab.id === 'all' ? '' : tab.id)
            }
          >
            {tab.name}
          </button>
        ))}
      </nav>

      <div className="shop-toolbar">
        <input
          type="search"
          className="input shop-toolbar__search"
          placeholder="Search by name or description"
          aria-label="Search products"
          value={query}
          onChange={(event) => setParam('q', event.target.value)}
        />
        <select
          className="input shop-toolbar__select"
          aria-label="Filter by price"
          value={priceRange.id}
          onChange={(event) =>
            setParam(
              'price',
              event.target.value === 'any' ? '' : event.target.value
            )
          }
        >
          {PRICE_RANGES.map((range) => (
            <option key={range.id} value={range.id}>
              {range.label}
            </option>
          ))}
        </select>
        <select
          className="input shop-toolbar__select"
          aria-label="Sort products"
          value={sort}
          onChange={(event) =>
            setParam(
              'sort',
              event.target.value === DEFAULT_SORT ? '' : event.target.value
            )
          }
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              Sort: {option.label}
            </option>
          ))}
        </select>
        <label className="shop-toolbar__check">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) =>
              setParam('stock', event.target.checked ? 'in' : '')
            }
          />
          In stock only
        </label>
      </div>

      <p className="shop-count" role="status">
        {results.length} {results.length === 1 ? 'piece' : 'pieces'}
      </p>

      {results.length > 0 ? (
        <div className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <p className="shop-empty__title">Nothing to show — yet</p>
          <p className="section__sub">
            {q
              ? `No pieces match “${query.trim()}” with the current filters.`
              : 'No pieces match the current filters.'}{' '}
            Try a different word, widen the price range, or clear everything
            and browse.
          </p>
          <Button variant="secondary" onClick={clearFilters}>
            Clear search &amp; filters
          </Button>
        </div>
      )}
    </main>
  );
}
