const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);

module.exports = router;