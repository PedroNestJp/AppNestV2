import React, { useContext } from 'react';
import { CartContext } from './contexts/CartProvider';

const CartPage = ({ products }) => {
  const { items, totalPrice, removeItem } = useContext(CartContext);
  console.log(items)

  const handleRemoveItem = (productId) => {
    removeItem(productId);
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
          {items.map(({ productId, quantity }) => (
            <tr key={productId}>
              <td>{products.find((p) => p.id === productId).title}</td>
              <td>{quantity}</td>
              <td>{products.find((p) => p.id === productId).price}</td>
              <td>{products.find((p) => p.id === productId).price * quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(productId)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total</td>
            <td>{totalPrice}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartPage;
