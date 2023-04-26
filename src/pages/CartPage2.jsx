import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function CartPage2() {
  const [items, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartRef = collection(db, "carts");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartItems(items);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let newTotal = 0;
    items.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    setTotal(newTotal);
  }, [items]);

  async function removeItem(id) {
    try {
      await deleteDoc(doc(db, "carts", id));
      console.log("Item removed successfully");
    } catch (e) {
      console.error("Error removing item from cart", e);
    }
  }

  return (
    <div>
      <h1>Carrinho</h1>
      <table>
        <thead>
          <tr>
            <th>Name </th>
            <th>Description</th>
            <th>Price</th>
            <th>imageUrl</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>R$ {item.price}</td>
              <td>{item.imageUrl}</td>
              <td>{item.quantity}</td>
              <td>R$ {item.price && item.quantity ? (item.price * item.quantity) : "-"}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: R$ {total}</p>
    </div>
  );
}

export default CartPage2;
