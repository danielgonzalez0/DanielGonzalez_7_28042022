//-------------------------------------------------------------
const mysql = require('../database/mySQL_connection');
const fs = require('fs');
const { uploadErrors } = require('../utils/errors_utils');
const chemin = require('path');

//-------------------------------------------------------------
module.exports.uploadProfil = async (req, res) => {
  const path = chemin.normalize(
    __dirname + '/../../client/public/uploads/profil/'
  );
  //`${process.cwd()}\\client\\public\\uploads\\profil\\`;
  // get filename
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
      mysql.query(
        `SELECT user_firstname, user_lastname FROM sn_users where id_user = ?;`,
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
            const fileName =
              result[0].user_firstname + result[0].user_lastname + '.jpg';
            console.log(fileName);

            //début code
            // console.log(req.file);
            if (!req.file)
              return res.status(400).json({ message: 'Image manquante' });
            try {
              if (
                req.file.mimetype != 'image/jpeg' &&
                req.file.mimetype != 'image/png' &&
                req.file.mimetype != 'image/jpg'
              )
                throw Error('Invalid file');
              //test size
              if (req.file.size > 500000) throw Error('max size');
            } catch (err) {
              const errors = uploadErrors(err);
              console.log(errors);
              fs.unlink(`${path}${req.file.filename}`, function (errors) {
                if (errors) console.log('ERROR: ' + errors);
              }); // end fs.unlink
              return res.status(201).json(errors);
            } //end try & catch

            // file path creation

            fs.rename(
              `${path}${req.file.filename}`,
              `${path}${fileName}`,
              function (err) {
                if (err) console.log('ERROR: ' + err);
              }
            );

            // save url file in DB

            try {
              const urlImage = './uploads/profil/' + fileName;
              console.log(urlImage);

              mysql.query(
                `UPDATE sn_users SET  user_picture = ?
        where id_user = ?;`,
                [`${urlImage}`, id],
                (error, result) => {
                  if (error) {
                    console.log(error);
                    res.status(400).json({ error });
                  } else {
                    res
                      .status(200)
                      .json({ message: 'Image de profil modifiée' });
                  }
                }
              ); //mysql query
            } catch (err) {
              return res.status(500).send({ message: err });
            } //end try & catch

            //fin code
          }
        }
      );
    }
  } catch (err) {
    res.status(500).json({ err });
  } //end try & catch
}; //end uploadProfil

//-------------------------------------------------------------
