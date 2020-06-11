const asyncError = require('../utils/asyncError');
const AppError = require('../utils/AppError')
const User = require('../models/User')

exports.getUser = asyncError (async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');
    console.log(user);
    res.json({
        user
    })
})