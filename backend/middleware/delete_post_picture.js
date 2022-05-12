const mysql = require('../database/mySQL_connection');
const fs = require('fs');
//--------------------------------------------------------------------------
module.exports = async (req, res, next) => {
  const userId = req.auth.userId;
  console.log('id author post = ' + userId);
  const path = `${process.cwd()}\\client\\public\\uploads\\posts\\`;
  console.log('path = ' + path);

  const idPost = req.params.id;
  mysql.query(
    `SELECT * FROM sn_posts WHERE id_post = ?`,
    [idPost],
    (error, post) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      if (post.length === 0) {
        res.status(404).json({ message: 'Post non trouvé!' });
      } else {
        const idAuthor = post[0].post_author;
        const pictureName = post[0].post_image.replace('./uploads/posts/', '');
        console.log('id author récupéré = ' + idAuthor);
        console.log('nom image récupéré = ' + pictureName);

        //debut code
        // get filename
        try {
          if (idAuthor != req.auth.userId) {
            res.status(403).json({ error: 'User ID non autorisé!' });
          } else {
            const urlPicture = path + pictureName;
            //delete picture
            if (pictureName != '') {
              fs.unlink(urlPicture, (error) => {
                if (error) return console.log('pas de photo à supprimer');
                //supprimer lien BD
                mysql.query(
                  `UPDATE sn_posts SET post_image ='' WHERE id_post = ?;`,[idPost],
                  (error, post) => {
                    if (error) {
                      console.log(error);
                      res.status(400).json({ error });
                    } else {
                      res.status(200).json({ message: 'image supprimée' });
                    }
                  }
                );
              });
            }
          }
        } catch (err) {
          res.status(500).json({ err });
        }
        // fin code
      }
    }
  );
}; //end Post
