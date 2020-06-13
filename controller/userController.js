const asyncError = require('../utils/asyncError');
const AppError = require('../utils/AppError')
const User = require('../models/User')
const multer = require('multer');
const sharp = require('sharp')

const filterObj = (obj, ...allowedFields) =>{
    const newObj = {}
    Object.keys(obj).forEach(el => {
       if(allowedFields.includes(el)){
           newObj[el] =obj[el]
       }
   })
     return newObj
}

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/img/users');
//     },
//     filename: (req, file, cb) => {
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user._id}-${Date.now()}.${ext}`)
//     }
// })

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an Image! Please upload only images.', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'coverPhoto', maxCount: 1}
]);

exports.resizeUserPhoto = (req, res, next) => {
    console.log('request files',req.files)
    // if(!req.files.length) return next();
    // req.files.forEach(file => {
    // })
    if(!req.file) return next();
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`
    sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({quality: 90})
    .toFile(`public/img/users/${req.file.filename}`) 
    next();
}

exports.getUser = asyncError (async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
        user
    })
})

exports.updateMe = asyncError (async (req, res, next) => {
    console.log('request file', req.file);
    const filteredbody = filterObj(req.body, 'name', 'email');
    
    if(req.file) filteredbody.avatar = req.file.filename;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredbody, {
        new: true, 
        runValidators: true
    })
   
    res.status(200).json({
       status: 'success' ,
       data: {
           user: updatedUser
       }
    })

})
