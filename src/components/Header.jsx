import { Link } from "react-router-dom";
import { useAuth } from "../pages/contexts/AuthProvider";
import { BsPersonCircle, BsHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import "../styles/Header.css";
import Navbar from "./Navbar";
import ProductsSearch from "./ProductsSearch";
import {logo} from "../img/imgs";

function Header() {
  const { user } = useAuth();

  return (
    <header className="navbarhome">
      <Navbar />
      <Link to="/" title="clique para ir para a tela inicial">
        <img
          className="headerLogo"
          src={logo}
          alt="logo da Nest Informática"
          id="headerLogo"
        />
      </Link>
      <ProductsSearch />
      <div className="areaProfile">
        <ProfileLink user={user} />
        <UserGreeting user={user} />
      </div>
      <NavigationIcons />
    </header>
  );
}

const ProfileLink = ({ user }) => {
  return user ? (
    <Link
      to="/userProfile"
      title="Ir para o seu perfil"
      className="iconProfileHome"
    >
      <BsPersonCircle aria-label="Profile Icon" />
    </Link>
  ) : (
    <Link
      to="/login"
      title="Faça seu Login ou cadastre-se"
      className="iconProfileHome"
      onClick={() => alert("Faça seu Login ou cadastre-se")}
    >
      <BsPersonCircle aria-label="Profile Icon" />
    </Link>
  );
};

const UserGreeting = ({ user }) => {
  return user ? (
    <span className="currentUserText">
      <Link
        to="/userProfile"
        className="currentUserText"
        title="Ir para o seu perfil"
      >
        Olá <strong>{user.displayName}</strong>
      </Link>
    </span>
  ) : (
    <span className="textProfile">
      Faça seu{" "}
      <Link
        className="linkLoginNavShort"
        title="Faça seu login"
        to="/login"
      >
        LOGIN
      </Link>{" "}
      ou{" "}
      <Link
        className="linkRegisterNavShort"
        title="Cadastre-se"
        to="/signup"
      >
        CADASTRE-SE
      </Link>
    </span>
  );
};

const NavigationIcons = () => (
  <div className="iconsNavHome">
    <span>
      <Link
        to="/cart"
        className="shoppingCartIcon"
        title="Ir para o seu carrinho"
      >
        <FaShoppingCart aria-label="Shopping Cart Icon" />
      </Link>
    </span>
    <span>
      <a
        href={process.env.REACT_APP_URL_WHATSAPP}
        className="supportIcon"
        title="Fale conosco"
        target="_blank"
        rel="noopener noreferrer"
      >
        <RiCustomerService2Fill aria-label="Support Icon" />
      </a>
    </span>
    <span>
      <Link
        to="/favorites"
        className="favoritesIcon"
        title="Seus produtos favoritos"
      >
        <BsHeartFill aria-label="Favorites Icon" />
      </Link>
    </span>
  </div>
);

export default Header;
