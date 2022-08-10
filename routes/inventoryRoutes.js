const express = require('express');
const authController = require('../controllers/authController')
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', authController.protect, authController.restrictTo('retailer'), inventoryController.getAllInventoryByRetailer)

router.post('/', authController.protect, authController.restrictTo('retailer'), inventoryController.createInventory)

router.get('/brand', authController.protect, authController.restrictTo('brand'),inventoryController.getInventoryByBrandId);

router.post('/promotion', authController.protect, authController.restrictTo('retailer'), inventoryController.createPromotion)

router.patch('/promotion', authController.protect, authController.restrictTo('retailer'), inventoryController.updatePromotion)


module.exports = router;