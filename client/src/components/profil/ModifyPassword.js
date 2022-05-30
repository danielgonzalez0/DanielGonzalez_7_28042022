import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePassword } from '../../actions/user.actions';

const ModifyPassword = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  //logique
  const handleModify = (e) => {
    e.preventDefault();
    const passwordError = document.querySelector('.password.error');
    const jobError = document.querySelector('.job.error');
    const success = document.querySelector('.success');
    jobError.innerHTML = '';
    passwordError.innerHTML = '';
    success.innerHTML = '';

    dispatch(updatePassword(oldPassword, password, userData.id_user, token));
  };

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
        <br />
        <br />
        {/* champ password */}
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder=" Nouveau Mot de Passe"
        />
        <br />
        <div className="password error"></div>
        <div className="job error"></div>
        <div className="success"></div>
        <br />
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
};

export default ModifyPassword;
