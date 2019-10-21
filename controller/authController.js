const User = require('../models/User');
const asyncError = require('../utils/asyncError');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError')
const {promisify} = require('util')
const sendEmail = require('../utils/email')
const crypto = require('crypto')

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

exports.forgotPassword = asyncError(async (req, res, next) => {
    const {email} = req.body;
    if(!email) {
        return next(new AppError('Please enter an email address', 404));
    }
    const user = await User.findOne({email: email});
    if(!user) {
        return next(new AppError ('No search results'));
    }
    
    // generate token
    const resetToken = user.createPasswordResetToken();
    
    await user.save({validateBeforeSave: false});
   
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/resetPassword/${resetToken}`
        const message = `Forgot your password? Submit a patch request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email.`
        
        try {
             await sendEmail({
            email: user.email,
            subject: 'Your password reset token {valid for 10 min}',
            message
        })

        res.status(200).json({
            status: 'success',
            token: resetToken
        })
        } catch (error) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave: false});

            return next(new AppError('There was an error sending the email. Try again later', 500))
        }
       
})

exports.resetPassword = asyncError(async (req,res,next) => {
    // get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}})
    
    // if token has not expired, and there is user, set the new password
    if(!user){
        return next(new AppError('Token is invalid or has expired',400))
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    // Update changedPassword property for the user
    
    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
    res.json({
        token
    })   
    //Log the user in , send Jwt
})