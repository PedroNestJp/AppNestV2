import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { BsLockFill, BsPersonCircle } from "react-icons/bs";
import "../styles/UserProfile.css";
import HeaderShort from "../components/ShortHeader";

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
          <HeaderShort />

          <div className="adminContentMain">
            <h1>Painel Administrativo</h1>
            <h2>
              Olá Admin : <BsPersonCircle /> {auth.currentUser.displayName}
            </h2>
            <ul>
              <li>
                <Link to="/addProducts" style={{ color: "#f00" }}>
                  Add Products
                </Link>
              </li>
              <li>
                <Link to="/CRUDProducts" style={{ color: "#f00" }}>
                  CRUD Products
                </Link>
              </li>
              <li>
                <Link to="/addImage" style={{ color: "#f00" }}>
                  Add Image
                </Link>
              </li>
            </ul>
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
          <HeaderShort />

          <div className="user-profile">
            {<BsPersonCircle alt="Profile" className="profile-picture" />}

            <h1>Perfil</h1>

            <div>
              <div>
                Olá <BsPersonCircle /> {user.displayName}
                <img width={20} alt="">{user.photoUrl}</img>
              </div>
              <p>
                <IoMdMail /> {user.email}
              </p>
            </div>
            <h2 className="username">{user.username}</h2>
            <h3>Seus favoritos:</h3>
            <ul className="favorites-list">
              {user.favorites &&
                user.favorites.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              <li>
                <Link to="/favorites" style={{ color: "#f00" }}>
                  Favoritos
                </Link>
              </li>
            </ul>
            <h3>Carrinho de Compras:</h3>
            <ul className="cart-list">
              {user.carts &&
                user.carts.map((item) => <li key={item.id}>{item.name}</li>)}
            </ul>

            <div className="resetPassword">
              <p>
                <BsLockFill /> Deseja alterar sua senha?
                <Link to="/resetPassword" style={{ color: "#f00" }}>
                  <strong>Redefinir senha</strong>
                </Link>
              </p>
            </div>
            <button className="btnLogout" onClick={logout}>
              Sair
            </button>
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
