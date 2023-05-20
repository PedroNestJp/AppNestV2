import React, { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const FavoriteButton = ({ ...productCard }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { currentUser } = auth

  const ProductId = productCard.id

  useEffect(() => {
    if (!currentUser) return;
    const favoritesDoc = doc(collection(db, 'favorites'), currentUser.uid);
    getDoc(favoritesDoc).then((doc) => {
      if (doc.exists()) {
        const { products } = doc.data();
        setFavorites(products);
        setIsFavorite(products.includes(ProductId))
      }
  })
  .catch((error) => {
      console.log('Error getting document:', error);
  });
}, [currentUser, ProductId]);

const handleAddToFavorites = (ProductId) => {
  const updatedFavorites = 
  isFavorite ? favorites.filter((id) => id !== ProductId) 
  : [...favorites, ProductId].filter((id) => id);
  const favoritesDoc = doc(collection(db, 'favorites'), currentUser.uid);
  setDoc(favoritesDoc, { products: updatedFavorites })
  .then(() => {
      setFavorites(updatedFavorites);
      setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.error('Error adding product to favorites:', error);
      });
  };

return (
  <button
  onClick={() => handleAddToFavorites(productCard.id)}
  className='favoriteIcon'
  alt="Icone Favoritos"
  title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
  {isFavorite ? <BsHeartFill /> : <BsHeart />}
</button>
);
};

export default FavoriteButton;
