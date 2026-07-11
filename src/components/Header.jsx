import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          OTIUM
        </Link>
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
    </header>
  );
}
