const mongoose = require('mongoose')
const validator = require('validator')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us product name!']
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    mrp: {
        type: Number,
        required: [true, 'Please tell us product price!']
    }
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;

