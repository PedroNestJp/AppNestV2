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
    path: '/minhaconta',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Mais Vendidos',
    path: '/products',
    icon: <FaIcons.FaFire />,
    cName: 'nav-text'
  },
  {
    title: 'Destaques',
    path: '/products',
    icon: <FaIcons.FaStar />,
    cName: 'nav-text'
  },
  {
    title: 'Favoritos',
    path: '/favoritos',
    icon: <FaIcons.FaHeart />,
    cName: 'nav-text'
  },
  {
    title: 'Atendimento ao cliente',
    path: 'https://api.whatsapp.com/message/JVU7KU5D3563D1?autoload=1&app_absent=0',
    icon: <RiIcons.RiCustomerService2Fill />,
    cName: 'nav-text'
  }
];