import { createContext, useState } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  async function addItem(item) {
    setCart((prevCart) => [...prevCart, item]);

    try {
      const cartCol = collection(db, 'carts');
      const cartDoc = doc(cartCol, auth.currentUser.uid);
      const snapshot = await cartDoc.get();

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (cartItem) => cartItem.productId === item.id
        );
        console.log(cart)

        if (productIndex !== -1) {
          cart.items[productIndex].quantity += item.quantity;
        } else {
          cart.items.push({
            productId: item.id,
            quantity: item.quantity,
          });
        }

        await updateDoc(cartDoc, cart);
      } else {
        await updateDoc(cartDoc, {
          userId: auth.currentUser.uid,
          items: [{ productId: item.id, quantity: item.quantity }],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItem(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    try {
      const cartCol = collection(db, 'carts');
      const cartDoc = doc(cartCol, auth.currentUser.uid);
      const snapshot = await cartDoc.get();

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.productId === id
        );

        if (productIndex !== -1) {
          cart.items.splice(productIndex, 1);
          await updateDoc(cartDoc, cart);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateItemQuantity(id, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity };
        }
        return item;
      })
    );

    try {
      const cartCol = collection(db, 'carts');
      const cartDoc = doc(cartCol, auth.currentUser.uid);
      const snapshot = await cartDoc.get();

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.productId === id
        );

        if (productIndex !== -1) {
          cart.items[productIndex].quantity = quantity;
          await updateDoc(cartDoc, cart);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeAllItems() {
    setCart([]);

    try {
      const cartCol = collection(db, 'carts');
      const cartDoc = doc(cartCol, auth.currentUser.uid);
      await updateDoc(cartDoc, {
        items: [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateItemQuantity, removeAllItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
