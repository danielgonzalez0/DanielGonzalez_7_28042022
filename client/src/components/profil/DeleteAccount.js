import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DeleteAccount = () => {
  const userData = useSelector((state) => state.userReducer);
  //hook

  //logique

  //JSX
  return (
    <div>
        <p>La suppression de votre compte effacera vos données de profil ainsi que toutes vos publications et commentaires</p>
      <input type="submit" value="Supprimer mon compte" />
    </div>
  );
};

export default DeleteAccount;
