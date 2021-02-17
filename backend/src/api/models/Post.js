const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PostSchema = new Schema({
  title: {
    required: true,
    type: String,
    text: true
  },
  content: {
    required: true,
    type: String,
    text: true
  },
  link: {
    type: String,
  },
  style: {
    type: String,
    required: true,
    text: true
  },
  img: {
    type: ObjectId,
    ref: "PhotoPost"
  },
  created_by: {
    type: ObjectId,
    ref: "User",
    text: true
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  liked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Post', PostSchema);
