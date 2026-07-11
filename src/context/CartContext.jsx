import { createContext, useContext, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../data/products';

const CartContext = createContext(null);

// items: [{ productId, quantity }]
function cartReducer(items, action) {
  switch (action.type) {
    case 'add': {
      const existing = items.find((i) => i.productId === action.productId);
      if (existing) {
        return items.map((i) =>
          i.productId === action.productId
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        );
      }
      return [...items, { productId: action.productId, quantity: action.quantity }];
    }
    case 'setQuantity': {
      if (action.quantity < 1) {
        return items.filter((i) => i.productId !== action.productId);
      }
      return items.map((i) =>
        i.productId === action.productId ? { ...i, quantity: action.quantity } : i
      );
    }
    case 'remove':
      return items.filter((i) => i.productId !== action.productId);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => {
    const lines = items.map((item) => ({
      ...item,
      product: getProduct(item.productId),
    }));
    const subtotal = lines.reduce(
      (sum, line) => sum + line.product.price * line.quantity,
      0
    );
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);

    return {
      lines,
      subtotal,
      count,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (productId, quantity = 1) => {
        dispatch({ type: 'add', productId, quantity });
        setIsOpen(true);
      },
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'setQuantity', productId, quantity }),
      removeItem: (productId) => dispatch({ type: 'remove', productId }),
      clearCart: () => dispatch({ type: 'clear' }),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
