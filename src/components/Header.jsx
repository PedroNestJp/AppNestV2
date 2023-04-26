import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
  const isAdmin = auth.currentUser?.uid === process.env.REACT_APP_USER_ADMIN;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/addProduct">AddProduct</Link>
            </li>
            <li>
              <Link to="/admin">Admin Page</Link>
            </li>
          </>
        )}
      </ul>
      <ul>
        {!auth.user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Cadastro</Link>
            </li>
          </>
        )}
        {auth.user && (
          <li>
            <button onClick={''}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
