import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';
// import { auth } from '../firebase';
import * as BsIcons from 'react-icons/bs'
import * as RxIcons from 'react-icons/rx'
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import "../styles/Header.css"
import Navbar from "./Navbar"


function Header() {
  const { user } = useAuth();
  // const isAdmin = auth.currentUser?.uid === process.env.REACT_APP_USER_ADMIN;
  return (
    <div className="navbarhome">

      {/* <div>
                <select className='selection'>
                    <option value='escolha'> escolha </option>
                </select>
            </div> */}
      <Navbar />

      <Link to='/'>
        <img
          className="logoNestHeaderHome"
          src={'https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2'}
          alt='logo'
        />
      </Link>

      <div className="search">
        <input
          className="inputSearch"
          id="busque-aqui"
          autoComplete="off"
          placeholder="Busque aqui"
          type="text">
        </input>

        <button className="button-submit" >
          <Link
            to='/products' type='submit'
            className='icon-lupa'
            alt='icon-lupa'
            title="icon-lupa"
          >
            <RxIcons.RxMagnifyingGlass />
          </Link>
        </button>
      </div>

      <div className="areaProfile">
        {user ? (
          <Link
            to='/profile'
            alt="iconProfile"
            className="iconProfileHome"
          >
            <BsIcons.BsPersonCircle />
          </Link>

        ) : (
          <Link
            to={null}
            alt="iconProfile"
            className="iconProfileHome"
          >
            <BsIcons.BsPersonCircle />
          </Link>)}
        <span
          className="text-profile-home">
          Faça seu{' '}
          <Link
            to='/login'
            id="link-login-header-home"
            title="link-login-header"
            className="link-login-home"
            href="/login">
            LOGIN
          </Link>
          {' '}ou
          <Link
            to='/signUp'
            id="link-cadastre-se-home"
            title="link-cadastre-se"
            className="link-cadastre-se-home"
            href="/register">
            {' '}CADASTRE-SE
          </Link>
        </span>
      </div>

      <div className="iconsNavHome">
        <span>
          <Link
            to='/cart'
            className="icon-shoppingCart"
            id="iconShoppingCart"
            title="icon-shoppingCart"
            src="../assets/icons/icon-shoppingCart.png"
            alt="iconShoCar">
            <FaIcons.FaShoppingCart />
          </Link>
        </span>
        <span>
          <Link
            to='https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0'
            className="icon-support"
            id="iconSupporte"
            title="iconSupporte"
            src="../assets/icons/icon-support.png"
            alt="iconSupport">
            <RiIcons.RiCustomerService2Fill />
          </Link>
        </span>
        <span >

          <Link
            to='/favorites'
            className="favoriteIconNav"
            id="favoriteIconNav"
            title="Favoriteicon"
            src="../assets/icons/favoriteIcon.png"
            alt="Favorite Icon">
            <BsIcons.BsHeartFill />
          </Link>
        </span>
      </div>

      {/* <nav>
        <ul>
          {isAdmin && (
            <>
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
      </nav> */}
    </div>
  );
};

export default Header;
