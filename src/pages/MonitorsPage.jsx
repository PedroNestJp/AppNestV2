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
import { Link } from "react-router-dom";

const MonitorsPage = () => {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(3); // Valor inicial

  useEffect(() => {
    const getProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredProducts = allProducts.filter(
        (product) => product.productType === "monitor"
      );

      setProducts(filteredProducts);
      alert('Somente os Monitores serão mostrados nessa tela, para ver todos osprodutos volte para a tela inicial clicando no logo da Nest')
    };

    getProducts();
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
      if (window.matchMedia("(max-width: 600px)").matches) {
        setGroupSize(1);
      } else if (window.matchMedia("(max-width: 800px)").matches) {
        setGroupSize(2);
      } else {
        setGroupSize(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          <Carousel showArrows infiniteLoop showThumbs={false}>
            {productGroups.map((group, index) => (
              <div key={index}>
                {group.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}
              </div>
            ))}
          </Carousel>

        </div>
      </section>
      <section className="buyByPlatform" id="buyByPlatformHome">
        <div className="text-buy-by-platform"> COMPRE POR PLATAFORMA </div>
        <div className="divBuyByPlatform">
          <Link to='/filterByPlatformIntel'>
            <div className="divPlatformIntel" id="textPlatformIntel">
              <span className="text-platform-intel">INTEL</span>
              <img
                className="platform-intel"
                src={imgIntelType}
                alt="Plataforma Intel"
              />
            </div>
          </Link>
          <Link to='/filterByPlatformAmd'>
            <div className="divPlatformAmd" id="textPlatformAmd">
              <span className="text-platform-amd">AMD</span>
              <img
                className="platform-amd"
                src={imgAmdType}
                alt="Plataforma AMD"
              />
            </div>
          </Link>
        </div>
      </section>
      <section className="container-3" id="container-3" title="container-3">
        <div id="bestSelers" className="bs-text">
          {" "}
          MAIS VENDIDOS{" "}
        </div>
        <div className="bestSelersBox" id="highlightsBoxs"></div>
        <Carousel showArrows infiniteLoop showThumbs={false}>
          {productGroups.map((group, index) => (
            <div key={index}>
              {group.map(({ id, ...product }) => (
                <ProductCard key={id} id={id} {...product} />
              ))}
            </div>
          ))}
        </Carousel>

      </section>
      <section className="departments" id="departmentsHome">
        <div className="departmentsText">🗄DEPARTAMENTOS</div>

        <div className="bbdBoxs">
          <Link to="/">
            <div className="bbd-1 styleBox-bbd">
              <img
                className="img-bbd-1"
                srcSet={imgBbdPc}
                alt="PCS"
              />
              <span className="bbd-text bbd-text-1">PCS</span>
            </div>
          </Link>
          <Link to="/monitorsPage">
            <div className="bbd-2 styleBox-bbd">
              <img
                className="img-bbd-2"
                srcSet={imgBbdMonitor}
                alt="MONITORES"
              />
              <span className="bbd-text bbd-text-2">MONITORES</span>
            </div>
          </Link>
          <Link to="/peripheralsPage">
            <div className="bbd-3 styleBox-bbd">
              <img
                className="img-bbd-3"
                srcSet={imgBbdPeripherals}
                alt="PERIFERICOS"
              />
              <span className="bbd-text bbd-text-3">PERIFERICOS</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default MonitorsPage;
