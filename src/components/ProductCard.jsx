import React, { useEffect, useState } from 'react';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { db } from '../firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../pages/contexts/AuthProvider';


const ProductCard = ({ id, name, price, oldPrice, installmentPrice, imageUrl, description }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth()


  useEffect(() => {
    if (!user) return;
    const favoritesDoc = doc(collection(db, 'favorites'), user.uid);
    getDoc(favoritesDoc).then((doc) => {
      if (doc.exists()) {
        const { products } = doc.data();
        setFavorites(products);
        setIsFavorite(products.includes(id))
      }
    })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [user, id]);


  const handleAddToFavorites = (productId) => {
    const updatedFavorites = isFavorite ? favorites.filter((id) => id !== productId) : [...favorites, productId];
    const favoritesDoc = doc(collection(db, 'favorites'), user.uid);
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
    <div className="hl-1 styleBox">
      <button
        onClick={() => handleAddToFavorites(id)}
        className='favoriteIcon'
        alt="Icone Favoitos"
        title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
        {isFavorite ? <BsHeartFill style={{ color: '#e20100', height: '1.5rem', width: '1.5rem', backgroundColor: 'white' }} /> : <BsHeart style={{ height: '1.5rem', width: '1.5rem', backgroundColor: 'white' }} />}
      </button>
      <Link to='/'>
        <img className="img-hl-1" src={imageUrl} alt={name} />
      </Link>
      <span>{name}</span>
      <span className="oldPrice-hl-1 oldPrice-hl"> DE: {oldPrice} POR:</span>
      <span className="currentPrice-hl-1 currentPrice-hl">R${price},00</span>
      <span className="installmentPrice-hl-1 installmentPrice-hl">12x DE R${installmentPrice},00</span>
      <span className='descriptionProduct'>{description}</span>
      <Link className='button-buy' to={`/products/${id}`}>Ver Detalhes</Link>
    </div>
  );
};

export default ProductCard;