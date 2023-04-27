import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    const itemIndex = items.findIndex((item) => item.id === product.id);
console.log(itemIndex)
    if (itemIndex === -1) {
      setItems([...items, { ...product, quantity: product.quantity }]);
    } else {
      const newItems = [...items];
      newItems[itemIndex].quantity += 1;
      setItems(newItems);
    }
  };

  const removeItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return <CartContext.Provider value={{ items, addItem, removeItem, totalPrice }}>{children}</CartContext.Provider>;
};

export default CartProvider;
