//-------------------------------------------------------------
// errors upload File
module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };
  if (err.message.includes('Invalid file'))
    errors.format = 'Format incompatible';

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500Ko';
  return errors;
};

//-------------------------------------------------------------
// errors signUp

module.exports.signUpErrors = (err) => {
  let errors = { fullname: '', email: '', password: '' };
  if (err.sqlMessage.includes(`sn_users.user_fullname`))
    errors.fullname = 'Nom complet déjà enregistré';
  if (err.message.includes(`Adresse mail non valide`))
    errors.email = 'Veuillez saisir une adresse mail valide';
  if (err.sqlMessage.includes(`sn_users.user_email`))
    errors.email = 'Cet email est déjà enregistré';
  if (
    err.message.includes(
      'The string should have a minimum length of 8 characters'
    )
  )
    errors.password = 'Le mot de passe doit contenir 8 caractères minimum';
  /*
The string should have a minimum length of 8 characters
The string should have a minimum of 1 uppercase letter
The string should have a minimum of 1 digit
The string should have a minimum of 1 lowercase letter
The string should not have spaces
The string should have a maximum length of 20 characters

    */

  return errors;
};

//-------------------------------------------------------------
// errors regexName
module.exports.regexField = (field) => {
  let regexField = /^[A-Z][a-zA-ZÀ-ÿ -]{3,30}$/;
  let errorField = '';
  let messageErreur = `Le Champ ${field} doit commencer par une majuscule, contenir entre 3 et 30 caractères et ne doit pas contenir de chiffres ou de caractères spéciaux hors "-" et " ".`;
  let testField = regexField.test(field);
  if (testField) {
    return true;
  } else {
   error = messageErreur;
    return false  ;
  } //end if
}; //end regexName
