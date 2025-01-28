const {
  addPostService,
  getPostsService,
  updatePostService,
  deletePostService,
} = require("../services/post.service");

const addPost = async (req, res) => {
    console.log(req.body)
  try {
    await addPostService(req.body);
    res.status(200).send({ message: "Post added successfully!" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPosts = async (req, res) => {
  try {
    const data = await getPostsService();
    res.status(200).send({ data, message: "Post retrieved successfully!" });
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  try {
    const data = await updatePostService(req.params.id, req.body);
    if (!data) return res.status(404).send({ message: "Posts not found!" });
    res.status(200).send({ data, message: "Post updated successfully!" });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  try {
    await deletePostService(req.params.id);
    res.status(200).send({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { addPost, getPosts, updatePost, deletePost };
