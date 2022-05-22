import React from 'react';


const Logout = () => {


  //logique
  const logout = async () => {
    localStorage.clear();
    window.location = '/login';
  };

  //hook
  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
