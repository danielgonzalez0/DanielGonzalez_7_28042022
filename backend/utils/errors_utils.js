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

  return errors;
};

//-------------------------------------------------------------
// errors regexName
module.exports.regexField = (field) => {
  let regexField = /^[A-Z][a-zA-ZÀ-ÿ -]{2,30}$/;
  let testField = regexField.test(field);
  if (testField) {
    return true;
  } else {
    error = messageErreur;
    return false;
  } //end if
}; //end regexName
