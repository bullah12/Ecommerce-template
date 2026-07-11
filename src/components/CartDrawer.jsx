import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import Button from './Button';
import PlaceholderImage from './PlaceholderImage';
import QuantitySelector from './QuantitySelector';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { lines, subtotal, isOpen, closeCart, setQuantity, removeItem } =
    useCart();

  // Close on Escape while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  // Move focus into the dialog on open; return it on close
  const closeButtonRef = useRef(null);
  const lastFocusedRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement;
      closeButtonRef.current?.focus();
    } else if (lastFocusedRef.current) {
      lastFocusedRef.current.focus?.();
      lastFocusedRef.current = null;
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? ' cart-overlay--open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        // String form keeps React 18 rendering the bare `inert` attribute,
        // so the closed drawer is untabbable as well as hidden
        inert={isOpen ? undefined : ''}
      >
        <div className="cart-drawer__head">
          <h2 className="cart-drawer__title">Your cart</h2>
          <button
            type="button"
            ref={closeButtonRef}
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>

        <div className="cart-drawer__items">
          {lines.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty — a quiet start.</p>
              <Button variant="secondary" onClick={closeCart}>
                Keep browsing
              </Button>
            </div>
          ) : (
            lines.map(({ product, quantity }) => (
              <div className="cart-item" key={product.id}>
                <div className="cart-item__media">
                  <PlaceholderImage label="Photo soon" />
                </div>
                <div className="cart-item__info">
                  <p className="cart-item__name">{product.name}</p>
                  <p className="cart-item__price">
                    {formatPrice(product.price)} each
                  </p>
                  <div className="cart-item__row">
                    <QuantitySelector
                      small
                      value={quantity}
                      onChange={(next) => setQuantity(product.id, next)}
                      label={`Quantity of ${product.name}`}
                    />
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="cart-drawer__shipping-note">
              Shipping is calculated at checkout — free on orders over $150.
            </p>
            <Button
              block
              onClick={() => {
                closeCart();
                navigate('/checkout');
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
