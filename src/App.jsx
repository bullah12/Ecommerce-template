import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { WishlistProvider } from './context/WishlistContext';
import AboutPage from './pages/AboutPage';
import AccountAddressesPage from './pages/AccountAddressesPage';
import AccountOrdersPage from './pages/AccountOrdersPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';

// React Router keeps scroll position between routes; reset it so each
// page opens at the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <WishlistProvider>
        <UserProvider>
          <a className="skip-link" href="#content">
            Skip to content
          </a>
          <ScrollToTop />
          <Header />
          {/* Keyed on pathname so each navigation replays the fade-in */}
          <div
            className="route-fade"
            id="content"
            tabIndex={-1}
            key={location.pathname}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/products/:productId" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/checkout/confirmation"
                element={<OrderConfirmationPage />}
              />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account/orders" element={<AccountOrdersPage />} />
              <Route
                path="/account/addresses"
                element={<AccountAddressesPage />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
          <Footer />
          <CartDrawer />
        </UserProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
