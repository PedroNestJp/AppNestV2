import { useState } from "react";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId) => {
    setCartItems((prevItems) => [...prevItems, productId]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
