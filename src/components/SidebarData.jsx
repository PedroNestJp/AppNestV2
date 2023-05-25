import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Meus dados',
    path: '/userProfile',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Carrinho',
    path: '/cart',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Favoritos',
    path: '/favorites',
    icon: <FaIcons.FaHeart />,
    cName: 'nav-text'
  },
  {
    title: 'Whatsapp',
    path: 'https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0',
    icon: <IoIcons.IoLogoWhatsapp />,
    cName: 'nav-text'
  }
];