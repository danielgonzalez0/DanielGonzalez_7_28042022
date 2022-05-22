import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
  //hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //logique
  const handleLogin = (e) => {
    e.preventDefault();
    //querySelector
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');

    //axios
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    }) //end axios
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = '/';
          //save token in localstorage
          console.log(res);
          console.log(res.data.accessToken);
          localStorage.setItem('accessToken', res.data.accessToken);
        }
      }) //end then
      .catch((err) => {
        console.log(err);
      }); //catch
  }; // end handleLogin

  //JSX
  return (
    <>
      <span className="form-container__spam">Connexion</span>
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
