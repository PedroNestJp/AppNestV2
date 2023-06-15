import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import "../styles/AllPcsPage.css";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";

// Função para filtrar os produtos por tipo
const filterTypeProducts = (product, type) => {
  return product.filter((product) => product.typePc === type);
};

const AllPcsPage = () => {
  const [productsOffice, setProductsOffice] = useState([]);
  const [productsGamer, setProductsGamer] = useState([]);
  const [productsHighEnd, setProductsHighEnd] = useState([]);

  useEffect(() => {
    const carregarProdutos = async () => {
      const querySnapshot = await getDocs(query(collection(db, "products")));
      const products = querySnapshot.docs.map((doc) => doc.data());

      // Filtrar os produtos por tipo
      const productsOffice = filterTypeProducts(products, "office");
      const productsGamer = filterTypeProducts(products, "gamer");
      const productsHighEnd = filterTypeProducts(products, "highEnd");

      setProductsOffice(productsOffice);
      setProductsGamer(productsGamer);
      setProductsHighEnd(productsHighEnd);
    };

    carregarProdutos();
  }, []);

  return (
    <>
      <Header />

      <section id="pcsOfficeContainer" className="container" title="Pcs Office">
        <div id="pcsOfficeId" title="Pcs Office" className="allPCsTexts">
          {" "}
          PCS OFFICE
        </div>
        <div className="allPcsBoxs" id="allPcsBoxsOffices">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop>
            {productsOffice.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}
          </Carousel>
        </div>
      </section>
      <section className="container" id="pcsGamerContainer" title="Pcs Gamer">
        <div id="pcsGamerDiv" className="allPCsTexts">
          PCS GAMER
        </div>
        <div className="allPcsBoxs" id="allPcsBoxsGamer">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop>
            {productsGamer.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}
          </Carousel>
        </div>
      </section>
      <section className="container" title="Pcs High-End">
        <div className="allPCsTexts">PCS HIGH-END</div>
        <div className="allPcsBoxs" id="allPcsBoxsHighEnd">
          <Carousel showArrows={true} showThumbs={false} infiniteLoop>
            {productsHighEnd.map(({ id, ...product }) => (
                  <ProductCard key={id} id={id} {...product} />
                ))}
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default AllPcsPage;
