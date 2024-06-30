import { Link } from "react-router-dom";
import { useAuth } from "../pages/contexts/AuthProvider";
import { BsPersonCircle, BsHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import "../styles/Header.css";
import Navbar from "./Navbar";
import ProductsSearch from "./ProductsSearch";

function Header() {
  const { user } = useAuth();

  const renderProfileLink = () => {
    if (user) {
      return (
        <Link
          to="/userProfile"
          alt="iconProfile"
          title="Ir para o seu perfil"
          className="iconProfileHome"
          id=""
        >
          <BsPersonCircle />
        </Link>
      );
    } else {
      return (
        <Link
          to="/login"
          alt="iconProfile"
          title="Ir para o seu perfil"
          className="iconProfileHome"
          onClick={() => {
            alert("Faça seu Login ou cadastre-se");
          }}
        >
          <BsPersonCircle />
        </Link>
      );
    }
  };

  const renderUserGreeting = () => {
    if (user) {
      return (
        <span className="currentUserText">
          {" "}
          <Link
            to="/userProfile"
            className="currentUserText"
            alt="iconProfileHome"
            title="Ir para o seu perfil"
          >
            Olá <strong>{user.displayName}</strong>
          </Link>
        </span>
      );
    } else {
      return (
        <span className="textProfile">
          Faça seu{" "}
          <Link
            className="linkLoginNavShort"
            id="linkLoginNavShort"
            title="linkLoginNavShort"
            to="/login"
          >
            LOGIN
          </Link>{" "}
          ou{" "}
          <Link
            className="linkRegisterNavShort"
            id="linkRegisterNavShort"
            title="linkRegisterNavShort"
            to="/signup"
          >
            CADASTRE-SE
          </Link>
        </span>
      );
    }
  };

  return (
    <>
      <div className="navbarhome">
        <Navbar />
        <Link to="/" title="clique para ir para a tela inicial">
          <img
            className="headerLogo"
            src="https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2"
            alt="logo da Nest Informática"
            id="headerLogo"
          />
        </Link>
        <ProductsSearch  />
        <div className="areaProfile">
          {renderProfileLink()}
          {renderUserGreeting()}
        </div>

        <div className="iconsNavHome">
          <span>
            <Link
              to="/cart"
              className="shoppingCartIcon"
              id="shoppingCartIcon"
              title="Ir para o seu carrinho"
            >
              <FaShoppingCart />
            </Link>
          </span>
          <span>
            <a
              href="https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0"
              className="supportIcon"
              id="supportIcon"
              title="Fale conosco"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiCustomerService2Fill />
            </a>
          </span>
          <span>
            <Link
              to="/favorites"
              className="favoritesIcon"
              id="favoritesIcon"
              title="Seus produtos favoritos"
            >
              <BsHeartFill />
            </Link>
          </span>
        </div>
      </div>
    </>

  );
}

export default Header;
