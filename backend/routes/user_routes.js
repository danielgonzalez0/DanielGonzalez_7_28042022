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

const authCtrl = require('../controllers/auth_controllers');
const userCtrl = require('../controllers/user_controllers');
const authMiddleware = require('../middleware/auth_middleware');

//====================================================================
//Création des routes

//auth

router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);


//user

router.get('/',authMiddleware, userCtrl.getAllUsers);
router.get('/:id',authMiddleware, userCtrl.getUserInfo);
/*
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow); //patch pour mettre à jour tab dans BD
router.patch('/unfollow/:id', userController.unFollow);
*/
//====================================================================
//exportation du router

module.exports = router;
