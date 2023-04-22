import React, { useContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { CartContext } from './contexts/CartProvider';
const { user } = auth();

const CartPage = () => {
  const { cartTotal, removeItem } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cartCol = collection(db, 'carts');
    const cartDoc = doc(cartCol, user.uid);
    const unsubscribe = onSnapshot(cartDoc, (snapshot) => {
      const data = snapshot.data();
      const newItems = [];

      data.items.forEach((item) => {
        db.collection('products').doc(item.productId).get().then((doc) => {
          const data = doc.data();
          console.log(data)
          newItems.push({
            productId: doc.id,
            title: data.title,
            price: data.price,
            quantity: item.quantity,
          });
          console.log(newItems)

          if (newItems.length === data.items.length) {
            setProducts(newItems);
          }
        });
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const cartCol = collection(db, 'carts');
      const cartDoc = doc(cartCol, auth.uid);
      const snapshot = await cartDoc.get();

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.productId === productId
        );

        if (productIndex !== -1) {
          cart.items.splice(productIndex, 1);
          await updateDoc(cartDoc, cart);
          removeItem(productId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Carrinho</h1>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Preço Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ productId, title, price, quantity }) => (
            <tr key={productId}>
              <td>{title}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>{price * quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(productId)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>{cartTotal}</td>
          </tr>
        </tfoot>
      </table>
      </div>
  )}

  export default CartPage
