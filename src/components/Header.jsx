import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/contexts/AuthProvider';
import * as BsIcons from 'react-icons/bs'
import * as RxIcons from 'react-icons/rx'
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import "../styles/Header.css"
import Navbar from "./Navbar"

function Header() {
  const { user } = useAuth();

  return (
    <div className="navbarhome">
      <Navbar />
      <Link to='/'>
        <img
          className="logoNestHeaderHome"
          src={'https://firebasestorage.googleapis.com/v0/b/nest-informatica.appspot.com/o/images%2FlogoNestNew.png?alt=media&token=ffd0bd44-299a-4604-b341-d2805997cac2'}
          alt='logo da Nest Informática'
          title='clique para ir para a tela inicial'
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
            title="Pesquisar"
          >
            <RxIcons.RxMagnifyingGlass />
          </Link>
        </button>
      </div>

      <div className="areaProfile">
        {user ? (
          <Link
            to='/userProfile'
            alt="iconProfile"
            title='Ir para o seu perfil'
            className="iconProfileHome"
          >
            <BsIcons.BsPersonCircle />
          </Link>

        ) : (
          <Link
            to='/login'
            alt="iconProfile"
            title='Ir para o seu perfil'
            className="iconProfileHome"
            onClick={() => {
              alert("Faça seu Login ou cadastre-se")
            }}
          >
            <BsIcons.BsPersonCircle />
          </Link>)}
        <span
          className="text-profile-home">
          Faça seu{' '}
          <Link
            to='/login'
            id="link-login-header-home"
            title="Faça seu login"
            className="link-login-home"
            href="/login">
            LOGIN
          </Link>
          {' '}ou
          <Link
            to='/signUp'
            id="link-cadastre-se-home"
            title="Faça o seu cadastro"
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
            title="Ir para o seu carrinho"
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
            title="Fale conosco"
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
            title="Seus produtos favoritos"
            src="../assets/icons/favoriteIcon.png"
            alt="Favorite Icon">
            <BsIcons.BsHeartFill />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
