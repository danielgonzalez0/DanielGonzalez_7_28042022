//config middleware de renforcement du password

//====================================================================
//                      importation Package

//importation de password-validator
const passwordValidator = require('password-validator');

//====================================================================
//                      structure du middleware

//création du schéma

const passwordSchema = new passwordValidator();

//règles  que doit respecter le MDP

passwordSchema
  .is()
  .min(8) // Minimum length 5
  .is()
  .max(20) // Maximum length 20
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Blacklist these value

//exportation middleware

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: passwordSchema.validate(req.body.password, { details: true }),
    });
  } //end if
}; //end callback
