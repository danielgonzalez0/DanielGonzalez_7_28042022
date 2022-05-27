import React from 'react';
import Navbar from '../components/Navbar';
import Navigation from '../components/Navigation';
import UpdateProfil from '../components/profil/UpdateProfil';

const Profil = () => {
  return (
    <>
      <Navbar />
      <Navigation />
      <div className="profil-page">
        <UpdateProfil />

      </div>
    </>
  );
};

export default Profil;
