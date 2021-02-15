const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const PhotoPostSchema = new Schema({
  image: {
    type: Buffer,
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("PhotoPost", PhotoPostSchema);
