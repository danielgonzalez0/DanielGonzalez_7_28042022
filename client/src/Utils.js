export const dateParser = (num) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  let timseStamp = Date.parse(num);

  let date = new Date(timseStamp).toLocaleDateString('fr-FR', options);

  return date.toString();
};

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const handleErrors = (err) => {
  const fullnameError = document.querySelector('.fullname.error');
  const jobError = document.querySelector('.job.error');
  const emailError = document.querySelector('.email.error');
  const passwordError = document.querySelector('.password.error');

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
      case 'The string should have a minimum of 1 digit':
        passwordError.innerHTML = `Le mot de passe doit contenir au minimum un chiffre`;
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
  } else if (err.response.data.error === 'Adresse mail non valide') {
    emailError.innerHTML = err.response.data.error;
  } else {
    jobError.innerHTML = err.response.data.error;
  }
};
