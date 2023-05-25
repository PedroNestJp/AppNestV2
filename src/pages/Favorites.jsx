import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ShortHeader from "../components/ShortHeader";
import { useAuth } from "./contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const FavoriteProducts = () => {
  const { user } = useAuth();
  const [favItems, setFavItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favDoc = doc(db, "favorites", user.uid);
        const favSnapshot = await getDoc(favDoc);

        if (favSnapshot.exists()) {
          const favData = favSnapshot.data();


          const itemsWithProductData = await Promise.all(
            (favData.products ?? []).map(async (productId) => {
              const productDoc = doc(db, "products", productId);
              const productSnapshot = await getDoc(productDoc);

              if (productSnapshot.exists()) {
                const productData = productSnapshot.data();
                return {
                  id: productId,
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
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchFavorites();
      
    } else {
      navigate("/login");
    }
  }, [user, navigate]);


  const handleDeleteItem = async (itemId) => {
    try {
      const favDoc = doc(db, "favorites", user.uid);
      const favSnapshot = await getDoc(favDoc);
  
      if (favSnapshot.exists()) {
        const favData = favSnapshot.data();
        const itemIndex = favData.products.findIndex(
          (productId) => productId === itemId
        );
  
        if (itemIndex !== -1) {
          favData.products.splice(itemIndex, 1);
          await updateDoc(favDoc, favData);
          setFavItems((prevItems) =>
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
      const favDoc = doc(db, "favorites", user.uid);
      await deleteDoc(favDoc);
      setFavItems([]);
    } catch (error) {
      console.error(error);
    }
  };
  

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
            Nenhum produto foi adicionados aos favoritos ainda
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
                  <button
        onClick={() => handleDeleteItem(item.id)}
        className='favoriteIcon'
        alt="Icone Favoitos"
        title='Remover dos favoritos'>
         <BsHeartFill style={{color:'#e20100', height: '1.5rem', width: '1.5rem', backgroundColor: 'white' }} />
      </button>
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
          </div>
        ))}
        <button onClick={handleClearCart}>Limpar Carrinho</button>
      </div>
    </div>
  );
};
export default FavoriteProducts;
