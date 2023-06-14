import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import "../styles/AllPcsPage.css";
import ProductCard from "../components/ProductCard";
import { Carousel } from "react-responsive-carousel";
import Header from "../components/Header";
import Carrosel from "../components/Carrosel";

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
        <Carrosel/>
        </div>
      </section>
      <section className="container" id="pcsGamerContainer" title="Pcs Gamer">
        <div id="pcsGamerDiv" className="allPCsTexts">
          PCS GAMER
        </div>
        <div className="allPcsBoxs" id="allPcsBoxsGamer">
        <Carrosel/>
        </div>
      </section>
      <section className="container" title="Pcs High-End">
        <div className="allPCsTexts">PCS HIGH-END</div>
        <div className="allPcsBoxs" id="allPcsBoxsHighEnd">
        <Carrosel/>
        </div>
      </section>
    </>
  );
};

export default AllPcsPage;
