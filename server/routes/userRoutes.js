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
    updateProfile,
    getProfile // Controller එකෙන් import කළා
} = require('../controllers/userController');

// AUTH
router.post('/signup', signup);
router.post('/signin', signin);

// PROFILE
router.get('/profile', protect, getProfile); // මෙන්න මේකයි වැදගත්!

// USER & ADMIN ROUTES
router.get('/', protect, getAllUsers); 
router.put('/update-profile/:id', protect, updateProfile);

// ADMIN ONLY ROUTES 
router.put('/block/:id', protect, isAdmin, toggleBlockUser);
router.delete('/delete/:id', protect, isAdmin, deleteUser);
router.patch('/role/:id', protect, isAdmin, updateUserRole);

module.exports = router;