const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/', productController.getAllProducts);

router.post('/', authController.protect, authController.restrictTo('brand'), productController.createProduct);

router.patch('/', authController.protect, authController.restrictTo('brand'), productController.updateProduct)

router.delete('/', authController.protect, authController.restrictTo('brand'), productController.deleteProduct);


module.exports = router;