import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Home.css";
import imgIntelType from "../assets/buyByPlatform/buyByPlatform-img-intel.png";
import imgAmdType from "../assets/buyByPlatform/buyByPlatform-img-amd.png";
import { imgBbdMonitor, imgBbdPc, imgBbdPeripherals } from "../img/imgs";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import AdsHeader from "../components/AdsHeader";

const OfficePcsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter products based on PC type
      const filteredProducts = allProducts.filter(
        (product) => product.typePc === "office"
      );

      setProducts(filteredProducts);
    };

    getProducts();
  }, []);

  return (
    <>
      <Header />
      <AdsHeader />
      <section className="container-2" title="container-2">
        <div id="hl" title="highlights" className="hl-text">
          {" "}
          DESTAQUES
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
      <section className="buyByPlatform" id="buyByPlatformHome">
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
      <section className="container-3" id="container-3" title="container-3">
        <div id="bestSelers" className="bs-text">
          {" "}
          MAIS VENDIDOS{" "}
        </div>
        <div className="bestSelersBox" id="highlightsBoxs"></div>
        <Carousel showArrows={true} showThumbs={false} infiniteLoop>
          {products.map(({ id, ...product }) => (
            <ProductCard key={id} id={id} {...product} />
          ))}
        </Carousel>
      </section>
      <section className="departments" id="departmentsHome">
        <div className="departmentsText"> 🗄DEPARTAMENTOS </div>

        <div className="bbdBoxs">
          <div className="bbd-1 styleBox-bbd">
            <img
              className="img-bbd-1"
              srcSet={imgBbdPc}
              src="../assets/pcs.png"
              alt=""
            />
            <span className="bbd-text bbd-text-1"> PCS </span>
          </div>

          <div className="bbd-2 styleBox-bbd">
            <img
              className="img-bbd-2"
              srcSet={imgBbdMonitor}
              src="../assets/monitores.png"
              alt=""
            />
            <span className="bbd-text bbd-text-2"> MONITORES </span>
          </div>

          <div className="bbd-3 styleBox-bbd">
            <img
              className="img-bbd-3"
              srcSet={imgBbdPeripherals}
              src="../assets/perifericos.png"
              alt=""
            />
            <span className="bbd-text bbd-text-3"> PERIFERICOS </span>
          </div>
          {/* 
        <div className="bbd-4 styleBox-bbd">
            <img className="img-bbd-4" srcSet={imgBbdHardware} src="../assets/hardware.png" alt="imgHardware"/>
            <span className="bbd-text bbd-text-4"> HARDWARE </span> 
        </div> */}
        </div>
      </section>
    </>
  );
};

export default OfficePcsPage;
