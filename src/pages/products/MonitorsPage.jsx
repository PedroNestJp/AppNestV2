import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../../styles/Home.css";
import ProductCard from "../../components/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header";
import AdsHeader from "../../components/AdsHeader";
import Departments from "../../components/Departments";
import BBPf from "../home/BBPf";
import { useAlert } from "../contexts/AlertContext";
import Alert from "../../components/Alert";

const MonitorsPage = () => {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(3);
  const { showAlert } = useAlert();

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
      showAlert(
        "Somente os Monitores serão mostrados nessa tela, para ver todos os produtos volte para a tela inicial clicando no logo da Nest"
      );
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
      <Alert />
      <Header />
      <AdsHeader />
      <section className="container-2" title="container-2">
        <div id="hl" title="highlights" className="h1">
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
      <BBPf />
      <section className="container-2" id="container-3" title="container-3">
        <div id="bestSelers" className="h1">
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
      <Departments />
    </>
  );
};

export default MonitorsPage;
