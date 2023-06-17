import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { BsHeartFill, BsLockFill, BsPersonCircle } from "react-icons/bs";
import "../styles/UserProfile.css";
import { FaShoppingCart } from "react-icons/fa";
import ShortHeader from "../components/ShortHeader";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID;

  useEffect(() => {
    if (!user) {
      alert("Faça seu login para acessar o seu perfil");
      navigate("/login");
    }
  }, [user, navigate]);

  const renderAdminContent = () => {
    if (isAdmin) {
      return (
        <>
          <ShortHeader />
          <div className="adminContentMain">
            <div className="userProfileContainer">
              <h1>Painel Administrativo</h1>
              <h2>
                Olá Admin : <BsPersonCircle /> {auth.currentUser.displayName}
              </h2>
              <ul>
                <li>
                  <Link to="/addProducts" style={{ color: "#f00" }}>
                    CRUD Produtos
                  </Link>
                </li>
                <li>
                  <Link to="/addImage" style={{ color: "#f00" }}>
                    Add Imagem a Cloud
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  const renderUserContent = () => {
    if (user) {
      return (
        <>
          <ShortHeader />
          <div className="userProfile">
            <div className="userProfileContainer">
              <img width={20} alt="" src={user.photoUrl} />
               Olá {' '}
              {user.displayName}
               {<BsPersonCircle alt="Profile" className="profile-picture" />}
              <h6>
                <IoMdMail /> {user.email}
              </h6>

            </div>
            <div className="userProfileContainer2">
              <div className="userProfileContainer">
                <h3>Seus favoritos:</h3>
                <ul className="favorites-list">
                  <li>
                    <Link to="/favorites" style={{ color: "#f00" }}>
                      <BsHeartFill /> Favoritos
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="userProfileContainer">
                <h3>Carrinho de Compras:</h3>
                <ul className="favorites-list">
                  <li>
                    <Link to="/cart" style={{ color: "#f00" }}>
                      <FaShoppingCart /> Carrinho
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="userProfileContainer">
                <p>
                  <BsLockFill /> Deseja alterar sua senha?
                  <Link to="/resetPassword" style={{ color: "#f00" }}>
                    <strong>Redefinir senha</strong>
                  </Link>
                </p>
              </div>
              <button style={{ width: '29rem' }} className="button-buy" onClick={logout}>
                Sair
              </button>
            </div>
          </div>
        </>
      );
    }
    return <div>Faça o seu Login</div>;
  };

  return (
    <>
      {renderAdminContent()}
      {renderUserContent()}
    </>
  );
};

export default ProfilePage;
