const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const Product = require("../models/productModel")

exports.getAllProducts = catchAsync(async(req, res, next)=>{
    const allProducts = await Product.find();

    res.status(201).json({
        status: 'success',
        data: {
            allProducts
        }
    });
})

exports.createProduct = catchAsync(async(req, res, next)=>{
    const product = await Product.find({user_id: req.user.id, name: req.body.name});
    console.log("product:", product);
    if(product.length != 0){
        return next(new AppError("Product with same name for same brand already exist!"));
    }
    req.body.user_id = req.user.id;
    const doc = await Product.create(req.body);
    console.log(doc);
    res.status(201).json({
        status: 'success',
        data: {
            product: doc
        }
    });
})

exports.updateProduct = catchAsync(async(req, res, next)=>{
    const product = await Product.find({user_id: req.user.id, name: req.body.name});
    if(req.body.user_id != product.user_id){
        return next(new AppError("Can't Change BrandId"));
    }
    if(!req.body.user_id)req.body.user_id = product.user_id;
    const doc = await Product.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true
    })

    if(!doc){
        return next(new AppError('No product found with that ID', 404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            product: doc
        }
    });
})

exports.deleteProduct = catchAsync(async(req, res, next)=>{
    const doc = await Product.findByIdAndDelete(req.user._id);

    if(!doc){
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });

})