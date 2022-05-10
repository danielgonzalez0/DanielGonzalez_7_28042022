//==========================================================================
// définition des logiques métier des middleware user

//==========================================================================
// importation modules et packages

const mysql = require('../database/mySQL_connection');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const maxAge = 12 * 60 * 60000; // correspond à 12h en mms

//==========================================================================

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: maxAge });
}

//==========================================================================
//middleware signup pour enregistrement nouveaux utilisateurs

exports.signup = (req, res, next) => {
  const { firstname, lastname, job, email, password } = req.body; //destructuring
  //hashage MDP
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      //création nouvel utilisateur
      mysql.query(
        `INSERT INTO sn_users(user_firstname, user_lastname, user_job,  user_email, user_password, user_fullname)
VALUES('${firstname}','${lastname}' ,'${job}', '${email}', '${hash}', CONCAT(user_firstname,' ',user_lastname));`,
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error }); // mettre en place message d'erreurs
          } else {
            res.status(201).json({ message: 'Utilisateur créé' });
          }
        }
      );
    }) //end then hash
    .catch((error) => res.status(500).json({ error })); //end catch hash
}; //end middleware signup

//==========================================================================
//middleware login pour connecter les utilisateurs existants

exports.login = (req, res, next) => {
  const { email, password } = req.body; //destructuring
  mysql.query(
    `SELECT id_user, user_email, user_password, user_fullname FROM sn_users where user_email = '${email}';`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'Utilisateur non trouvé!' });
      } else {
        // si Utilisateur trouvé, comparer le MDP requête avec MDP user avec bcrypt

        const user = {
          userId: result[0].id_user,
          userPassword: result[0].user_password,
          userName: result[0].user_fullname,
          userMail: result[0].user_email,
        };

        bcrypt
          .compare(password, user.userPassword)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect!' });
            }
            //si mdp ok renvoie userId + un token
            const accessToken = generateAccessToken(user);
            res.status(200).json({ accessToken: accessToken });
          }) //end then compare
          .catch((err) => res.status(500).json({ err })); //end catch compare
      }
    }
  ); // end query
}; //end middleware login
