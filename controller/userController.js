const asyncError = require("../utils/asyncError");
const AppError = require("../utils/AppError");
const User = require("../models/User");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  });
  return newObj;
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 }
]);

exports.resizeUserPhoto = asyncError(async (req, res, next) => {
  if (!req.files.avatar && !req.files.coverPhoto) return next();
  if (req.files.coverPhoto) {
    req.body.coverPhoto = `user-${req.user._id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.coverPhoto[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/cover/${req.body.coverPhoto}`);
  }

  if (req.files.avatar) {
    req.body.avatar = `user-${req.user._id}-${Date.now()}-profile.jpeg`;

    await sharp(req.files.avatar[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.body.avatar}`);
  }
  next();
});

const uploads = async (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (url, err) => {
      if (err) return reject(err);
      return resolve({
        url: url.url,
        id: url.public_id
      })
    },
    {
      resource_type: "auto",
      folder: folder
    }
    )
  });
};

exports.getUser = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json({
    user
  });
});

exports.updateMe = asyncError(async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: 811465533626947,
    api_secret: 'f2N_ko-qaVSWDOvU8so9NUvRJcM'
  });
  
  const filteredbody = filterObj(req.body, "name", "email");
  if (req.files.avatar) {
    const photo = await uploads(`public/img/users/${req.body.avatar}`, 'Images')
    filteredbody.avatar = photo.url;
  }
 
  if (req.files.coverPhoto) {
    const photo = await uploads(`public/img/cover/${req.body.coverPhoto}`, 'Images')
    filteredbody.coverPhoto = photo.url;
  }
  if (req.body.name) {
    filteredbody.name = req.body.name;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredbody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});
