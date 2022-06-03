import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInfo } from '../../actions/user.actions';

const ModifyProfil = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState(userData.user_firstname);
  const [lastname, setLastname] = useState(userData.user_lastname);
  const [job, setJob] = useState(userData.user_job);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();

  //logique
  const handleModify = async (e) => {
    e.preventDefault();
    const fullnameError = document.querySelector('.fullname.error');
    const jobError = document.querySelector('.job.error');
    const success = document.querySelector('.success');
    fullnameError.innerHTML = '';
    jobError.innerHTML = '';
    success.innerHTML = '';
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
          placeholder={'Prénom'}
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
          placeholder={'Nom de famille'}
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
          placeholder={'Fonction'}
        />
        <div className="job error"></div>
        <br />
        <input type="submit" value="Valider données" />
        <div className="success"></div>
      </form>
    </div>
  );
};

export default ModifyProfil;
