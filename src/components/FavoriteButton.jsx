import React, { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const FavoriteButton = ({ productCard }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = auth;
  const productId = productCard.id;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) return;

      try {
        const favoritesDoc = doc(collection(db, 'favorites'), currentUser.uid);
        const docSnap = await getDoc(favoritesDoc);

        if (docSnap.exists()) {
          const { products } = docSnap.data();
          setFavorites(products);
          setIsFavorite(products.includes(productId));
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchFavorites();
  }, [currentUser, productId]);

  const handleAddToFavorites = async () => {
    if (!currentUser) return;

    try {
      const updatedFavorites = isFavorite
        ? favorites.filter((id) => id !== productId)
        : [...favorites, productId];

      const favoritesDoc = doc(collection(db, 'favorites'), currentUser.uid);
      await setDoc(favoritesDoc, { products: updatedFavorites });

      setFavorites(updatedFavorites);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <button
      onClick={handleAddToFavorites}
      className='favoriteIcon'
      alt="Ícone Favoritos"
      title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {isFavorite ? <BsHeartFill /> : <BsHeart />}
    </button>
  );
};

export default FavoriteButton;
