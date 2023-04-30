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
    console.log(products)
    

    getProducts();
  }, [products]);

  return (
    <div>
      {products.map(({ id, name, price, imageUrl, description }) => (
        <ProductCard 
          key={id} 
          id={id} 
          name={name} 
          description={description} 
          price={price} 
          imageUrl={imageUrl} 
          />
      ))}
    </div>
  );
};

export default HomePage;
