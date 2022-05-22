import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {
  //hook
  const uid = useContext(UidContext);
  //logique

  //jsx
  return (
    <nav>
      {/* left part */}
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon-left-font.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        {/* right part */}
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue 'valeur dynamique'</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/login">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
