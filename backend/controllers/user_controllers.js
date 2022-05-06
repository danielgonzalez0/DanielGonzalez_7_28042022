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
//middleware login pour connecter les utilisateurs existants

exports.login = (req, res, next) => {
  const { email, password } = req.body; //destructuring
  mysql.query(
    `SELECT id_user, user_email, user_password FROM sn_users where user_email = '${email}';`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      if (result.length === 0) {
        res.status(404).json({ message: 'Utilisateur non trouvé!' });
      } else {
        // si Utilisateur trouvé, comparer le MDP requête avec MDP user avec bcrypt
        bcrypt
          .compare(password, result[0].user_password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect!' });
            }
            //si mdp ok renvoie userId + un token
            res.status(200).json({
              userId: result[0].id_user,
              token: jwt.sign(
                { userId: result[0].id_user },
                process.env.JWT_SECRET_KEY,
                {
                  expiresIn: '24h',
                }
              ),
            });
          }) //end then compare
          .catch((err) => res.status(500).json({ err })); //end catch compare
      }
    }
  ); // end query
}; //end middleware login
