//====================================================================
//importation du framwork express

const express = require('express');

//====================================================================
//Création du router

const router = express.Router();

//====================================================================
//Importation des middlewares

//const password = require('../middleware/password');

//====================================================================
//Importation du controller

const userCtrl = require('../controllers/user_controllers');

//====================================================================
//Création des routes

router.post('/signup', userCtrl.signup);
//router.post('/login', userCtrl.login);

//====================================================================
//exportation du router

module.exports = router;
