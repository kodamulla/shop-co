const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// 👈 Multer setup - දැන් file එක local save කරන්නේ නෑ, කෙලින්ම memory එකට ගන්නවා
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.get('/', getProducts);

router.post('/', upload.single('image'), createProduct);

router.put('/:id', upload.single('image'), updateProduct); 
router.delete('/:id', deleteProduct);

module.exports = router;