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

const postCtrl = require('../controllers/post_controller');
const uploadCtrl = require('../controllers/upload_controller');
const authMiddleware = require('../middleware/auth_middleware');
const multerPost = require('../middleware/multer_post');
const deletePostPicture = require('../middleware/delete_post_picture');

//====================================================================
//Création des routes

//post routes

router.get('/', authMiddleware, postCtrl.readPost);
router.post('/', authMiddleware, multerPost, postCtrl.createPost);
router.put('/:id', authMiddleware, postCtrl.updatePost );
router.delete('/image/:id', authMiddleware, postCtrl.deletePostImage);
router.delete('/:id', authMiddleware, deletePostPicture, postCtrl.deletePost);
router.post('/like-post/:id', authMiddleware, postCtrl.likePost);
router.delete('/unlike-post/:id', authMiddleware, postCtrl.unlikePost);

//comments
router.post('/comment-post/:id', authMiddleware, postCtrl.createComment);
router.put('/edit-comment-post/:id', authMiddleware, postCtrl.editCommentPost);
//router.delete('/delete-comment-post/:id', postController.deleteCommentPost);

//====================================================================
//exportation du router

module.exports = router;
