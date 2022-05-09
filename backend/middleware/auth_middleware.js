//config middleware d'authentification pour protéger les routes

//====================================================================
//                      importation Package

const jwt = require('jsonwebtoken');
require('dotenv').config();

//====================================================================
//                      structure du middleware

module.exports = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log('decodedToken = ' + decodedToken);
    const userId = decodedToken.userId;
    //Ajout userId du token décodé dans requête d’authentification
    req.auth = { userId };
    //vérifier si userId de la requête correspond au userId autorisé
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valide!';
    } else {
      next();
    } //end try
  } catch {
    res.status(403).json({ error: error | 'unauthorized request' });
  } //end catch
}; //end middleware authentification
