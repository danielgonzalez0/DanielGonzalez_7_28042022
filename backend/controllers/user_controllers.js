const mysql = require('../database/mySQL_connection');

//--------------------------------------------------------------------------
module.exports.getAllUsers = async (req, res) => {
mysql.query(
    `SELECT id_user, user_email, user_password, user_fullname FROM sn_users where ?;`,['1'],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error });
      } else {
          res.status(200).json({result},);
      }
})}; //end getAllUsers
