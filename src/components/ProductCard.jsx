import { Link } from 'react-router-dom';
import { formatPrice, getCollection } from '../data/products';
import PlaceholderImage from './PlaceholderImage';

export default function ProductCard({ product }) {
  const collection = getCollection(product.collection);

  return (
    <Link to={`/products/${product.id}`} aria-label={product.name}>
      <article className="card card--interactive">
        <PlaceholderImage label={`${product.name} — photo soon`} />
        <div className="card__body">
          <span className="tag">{collection.name}</span>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__desc">{product.description}</p>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </article>
    </Link>
  );
}
