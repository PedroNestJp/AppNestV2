import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "carts"), (snapshot) => {
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
  console.log(items);
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
      <h1>Carrinho</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>Item $ {item.price}</div>
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
      <Link to='https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0'>
      <button
        className="addCartButton"
        >
        Finalizar compra com um vendedor 
      </button>
      </Link>
    </div>
  );
};



export default Checkout;
