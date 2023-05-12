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
import ProductCard from "../components/ProductCard";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    };

    getProducts();
  }, []);

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
    <div>
    {products.map(({ id, ...product }) => (
      <ProductCard key={id} id={id} {...product} />
    ))}
    </div>
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
