import { Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { WishlistProvider } from './context/WishlistContext';
import AccountAddressesPage from './pages/AccountAddressesPage';
import AccountOrdersPage from './pages/AccountOrdersPage';
import AccountPage from './pages/AccountPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <UserProvider>
          <Header />
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
          </Routes>
          <Footer />
          <CartDrawer />
        </UserProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
