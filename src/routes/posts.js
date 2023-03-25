const express = require('express');
const router = express.Router();

const { 
    addPost, 
    deletePost, 
    getPost, 
    getPosts, 
    updatePost
} = require('../services/post');

router.get('/companies', getPosts);
router.get('/company/:id', getPost);
router.post('/add', addPost);
router.delete('/delete/:id', deletePost);
router.patch('/update/:id', updatePost);

module.exports = router;