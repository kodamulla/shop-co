const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
    getAllUsers,
    toggleBlockUser,
    deleteUser
} = require('../controllers/userController');

// AUTH
router.post('/signup', signup);
router.post('/signin', signin);

// ADMIN USER MANAGEMENT
router.get('/users', getAllUsers);
router.put('/block/:id', toggleBlockUser);
router.delete('/delete/:id', deleteUser);

module.exports = router;