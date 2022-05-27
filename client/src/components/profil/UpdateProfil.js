import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteAccount from './DeleteAccount';
import ModifyPassword from './ModifyPassword';
import ModifyProfil from './ModifyProfil';

const UpdateProfil = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [profilPopup, setProfilPopup] = useState(false);
  const [popupContain, setPopupContain] = useState('profil');
  //logique

  const handlePopup = () => {
    setProfilPopup(false);
    setPopupContain('profil');
  };

  //JSX
  return (
    <>
      <h1>Profil de {userData.user_fullname}</h1>
      <div className="profil-container">
        <div className="profil-container-top">
          <div className="profil-picture">
            <img src={userData.user_picture} alt="pic-profil" />
          </div>
        </div>
        <div className="profil-container-bottom">
          <h2>{userData.user_fullname}</h2>
          <div className="profil-container-p">
            <p>{userData.user_job}</p>
            <p>Abonné :</p>
          </div>
          <button onClick={() => setProfilPopup(true)}>
            Modifier le profil
          </button>
        </div>
        {profilPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Préférences</h3>
              <span className="cross" onClick={() => handlePopup()}>
                &#10005;
              </span>
              <ul>
                <li onClick={() => setPopupContain('profil')}>Profil</li>
                <li onClick={() => setPopupContain('security')}>Sécurité</li>
                <li onClick={() => setPopupContain('account')}>Compte</li>
              </ul>
              {popupContain === 'profil' && (
                <div className="Profil-contain">
                  <h3>Photo de Profil</h3>
                  <div className="profil-photo-section">
                    <img src={userData.user_picture} alt="pic-profil" />
                    <button>Supprimer</button>
                    <button>Modifier</button>
                  </div>
                  <h3>Informations Personnelles</h3>
                  <ModifyProfil />
                </div>
              )}
              {popupContain === 'security' && (
                <div className="Profil-contain">
                  <h3>Changer de mot de passe</h3>
                  <ModifyPassword />
                </div>
              )}
              {popupContain === 'account' && (
                <div className="Profil-contain">
                  <h3>Supprimer le compte</h3>
                  <DeleteAccount />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProfil;
