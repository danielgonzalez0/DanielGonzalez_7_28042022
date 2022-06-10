import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/profil/UpdateProfil';
import Login from './Login';

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <>
      {uid ? (
        <>
          <Navbar />
          <div className="profil-page">
            <UpdateProfil />
          </div>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
};

export default Profil;
