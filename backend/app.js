//====================================================================
//                      importation Package

const express = require('express');
const morgan = require('morgan');
const mysql = require('./database/mySQL_connection');
const cookieParser = require('cookie-parser');

//====================================================================
//importation des routeurs
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

//====================================================================
//Importation du module "path" pour gérer chemin des fichiers

//====================================================================
//               création de l'application express
const app = express();

//===================================================================
//           déclaration middlewares généraux

//loguer les requests et les responses
app.use(morgan('dev'));

//Accéder au body des requêtes dans les middlewares (req.body)
app.use(express.json());
//accès au cookies dans req
app.use(cookieParser());

//mise en place des headers pour éviter bloquant du CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//====================================================================
//configuration des routes

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//====================================================================
//configuration route d'accès au dossier /images pour les requêtes avec fichier
//app.use('/images', express.static(path.join(__dirname, 'images')));

//====================================================================

// exportation application express pour les autres modules
module.exports = app;
