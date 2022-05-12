const mysql = require('../database/mySQL_connection');
const fs = require('fs');
//--------------------------------------------------------------------------
module.exports = async (req, res, next) => {
  const path = `${process.cwd()}\\client\\public\\uploads\\profil\\`;
  console.log('path = ' + path);
  // get filename
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      mysql.query(
        `SELECT user_picture FROM sn_users where id_user = ?;`,
        [id],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
          }
          if (result.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé!' });
          } else {
            console.log('firstname récupéré');
            const fileName = result[0].user_picture.replace(
              './uploads/profil/',
              ''
            );
            const urlPicture = path + fileName;
            //delete picture
            if (fileName != 'random-user.png') {
              fs.unlink(urlPicture, (error) => {
                if (error)
                  return console.log('pas de photo de profil à supprimer');
                next();
              });
            } else {
              next();
            }
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ err });
  }
}; //end deleteProfilePicture

