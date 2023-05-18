import { Link } from "react-router-dom";
import * as BsIcons from "react-icons/bs";
import { logo } from "../img/imgs";

const HeaderShort = () => {
  return (
    <div className="navbarShort">
      <Link to="/" rel="noopener noreferrer">
        <img
          className="logoNestHeader"
          id="logoNestHeader"
          title="logoNestHeader"
          alt="logoNestHeader"
          src={logo}
        />
      </Link>
      <div className="areaProfileNavShort">
        <Link to="/userProfile">
          <img
            className="iconProfileHome"
            alt="iconProfileHome"
            title="Ir para o seu perfil"
            src={<BsIcons.BsPersonCircle />}
          />
        </Link>
        <span className="textProfileNavShort">
          Faça seu{" "}
          <Link
            className="linkLoginNavShort"
            id="linkLoginNavShort"
            title="linkLoginNavShort"
            to="/login"
          ></Link>
          LOGIN ou{" "}
          <Link
            className="linkRegisterNavShort"
            id="linkRegisterNavShort"
            title="linkRegisterNavShort"
            to="/signup"
          ></Link>
          CADASTRE-SE
        </span>
      </div>
    </div>
  );
};
export default HeaderShort;
