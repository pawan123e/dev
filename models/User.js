const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: [true, 'User already exists'],
        validate: [validator.isEmail, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Password length should be minimum of 8'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please enter a confirmPassword'],
        validate: {
            validator: function(el) {
                return this.password === el
            },
            message: 'Password not matched'
        }
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    this.avatar = gravatar.url(this.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    next();
})

userSchema.methods.passwordCheck = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = User = mongoose.model('User', userSchema)