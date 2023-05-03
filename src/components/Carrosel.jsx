import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Carrosel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <section className="container-2" title="container-2">
      <div className='highLightsBoxs' id='highlightsBoxs'>
      <Carousel showArrows infiniteLoop slidesToShow={3}>
        {products.slice(0, 5).map(({ id, ...product }) => (
          <ProductCard key={id} id={id} {...product} />
        ))}
      </Carousel>
        </div>
    </section>
  );
};

export default Carrosel;
