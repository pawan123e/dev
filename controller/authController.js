const User = require('../models/User');
const asyncError = require('../utils/asyncError');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')
const {promisify} = require('util')

exports.register = asyncError (async (req, res, next) => {
    const user = await User.create(req.body);
    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
    res.json({
        token
    })
})

exports.protect = asyncError (async (req, res, next) => {
    let token;
    if(req.headers.authorization) {
        token = req.headers.authorization;
    }
    if(!token) {
        return next(new AppError('Unauthorized access', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if(!user) {
        return next(new AppError('User with this token not exist', 401))
    }
    req.user = user;
    next();
})

exports.signIn = asyncError(async (req, res, next) => {
    
    const {email, password} = req.body;
    if(!email || !password) {
        return next(new AppError('Enter email and password', 400))
    }
    const user = await User.findOne({email: email}).select('+password');
  
    if(!user || (!await user.passwordCheck(password, user.password))) {
        return next(new AppError('Invalid credentials', 401))
    }

    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
    res.json({
        token
    }) 
})