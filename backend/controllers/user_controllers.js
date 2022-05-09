const mysql = require('../database/mySQL_connection');

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

  /*
  console.log('---getUserInfo => req.params----');
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    //test si ID connu dans base de données
    return res.status(400).send('ID unknown : ' + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('ID unknown : ' + err);
  }).select('-password -email');*/
}; //end getUserInfo
