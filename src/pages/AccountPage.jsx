import { Link, Navigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { useUser } from '../context/UserContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../data/products';

export default function AccountPage() {
  const { user, orders, addresses } = useUser();
  const { count: wishlistCount } = useWishlist();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const latestOrder = orders[0];
  const defaultAddress =
    addresses.find((a) => a.isDefault) ?? addresses[0] ?? null;

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Account</span>
        <h1 className="section__title">Welcome back, {user.name}</h1>
        <p className="section__sub">{user.email}</p>
      </div>

      <AccountNav />

      <div className="account-grid">
        <article className="card">
          <div className="card__body">
            <span className="eyebrow">Orders</span>
            <p className="card__title">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </p>
            {latestOrder && (
              <p className="text-soft">
                Latest: {latestOrder.id} &middot; {latestOrder.status} &middot;{' '}
                {formatPrice(latestOrder.total)}
              </p>
            )}
            <Link to="/account/orders" className="text-btn">
              View order history
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card__body">
            <span className="eyebrow">Addresses</span>
            {defaultAddress ? (
              <>
                <p className="card__title">{defaultAddress.label}</p>
                <p className="text-soft">
                  {defaultAddress.address1}
                  <br />
                  {defaultAddress.city} {defaultAddress.postal},{' '}
                  {defaultAddress.country}
                </p>
              </>
            ) : (
              <p className="text-soft">No addresses saved yet.</p>
            )}
            <Link to="/account/addresses" className="text-btn">
              Manage addresses
            </Link>
          </div>
        </article>

        <article className="card">
          <div className="card__body">
            <span className="eyebrow">Wishlist</span>
            <p className="card__title">
              {wishlistCount} {wishlistCount === 1 ? 'piece' : 'pieces'} saved
            </p>
            <p className="text-soft">
              Saved pieces keep for this visit — move them to the cart when
              you are sure.
            </p>
            <Link to="/wishlist" className="text-btn">
              View wishlist
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
