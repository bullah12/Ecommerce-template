import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import {
  getCollection,
  getFeaturedProducts,
  getProductsByCollection,
} from '../data/products';

const PREVIEW_COLLECTION_ID = 'deep-work';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const previewCollection = getCollection(PREVIEW_COLLECTION_ID);
  const previewProducts = getProductsByCollection(PREVIEW_COLLECTION_ID);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero__inner">
            <span className="eyebrow">
              Otium — objects for a considered day
            </span>
            <h1 className="hero__title">
              The hours you keep deserve better things.
            </h1>
            <p className="hero__lede">
              A small line of everyday objects for the three quietest parts of
              your day: the first coffee, the deep afternoon, and the last
              light before sleep.
            </p>
            <Button
              onClick={() =>
                document
                  .getElementById('featured')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Shop the collection
            </Button>
          </div>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">Featured</span>
            <h2 className="section__title">Worth keeping within reach</h2>
            <p className="section__sub">
              The pieces our customers reorder as gifts — proven in daily use,
              across all three collections.
            </p>
          </div>
          <div className="product-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="collection-row section">
        <div className="container">
          <div className="section__head">
            <span className="eyebrow">{previewCollection.tagline}</span>
            <h2 className="section__title">{previewCollection.name}</h2>
            <p className="section__sub">{previewCollection.description}</p>
          </div>
          <div className="collection-row__scroller">
            {previewProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
