const {promisify} = require('util')
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError');
const req = require('express/lib/request');
const { application } = require('express');


const signToken = id=>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 2*10000*100000*100
    });
}

const createSendToken = (user, statusCode, res)=>{
    const token = signToken(user._id);
    
    const cookieOptions = {
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined; 

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async(req, res, next)=>{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    createSendToken(newUser, 201, res);
});


exports.login = catchAsync(async(req, res, next)=>{
    const {email, password} = req.body;

    //1))Email and password exist
    if(!email || !password)return next(new AppError('Please provide email and password!'));

    // 2))Check if email and password is correct
    const user = await User.findOne({email}).select('+password');

    if(!user || !await user.correctPassword(password, user.password)){
        return next(new AppError('Incorrect email or password!', 401));
    }

    createSendToken(user, 201, res);
});

exports.protect = catchAsync(async(req, res, next) => {
    // 1. Getting Token and check its there
    let token;
    // console.log(req.headers);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    //console.log(token);
    if(!token){
        return next(new AppError('You are not logged in! Please log in to access.', 401));
    }
    // 2. Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser)return next(new AppError('The user belonging to this token no longer exist.', 401))
    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    next();
})


exports.restrictTo = (...roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this application.', 403));
        }
        next();
    } 
    
}