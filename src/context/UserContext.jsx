import { createContext, useContext, useMemo, useState } from 'react';
import { sampleAddresses, sampleOrders } from '../data/account';

const UserContext = createContext(null);

// Mock order numbers continue after the sample history.
let orderSeq = 2500;
let addressSeq = 2;

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(sampleOrders);
  const [addresses, setAddresses] = useState(sampleAddresses);
  const [lastOrderId, setLastOrderId] = useState(null);

  const value = useMemo(
    () => ({
      user,
      orders,
      addresses,
      lastOrder: orders.find((o) => o.id === lastOrderId) ?? null,
      // Mock auth: any credentials pass; nothing is stored or sent anywhere.
      signIn: ({ name, email }) =>
        setUser({ name: name?.trim() || email.split('@')[0], email }),
      signOut: () => setUser(null),
      placeOrder: ({ items, shipping, subtotal, shippingCost, total }) => {
        orderSeq += 1;
        const order = {
          id: `OT-${orderSeq}`,
          date: new Date().toISOString().slice(0, 10),
          status: 'Confirmed',
          items,
          shipping,
          subtotal,
          shippingCost,
          total,
        };
        setOrders((prev) => [order, ...prev]);
        setLastOrderId(order.id);
        return order;
      },
      addAddress: (address) => {
        addressSeq += 1;
        setAddresses((prev) => [
          ...prev,
          { ...address, id: `addr-${addressSeq}`, isDefault: false },
        ]);
      },
      removeAddress: (id) =>
        setAddresses((prev) => prev.filter((a) => a.id !== id)),
    }),
    [user, orders, addresses, lastOrderId]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
