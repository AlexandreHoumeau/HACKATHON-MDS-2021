const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const UserSchema = new Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  premium: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  posts: [{
    type:  ObjectId,
  }]
})

module.exports = mongoose.model('User', UserSchema);