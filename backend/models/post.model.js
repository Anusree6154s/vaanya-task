const mongoose = require("mongoose")
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  image: String,
});

exports.Post = mongoose.model('Post', postSchema);