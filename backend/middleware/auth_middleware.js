//config middleware d'authentification pour protéger les routes

//====================================================================
//                      importation Package

const jwt = require('jsonwebtoken');
require('dotenv').config();

//====================================================================
//                      structure du middleware

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id_user;
    //Ajout userId du token décodé dans requête d’authentification
    req.auth = { id_user };
    //vérifier si userId de la requête correspond au userId autorisé
    if (req.body.id_user && req.body.id_user !== userId) {
      throw 'User ID non valide!';
    } else {
      next();
    } //end try
  } catch {
    res.status(403).json({ error: error | 'unauthorized request' });
  } //end catch
}; //end middleware authentification
