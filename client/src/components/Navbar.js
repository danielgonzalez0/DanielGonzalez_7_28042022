import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import Navigation from '../components/Navigation';

const Navbar = () => {
  //hook
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

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
                <img src={userData.user_picture} alt="pic-profil" />
                <h5>{userData.user_fullname}</h5>
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
      {uid ? <Navigation /> : null}
    </nav>
  );
};

export default Navbar;
