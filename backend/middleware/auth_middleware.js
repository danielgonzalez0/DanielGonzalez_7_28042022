//config middleware d'authentification pour protéger les routes

//====================================================================
//                      importation Package

const jwt = require('jsonwebtoken');
require('dotenv').config();

//====================================================================
//                      structure du middleware

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == null) return res.sendStatus(401);
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          const userId = decodedToken.userId;
          const userAdmin = decodedToken.userAdmin;

          //Ajout userId du token décodé dans requête d’authentification
          req.auth = { userId, userAdmin };

          //vérifier si userId de la requête correspond au userId autorisé
          if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valide!';
          } else {
            console.log('req.auth = ' + req.auth.userId);
            next();
          }
        }
      }
    ); //end try
  } catch {
    res.status(403).json({ error: error | 'unauthorized request' });
  } //end catch
}; //end middleware authentification
