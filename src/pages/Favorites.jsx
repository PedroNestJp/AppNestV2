import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const FavoriteProducts = () => {
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const { currentUser } = auth

  useEffect(() => {
    const getProducts = async () => {
      const favoritesDoc = doc(collection(db, 'products'), currentUser.uid);
      const snapshot = await getDocs(favoritesDoc);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    };

    getProducts();
  }, []);
  console.log(products)

  useEffect(() => {
    if (!currentUser) return;
    const favoritesDoc = doc(collection(db, 'favorites'), currentUser.uid);
    getDoc(favoritesDoc).then((doc) => {
      if (doc.exists()) {
        const { products } = doc.data();
        setFavoriteProducts(products);
        
      }
    })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [currentUser,]);

  console.log(favoriteProducts)

  return (
    <div>
      <h2>Favorite Products</h2>
      <div>
        {favoriteProducts.length === 0 && (
          <p>Nenhum produto foi adicionado aos favoritos ainda</p>
        )}
        {favoriteProducts.map((id, ...product) => (
          <ProductCard key={id} id={id} {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteProducts;
