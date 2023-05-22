import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartDoc = doc(db, "carts", user.uid);
        const cartSnapshot = await getDoc(cartDoc);

        if (cartSnapshot.exists()) {
          const cartData = cartSnapshot.data();
          const itemsWithProductData = await Promise.all(
            cartData.items.map(async (item) => {
              const productDoc = doc(db, "products", item.id);
              const productSnapshot = await getDoc(productDoc);

              if (productSnapshot.exists()) {
                const productData = productSnapshot.data();
                return {
                  id: item.id,
                  quantity: item.quantity,
                  product: productData,
                };
              }
              return null;
            })
          );

          setCartItems(itemsWithProductData.filter((item) => item !== null));
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchCartItems();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  if (cartItems.length === 0) {
    return <div>Você ainda não tem itens no carrinho.</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h2>{item.product.name}</h2>
          <p>Price: {item.product.price}</p>
          <p>Quantity: {item.quantity}</p>
          {/* Display other product information as needed */}
        </div>
      ))}
      <Link to="/payment">Proceed to Payment</Link>
    </div>
  );
};

export default CartPage;
