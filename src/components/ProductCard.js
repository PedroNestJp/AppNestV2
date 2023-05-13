import React, { useEffect, useState } from 'react';
import * as BsIcons from 'react-icons/bs'
import { Link } from 'react-router-dom';
import '../styles/Home.css'
import { auth, db } from '../firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';


const ProductCard = ({ id, name, price, oldPrice, installmentPrice, imageUrl, description }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = auth

  useEffect(() => {
    if (!currentUser) return;
    const favorites = doc(collection(db, "favorites"), currentUser.uid);
    getDoc(favorites).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const { products } = docSnapshot.data();
        setFavorites(products);
      }
    });
  }, [currentUser]);

  const handleAddToFavorites = (productId) => {
    const updatedFavorites = [...favorites, productId];
    const favoritesDoc = doc(collection(db, "favorites"), currentUser.uid);
    setDoc(favoritesDoc, { products: updatedFavorites })
      .then(() => {
        setFavorites(updatedFavorites);
      })
      .catch((error) =>
        console.error("Error adding product to favorites:", error)
      );
  };
  
  return (
    <div className="hl-1 styleBox">
      <button
        onClick={() => handleAddToFavorites(id)}
        className="favoriteIcon"
        alt="Icone Favoitos">
        <BsIcons.BsHeartFill />
      </button>
      <Link to='/'>
        <img className="img-hl-1" src={imageUrl} alt={name} />
      </Link>
      <span>{name}</span>
      <span className="oldPrice-hl-1 oldPrice-hl"> DE: {oldPrice} POR:</span>
      <span className="currentPrice-hl-1 currentPrice-hl">R${price},00</span>
      <span className="installmentPrice-hl-1 installmentPrice-hl">12x DE R${installmentPrice},00</span>
      <span className='descriptionProduct'>{description}</span>
      <Link className='button-buy' to={`/products/${id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
