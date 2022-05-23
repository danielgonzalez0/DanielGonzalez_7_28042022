import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

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

    //query selector

    const fullnameError = document.querySelector('.fullname.error');
    const emailError = document.querySelector('.email.error');
    const passwordError = document.querySelector('.password.error');
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    );

    //check logic

    passwordConfirmError.innerHTML = '';
    passwordError.innerHTML = '';
    fullnameError.innerHTML = '';
    emailError.innerHTML = '';

    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = 'Les mots de passe ne correspondent pas';
    } else {
      //axios
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        data: {
          firstname,
          lastname,
          job,
          email,
          password,
        },
      }) //end axios
        .then((res) => {
          console.log(res);
          setFormSubmit(true);
        }) //end then
        .catch((err) => {
          console.log(err);
          console.log(Array.isArray(err.response.data.error));
          if (Array.isArray(err.response.data.error)) {
            switch (err.response.data.error[0].message) {
              case 'The string should have a minimum length of 8 characters' ||
                'The string should have a maximum length of 20 characters':
                passwordError.innerHTML =
                  'Le mot de passe doit contenir entre 8 et 20 caractères sans espace';
                break;
              case 'The string should have a minimum of 1 uppercase letter' ||
                'The string should have a minimum of 1 lowercase letter' ||
                'The string should have a minimum of 1 digit':
                passwordError.innerHTML =
                  'Le mot de passe doit contenir au minimum un chiffre, une majuscule et une minuscule, sans espace';
                break;
              case 'The string should not have spaces':
                passwordError.innerHTML = `Le mot de passe ne doit pas avoir d'espace`;
                break;

              default:
                passwordError.innerHTML = err.response.data.error[0].message;
                break;
            }
          } else if (err.response.data.errors) {
            fullnameError.innerHTML = err.response.data.errors.fullname;
            emailError.innerHTML = err.response.data.errors.email;
            passwordError.innerHTML = err.response.data.errors.password;
            console.log(err);
          } else if (err.response.data.error) {
            emailError.innerHTML = err.response.data.error;
          }
        }); //end catch
    }
  }; //end handleRegister

  //JSX
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <div></div>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
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
            </div>

            {/* champ job */}

            <div className="fullname error"></div>
            <br />
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
      )}
    </>
  );
};

export default SignUpForm;
