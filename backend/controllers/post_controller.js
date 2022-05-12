const mysql = require('../database/mySQL_connection');
const { uploadErrors } = require('../utils/errors_utils');
const fs = require('fs');

//--------------------------------------------------------------------------
module.exports.readPost = async (req, res) => {
  try {
    mysql.query(
      `SELECT * FROM sn_posts ORDER BY post_update DESC;`,
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
}; //end readPost

//--------------------------------------------------------------------------
module.exports.createPost = async (req, res) => {
  const userId = req.auth.userId;
  console.log('id author post = ' + userId);
  const fileName = userId + +Date.now() + '.jpg';
  console.log('filename = ' + fileName);

  // save file in fs
  if (req.file != null) {
    const path = `${process.cwd()}\\client\\public\\uploads\\posts\\`;
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
  } //end if (req.file!=null)

  // post creation in DB

  const postImage = req.file != null ? '.uploads/posts/' + fileName : '';

  mysql.query(
    `INSERT INTO sn_posts (post_title, post_content , post_image, post_author)
VALUES(?, ?, ?, ?);`,
    [`${req.body.title}`, `${req.body.content}`, `${postImage}`, `${userId}`],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        res.status(201).json({ message: 'Post créé' });
      }
    }
  ); // mysql query
}; //end Post

//--------------------------------------------------------------------------
module.exports.updatePost = async (req, res) => {
  //select user_author
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
        console.log('id author récupéré = ' + idAuthor);
        //debut code

        try {
          if (idAuthor != req.auth.userId) {
            res.status(403).json({ error: 'User ID non autorisé!' });
          } else {
            // debut save message BD

      if (req.body.content == '')
        return res.status(400).json({
          message: `Le contenu à modifier est vide`,
        });

      mysql.query(
        `UPDATE sn_posts SET  post_content = ?, post_update = NOW() where id_post = ?;`,
        [`${req.body.content}`, idPost],
        (error, result) => {
          if (error) {
            console.log(error);
            res.status(400).json({ error });
        
          } else {
            res.status(200).json({ message: 'Message ost modifié' });
          }
        }
      ); //mysql query
    

            // fin  save message BD

           
          } //end if
        } catch (err) {
          res.status(400).json({ err });
        } //end try & catch

        // fin code
      }
    }
  );


}; //end Post

//--------------------------------------------------------------------------
module.exports.deletePostImage = async (req, res, next) => {
  const userId = req.auth.userId;
  console.log('id author post = ' + userId);
  const path = `${process.cwd()}\\client\\public\\uploads\\post\\`;
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
//--------------------------------------------------------------------------
module.exports.Post = async (req, res) => {
  try {
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {
    } //end if
  } catch (err) {
    res.status(400).json({ err });
  } //end try & catch
}; //end Post

//--------------------------------------------------------------------------
