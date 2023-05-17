import React, { useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { IoMdMail } from 'react-icons/io';
import {BsLockFill, BsPersonCircle} from 'react-icons/bs'


const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin =
    auth.currentUser.uid === process.env.REACT_APP_USER_ADMIN_UID ? true : null;

  useEffect(() => {
    if (!user) {
      alert("Faça seu login para acessar o seu perfil");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {isAdmin ? (
        <>
          <h1>Painel Administrativo</h1>

          <h2> Olá Admin {<BsPersonCircle/>} {auth.currentUser.displayName}</h2>
          <li>
            <Link to="/admin" style={{ color: "#f00" }}>
              {" "}
              Admin Page{" "}
            </Link>
          </li>
        </>
      ) : (
        console.log("no admin access")
      )}
      {user ? (
        <>
          <h1>Profile</h1>
          <ul>
            <li>
              <Link to="/favorites" style={{ color: "#f00" }}>
                {" "}
                Favoritos{" "}
              </Link>
            </li>
          </ul>
          <div>
            <div>Olá {<BsPersonCircle/>} {user.displayName}</div>
            <p>{<IoMdMail/>} {user.email}</p>
          </div>
          <p>
           {< BsLockFill/>} Deseja alterar sua senha?
            <Link to="/resetPassword" style={{ color: "#f00" }}>
              <strong>Redefinir senha</strong>
            </Link>
          </p>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <>
          <div>Faça o seu Login</div>
        </>
      )}
    </>
  );
};

export default ProfilePage;


