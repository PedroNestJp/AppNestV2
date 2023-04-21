import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, 'products');
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(products);
    };
    

    getProducts();
  }, []);

  return (
    <div>
      {products.map(({ id, title, price, imageUrl }) => (
        <ProductCard key={id} id={id} name={title} price={price} imageUrl={imageUrl} />
      ))}
    </div>
  );
};

export default HomePage;
