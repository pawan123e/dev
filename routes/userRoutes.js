const express = require('express');
const router = express.Router();
const {register, protect, signIn} = require('../controller/authController')
const {getUser} = require('../controller/userController');

router.route('/register').post(register);
router.route('/auth').get(protect, getUser);
router.route('/signIn').post(signIn);
module.exports = router;