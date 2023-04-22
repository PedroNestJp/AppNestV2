import React, { useContext } from 'react';
import { CartContext } from '../pages/contexts/CartProvider';

const CartPage = () => {
  const { cart, cartTotal, removeItem } = useContext(CartContext);

  const handleRemoveItem = (id) => {
    removeItem(id);
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
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>Remover</button>
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
  );
};

export default CartPage;
