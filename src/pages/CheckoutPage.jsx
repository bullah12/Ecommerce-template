import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Field from '../components/Field';
import PlaceholderImage from '../components/PlaceholderImage';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { formatPrice } from '../data/products';

const FREE_SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 12;

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Ireland',
  'France',
  'Germany',
  'Netherlands',
  'Japan',
];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  address1: '',
  city: '',
  postal: '',
  country: 'United States',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateShipping(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required.';
  if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.';
  if (!form.address1.trim()) errors.address1 = 'Street address is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!form.postal.trim()) errors.postal = 'Postal code is required.';
  return errors;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clearCart } = useCart();
  const { user, addresses, placeOrder } = useUser();

  const [step, setStep] = useState('shipping');
  const [form, setForm] = useState(() =>
    user ? { ...EMPTY_FORM, name: user.name, email: user.email } : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const [savedId, setSavedId] = useState('');

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shippingCost;

  const setField = (key) => (event) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const applySavedAddress = (id) => {
    setSavedId(id);
    const saved = addresses.find((a) => a.id === id);
    if (saved) {
      setForm((prev) => ({
        ...prev,
        name: saved.name,
        address1: saved.address1,
        city: saved.city,
        postal: saved.postal,
        country: saved.country,
      }));
    }
  };

  const handleShippingSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateShipping(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setStep('review');
      window.scrollTo({ top: 0 });
    }
  };

  const handlePlaceOrder = () => {
    placeOrder({
      items: lines.map(({ productId, quantity }) => ({ productId, quantity })),
      shipping: form,
      subtotal,
      shippingCost,
      total,
    });
    clearCart();
    navigate('/checkout/confirmation');
  };

  if (lines.length === 0) {
    return (
      <main className="container section">
        <div className="section__head">
          <span className="eyebrow">Checkout</span>
          <h1 className="section__title">Checkout</h1>
        </div>
        <div className="shop-empty">
          <p className="shop-empty__title">Your cart is empty</p>
          <p className="section__sub">
            Add a piece or two before checking out — the shop is a short walk
            away.
          </p>
          <Button variant="secondary" onClick={() => navigate('/shop')}>
            Browse the shop
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container section">
      <div className="section__head">
        <span className="eyebrow">Checkout</span>
        <h1 className="section__title">
          {step === 'shipping' ? 'Where should it go?' : 'One last look'}
        </h1>
        <p className="section__sub">
          A demo checkout — no payment is taken, nothing ships. Your details
          stay in the browser.
        </p>
      </div>

      <ol className="steps">
        <li
          className={`steps__item ${
            step === 'shipping' ? 'steps__item--active' : 'steps__item--done'
          }`}
        >
          1. Shipping
        </li>
        <li
          className={`steps__item${step === 'review' ? ' steps__item--active' : ''}`}
        >
          2. Review
        </li>
        <li className="steps__item">3. Confirmation</li>
      </ol>

      <div className="checkout-grid">
        <div className="account-stack">
          {step === 'shipping' ? (
            <article className="card">
              <div className="card__body">
                <form className="form" onSubmit={handleShippingSubmit} noValidate>
                  {user && addresses.length > 0 && (
                    <Field
                      select
                      id="saved-address"
                      label="Saved addresses"
                      value={savedId}
                      onChange={(event) => applySavedAddress(event.target.value)}
                    >
                      <option value="">Choose a saved address…</option>
                      {addresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.label} — {address.address1}
                        </option>
                      ))}
                    </Field>
                  )}
                  <div className="form__row">
                    <Field
                      id="name"
                      label="Full name"
                      autoComplete="name"
                      value={form.name}
                      onChange={setField('name')}
                      error={errors.name}
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={setField('email')}
                      error={errors.email}
                    />
                  </div>
                  <Field
                    id="address1"
                    label="Street address"
                    autoComplete="street-address"
                    value={form.address1}
                    onChange={setField('address1')}
                    error={errors.address1}
                  />
                  <div className="form__row">
                    <Field
                      id="city"
                      label="City"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={setField('city')}
                      error={errors.city}
                    />
                    <Field
                      id="postal"
                      label="Postal code"
                      autoComplete="postal-code"
                      value={form.postal}
                      onChange={setField('postal')}
                      error={errors.postal}
                    />
                  </div>
                  <div className="form__row">
                    <Field
                      select
                      id="country"
                      label="Country"
                      autoComplete="country-name"
                      value={form.country}
                      onChange={setField('country')}
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    <Field
                      id="phone"
                      label="Phone (optional)"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={setField('phone')}
                    />
                  </div>
                  <div className="form__actions">
                    <Button type="submit">Continue to review</Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => navigate('/shop')}
                    >
                      Keep shopping
                    </Button>
                  </div>
                </form>
              </div>
            </article>
          ) : (
            <>
              <article className="card">
                <div className="card__body">
                  <div className="order-head">
                    <span className="eyebrow">Deliver to</span>
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setStep('shipping')}
                    >
                      Edit
                    </button>
                  </div>
                  <p className="card__title">{form.name}</p>
                  <p className="text-soft">
                    {form.address1}
                    <br />
                    {form.city} {form.postal}, {form.country}
                    <br />
                    {form.email}
                    {form.phone && <> &middot; {form.phone}</>}
                  </p>
                </div>
              </article>
              <article className="card">
                <div className="card__body">
                  <span className="eyebrow">Items</span>
                  <div className="review-items">
                    {lines.map(({ product, quantity }) => (
                      <div className="cart-item" key={product.id}>
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
                    ))}
                  </div>
                </div>
              </article>
              <div className="form__actions">
                <Button onClick={handlePlaceOrder}>
                  Place order — {formatPrice(total)}
                </Button>
                <Button variant="ghost" onClick={() => setStep('shipping')}>
                  Back
                </Button>
              </div>
            </>
          )}
        </div>

        <aside>
          <article className="card">
            <div className="card__body">
              <span className="eyebrow">Order summary</span>
              {lines.map(({ product, quantity }) => (
                <div className="summary-line" key={product.id}>
                  <span>
                    {product.name} &times; {quantity}
                  </span>
                  <span>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div className="summary-line summary-line--total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-soft">
                Free shipping on orders over{' '}
                {formatPrice(FREE_SHIPPING_THRESHOLD)}. Taxes included.
              </p>
            </div>
          </article>
        </aside>
      </div>
    </main>
  );
}
