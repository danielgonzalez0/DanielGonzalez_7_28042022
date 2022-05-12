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
module.exports.Post = async (req, res) => {
 try{
    const id = req.params.id;
    if (id != req.auth.userId) {
      res.status(403).json({ error: 'User ID non autorisé!' });
    } else {}//end if

 }  catch (err) {
    res.status(400).json({err});
  } //end try & catch
}; //end Post

//--------------------------------------------------------------------------