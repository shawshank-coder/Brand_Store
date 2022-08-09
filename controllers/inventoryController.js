const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const Inventory = require('../models/inventoryModel');


exports.getAllInventory = catchAsync(async(req, res, next)=>{
    const allInventory = await Inventory.find({retailerId: req.user._id});

    res.status(201).json({
        status: 'success',
        data: {
            allInventory
        }
    });
})


exports.createInventory = catchAsync(async(req, res, next)=>{
    if(req.user.id != req.body.user_id){
        return next(new AppError("User not authorized for this brand"))
    }
    const product = await Inventory.find({user_id: req.body.user_id, name: req.body.name});
    console.log("product:", product);
    if(product){
        return next(new AppError("Inventory with same name for same brand already exist!"));
    }
    const doc = await Product.create(req.body);
    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            product: doc
        }
    });
})