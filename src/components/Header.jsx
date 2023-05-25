import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../pages/contexts/AuthProvider";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as BsIcons from "react-icons/bs";
import * as RxIcons from "react-icons/rx";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import "../styles/Header.css";
import Navbar from "./Navbar";

function Header() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
  
  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
  
    const filteredProducts = products.filter((product) => {
      if (product.titleLowercase) {
        return product.titleLowercase.includes(lowercaseQuery);
      }
      return false;
    });
  
    setSearchResults(filteredProducts);
  }, [searchQuery, products]);

  const handleSearch = async (event) => {
    event.preventDefault();
    // Nenhuma ação adicional necessária aqui,
    // pois o useEffect cuidará da atualização dos resultados da busca.
  };

return (
  <div className="navbarhome">
    <Navbar/>
    <form className="search" action="#" onSubmit={handleSearch}>
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="inputSearch"
        id="busque-aqui"
        autoComplete="off"
        placeholder="Busque aqui"
        type="text"
      />
      <button
        className="button-submit"
        type="button"
        alt="icon-lupa"
        title="Pesquisar"
        onClick={handleSearch}
      >
        <RxIcons.RxMagnifyingGlass />
      </button>
    </form>

      <div className="areaProfile">
        {user ? (
          <Link
            to="/userProfile"
            alt="iconProfile"
            title="Ir para o seu perfil"
            className="iconProfileHome"
          >
            <BsIcons.BsPersonCircle />
          </Link>
        ) : (
          <Link
            to="/login"
            alt="iconProfile"
            title="Ir para o seu perfil"
            className="iconProfileHome"
            onClick={() => {
              alert("Faça seu Login ou cadastre-se");
            }}
          >
            <BsIcons.BsPersonCircle />
          </Link>
        )}
        <span className="text-profile-home">
          Faça seu{" "}
          <Link
            to="/login"
            id="link-login-header-home"
            title="Faça seu login"
            className="link-login-home"
            href="/login"
          >
            LOGIN
          </Link>{" "}
          ou
          <Link
            to="/signUp"
            id="link-cadastre-se-home"
            title="Faça o seu cadastro"
            className="link-cadastre-se-home"
            href="/register"
          >
            {" "}
            CADASTRE-SE
          </Link>
        </span>
      </div>

      <div className="iconsNavHome">
        <span>
          <Link
            to="/cart"
            className="icon-shoppingCart"
            id="iconShoppingCart"
            title="Ir para o seu carrinho"
            src="../assets/icons/icon-shoppingCart.png"
            alt="iconShoCar"
          >
            <FaIcons.FaShoppingCart />
          </Link>
        </span>
        <span>
          <Link
            to="https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0"
            className="icon-support"
            id="iconSupporte"
            title="Fale conosco"
            src="../assets/icons/icon-support.png"
            alt="iconSupport"
          >
            <RiIcons.RiCustomerService2Fill />
          </Link>
        </span>
        <span>
          <Link
            to="/favorites"
            className="favoriteIconNav"
            id="favoriteIconNav"
            title="Seus produtos favoritos"
            src="../assets/icons/favoriteIcon.png"
            alt="Favorite Icon"
          >
            <BsIcons.BsHeartFill />
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Header;
