const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/logController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', protect, isAdmin, getLogs); 

module.exports = router;