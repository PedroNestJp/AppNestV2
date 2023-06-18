import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import AdsHeader from "../components/AdsHeader";
import {
  imgBbdMonitor,
  imgBbdPc,
  imgBbdPeripherals,
  imgIntelType,
  imgAmdType,
} from "../img/imgs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/Home.css";
import { Carrosel } from "../components/Carrosel";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <Header />
      <AdsHeader />
      <section className="container" id="pcTypeSc">
        <h1 className="h1" title="QUAL TIPO DE PC VOCÊ BUSCA" id="pcType">
          QUAL TIPO DE PC VOCÊ BUSCA?
        </h1>
        <div className="pcsTypesImgs">
          <Link to="/highEndPcsPage">
            <img
              className="pcTypeImg"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-corsair-680x-rgb.png?alt=media&token=95ca548e-9af5-4754-8005-565dca5ff810"
              alt="PC HIGH-END"
            />
            <h2
              className="h2"
              id="pcTypeTxt"
              title="Tipo de PC High-End">
              HIGH-END
            </h2>
          </Link>
          <Link to="/gamingPcsPage">
            <img
              className="pcTypeImg"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgabinete-gamer-superframe-flow-mid-tower-rgb.png?alt=media&token=11b58f0e-566a-44e7-8c3d-cc4e36b1c587"
              alt="PC GAMER"
            />
            <h2
              className="h2"
              id="pcTypeTxt"
              title="Tipo de PC Gamer">
              GAMER
            </h2>
          </Link>
          <Link to="/officePcsPage">
            <img
              className="pcTypeImg"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-office-tgt-rebel.png?alt=media&token=09c22749-b9c3-4627-8fa3-a23f077b4f3a"
              alt="PC OFFICE"
            />
            <h2
              className="h2"
              id="pcTypeTxt"
              title="Tipo de PC Office">
              OFFICE
            </h2>
          </Link>
        </div>
      </section>
      <h1 className="h1" id="hL"> DESTAQUES</h1>
        <Carrosel />
      <section className="bbPfSc" id="buyByPlatformHome">
        <h1 className="h1" id="bBPf">
          COMPRE POR PLATAFORMA
        </h1>
        <div className="bbPfDv">
          <Link to='/filterByPlatformIntel'>
            <h2
              className="h2"
              id="textPlatformIntel"
              title="Mostrar apenas computadores da plataforma Intel">
              INTEL
            </h2>
            <img
              className="platformImg"
              src={imgIntelType}
              alt="Imagem da Plataforma Intel"
            />
          </Link>
          <Link to='/filterByPlatformAmd'>
            <h2
              className="h2"
              id="textPlatformAmd"
              title="Mostrar apenas computadores da plataforma amd ">
              AMD
            </h2>
            <img
              className="platformImg"
              src={imgAmdType}
              alt="Imagem da Plataforma AMD"
            />
          </Link>
        </div>
      </section>

      <h1 className="h1" id="bS">MAIS VENDIDOS</h1>
        <Carrosel />

      <section className="departments" id="departmentsHome">
        <h1 className="h1" id="departmentsTitle">🗄DEPARTAMENTOS</h1>
        <div className="bbdBoxs">
          <Link to="/allPcsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdPc}
                alt="PCS"
                title="Mostrar Todos os PCs"
              />
              <h2 className="h2">PCS</h2>
            </div>
          </Link>
          <Link to="/monitorsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdMonitor}
                alt="MONITORES"
                title="Mostrar Todos os monitores"
              />
              <h2 className="h2">MONITORES</h2>
            </div>
          </Link>
          <Link to="/peripheralsPage">
            <div className="styleBox">
              <img
                className="imgBbd"
                srcSet={imgBbdPeripherals}
                alt="PERIFERICOS"
                title="Mostrar todos os periféricos"
              />
              <h2 className="h2">PERIFERICOS</h2>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;
