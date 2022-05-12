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
    [
      `${req.body.title}`,
      `${req.body.content}`,
      `${postImage}`,
      `${userId}`,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        res.status(201).json({ message: 'Post créé' });
      }
    }
  );// mysql query
}; //end Post

//--------------------------------------------------------------------------

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
