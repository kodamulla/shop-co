const express = require('express');
const { getAllUsers, toggleBlockUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

const User = require('../models/userModel');


// Get all users (Manager view)
router.get('/', getAllUsers);

// Block or Unblock a user
router.put('/:id/block', toggleBlockUser);

// Delete a user
router.delete('/:id', deleteUser);

module.exports = router;