import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../actions/user.actions';

const ModifyProfil = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [job, setJob] = useState('');
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  //logique
  const handleModify = async (e) => {
    e.preventDefault();
    const fullnameError = document.querySelector('.fullname.error');
    const jobError = document.querySelector('.job.error');
    fullnameError.innerHTML = '';
    jobError.innerHTML = '';
    dispatch(updateInfo(firstname, lastname, job, userData.id_user, token));
  };

  //JSX
  return (
    <div>
      <form action="" onSubmit={handleModify} id="sign-up-form">
        {/* champ firstname */}
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          onChange={(e) => setFirstname(e.target.value)}
          value={firstname}
          placeholder={userData.user_firstname}
        />
        <br />
        {/* champ lastname */}
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
          placeholder={userData.user_lastname}
        />
        <div className="fullname error"></div>

        {/* champ job */}

        <div className="fullname error"></div>
        <label htmlFor="job">Fonction</label>
        <input
          type="text"
          name="job"
          id="job"
          onChange={(e) => setJob(e.target.value)}
          value={job}
          placeholder={userData.user_job}
        />
        <div className="job error"></div>
        <br />
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
};

export default ModifyProfil;
