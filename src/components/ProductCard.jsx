import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, getCollection } from '../data/products';
import HeartIcon from './HeartIcon';
import PlaceholderImage from './PlaceholderImage';

export default function ProductCard({ product }) {
  const collection = getCollection(product.collection);
  const { isSaved, toggleItem } = useWishlist();
  const saved = isSaved(product.id);

  return (
    <Link to={`/products/${product.id}`} aria-label={product.name}>
      <article className="card card--interactive">
        <div className="card__media">
          <PlaceholderImage label={`${product.name} — photo soon`} />
          <button
            type="button"
            className={`wish-btn${saved ? ' wish-btn--active' : ''}`}
            aria-pressed={saved}
            aria-label={
              saved
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleItem(product.id);
            }}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>
        <div className="card__body">
          <span className="tag">{collection.name}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__desc">{product.description}</p>
          <p className="product-card__price">{formatPrice(product.price)}</p>
          {product.inStock === false && (
            <p className="product-card__stock">Out of stock</p>
          )}
        </div>
      </article>
    </Link>
  );
}
