const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Inventory = require('../models/inventoryModel');
const Product = require('../models/productModel');
// const sendEmail = require('../utils/sendEmail');


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
    const products = await Product.find({user_id: req.user._id});


    const allInventoryByBrand = products.map(async(product)=> { return await Inventory.findOne({productId: product._id}) });

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

    // const mailOptions = {
    //     from: 'retailer1@gmail.com',
    //     to: 'brand1@gmail.com',
    //     subject: `Promotion Updated on Store with id ${retailerId}`,
    //     text: `New Price for productId ${productId} is ${currPrice}`
    // }
    // sendEmail(mailOptions, (error, info)=>{
    //     if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    // });

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

      
    // const mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'myfriend@yahoo.com',
    //     subject: `Promotion Updated on Store with id ${retailerId}`,
    //     text: `New Price for productId ${productId} is ${currPrice}`
    // }
    // sendEmail(mailOptions, (error, info)=>{
    //     if (error) {
    //         console.log(error);
    //       } else {
    //         console.log('Email sent: ' + info.response);
    //       }
    // });

    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            inventory: doc
        }
    });
})