import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ModifyProfil = () => {
  //hook
  const userData = useSelector((state) => state.userReducer);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [job, setJob] = useState('');

  //logique
  const handleModify = () => {};

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
