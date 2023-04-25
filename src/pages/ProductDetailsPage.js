import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './contexts/AuthProvider';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, 'products', id);
      const snapshot = await getDoc(productRef);
      const data = snapshot.data();
      setProduct(data);
    };

    getProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const cartCol = doc(db, 'carts', user.uid);
      const snapshot = await getDoc(cartCol);

      if (snapshot.exists()) {
        const cart = snapshot.data();
        const productIndex = cart.items.findIndex(
          (item) => item.productId === id
        );

        if (productIndex !== -1) {
          cart.items[productIndex].quantity++;
        } else {
          cart.items.push({ productId: id, quantity: 1 });
        }

        await updateDoc(cartCol, cart);
      } else {
        await setDoc(cartCol, { items: [{ productId: id, quantity: 1 }] });
      }
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
      <img width={150} src={imageUrl} alt={name}/>
      <div>{name}</div>
      <div>{price}</div>
      <div>{desc}</div>
      <button onClick={handleAddToCart} disabled={isLoading}>
        {isLoading ? 'Adicionando...' : 'Adicionar ao carrinho'}
      </button>
    </div>
  );
};

export default ProductDetailsPage;
