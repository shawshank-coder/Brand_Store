const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getAllInventory)

router.post('/', authController.protect, authController.restrictTo('retailer'), inventoryController.createInventory)


router.get('/brand/:brand_id', inventoryController.getInventoryByBrandId);


router.post('/promotion', authController.protect, authController.restrictTo('retailer'), inventoryController.createPromotion)

router.patch('/promotion', authController.protect, authController.restrictTo('retailer'), inventoryController.updatePromotion)


module.exports = router;