import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PlaceholderImage from '../components/PlaceholderImage';
import { useUser } from '../context/UserContext';
import { formatPrice, getProduct } from '../data/products';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { lastOrder } = useUser();

  // Only reachable right after placing an order in this session.
  if (!lastOrder) {
    return <Navigate to="/shop" replace />;
  }

  const firstName = lastOrder.shipping.name.trim().split(' ')[0];

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Order {lastOrder.id} — confirmed</span>
        <h1 className="section__title">
          Thank you, {firstName}. Take the rest of the day slowly.
        </h1>
        <p className="section__sub">
          A confirmation would normally be on its way to{' '}
          {lastOrder.shipping.email}. This is a demo — no payment was taken
          and nothing will ship.
        </p>
      </div>

      <div className="checkout-grid">
        <article className="card">
          <div className="card__body">
            <span className="eyebrow">Your order</span>
            <div className="review-items">
              {lastOrder.items.map(({ productId, quantity }) => {
                const product = getProduct(productId);
                return (
                  <div className="cart-item" key={productId}>
                    <div className="cart-item__media">
                      <PlaceholderImage label="Photo soon" />
                    </div>
                    <div className="cart-item__info">
                      <p className="cart-item__name">{product.name}</p>
                      <p className="cart-item__price">
                        {formatPrice(product.price)} &times; {quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(lastOrder.subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>
                {lastOrder.shippingCost === 0
                  ? 'Free'
                  : formatPrice(lastOrder.shippingCost)}
              </span>
            </div>
            <div className="summary-line summary-line--total">
              <span>Total</span>
              <span>{formatPrice(lastOrder.total)}</span>
            </div>
          </div>
        </article>

        <div className="account-stack">
          <article className="card">
            <div className="card__body">
              <span className="eyebrow">Deliver to</span>
              <p className="card__title">{lastOrder.shipping.name}</p>
              <p className="text-soft">
                {lastOrder.shipping.address1}
                <br />
                {lastOrder.shipping.city} {lastOrder.shipping.postal},{' '}
                {lastOrder.shipping.country}
              </p>
              <p className="text-soft">
                Ships within 3–5 days in plain, recyclable packaging.
              </p>
            </div>
          </article>
          <div className="form__actions">
            <Button onClick={() => navigate('/shop')}>Continue shopping</Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/account/orders')}
            >
              View order history
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
