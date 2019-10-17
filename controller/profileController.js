const Profile= require('../models/Profile');
const asyncError = require('../utils/asyncError');
const AppError = require('../utils/AppError');
const User = require('../models/User');

exports.getProfile = asyncError (async (req, res, next) => {
    const profile = await Profile.findOne({user: req.user._id}).populate("user", ["name", "avatar"]);
    if(!profile) {
        return next(new AppError('There is no profile for this user', 400))
    }
    res.json(profile)
})

exports.createProfile = asyncError (async (req, res, next) => {
    
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        youtube,
        facebook,
        skills,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //build profile object
    const profileFields = {};
    profileFields.user = req.user._id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) profileFields.skills = skills.toString().split(',').map(skill => skill.trim());

    //build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    let profile = await Profile.findOne({user: req.user._id});

    if(profile) {
        profile = await Profile.findOneAndUpdate(
            {user: req.user._id},
            {$set: profileFields},
            {new: true}
        )
        return res.json(profile)
    }
    
     profile = await Profile.create(profileFields);

    res.json(profile)
})

exports.getAllProfiles = asyncError (async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
})

exports.getProfileById = asyncError (async (req, res, next) => {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
    if(!profile) {
        return next(new AppError('Profile not found', 400));
    }
    res.json({
        profile
    })
})

exports.deleteProfile = asyncError (async (req, res, next) => {
    //remove profile
    await Profile.findOneAndDelete({user: req.user._id});
    await User.findByIdAndDelete(req.user._id);
    res.json({msg: 'User removed'})
})

exports.addExperience = asyncError (async (req, res, next) => {
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title, 
        company,
        location,
        from,
        to,
        current,
        description
    }

    const profile = await Profile.findOne({user: req.user._id});
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile)
})

exports.deleteExperience = asyncError (async (req, res, next) => {
    const profile = await Profile.findOne({user: req.user._id});

    profile.experience = profile.experience.filter(el => el._id.toString() !== req.params.id)

    await profile.save();
    res.json(profile)
})

exports.addEducation = asyncError (async (req, res, next) => {
        const profile = await Profile.findOne({user: req.user._id});

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to, 
            current,
            description
        }

        profile.education.unshift(newEdu);
        
        await profile.save();
        res.json(profile)

})

exports.deleteEducation = asyncError (async (req, res, next) => {
       const profile = await Profile.findOne({user: req.user._id});

       profile.education = profile.education.filter(item => item.id.toString() !== req.params.id);

       await profile.save();

       res.json(profile)
})