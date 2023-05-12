import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { Carrosel } from "../components/Carrosel";

import imgIntelType from "../assets/buyByPlatform/buyByPlatform-img-intel.png";
import imgAmdType from "../assets/buyByPlatform/buyByPlatform-img-amd.png";
import { imgBbdMonitor, imgBbdPc, imgBbdPeripherals } from "../img/imgs";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-responsive-carousel";

const HomePage = () => {
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
      <section className="container">
        <div
          id="typepc-text"
          title="typepc-text"
          className="typepc-text"
          alt="QUAL É SEU TIPO DE PC?"
        >
          {" "}
          QUAL TIPO DE PC VOCÊ BUSCA?
        </div>

        <div className="imgsTypesPcs">
          <div className="divTypePc1">
            <Link to="/products">
              <img
                className="img-typepc-1"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-corsair-680x-rgb.png?alt=media&token=95ca548e-9af5-4754-8005-565dca5ff810"
                alt="PC HIGH-END"
              ></img>
              <span className="textTypePc-1 " id="textTypePc">
                HIGH-END
              </span>
            </Link>
          </div>

          <div className="divTypePc2">
            <Link to="/products">
              <img
                className="img-typepc-2"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgabinete-gamer-superframe-flow-mid-tower-rgb.png?alt=media&token=11b58f0e-566a-44e7-8c3d-cc4e36b1c587"
                alt="PC GAMER"
              ></img>
              <span className="textTypePc-2 " id="textTypePc">
                GAMER
              </span>
            </Link>
          </div>

          <div className="divTypePc3">
            <Link to="/products">
              <img
                className="img-typepc-3"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-office-tgt-rebel.png?alt=media&token=09c22749-b9c3-4627-8fa3-a23f077b4f3a"
                alt="PC OFFICE"
              ></img>
              <span className="textTypePc-3 " id="textTypePc">
                OFFICE
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="container-2" title="container-2">
        <div id="hl" title="highlights" className="hl-text">
          {" "}
          DESTAQUES
        </div>
        <div className="highLightsBoxs" id="highlightsBoxs">
          <Carousel
            showArrows={true}
            showThumbs={false}
            
            infiniteLoop
          >
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
        <div className="bs-text"> MAIS VENDIDOS </div>
        <div className="bestSelersBox" id="highlightsBoxs"></div>
        <Carousel
            showArrows={true}
            showThumbs={false}
            
            infiniteLoop
          >
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

export default HomePage;
