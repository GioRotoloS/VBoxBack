 const express = require('express');
const router = express.Router();

const { 
    getUsers, 
    updateUser,
    deleteUser,
    register,
    login,
    logout
} = require('../services/auth');

router.get('/users', getUsers);
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;