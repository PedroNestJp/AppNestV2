import { createContext, useState } from 'react';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addItem(item) {
    setCart((prevCart) => [...prevCart, item]);
  }

  function removeItem(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function updateItemQuantity(id, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  }

  function removeAllItems() {
    setCart([]);
  }

   const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const values = {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    removeAllItems,
    cartTotal,
    cartItemsCount,
  };

  return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
  );
}
