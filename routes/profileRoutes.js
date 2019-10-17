const express = require('express');
const router = express.Router();

const {
    protect
} = require('../controller/authController');

const {
    getProfile, 
    createProfile, 
    getAllProfiles, 
    getProfileById, 
    deleteProfile, 
    addExperience, 
    deleteExperience,
    addEducation,
    deleteEducation
} = require('../controller/profileController')

router.route('/').get(getAllProfiles).delete(protect,deleteProfile);
router.route('/me').get(protect, getProfile).post(protect, createProfile)
router.route('/:user_id').get(getProfileById);

router.route('/experience').put(protect, addExperience);
router.route('/experience/:id').delete(protect, deleteExperience)

router.route('/education').put(protect, addEducation);
router.route('/education/:id').delete(protect, deleteEducation);

module.exports = router;