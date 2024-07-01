import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../styles/Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <header className="navbar">
        <button
          type="button"
          className="menu-bars"
          onClick={showSidebar}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
      </header>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <button
              type="button"
              className="menu-bars"
              aria-label="Close sidebar"
            >
              <AiOutlineClose />
            </button>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span className="span-navbar">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Navbar;
