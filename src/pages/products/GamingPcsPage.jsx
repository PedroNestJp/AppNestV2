import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Carousel } from "react-responsive-carousel";
import Header from "../../components/Header";
import AdsHeader from "../../components/AdsHeader";
import Departments from "../../components/Departments";
import ProductCard from "../../components/ProductCard"; // Certifique-se de importar ProductCard corretamente
import Alert from "../../components/Alert"; // Certifique-se de importar Alert corretamente
import BBPf from "../home/BBPf";
import { useAlert } from "../contexts/AlertContext";


const GamingPcsPage = () => {
  const [products, setProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [groupSize, setGroupSize] = useState(3); // Valor inicial
  const { showAlert } = useAlert();

  // Função para obter produtos da coleção "products"
  const getProducts = async () => {
    const productsCol = collection(db, "products");
    const snapshot = await getDocs(productsCol);
    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredProducts = allProducts.filter(
      (product) => product.typePc === "gamer"
    );

    setProducts(filteredProducts);
    // Alerta para informar que apenas os PCs Gamer estão sendo mostrados
    showAlert(
      "Somente os PCs Gamer serão mostrados nessa tela. Para ver todos os produtos, volte para a tela inicial clicando no logo da Nest."
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Função para dividir produtos em grupos com base no tamanho da tela
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

  useEffect(() => {
    divideProductsIntoGroups();
  }, [products, groupSize]);

  // Função para ajustar o tamanho do grupo com base no tamanho da tela
  const handleResize = () => {
    if (window.matchMedia("(max-width: 600px)").matches) {
      setGroupSize(1);
    } else if (window.matchMedia("(max-width: 800px)").matches) {
      setGroupSize(2);
    } else {
      setGroupSize(3);
    }
  };

  useEffect(() => {
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
        <div id="hl" title="highlights" className="hl-text">
          {" "}
          DESTAQUES
        </div>
        <div className="highLightsBoxs" id="highlightsBoxs"></div>
        <Carousel showArrows={true} showThumbs={false} infiniteLoop>
          {productGroups.map((group, index) => (
            <div key={index}>
              {group.map(({ id, ...product }) => (
                <ProductCard key={id} id={id} {...product} />
              ))}
            </div>
          ))}
        </Carousel>
      </section>
      <BBPf /> {/* Certifique-se de importar BBPf corretamente */}
      <section className="container-2" id="container-3" title="container-3">
        <h1 id="bestSelers" className="h1">
          MAIS VENDIDOS
        </h1>
        <Carousel showArrows={true} showThumbs={false} infiniteLoop>
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

export default GamingPcsPage;
