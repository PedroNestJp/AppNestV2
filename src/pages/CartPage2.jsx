import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const Checkout = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
      const newItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(newItems);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleIncreaseQuantity = async (itemId, currentQuantity) => {
    await updateDoc(doc(db, "cart", itemId), { quantity: currentQuantity + 1 });
  };

  const handleDecreaseQuantity = async (itemId, currentQuantity) => {
    await updateDoc(doc(db, "cart", itemId), { quantity: currentQuantity - 1 });
  };

  const handleRemoveItem = async (itemId) => {
    await deleteDoc(doc(db, "cart", itemId));
  };

  return (
    <div>
      <h1>Checkout</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>Item $ {item.id}</div>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
