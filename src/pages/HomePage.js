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
  }, []);

  return (
    <section className="container-2" title="container-2" >
      
        <div 
            id="hl" 
            title="highlights" 
            className="hl-text"
            >  DESTAQUES 
        </div>
    <div className='highLightsBoxs' id='highlightsBoxs'>
      {products.map(({ id, name, price, OldPrice, InstallmentePrice, imageUrl, description }) => (
        <ProductCard 
        key={id} 
        id={id} 
        name={name} 
        description={description} 
        OldPrice={OldPrice}
        InstallmentPrice={InstallmentePrice}
        price={price} 
        imageUrl={imageUrl} 
          />
      ))}
      {products.map(({ id, name, price, OldPrice, InstallmentePrice, imageUrl, description }) => (
        <ProductCard 
          key={id} 
          id={id} 
          name={name} 
          description={description} 
          OldPrice={OldPrice}
          InstallmentPrice={InstallmentePrice}
          price={price} 
          imageUrl={imageUrl} 
          />
      ))}
    </div>
    </section>
  );
};

export default HomePage;
