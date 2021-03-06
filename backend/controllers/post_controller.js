const mysql = require('../database/mySQL_connection');
const { uploadErrors } = require('../utils/errors_utils');
const fs = require('fs');
const chemin = require('path');

//--------------------------------------------------------------------------
module.exports.readPost = async (req, res) => {
  try {
    mysql.query(
      `SELECT * FROM sn_posts ORDER BY id_post DESC;`,
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
    const path = chemin.normalize(
      __dirname + '/../../client/public/uploads/posts/'
    );
    //`${process.cwd()}\\client\\public\\uploads\\posts\\`;
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
      return res.status(201).json({ errors });
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

  const postImage = req.file != null ? './uploads/posts/' + fileName : '';

  mysql.query(
    `INSERT INTO sn_posts (post_content , post_image, post_author)
VALUES(?, ?, ?);`,
    [`${req.body.content}`, `${postImage}`, `${userId}`],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        res.status(201).json({ message: 'Post cr????' });
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
        res.status(404).json({ message: 'Post non trouv??!' });
      } else {
        const idAuthor = post[0].post_author;
        console.log('id author r??cup??r?? = ' + idAuthor);
        console.log('code admin = ' + req.auth.userAdmin);
        //debut code

        try {
          if (idAuthor === req.auth.userId || req.auth.userAdmin === 1) {
            // debut save message BD

            if (req.body.content == '')
              return res.status(400).json({
                message: `Le contenu ?? modifier est vide`,
              });

            mysql.query(
              `UPDATE sn_posts SET  post_content = ?, post_update = NOW() where id_post = ?;`,
              [`${req.body.content}`, idPost],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                } else {
                  res.status(200).json({ message: 'Message modifi??' });
                }
              }
            ); //mysql query

            // fin  save message BD
          } else {
            res.status(403).json({ error: 'User ID non autoris??!' });
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
  const path = chemin.normalize(
    __dirname + '/../../client/public/uploads/posts/'
  );
  // `${process.cwd()}\\client\\public\\uploads\\posts\\`;
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
        res.status(404).json({ message: 'Post non trouv??!' });
      } else {
        const idAuthor = post[0].post_author;
        const pictureName = post[0].post_image.replace(`./uploads/posts/`, '');
        console.log('id author r??cup??r?? = ' + idAuthor);
        console.log('nom image r??cup??r?? = ' + pictureName);

        //debut code
        // get filename
        try {
          if (idAuthor === req.auth.userId || req.auth.userAdmin === 1) {
            const urlPicture = path + pictureName;
            console.log('urlPicture = ' + urlPicture);
            //delete picture
            if (pictureName != '') {
              fs.unlink(urlPicture, (error) => {
                if (error)
                  return res
                    .status(400)
                    .json({ message: 'pas de photo ?? supprimer' });
                //supprimer lien BD
                mysql.query(
                  `UPDATE sn_posts SET post_image ='' WHERE id_post = ?;`,
                  [idPost],
                  (error, post) => {
                    if (error) {
                      console.log(error);
                      res.status(400).json({ error });
                    } else {
                      res.status(200).json({ message: 'image supprim??e' });
                    }
                  }
                );
              });
            } else {
              res
                .status(400)
                .json({ message: `pas d'image dans la base de donn??es` });
            }
          } else {
            res.status(403).json({ error: 'User ID non autoris??!' });
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

module.exports.deletePost = async (req, res) => {
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
        res.status(404).json({ message: 'Post non trouv??!' });
      } else {
        const idAuthor = post[0].post_author;
        console.log('id author r??cup??r?? = ' + idAuthor);
        try {
          if (idAuthor === req.auth.userId || req.auth.userAdmin === 1) {
            //debut code
            mysql.query(
              `DELETE FROM sn_posts where id_post = ?;`,
              [idPost],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                } else {
                  res.status(200).json({ message: 'Post supprim??' });
                }
              }
            ); //mysql query

            //fin du code
          } else {
            res.status(403).json({ error: 'User ID non autoris??!' }); //end if
          }
        } catch (err) {
          res.status(400).json({ err });
        } //end try & catch
      }
    }
  ); //end 1st sql query
}; //end deletePost
//--------------------------------------------------------------------------

module.exports.getLike = async (req, res) => {
  try {
    mysql.query(`SELECT * FROM sn_likes;`, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (err) {
    res.status(500).json({ err });
  }
}; //end getLike

//--------------------------------------------------------------------------
module.exports.likePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const userId = req.auth.userId;

    mysql.query(
      `SELECT * FROM sn_posts WHERE id_post = ?`,
      [idPost],
      (error, post) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error });
        }
        if (post.length === 0) {
          res.status(404).json({ message: 'Post non trouv??!' });
        } else {
          /*const idAuthor = post[0].post_author;
          if (idAuthor === userId)
            return res.status(400).json({
              message: `L'auteur du post n'est pas authoris?? ?? aimer son post`,
            });*/
          const likeKey = userId + '/' + idPost;
          console.log('like key= ' + likeKey);

          mysql.query(
            `SELECT like_key FROM sn_likes where like_key = ? ;`,
            [likeKey],
            (error, result) => {
              if (error) {
                console.log(error);
                res.status(400).json({ error });
              }

              if (result.length === 0) {
                mysql.query(
                  `INSERT INTO sn_likes(like_user, like_post, like_key)
VALUES(?,?, CONCAT(like_user,'/',like_post));`,
                  [userId, idPost],
                  (error, result) => {
                    if (error) {
                      console.log(error);
                      res.status(400).json({ error });
                    } else {
                      res.status(201).json({ message: 'like enregistr??' });
                    }
                  }
                );
              } else {
                res.status(400).json({
                  message: 'post d??j?? aim??!',
                });
              }
            }
          ); //end 2nd sql query
        }
      }
    ); //end 1st sql query
  } catch (err) {
    res.status(400).json({ err });
  } //end try & catch
}; //end likePost

//--------------------------------------------------------------------------
module.exports.unlikePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const userId = req.auth.userId;

    mysql.query(
      `SELECT * FROM sn_posts WHERE id_post = ?`,
      [idPost],
      (error, post) => {
        if (error) {
          console.log(error);
          res.status(400).json({ error });
        }
        if (post.length === 0) {
          res.status(404).json({ message: 'Post non trouv??!' });
        } else {
          const idAuthor = post[0].post_author;
          /* if (idAuthor === userId)
            return res.status(400).json({
              message: `L'auteur du post n'est pas authoris?? ?? aimer son post`,
            });*/
          const likeKey = userId + '/' + idPost;
          console.log('like key= ' + likeKey);

          mysql.query(
            `SELECT like_key FROM sn_likes where like_key = ? ;`,
            [likeKey],
            (error, result) => {
              if (error) {
                console.log(error);
                res.status(400).json({ error });
              }

              if (result.length === 0) {
                res.status(400).json({
                  message: 'like d??j?? supprim??',
                });
              } else {
                mysql.query(
                  `DELETE FROM sn_likes where like_key = ?;`,
                  [likeKey],
                  (error, result) => {
                    if (error) {
                      console.log(error);
                      res.status(400).json({ error });
                    } else {
                      res.status(201).json({ message: 'like supprim??' });
                    }
                  }
                );
              }
            }
          ); //end 2nd sql query
        }
      }
    ); //end 1st sql query
  } catch (err) {
    res.status(400).json({ err });
  } //end try & catch
}; //end likePost

//--------------------------------------------------------------------------

module.exports.createComment = async (req, res) => {
  const userId = req.auth.userId;
  const idPost = req.params.id;
  // user fullname
  mysql.query(
    `select user_fullname from sn_users where id_user = ?`,
    [userId],
    (error, userName) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
        const userFullname = userName[0].user_fullname;
        //check post exit
        mysql.query(
          `SELECT * FROM sn_posts WHERE id_post = ?`,
          [idPost],
          (error, post) => {
            if (error) {
              console.log(error);
              res.status(400).json({ error });
            }
            if (post.length === 0) {
              res.status(404).json({ message: 'Post non trouv??!' });
            } else {
              //comment creation
              mysql.query(
                `INSERT INTO sn_comments (comment_content , comment_author, comment_parent, comment_fullname)
VALUES(?, ?, ?, ?);`,
                [
                  `${req.body.content}`,
                  `${userId}`,
                  `${idPost}`,
                  `${userFullname}`,
                ],
                (error, result) => {
                  if (error) {
                    console.log(error);
                    res.status(400).json({ error });
                  } else {
                    res.status(201).json({ message: 'Commentaire cr????' });
                  }
                }
              ); // mysql query
            }
          }
        ); // mysql query
      }
    }
  );
}; //end createComment

//--------------------------------------------------------------------------

module.exports.editCommentPost = async (req, res) => {
  //select comment
  const idComment = req.params.id;
  mysql.query(
    `SELECT * FROM sn_comments WHERE id_comment = ?`,
    [idComment],
    (error, comment) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      if (comment.length === 0) {
        res.status(404).json({ message: 'Commentaire non trouv??!' });
      } else {
        const idAuthor = comment[0].comment_author;
        console.log('id author r??cup??r?? = ' + idAuthor);
        //debut code

        try {
          if (idAuthor === req.auth.userId || req.auth.userAdmin === 1) {
            // debut save message BD

            if (req.body.content == '')
              return res.status(400).json({
                message: `Le contenu ?? modifier est vide`,
              });

            mysql.query(
              `UPDATE sn_comments SET  comment_content = ?, comment_update = NOW() where id_comment = ?;`,
              [`${req.body.content}`, idComment],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                } else {
                  res.status(200).json({ message: 'commentaire modifi??' });
                }
              }
            ); //mysql query

            // fin  save message BD
          } else {
            res.status(403).json({ error: 'User ID non autoris??!' });
          } //end if
        } catch (err) {
          res.status(400).json({ err });
        } //end try & catch

        // fin code
      }
    }
  );
}; //end editCommentPost

//--------------------------------------------------------------------------
module.exports.deleteCommentPost = async (req, res) => {
  //select Comment
  const idComment = req.params.id;
  mysql.query(
    `SELECT * FROM sn_comments WHERE id_comment = ?`,
    [idComment],
    (error, comment) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      if (comment.length === 0) {
        res.status(404).json({ message: 'Commentaire non trouv??!' });
      } else {
        const idAuthor = comment[0].comment_author;
        console.log('id author r??cup??r?? = ' + idAuthor);
        try {
          if (idAuthor === req.auth.userId || req.auth.userAdmin === 1) {
            //debut code
            mysql.query(
              `DELETE FROM sn_comments where id_comment = ?;`,
              [idComment],
              (error, result) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({ error });
                } else {
                  res.status(200).json({ message: 'Commentaire supprim??' });
                }
              }
            ); //mysql query

            //fin du code
          } else {
            res.status(403).json({ error: 'User ID non autoris??!' });
          } //end if
        } catch (err) {
          res.status(400).json({ err });
        } //end try & catch
      }
    }
  ); //end 1st sql query
}; //end deleteCommentPost
//--------------------------------------------------------------------------

module.exports.readComment = async (req, res) => {
  try {
    mysql.query(
      `SELECT * FROM sn_comments ORDER BY comment_update DESC;`,
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
}; //end readComment

//--------------------------------------------------------------------------
