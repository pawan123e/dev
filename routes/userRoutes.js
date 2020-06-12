const express = require('express');
const router = express.Router();
const {register, protect, signIn, forgotPassword, resetPassword} = require('../controller/authController')
const {getUser, updateMe, uploadUserPhoto, resizeUserPhoto} = require('../controller/userController');

router.route('/register').post(register);
router.route('/updateMe').patch(protect, uploadUserPhoto, resizeUserPhoto, updateMe);
router.route('/auth').get(protect, getUser);
router.route('/signIn').post(signIn);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').post(resetPassword);
module.exports = router;