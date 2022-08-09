const mongoose = require('mongoose')
const validator = require('validator')


const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    },
    retailerId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    availCnt: {
        type: Number,
        required: [true, 'Please tell us available_cnt!']
    },
    soldCnt: {
        type: Number,
        default: 0
    },
    promotion: {
        type: Number,
        default: 0
    },
    currPrice: {
        type: Number,
    }
})

const Inventory = new mongoose.model('Inventory', inventorySchema)

module.exports = Inventory;
