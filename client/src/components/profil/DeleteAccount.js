import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const DeleteAccount = () => {
  const userData = useSelector((state) => state.userReducer);
  const token = localStorage.getItem('accessToken');
  //hook

  //logique
  const handleDelete = async (e) => {
    e.preventDefault();
    //axios
    await axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/${userData.id_user}`,
      headers: { Authorization: `Bearer ${token}` },
    }) //end axios
      .then((res) => {
        console.log(res);
        localStorage.clear();
        window.location = '/login';
        alert('Compte supprimé');
      }) //end then
      .catch((err) => {
        console.log(err);
      }); //end catch
  };

  //JSX
  return (
    <div>
      <p>
        La suppression de votre compte effacera vos données de profil ainsi que
        toutes vos publications et commentaires
      </p>
      <input
        type="submit"
        onClick={handleDelete}
        value="Supprimer mon compte"
      />
    </div>
  );
};

export default DeleteAccount;
