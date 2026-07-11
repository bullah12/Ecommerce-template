import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import HeartIcon from '../components/HeartIcon';
import PlaceholderImage from '../components/PlaceholderImage';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getCollection, getProduct } from '../data/products';

export default function ProductPage() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const { addItem } = useCart();
  const { isSaved, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  // Brief "Added" confirmation on the button after adding to cart
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef(null);
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const handleAdd = () => {
    addItem(product.id, quantity);
    setJustAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(false), 1500);
  };

  if (!product) {
    return (
      <main className="container section">
        <div className="section__head">
          <h1 className="section__title">We couldn&rsquo;t find that piece</h1>
          <p className="section__sub">
            It may have sold through, or the link is out of date.
          </p>
        </div>
        <Link to="/" className="pdp__back">
          &larr; Back to the shop
        </Link>
      </main>
    );
  }

  const collection = getCollection(product.collection);

  return (
    <main className="container">
      <div className="pdp">
        <div className="pdp__media">
          <PlaceholderImage label={`${product.name} — photo soon`} />
        </div>
        <div className="pdp__info">
          <span className="tag">{collection.name}</span>
          <h1 className="pdp__name">{product.name}</h1>
          <p className="pdp__price">{formatPrice(product.price)}</p>
          <p className="pdp__desc">{product.description}</p>
          <div className="pdp__actions">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button onClick={handleAdd} disabled={!product.inStock}>
              {!product.inStock
                ? 'Out of stock'
                : justAdded
                  ? 'Added ✓'
                  : 'Add to cart'}
            </Button>
            <span className="visually-hidden" role="status">
              {justAdded ? `${product.name} added to cart` : ''}
            </span>
            <Button
              variant="secondary"
              onClick={() => toggleItem(product.id)}
              aria-pressed={isSaved(product.id)}
            >
              <HeartIcon filled={isSaved(product.id)} />
              {isSaved(product.id) ? 'Saved' : 'Save'}
            </Button>
          </div>
          <p className="pdp__note">
            Ships within 3–5 days in plain, recyclable packaging. Returns
            accepted for 30 days, no questions asked.
          </p>
          <Link to="/" className="pdp__back">
            &larr; Back to the shop
          </Link>
        </div>
      </div>
    </main>
  );
}
