import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { collections } from '../data/products';

export default function Header() {
  const { count, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const onShopPage = location.pathname === '/shop';
  const activeCollection = onShopPage ? searchParams.get('collection') : null;
  const query = onShopPage ? searchParams.get('q') ?? '' : '';

  // Typing anywhere in the site drops you onto /shop with the query applied;
  // on the shop page itself each keystroke just refines the URL in place.
  const handleSearch = (value) => {
    const next = new URLSearchParams(onShopPage ? searchParams : undefined);
    if (value) {
      next.set('q', value);
    } else {
      next.delete('q');
    }
    navigate(
      { pathname: '/shop', search: next.toString() },
      { replace: onShopPage }
    );
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          OTIUM
        </Link>
        <nav className="header__nav" aria-label="Shop">
          <Link
            to="/shop"
            className="header__nav-link"
            aria-current={onShopPage && !activeCollection ? 'true' : undefined}
          >
            Shop All
          </Link>
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/shop?collection=${collection.id}`}
              className="header__nav-link"
              aria-current={
                activeCollection === collection.id ? 'true' : undefined
              }
            >
              {collection.name}
            </Link>
          ))}
        </nav>
        <div className="header__tools">
          <input
            type="search"
            className="header__search"
            placeholder="Search"
            aria-label="Search products"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <button
            type="button"
            className="header__cart"
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
          >
            Cart
            {count > 0 && <span className="header__cart-count">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
