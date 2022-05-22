import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';

const Home = () => {
  //hook
  const uid = useContext(UidContext);

  //logique

  //JSX
  return (
    <div className="profil-page">
      {uid ? (
        <>
          <Navbar />
          <h1>UPDATE PAGE</h1>
        </>
      ) : (
        <>
          <Navbar />
          <div className="login___log-container">
            <Log signin={false} signup={true} />
            <div className="login__img-container">
              <img src="./img/login.jpg" alt="log" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
