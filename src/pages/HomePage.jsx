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

      <section className="container">
        <h1 className="typePcText" title="typePcText">
          QUAL TIPO DE PC VOCÊ BUSCA?
        </h1>

        <div className="typePcsImages">
          <div className="typePcHE">
            <Link to="/highEndPcsPage">
              <img
                className="typePcHEImg"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-corsair-680x-rgb.png?alt=media&token=95ca548e-9af5-4754-8005-565dca5ff810"
                alt="PC HIGH-END"
              />
              <span className="textTypeHE" id="textTypeHE">
                HIGH-END
              </span>
            </Link>
          </div>

          <div className="typePcGamer">
            <Link to="/gamingPcsPage">
              <img
                className="typePcGamerImg"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgabinete-gamer-superframe-flow-mid-tower-rgb.png?alt=media&token=11b58f0e-566a-44e7-8c3d-cc4e36b1c587"
                alt="PC GAMER"
              />
              <span className="textTypeGamer" id="textTypeGamer">
                GAMER
              </span>
            </Link>
          </div>

          <div className="typePcOffice">
            <Link to="/officePcsPage">
              <img
                className="typePcOfficeImg"
                src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-office-tgt-rebel.png?alt=media&token=09c22749-b9c3-4627-8fa3-a23f077b4f3a"
                alt="PC OFFICE"
              />
              <span className="textTypeOffice" id="textTypeOffice">
                OFFICE
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="container-2" title="container-2">
        <div className="hl-text" id="hl">
          DESTAQUES
        </div>
        <div className="highLightsBoxs" id="highlightsBoxs">
          <Carrosel/>
        </div>
      </section>

      <section className="buyByPlatform" id="buyByPlatformHome">
        <div className="text-buy-by-platform">COMPRE POR PLATAFORMA</div>
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
        <div className="bs-text" id="bestSelers">
          MAIS VENDIDOS
        </div>
        <div className="bestSelersBox" id="highlightsBoxs">
          <Carrosel/>
        </div>
      </section>

      <section className="departments" id="departmentsHome">
        <div className="departmentsText">🗄DEPARTAMENTOS</div>

        <div className="bbdBoxs">
          <Link to="/allPcsPage">
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

export default HomePage;
