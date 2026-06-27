const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect, isManagerOrAdmin } = require('../middleware/authMiddleware');

router.get('/stats', getDashboardStats);

module.exports = router;