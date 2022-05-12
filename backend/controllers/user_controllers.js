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
      if (oldPassword === newPassword)
        return res.status(400).json({
          message: `Le nouveau mot de passe ne peut être identique au mot de passe actuel`,
        });

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
            // check old password

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

//--------------------------------------------------------------------------
module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      //début code
      mysql.query(
        `DELETE FROM sn_users where id_user = ?;`,
        [id],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé!' });
          } else {
            res.status(200).json({ message: 'Compte utilisateur supprimé' });
          }
        }
      ); //mysql query

      //fin du code
    }
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end deleteUser
//--------------------------------------------------------------------------
module.exports.follow = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      return res.status(403).json({ error: 'User ID non autorisé!' });
    }
    const { idToFollow } = req.body; //destructuring
    if (id === idToFollow)
      return res.status(400).send('Id à suivre est égal à votre Id');
    else {
      //début code

      mysql.query(
        `SELECT id_user FROM sn_users where id_user = ? ;`,
        [idToFollow],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res
              .status(404)
              .json({ message: 'Utilisateur à suivre non trouvé!' });
          } else {
            const followKey = id + '/' + idToFollow;
            console.log('followKey = ' + followKey);
            mysql.query(
              `SELECT follow_key FROM sn_follow where follow_key = ? ;`,
              [followKey],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                }
                if (result.length === 0) {
                  mysql.query(
                    `INSERT INTO sn_follow(id_follower, id_following, follow_key)
VALUES(?,?, CONCAT(id_follower,'/',id_following));`,
                    [id, idToFollow],
                    (error, result) => {
                      if (error) {
                        console.log(error);
                        res.status(400).json({ error });
                      } else {
                        res.status(201).json({ message: 'Utilisateur suivi' });
                      }
                    }
                  );
                } else {
                  res.status(400).json({
                    message: 'Utilisateur déjà suivi!',
                  });
                }
              }
            ); //end sql query

            //fin code
          } //end if
        }
      ); //end sql query
    } //end if
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end follow

//--------------------------------------------------------------------------
module.exports.unfollow = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      return res.status(403).json({ error: 'User ID non autorisé!' });
    }
    const { idToUnfollow } = req.body; //destructuring
    if (id === idToUnfollow)
      return res.status(400).send(`L'Id à ne plus suivre est égal à votre Id`);
    else {
      //début code

      mysql.query(
        `SELECT id_user FROM sn_users where id_user = ? ;`,
        [idToUnfollow],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res
              .status(404)
              .json({ message: 'Utilisateur à ne plus suivre non trouvé!' });
          } else {
            const followKey = id + '/' + idToUnfollow;
            console.log('followKey = ' + followKey);
            mysql.query(
              `SELECT follow_key FROM sn_follow where follow_key = ? ;`,
              [followKey],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                }
                if (result.length === 0) {
                  res.status(400).json({
                    message: `Utilisateur n'est pas suivi!`,
                  });
                } else {
                  mysql.query(
                    `DELETE FROM sn_follow where follow_key = ?;`,
                    [followKey],
                    (error, result) => {
                      if (error) {
                        console.log(error);
                        res.status(400).json({ error });
                      } else {
                        res
                          .status(200)
                          .json({ message: 'suivi utilisateur supprimé' });
                      }
                    }
                  ); //mysql query
                }
              }
            ); //end sql query

            //fin code
          } //end if
        }
      ); //end sql query
    } //end if
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end follow

