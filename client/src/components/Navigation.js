import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
          <li>accueil</li>
        </NavLink>
        <NavLink
          to="/users"
          className={(nav) => (nav.isActive ? 'nav-active' : '')}
        >
          <li>Utilisateurs</li>
        </NavLink>
        <NavLink
          to="/profil"
          className={(nav) => (nav.isActive ? 'nav-active' : '')}
        >
          <li>Profil</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
