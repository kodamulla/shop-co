const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Multer setup - ෆයිල් එක 'uploads/' ෆෝල්ඩරයට සේව් වෙයි
const upload = multer({ dest: 'uploads/' });

// Routes
router.get('/', getProducts);


router.post('/', upload.single('image'), createProduct);

router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;