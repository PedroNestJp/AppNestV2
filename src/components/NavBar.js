import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';
import { auth } from '../firebase';

const Navbar = () => {
  const { user, logout } = useAuth();
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
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Cadastro</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
