import React, { useState } from "react";
import HomePage from "./HomePage";

function Product({ id, name, description, price }) {
  const [cartItems, setCartItems] = useState([]);
  function handleAddToCart() {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { id, name, description, price, quantity: 1 },
    ]);
  }

  return (

    <div>
      <h1> Nenhum item encontrado para sua busca </h1>
      <h2>{id}</h2>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p>
      {/* <button onClick={handleAddToCart}>Adicionar ao carrinho</button> */}
    </div>
  );
}
export default Product
