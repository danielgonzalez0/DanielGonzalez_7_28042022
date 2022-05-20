import React, { useState } from 'react';

const SignInForm = () => {
  //kook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //logique
  const handleLogin = (e) => {
    e.preventDefault();
  }; // end handleLogin

  //JSX
  return (
    <>
      <spam className="form-container__spam">Connexion</spam>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        {/*input email*/}
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
        {/*input password*/}
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder=" Saisir Mot de Passe"
        />
        <div className="password error"></div>
        <br />

        <input type="submit" value="Se connecter" />
      </form>
    </>
  );
};

export default SignInForm;
