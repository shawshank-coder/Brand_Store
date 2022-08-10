const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Inventory = require('../models/inventoryModel');
const Product = require('../models/productModel');

exports.getAllInventory = catchAsync(async(req, res, next)=>{
    const allInventory = await Inventory.find({retailerId: req.user._id});

    res.status(201).json({
        status: 'success',
        data: {
            allInventory
        }
    });
})


exports.getInventoryByBrandId = catchAsync(async(req, res, next)=>{
    const product = await Product.findOne({user_id: req.body.brand_id});
    const allInventoryByBrand = await Inventory.find({retailerId: req.user._id, productId: product._id});

    res.status(201).json({
        status: 'success',
        data: {
            allInventoryByBrand
        }
    });
})


exports.createInventory = catchAsync(async(req, res, next)=>{
    const product = await Product.findOne({id: req.body.productId});

    if(product){
        return next(new AppError("Product with given id doesn't exist!"));
    }
    let {productId, retailerId, availCnt, promotion} = {...req.body};
    let soldCnt = 0;
    let currPrice = product.mrp - promotion;
    let productBody = {
        productId,
        retailerId,
        availCnt,
        soldCnt,
        promotion,
        currPrice
    } 
    const doc = await Inventory.create(productBody);
    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            inventory: doc
        }
    });
})


exports.createPromotion = catchAsync(async(req, res, next)=>{
    const product = await Product.findOne({id: req.body.productId});

    if(product){
        return next(new AppError("Product with given id doesn't exist!"));
    }
    let {productId, retailerId, promotion} = {...req.body};
    let currPrice = product.mrp - promotion;
    let productBody = {
        productId,
        retailerId,
        promotion,
        currPrice
    } 
    const doc = await Inventory.findByIdAndUpdate(req.body.inventoryId, productBody);
    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            inventory: doc
        }
    });
})


exports.updatePromotion = catchAsync(async(req, res, next)=>{
    const product = await Product.findOne({id: req.body.productId});

    if(product){
        return next(new AppError("Product with given id doesn't exist!"));
    }
    let {productId, retailerId, promotion} = {...req.body};
    let currPrice = product.mrp - promotion;
    let productBody = {
        productId,
        retailerId,
        promotion,
        currPrice
    } 
    const doc = await Inventory.findByIdAndUpdate(req.body.inventoryId, productBody);
    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            inventory: doc
        }
    });
})