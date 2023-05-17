import React, { useEffect, useState } from 'react';
import { useAuth } from "./contexts/AuthProvider";
import { doc, getDoc } from 'firebase/firestore';
import '../styles/UserProfile.css';
import { auth, db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import {BsLockFill, BsPersonCircle} from 'react-icons/bs'

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      }
    };

    fetchUserData();
  }, [user]);

  if (!userData) {
    return <div>Loading...</div>;
  }

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
           
                <div className="user-profile">
                <img src={userData.profilePicture} alt="Profile" className="profile-picture" />
                <h2 className="username">{userData.username}</h2>
                <p className="email">{userData.email}</p>
                {/* Aqui você pode exibir outros dados do usuário, como endereço, telefone, etc. */}
                <h3>Favoritos:</h3>
                <ul className="favorites-list">
                  {userData.favorites && userData.favorites.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
                <h3>Carrinho de Compras:</h3>
                <ul className="cart-list">
                  {userData.cart && userData.cart.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </div>
              </>
          ) : (
            <>
              <div>Faça o seu Login</div>
            </>
          )}



    </>

  );
};

export default UserProfile;
