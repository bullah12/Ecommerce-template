import { Navigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { useUser } from '../context/UserContext';
import { formatPrice, getProduct } from '../data/products';

const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

export default function AccountOrdersPage() {
  const { user, orders } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Account</span>
        <h1 className="section__title">Order history</h1>
        <p className="section__sub">
          Sample past orders plus anything you check out in this session — a
          real order feed arrives with the backend.
        </p>
      </div>

      <AccountNav />

      <div className="account-stack">
        {orders.map((order) => {
          const itemCount = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          return (
            <article className="card" key={order.id}>
              <div className="card__body">
                <div className="order-head">
                  <h2 className="card__title">{order.id}</h2>
                  <span className="tag">{order.status}</span>
                </div>
                <p className="text-soft">
                  {formatDate(order.date)} &middot; {itemCount}{' '}
                  {itemCount === 1 ? 'item' : 'items'} &middot;{' '}
                  {formatPrice(order.total)}
                </p>
                <p className="text-soft">
                  {order.items
                    .map(
                      (item) =>
                        `${getProduct(item.productId).name} × ${item.quantity}`
                    )
                    .join(', ')}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
