import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function CartPage2() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  function handleQuantityChange(id, newQuantity) {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      setTotal(updatedCartItems)
    });
  }

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
      <h2>Carrinho</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Imagem</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>R$ {item.price}</td>
              <td>{item.imageUrl}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, e.target.value)
                  }
                />
              </td>
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
