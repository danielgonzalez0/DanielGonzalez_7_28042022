import React, { useState } from 'react';
//import { useSelector } from 'react-redux';

const ModifyPassword = () => {
  //hook
  //const userData = useSelector((state) => state.userReducer);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  //logique
  const handleModify = () => {};

  //JSX
  return (
    <div>
      <form action="" onSubmit={handleModify} id="sign-up-form">
        {/* champ password */}
        <label htmlFor="password"></label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          placeholder=" Ancien Mot de Passe"
        />
        <div className="password error"></div>
        <br />
        {/* champ password */}
        <label htmlFor="password"></label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          placeholder=" Nouveau Mot de Passe"
        />
        <div className="password error"></div>
        <br />
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
};

export default ModifyPassword;
