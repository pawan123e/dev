const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Text is required']
    },
    like: [
        {
            user: {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    comments: [
        {
            user: {
                type:  mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            text: {
                type: String,
                required: [true, 'Text is required']
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});



postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email avatar'
    }).populate({
        path: "comments.user",
        model: "User",
        select: ["name", "email", "avatar"]
      })
    console.log('hello uncle namaste')
    next();
})

module.exports = Post = mongoose.model('Post', postSchema);