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
const uploadCtrl = require('../controllers/upload_controller');
const authMiddleware = require('../middleware/auth_middleware');
const multerProfil = require('../middleware/multer_profil');
const deleteProfilPicture = require('../middleware/delete_profil_picture');
const password = require('../middleware/password');

//====================================================================
//Création des routes

//auth

router.post('/signup', password, authCtrl.signup);
router.post('/login', authCtrl.login);




//user

router.get('/', authMiddleware, userCtrl.getAllUsers);
router.get('/:id', authMiddleware, userCtrl.getUserInfo);
router.put('/:id', authMiddleware, userCtrl.updateUserInfo);
router.put('/security/:id', authMiddleware, userCtrl.updateUserPassword);
router.delete('/:id', authMiddleware, deleteProfilPicture, userCtrl.deleteUser);
router.post('/follow/:id', authMiddleware, userCtrl.follow);
router.delete('/unfollow/:id', authMiddleware, userCtrl.unfollow);

//upload
router.post(
  '/upload/:id',
  authMiddleware,
  multerProfil,
  uploadCtrl.uploadProfil
); //file = name of the field in req.body

//====================================================================
//exportation du router

module.exports = router;
