//====================================================================
//                      importation Package

const jwt = require('jsonwebtoken');
require('dotenv').config();

//====================================================================

module.exports.requireAuth = (req, res, next) => {
  const token = req.body.token;
  console.log('token = ' + token);
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decodedToken.userId);
          res.locals.user = decodedToken.userId;
          console.log(res.locals.user);
          next();
        }
      }
    );
  } else {
    console.log('No token');
  }
}; //end requireAuth
