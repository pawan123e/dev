const express = require('express');
const router = express.Router();
const {
    createPosts, 
    getPosts, 
    getPostById, 
    deletePostById,
    likePost,
    unlikePost,
    createComment,
    removeComment
} = require('../controller/postsController');

const {protect} = require('../controller/authController')

router.route('/')
.post(protect, createPosts)
.get(protect, getPosts);

router.route('/:id')
.get(protect, getPostById)
.delete(protect, deletePostById);

router.route('/like/:id')
.put(protect, likePost);

router.route('/unlike/:id')
.put(protect, unlikePost);

router.route('/comment/:id')
.put(protect, createComment);

router.route('/comment/:id/:comment_id')
.delete(protect, removeComment)

module.exports = router;