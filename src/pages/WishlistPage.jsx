import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const navigate = useNavigate();
  const { products, count } = useWishlist();

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Saved for later</span>
        <h1 className="section__title">Wishlist</h1>
        <p className="section__sub">
          Pieces you are still thinking about. They stay here for this visit —
          tap the heart again to let one go.
        </p>
      </div>

      {count === 0 ? (
        <div className="shop-empty">
          <p className="shop-empty__title">Nothing saved yet</p>
          <p className="section__sub">
            Tap the heart on any piece to keep it here while you decide.
          </p>
          <Button variant="secondary" onClick={() => navigate('/shop')}>
            Browse the shop
          </Button>
        </div>
      ) : (
        <>
          <p className="shop-count" role="status">
            {count} {count === 1 ? 'piece' : 'pieces'} saved
          </p>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
