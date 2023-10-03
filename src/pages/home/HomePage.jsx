import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import AdsHeader from "../../components/AdsHeader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../styles/Home.css";
import { Carrosel } from "../../components/Carrosel";
import Departments from "../../components/Departments";
import BBPf from "./BBPf";





const HomePage = () => {

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
            <h2 className="h2" id="pcTypeTxt" title="Tipo de PC High-End">
              HIGH-END
            </h2>
          </Link>
          <Link to="/gamingPcsPage">
            <img
              className="pcTypeImg"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgabinete-gamer-superframe-flow-mid-tower-rgb.png?alt=media&token=11b58f0e-566a-44e7-8c3d-cc4e36b1c587"
              alt="PC GAMER"
            />
            <h2 className="h2" id="pcTypeTxt" title="Tipo de PC Gamer">
              GAMER
            </h2>
          </Link>
          <Link to="/officePcsPage">
            <img
              className="pcTypeImg"
              src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2Fgb-office-tgt-rebel.png?alt=media&token=09c22749-b9c3-4627-8fa3-a23f077b4f3a"
              alt="PC OFFICE"
            />
            <h2 className="h2" id="pcTypeTxt" title="Tipo de PC Office">
              OFFICE
            </h2>
          </Link>
        </div>
      </section>
      <h1 className="h1" id="hL">
        DESTAQUES
      </h1>
      <Carrosel />
      <BBPf />
      <h1 className="h1" id="bS">
        MAIS VENDIDOS
      </h1>
      <Carrosel />
      <Departments />
    </>
  );
};

export default HomePage;
