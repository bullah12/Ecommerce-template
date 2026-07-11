import { createContext, useContext, useMemo, useReducer } from 'react';
import { getProduct } from '../data/products';

const WishlistContext = createContext(null);

// ids: [productId] — same reducer-driven pattern as the cart.
function wishlistReducer(ids, action) {
  switch (action.type) {
    case 'toggle':
      return ids.includes(action.productId)
        ? ids.filter((id) => id !== action.productId)
        : [...ids, action.productId];
    case 'remove':
      return ids.filter((id) => id !== action.productId);
    default:
      return ids;
  }
}

export function WishlistProvider({ children }) {
  const [ids, dispatch] = useReducer(wishlistReducer, []);

  const value = useMemo(
    () => ({
      products: ids.map(getProduct),
      count: ids.length,
      isSaved: (productId) => ids.includes(productId),
      toggleItem: (productId) => dispatch({ type: 'toggle', productId }),
      removeItem: (productId) => dispatch({ type: 'remove', productId }),
    }),
    [ids]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
