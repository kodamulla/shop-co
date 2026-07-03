const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middleware/authMiddleware');

const {
    signup,
    signin,
    getAllUsers,
    toggleBlockUser,
    deleteUser,
    updateUserRole,
    updateProfile
} = require('../controllers/userController');



// AUTH
router.post('/signup', signup);
router.post('/signin', signin);


router.get('/', protect, getAllUsers); 

// ADMIN ONLY ROUTES 
router.put('/block/:id', protect, isAdmin, toggleBlockUser);
router.delete('/delete/:id', protect, isAdmin, deleteUser);
router.patch('/role/:id', protect, isAdmin, updateUserRole);

// USER PROFILE 
router.put('/update-profile/:id', protect, updateProfile);

module.exports = router;