import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ProductCard from "./ProductCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import LoadingOverlay from "./LoadingOverlay";

export const Carrosel = () => {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const divideProductsIntoGroups = () => {
      const groups = [];
      const totalProducts = products.length;
      let startIndex = 0;
      while (startIndex < totalProducts) {
        const endIndex = startIndex + groupSize;
        const group = products.slice(startIndex, endIndex);
        groups.push(group);
        startIndex = endIndex;
      }
      setProductGroups(groups);
    };

    divideProductsIntoGroups();
  }, [products, groupSize]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 980px)").matches) {
        setGroupSize(1);
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        setGroupSize(2);
      } else {
        setGroupSize(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!products) {
    return <LoadingOverlay />;
  }

  return (
    <section className="container-2" title="container-2">
      <div className="highLightsBoxs" id="highlightsBoxs">
        <Carousel
          showArrows
          infiniteLoop={false}
          showThumbs={false}
          preventScrollOnTouchMove={true}>
          {productGroups.map((group, index) => (
            <div key={index}>
              {
                group.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))
              }
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};


