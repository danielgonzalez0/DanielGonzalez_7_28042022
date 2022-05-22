import React, { useState } from 'react';

const SignUpForm = () => {
  //hook
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  //logique

  const handleRegister = async (e) => {
    e.preventDefault();
  }; //end handleRegister

  //JSX
  return (
    <>
      <span className="form-container__spam">Inscription</span>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <div className="form__top__container">
          {/* champ firstname */}
          <label htmlFor="firstname"></label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            placeholder="Prénom"
          />
          <div className="firstname error"></div>
          <br />
          {/* champ lastname */}
          <label htmlFor="lastname"></label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            placeholder="Nom de Famille"
          />
          <div className="lastname error"></div>
        </div>
        <br />
        {/* champ job */}
        <label htmlFor="job"></label>
        <input
          type="text"
          name="job"
          id="job"
          onChange={(e) => setJob(e.target.value)}
          value={job}
          placeholder="Fonction dans l'Entreprise"
        />
        <div className="lastname error"></div>
        <br />
        {/* champ email*/}
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Adresse Email"
        />
        <div className="email error"></div>
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
        <div className="password error"></div>
        <br />
        {/* champ contrôle password */}
        <label htmlFor="password-conf"></label>
        <input
          type="password"
          name="password"
          id="password-conf"
          onChange={(e) => setControlPassword(e.target.value)}
          value={controlPassword}
          placeholder="Confirmer Mot de Passe"
        />
        <div className="password-confirm error"></div>
        <br />
        <input type="submit" value="Valider inscription" />
      </form>
    </>
  );
};

export default SignUpForm;
