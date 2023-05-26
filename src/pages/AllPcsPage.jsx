import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Home.css";
import imgIntelType from "../assets/buyByPlatform/buyByPlatform-img-intel.png";
import imgAmdType from "../assets/buyByPlatform/buyByPlatform-img-amd.png";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";

const AllPcsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <>
      <Header />

      <section
        style={{ marginTop: "7rem" }}
        className="buyByPlatform"
        id="buyByPlatformHome"
      >
        <div className="text-buy-by-platform"> COMPRE POR PLATAFORMA </div>
        <div className="divBuyByPlatform">
          <div className="divPlatformIntel" id="textPlatform">
            <span className="text-platform-intel"> INTEL </span>
            <img
              className="platform-intel"
              src={imgIntelType}
              alt="Plataforma Intel"
            />
          </div>
          <div className="divPlatformAmd" id="textPlatform">
            <span className="text-platform-amd"> AMD </span>
            <img
              className="platform-amd"
              src={imgAmdType}
              alt="Plataforma AMD"
            />
          </div>
        </div>
      </section>
      <section className="container-2" title="container-2">
        <div id="hl" title="highlights" className="bs-text">
          {" "}
          PCS OFFICE
        </div>
        <div className="highLightsBoxs" id="highlightsBoxs">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop>
            {products.map(({ id, ...product }) => (
              <ProductCard key={id} id={id} {...product} />
            ))}
          </Carousel>
        </div>
        {/* <Carrosel/> */}
      </section>
      <section className="container-3" id="container-3" title="container-3">
        <div id="bestSelers" className="bs-text">
          PCS GAMER
        </div>
        <div className="bestSelersBox" id="highlightsBoxs"></div>
        <Carousel showArrows={true} showThumbs={false} infiniteLoop>
          {products.map(({ id, ...product }) => (
            <ProductCard key={id} id={id} {...product} />
          ))}
        </Carousel>
      </section>
      <section className="container-2" title="container-2">
        <div className="bs-text"> PCS HIGH-END </div>
        <div className="highLightsBoxs" id="highlightsBoxs">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop>
            {products.map(({ id, ...product }) => (
              <ProductCard key={id} id={id} {...product} />
            ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default AllPcsPage;
