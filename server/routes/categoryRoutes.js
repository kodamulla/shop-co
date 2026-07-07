const express = require('express');
const multer = require('multer'); // 👈 Multer එකතු කළා
const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

// 👈 Uploads ෆෝල්ඩරයට පින්තූර දාන්න Multer හදමු
const upload = multer({ dest: 'uploads/' });

// Add a category (පින්තූරයත් එක්ක)
router.post('/', upload.single('image'), createCategory);

// Get all categories
router.get('/', getCategories);

// Delete a category
router.delete('/:id', deleteCategory);

// Update a category (Edit කරද්දි පින්තූරයක් මාරු කරනවා නම්)
router.put('/:id', upload.single('image'), updateCategory);

module.exports = router;