const express = require('express');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

router.get('/', inventoryController.getAllInventory)

router.post('/', inventoryController.createInventory)


router.get('/brand/:brand_id', inventoryController.getInventoryByBrandId);


router.post('/promotion', inventoryController.createPromotion)

router.patch('/promotion', inventoryController.updatePromotion)


module.exports = router;