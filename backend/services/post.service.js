const { Post } = require("../models/post.model");

const addPostService = async (body) => {
  try {
    const data = await Post.create(body);
    if (!data) throw new Error("Could'nt create post!");
  } catch (error) {
    throw new Error("Error adding post!");
  }
};

const getPostsService = async () => {
  try {
    const data = await Post.find();
    return data;
  } catch (error) {
    throw new Error("Error getting posts!");
  }
};

const updatePostService = async (id, body) => {
  try {
    const data = await Post.findByIdAndUpdate(id, body, { new: true });
    if (!data) throw new Error("Could'nt update post!");
    return data;
  } catch (error) {
    throw new Error("Error updating post!");
  }
};

const deletePostService = async (id) => {
  try {
    await Post.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting post!");
  }
};

module.exports = {
  addPostService,
  getPostsService,
  updatePostService,
  deletePostService,
};
