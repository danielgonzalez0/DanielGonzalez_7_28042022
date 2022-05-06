//==========================================================================
// définition des logiques métier des middleware user

//==========================================================================
// importation modules et packages

const mysql = require('../database/mySQL_connection');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

//==========================================================================
//middleware signup pour enregistrement nouveaux utilisateurs

exports.signup = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body; //destructuring
  //hashage MDP
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      //création nouvel utilisateur
      mysql.query(
        `INSERT INTO sn_users(user_firstname, user_lastname, user_email, user_password, user_fullname)
VALUES('${firstname}','${lastname}' , '${email}', '${hash}', CONCAT(user_firstname,' ',user_lastname));`,
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          } else {
            res.status(201).json({ message: 'Utilisateur créé' });
          }
        }
      );
    }) //end then hash
    .catch((error) => res.status(500).json({ error })); //end catch hash
}; //end middleware signup

//==========================================================================
/*//middleware login pour connecter les utilisateurs existants

exports.login = (req, res, next) => {
  //trouver l'utilisateur avec méthode findOne
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé!' });
      }
      // si Utilisateur trouvé, comparer le MDP requête avec MDP user avec bcrypt
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' });
          }
          //si mdp ok renvoie userId + un token
          res.status(200).json({
            userId: user._id, //_id => créer par MongoDB
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
              expiresIn: '24h',
            }),
          });
        }) //end then compare
        .catch((error) => res.status(500).json({ error })); //end catch compare
    }) //end then findOne
    .catch((error) => res.status(500).json({ error })); //end catchfindOne
}; //end middleware login
*/
