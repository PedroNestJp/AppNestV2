import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ShortHeader from "../components/ShortHeader";
import { useAuth } from "./contexts/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";

const FavoriteProducts = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [favItems, setFavItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user) {
          const favDoc = doc(db, "favorites", user.uid);
          const favSnapshot = await getDoc(favDoc);
  
          if (favSnapshot.exists()) {
            const favData = favSnapshot.data();
  
            if (favData.items && Array.isArray(favData.items)) {
              const itemsWithProductData = await Promise.all(
                favData.items.map(async (item) => {
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
              setFavItems(itemsWithProductData.filter((item) => item !== null));
            } else {
              setFavItems([]);
            }
          } else {
            setFavItems([]);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchFavorites();
  }, [user, navigate]);
  
  

  const handleIncreaseQuantity = async () => {
    try {
      const cartDoc = doc(db, "carts", user.uid);
      const snapshot = await getDoc(cartDoc);

      if (snapshot.exists()) {
        const cartData = snapshot.data();
        const updatedItems = cartData.items.map((item) => {
          if (item.id === id) {
            item.quantity++;
          }
          return item;
        });
        const updatedCart = { ...cartData, items: updatedItems };
        await updateDoc(cartDoc, updatedCart);
        alert("Produto adicionado ao carrinho com sucesso ✅");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          setFavItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleClearCart = async () => {
  //   try {
  //     const cartDoc = doc(db, "carts", user.uid);
  //     await deleteDoc(cartDoc);
  //     setCartItems([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (favItems.length === 0) {
    return (
      <div>
        <ShortHeader />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "10rem",
          }}
        >
          <h2>
            <BsHeart />
            Nenhum produto foi adicionados aos carrinhos ainda
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
        }}
      >
        <h1>FAVORITOS</h1>
        {favItems.map((item) => (
          <div className="hl-1 styleBox" key={item.id}>
            <img
              className="img-hl-1"
              src={item.product.imageUrl}
              alt={item.product.name}
            />
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
          </div>
        ))}
      </div>
    </div>
  );
};
export default FavoriteProducts;
