import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./contexts/AuthProvider";
import ShortHeader from "../components/ShortHeader";
import { BsCart } from "react-icons/bs";

const CheckoutPage = () => {
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

  const handleDeleteItem = async (itemId) => {
    try {
      const cartDoc = doc(db, "carts", user.uid);
      const cartSnapshot = await getDoc(cartDoc);

      if (cartSnapshot.exists()) {
        const cartData = cartSnapshot.data();
        const itemIndex = cartData.items.findIndex(
          (item) => item.id === itemId
        );

        if (itemIndex !== -1) {
          cartData.items.splice(itemIndex, 1);
          await updateDoc(cartDoc, cartData);
          setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCart = async () => {
    try {
      const cartDoc = doc(db, "carts", user.uid);
      await deleteDoc(cartDoc);
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };
  

  if (cartItems.length === 0) {
    return (
      <div>
        <ShortHeader />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <h2>
            {" "}
            <BsCart /> Seu Carrinho está vazio
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ShortHeader />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: '5rem'
        }}
      >
        <h1>Seu carrinho</h1>
        {cartItems.map((item) => (
          <div className="hl-1 styleBox" key={item.id}>
            <Link to={`/products/${item.id}`}>
              <img
                className="img-hl-1"
                src={item.product.imageUrl}
                alt={item.product.name}
                title={item.product.name}
              />
            </Link>
               <span>{item.product.name}</span>
            <span className="oldPrice-hl-1 oldPrice-hl">
              {" "}
              DE: {item.product.oldPrice} POR:
            </span>
            <span className="currentPrice-hl-1 currentPrice-hl">
              R${item.product.price},00
            </span>
            <span className="installmentPrice-hl-1 installmentPrice-hl">
              12x DE R${item.product.installmentPrice},00
            </span>
            <span className="descriptionProduct">
              {item.product.description}
            </span>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleDeleteItem(item.id)}>Deletar</button>
          </div>
        ))}
        <button onClick={handleClearCart}>Limpar Carrinho</button>
        <Link to="https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0">
          <button className="button-buy">
            Finalizar com um atendente
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;
