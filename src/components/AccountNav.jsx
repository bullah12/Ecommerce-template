import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const LINKS = [
  { to: '/account', label: 'Overview' },
  { to: '/account/orders', label: 'Order history' },
  { to: '/account/addresses', label: 'Addresses' },
];

// Account sub-navigation, reusing the shop page's pill tabs.
export default function AccountNav() {
  const { pathname } = useLocation();
  const { signOut } = useUser();

  return (
    <nav className="shop-tabs" aria-label="Account">
      {LINKS.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`shop-tab${pathname === link.to ? ' shop-tab--active' : ''}`}
          aria-current={pathname === link.to ? 'page' : undefined}
        >
          {link.label}
        </Link>
      ))}
      <button type="button" className="shop-tab" onClick={signOut}>
        Sign out
      </button>
    </nav>
  );
}
