const express = require('express');
const { createCategory, getCategories, deleteCategory,updateCategory  } = require('../controllers/categoryController');

const router = express.Router();

// Add a category
router.post('/', createCategory);

// Get all categories
router.get('/', getCategories);

// Delete a category
router.delete('/:id', deleteCategory);

router.put('/:id', updateCategory);

module.exports = router;