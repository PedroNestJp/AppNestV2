import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartDoc = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartDoc);

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          const items = cartData.items;
          setCartItems(items);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const handleIncreaseQuantity = async (itemId, currentQuantity) => {
    await updateDoc(doc(db, "carts", itemId), {
      quantity: currentQuantity + 1,
    });
  };

  const handleDecreaseQuantity = async (itemId, currentQuantity) => {
    await updateDoc(doc(db, "carts", itemId), {
      quantity: currentQuantity - 1,
    });
  };

  const handleRemoveItem = async (itemId) => {
    await deleteDoc(doc(db, "carts", itemId));
  };

  return (
    <div>
      <h1>Meu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <>
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>Preço: R$ {item.price}</p>
              <p>Quantidade: {item.quantity}</p>
              <p>descrição: {item.oldPrice}</p>
            </li>
                        <div>
                        <button
                          onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                      <div>R$ ${item.price}</div>
                      <div>
                        <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
                      </div>
                      </>
          ))}
        </ul>
      )}
      <button>Finalizar compra</button>
    </div>
  );
};

export default CartPage;
