import React, { createContext, useState } from "react";

export const cart = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    const itemIndex = items.findIndex((item) => item.productId === product.productId);

    if (itemIndex === -1) {
      setItems([...items, { ...product, quantity: 1 }]);
    } else {
      const newItems = [...items];
      newItems[itemIndex].quantity += 1;
      setItems(newItems);
    }
  };

  const removeItem = (productId) => {
    const newItems = items.filter((item) => item.productId !== productId);
    setItems(newItems);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return <cart.Provider value={{ items, addItem, removeItem, totalPrice }}>{children}</cart.Provider>;
};

export default CartProvider;
