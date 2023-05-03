import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from "firebase/firestore";
import '../styles/Home.css'

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
    <>
    <section className="container-2" title="container-2" >
      
        <div 
            id="hl" 
            title="highlights" 
            className="hl-text"
            >  DESTAQUES 
        </div>
        <div className='highLightsBoxs' id='highlightsBoxs'>
                  {products.map(({ id, ...product }) => (
                    <ProductCard
                        key={id}
                        id={id}
                        {...product}
                    />
                  ))}
              </div>
    </section>
    </>
  );
};

export default HomePage;
