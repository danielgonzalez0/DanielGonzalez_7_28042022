import React from 'react';
import Navbar from '../components/Navbar';
import UpdateProfil from '../components/profil/UpdateProfil';

const Profil = () => {
  return (
    <>
      <Navbar />
    
      <div className="profil-page">
        <UpdateProfil />
      </div>
    </>
  );
};

export default Profil;
