const mongoose = require('mongoose');
const validator = require('validator')

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: [true, 'Please provide status']
    },
    skills: {
        type: [String],
        validate: {
            validator: function (el) {
                return el.length > 0
            },
            message: 'Please provide skills'
        }
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
           title: {
               type: String,
               required: [true, 'Title is required']             
           },
           company: {
               type: String,
               required: [true, 'Company is required']
           },
           location: {
               type: String
           },
           from: {
               type: Date,
               required: [true, 'From date is required']
           },
           to: {
               type: Date
           },
           current: {
               type: Boolean,
               default: false
           },
           description: {
               type: String
           }
        }
      ],
      education: [
          {
              school: {
                  type: String,
                  required: [true, 'Please provide school']
              },
              degree: {
                  type: String,
                  required: [true, 'Please provide degree']
              },
              fieldofstudy: {
                  type: String,
                  required: [true, 'Please provide fieldofstudy']
              },
              from: {
                  type: Date,
                  required: [true, 'Please provide date']
              },
              to: {
                  type: Date
              },
              current: {
                type: Boolean,
                default: false
               },
              description: {
                type: String
            }
          }
      ],
      social: {
          youtube: {
              type: String
          },
          twitter: {
              type: String
          },
          facebook: {
              type: String
          },
          linkedin: {
              type: String
          },
          instagram: {
              type: String
          }
      },
      date: {
          type: Date,
          default: Date.now
      }
})

module.exports = Profile = mongoose.model('Profile', profileSchema);