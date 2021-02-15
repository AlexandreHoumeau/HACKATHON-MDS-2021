const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PostSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
  link: {
    type: String,
  },
  img: {
    type: ObjectId,
    ref: "PhotoPost"
  },
  created_by: {
    type: ObjectId,
    ref: "User"
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Post', PostSchema);
