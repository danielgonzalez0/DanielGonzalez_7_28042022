//====================================================================
//importation du framwork express

const express = require('express');

//====================================================================
//Création du router

const router = express.Router();

//====================================================================
//Importation des middlewares


//====================================================================
//Importation du controller

const authCtrl = require('../controllers/auth_controllers');
const postCtrl = require('../controllers/post_controller');
const uploadCtrl = require('../controllers/upload_controller');
const authMiddleware = require('../middleware/auth_middleware');
const multerPost = require('../middleware/multer_post');

//====================================================================
//Création des routes

//post routes

router.get('/', authMiddleware, postCtrl.readPost);
router.post('/', authMiddleware, multerPost, postCtrl.createPost);
//router.put('/:id', postController.updatePost);
//router.delete('/:id', postController.deletePost);
//router.patch('/like-post/:id', postController.likePost);
//router.patch('/unlike-post/:id', postController.unlikePost);

//comments
//router.patch('/comment-post/:id', postController.commentPost);
//router.patch('/edit-comment-post/:id', postController.editCommentPost);
//router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

//====================================================================
//exportation du router

module.exports = router;
