const mysql = require('../database/mySQL_connection');
const bcrypt = require('bcrypt');

//--------------------------------------------------------------------------
module.exports.getAllUsers = async (req, res) => {
  try {
    mysql.query(
      `SELECT id_user, user_fullname, user_registration, user_picture FROM sn_users where ?;`,
      ['1'],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error });
        } else {
          res.status(200).json({ result });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ err });
  }
}; //end getAllUsers

//--------------------------------------------------------------------------
module.exports.getUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      mysql.query(
        `SELECT id_user,user_firstname, user_lastname, user_fullname, user_registration, user_picture FROM sn_users where id_user = ?;`,
        [id],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé!' });
          } else {
            res.status(200).json({ result });
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end getUserInfo

//--------------------------------------------------------------------------
module.exports.updateUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      //début code
      const { lastName, firstName, job } = req.body; //destructuring
      if (lastName == '' || firstName == '' || job == '')
        return res.status(400).json({
          message: `Les champs d'informations personnelles doivent être remplies`,
        });

      mysql.query(
        `UPDATE sn_users SET  user_firstname = ?,
        user_lastname = ?,
        user_fullname = CONCAT(user_firstname,' ',user_lastname),
        user_job = ? where id_user = ?;`,
        [`${firstName}`, `${lastName}`, `${job}`, id],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé!' });
          } else {
            res.status(200).json({ message: 'Données personnelles modifiées' });
          }
        }
      ); //mysql query
    } //end if
    //fin code
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end updateUserInfo

//--------------------------------------------------------------------------
module.exports.updateUserPassword = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      //début code
      const { oldPassword, newPassword } = req.body; //destructuring

      //check old password

      mysql.query(
        `SELECT user_password FROM sn_users where id_user = ? ;`,
        [id],
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
              userPassword: result[0].user_password,
            };

            bcrypt
              .compare(oldPassword, user.userPassword)
              .then((valid) => {
                if (!valid) {
                  return res
                    .status(401)
                    .json({ error: 'Ancien mot de passe incorrect!' });
                }
                console.log('ancien password check');

                //hash new password

                bcrypt
                  .hash(newPassword, 10)
                  .then((hash) => {
                    mysql.query(
                      `UPDATE sn_users SET user_password = ? where id_user = ?;`,
                      [`${hash}`, id],
                      (error, result) => {
                        if (error) {
                          res.status(400).json({ error });
                        } else {
                          res
                            .status(200)
                            .json({ message: 'Mot de Passe modifié' });
                        }
                      }
                    );
                  }) //end then hash
                  .catch((error) => res.status(500).json({ error })); //end catch hash
                //fin code
              }) //end then compare
              .catch((err) => res.status(500).json({ err })); //end catch compare
          }
        }
      ); // end query check old password
    }
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end updateUserPassword
