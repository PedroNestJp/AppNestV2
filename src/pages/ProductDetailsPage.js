import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc, setDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './contexts/AuthProvider';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(doc(db, 'users', user.uid), 'favorites'), (snapshot) => {
        setFavorites(snapshot.docs.map((doc) => doc.id));
      });
      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, 'products', id);
      const snapshot = await getDoc(productRef);
      const data = snapshot.data();
      setProduct(data);
    };

    getProduct();
  }, [id]);

  const handleAddToFavorites = async (productId) => {
    if (favorites.includes(productId)) {
      alert('Este produto já está nos favoritos!');
      return;
    }

    try {
      const favoritesRef = doc(db, 'users', user.uid, 'favorites', productId);
      await setDoc(favoritesRef, { addedAt: new Date() });
      alert('Produto adicionado aos favoritos com sucesso ✅');
    } catch (error) {
      alert('Ocorreu um erro ao adicionar o produto aos favoritos: ' + error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartCol = doc(db, 'carts', user.uid);
      const snapshot = await getDoc(cartCol);

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.id === id
        );

        if (productIndex !== -1) {
          cart.items[productIndex].quantity++;
        } else {
          cart.items.push({ id: id, quantity: 1 });
        }

        await updateDoc(cartCol, cart);
      } else {
        await setDoc(cartCol, { items: [{ id: id, quantity: 1 }] });
      }
      alert('Produto adicionado ao carrinho com sucesso ✅')
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, imageUrl, desc } = product;

  return (
    <div>
      <img width={150} src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>{price}</div>
      <div>{desc}</div>
  {user && (
    <div>
      <button onClick={() => handleAddToFavorites(id)}>Adicionar aos favoritos</button>
      <button onClick={handleAddToCart} disabled={isLoading}>Adicionar ao carrinho</button>
    </div>
  )}
</div>
);
};

export default ProductDetailsPage;