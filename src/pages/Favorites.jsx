import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { auth, db } from '../firebase';
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = auth

  useEffect(() => {
    if (!user) return;
    const favoritesRef = doc(collection(db, "favorites"), user.id);
    getDocs(favoritesRef).then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const { products } = querySnapshot.docs[0].data();
        setFavorites(products);
      }
    });
  }, [user]);

  const handleAddToFavorites = (productId) => {
    const updatedFavorites = [...favorites, productId];
    const favoritesRef = doc(collection(db, "favorites"), user.id);
    updateDoc(favoritesRef, { products: updatedFavorites })
      .then(() => {
        setFavorites(updatedFavorites);
      })
      .catch((error) =>
        console.error("Error adding product to favorites:", error)
      );
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 && <p>Nenhum produto foi adicionado ao carrinho ainda</p>}
      {favorites.map((productId, index) => (
        <products
          key={index}
          id={productId}
          isFavorite={true}
          onAddToFavorites={handleAddToFavorites}
        />
      ))}
    </div>
  );
}

export default Favorites;
